# 自定义 SpringBoot3.x Starter 封装 API 请求日志切面业务组件

## 自定义 SpringBoot Starter

在项目中新建一个`module`，命名规则为：`项目名称-spring-boot-starter-要做的业务`，选择`Maven Archetype`里面的`quickstart`

- 选择`Maven Archetype`来创建一个`Maven`子模块

- JDK：我这里时 17
- 选择`maven-archetype-quickstart`
- 打包方式为`jar`
- 主要依赖为`spring-boot-starter-aop`

```xml
<dependencies>

  	<!-- 此时你可能有别的 common 模块 -->

  		<!-- AOP 切面 -->
      <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-aop</artifactId>
      </dependency>
  </dependencies>
```

将`quickstart`下载下来的一些不需要的类删除，比如`App.java`和测试包里的`AppTest.java`

## 添加 JSON 工具类

当前添加的是一个日志组件，这需要以`json`的 格式打印出参，要封装一个`Json`工具类，添加`Jackson`相关的依赖，

统一管理版本号为：`2.16.1`

```xml
<!-- Jackson -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>${jackson.version}</version>
</dependency>

<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>${jackson.version}</version>
</dependency>
```

添加完成后，我们通常是在`common`模块里引入对应的依赖

```xml
<!-- Jackson -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>

<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
</dependency>

<!-- 解决 Jackson Java 8 新日期 API 的序列化问题 -->
<dependency>
    <groupId>com.fasterxml.jackson.datatype</groupId>
    <artifactId>jackson-datatype-jsr310</artifactId>
</dependency>
```

使用日志切面打印出参时，如果出参中含有`Java 8`新的日期`API`，如`LocalDatetime`，可能会遇到如下异常

```
com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Java 8 date/time type `java.time.LocalDateTime` not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310" to enable handling (through reference chain: com.quanxiaoha.framework.common.response.Response["data"]->com.quanxiaoha.xiaohashu.auth.controller.User["createTime"])

```

这是由于`Jackson`本身不支持新的日期`API`，需要使用`Jackson-datatype-jsr310`库来解决此问题。

在`common`模块里新建一个`util`的工具包，用于统一存放相关的工具类，并创建`JsonUtils.java`

```java
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.SneakyThrows;

public class JsonUtils {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    static {
        OBJECT_MAPPER.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        OBJECT_MAPPER.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        OBJECT_MAPPER.registerModules(new JavaTimeModule()); // 解决 LocalDateTime 的序列化问题
    }

    /**
     * 将对象转换为 JSON 字符串
     * @param object 对象
     * @return JSON 字符串
     */
    @SneakyThrows
    public static String toJsonString(Object object) {
        return OBJECT_MAPPER.writeValueAsString(object);
    }
}

```

1. 创建了一个私有的静态不可变的`ObjectMapper`实例，`ObjectMapper`是`Jackson`库中用于序列化和反序列化`JSON`的核心类
2. `static {}`静态化初始块，用于在类加载时执行一些初始化操作。在这里，`OBJECT_MAPPER`被配置以在反序列化时忽略未知属性和在序列化时忽略空的`Java Bean`属性，并注册了一个`JavaTimeModule`模块，用于解决`LocalDateTime`类型的序列化问题
3. `toJsonString`这是一个公共静态方法，用于将给定的`Java`对象序列化为`JSON`字符串，它接收一个`Object`类型的参数，并转换为`JSON`字符串返回
4. `  @SneakyThrows`：这是`lombok`的一个注解，用于简化异常处理。它会将被标注的方法中的受检异常转换为不受检异常，使得代码看起来更加简洁

## 添加日志切面

在组件模块中，创建`aspect`包，用于放置切面相关的类，在里面添加自定义注解及切面

```java
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
@Documented
public @interface ApiOperationLog {

    /**
     * API 功能描述
     */
    String description() default "";
}

```

```java
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import top.wjstar.framework.common.util.JsonUtils;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.function.Function;
import java.util.stream.Collectors;

@Aspect
@Slf4j
public class ApiOperationLogAspect {

    /**
     * 以自定义 @ApiOperationLog 注解为切点，凡是添加 @ApiOperationLog 的方法，都会仔细环绕中的代码
     */
    @Pointcut("@annotation(xxx.xxx.framework.biz.operationlog.aspect.ApiOperationLog)")
    public void apiOperationLog() {}

    /**
     * 环绕
     * @param joinPoint 切点
     * @return
     * @throws Throwable
     */
    @Around("apiOperationLog()")
    public Object doAround(ProceedingJoinPoint joinPoint) throws Throwable {
        // 请求开始时间
        long startTime = System.currentTimeMillis();

        // 获取被请求的类和方法
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();

        // 请求入参
        Object[] args = joinPoint.getArgs();
        // 入参转换为 JSON 字符串
        String argsJsonStr = Arrays.stream(args).map(toJsonStr()).collect(Collectors.joining(", "));

        // 功能描述信息
        String description = getApiOperationLogDescription(joinPoint);

        // 打印日志
        log.info("====== 请求开始: [{}], 入参: {}, 请求类: {}, 请求方法: {} =================================== ",
                description, argsJsonStr, className, methodName);

        // 执行切点方法
        Object result = joinPoint.proceed();

        // 执行耗时
        long executionTime = System.currentTimeMillis() - startTime;

        // 打印出参等相关信息
        log.info("====== 请求结束: [{}], 耗时: {}ms, 出参: {} =================================== ",
                description, executionTime, JsonUtils.toJsonString(result));

        return result;
    }

    /**
     * 获取注解的描述信息
     * @param joinPoint 切点
     * @return 描述信息
     */
    private String getApiOperationLogDescription(ProceedingJoinPoint joinPoint) {
        // 1. 从 ProceedingJoinPoint 里获取 MethodSignature
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();

        // 2. 使用 MethodSignature 获取当前被注解的 method
        Method method = signature.getMethod();

        // 3. 从 Method 中提取 LogExecution 注解
        ApiOperationLog operationLog = method.getAnnotation(ApiOperationLog.class);

        // 4. 从 LogExecution 注解中获取 description 属性
        return operationLog.description();
    }

    private Function<Object, String> toJsonStr() {
        return JsonUtils::toJsonString;
    }
}

```

## starter 自动配置

新建一个`config`包，创建日志切面自动配置类

```java
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Bean;
import top.wjstar.framework.biz.operationlog.aspect.ApiOperationLogAspect;

@AutoConfiguration
public class ApiOperationLogAutoConfiguration {

    @Bean
    public ApiOperationLogAspect apiOperationLogAspect() {
        return new ApiOperationLogAspect();
    }
}

```

自动配置类，用于配置 API 操作日志记录功能，并且通过`@Bean`注解的方法来创建一个 `ApiOperationLogAspect`实例，以实现注入到`Spring`容器中

接着在`/main`文件夹下创建`/resources`包，再创建`/META_INF`文件夹，在里面创建`/spring`文件夹，以及`org.springframework.boot.autoconfigure.AutoConfiguration.imports`文件，注意，这个是自定义`starter`的固定捕捉，需要严格按照此格式来书写。

文件里面填写`ApiOperationLogAutoConfiguration`配置类的完整包路径

```
xxx.xxx.framework.biz.operationlog.config.ApiOperationLogAutoConfiguration
```

创建的`imports`文件前面必须有*小绿叶*标识，如果不是，可能导致自定义的`starter`被`idea`无法识别;到此，自定义`starter`步骤就算完成了。

## 统一版本控制

如果我们想在别的模块里使用，则必须在最外面的`pom.xml`文件里声明该依赖以及版本号

```xml
<dependencyManagement>
	<dependencies>
  	<!-- 业务接口日志组件 -->
      <dependency>
        <groupId>xxx.xxxx</groupId>
        <artifactId>xxxxx-spring-boot-starter-biz-operationlog</artifactId>
        <version>1.0.0-SNAPSHOT</version>
      </dependency>
  </dependencies>
</dependencyManagement>
```

## 使用 starter

在别的模块里编辑`pom.xml`引入日志切面依赖

```xml
 <dependencies>
		// 省略...

        <!-- 业务接口日志组件 -->
        <dependency>
            <groupId>xxx.xxxx</groupId>
            <artifactId>xxxx-spring-boot-starter-biz-operationlog</artifactId>
        </dependency>

    </dependencies>

```

为测试接口添加注解

```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import top.wjstar.framework.biz.operationlog.aspect.ApiOperationLog;
import top.wjstar.framework.common.response.Response;

@RestController
public class TestController {

    @GetMapping("/test")
    @ApiOperationLog(description = "测试接口")
    public Response<String> test() {
        return Response.success("success");
    }
}

```

重启项目，调用接口，自测一波，看看日志切面是否正常工作。

```
====== 请求开始: [测试接口], 入参: , 请求类: TestController, 请求方法: test ===================================
2025-05-24T15:36:34.340+08:00  INFO 80306 --- [nio-8080-exec-1] t.w.f.b.o.aspect.ApiOperationLogAspect   : ====== 请求结束: [测试接口], 耗时: 1ms, 出参: {"success":true,"message":null,"errorCode":null,"data":"success"} ===================================
```

## 测试日期 API

模拟一个用户实体类

```java
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    private String nickname;

    private LocalDateTime createTime;
}

```

```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import top.wjstar.framework.biz.operationlog.aspect.ApiOperationLog;
import top.wjstar.framework.common.response.Response;

import java.time.LocalDateTime;

@RestController
public class TestController {

    @GetMapping("/test")
    @ApiOperationLog(description = "测试接口")
    public Response<String> test() {
        return Response.success("success");
    }

    @GetMapping("/test2")
    @ApiOperationLog(description = "测试接口2")
    public Response<User> test2() {
        return Response.success(User
                .builder()
                .nickname("无解")
                .createTime(LocalDateTime.now())
                .build());
    }
}

```

接口访问

```json
{
  "success": true,
  "message": null,
  "errorCode": null,
  "data": {
    "nickname": "无解",
    "createTime": "2025-05-24T15:39:22.513713"
  }
}
```

```
====== 请求开始: [测试接口2], 入参: , 请求类: TestController, 请求方法: test2 ===================================
2025-05-24T15:39:22.527+08:00  INFO 80439 --- [nio-8080-exec-1] t.w.f.b.o.aspect.ApiOperationLogAspect   : ====== 请求结束: [测试接口2], 耗时: 1ms, 出参: {"success":true,"message":null,"errorCode":null,"data":{"nickname":"无解","createTime":[2025,5,24,15,39,22,513713000]}} ===================================

```

能正常打印，没出现异常，但是格式不太好

## 适配日期序列化格式

在`common`包里新增常量包和常量接口

```java
public interface DateConstants {
    /**
     * 年-月-日 时：分：秒
     */
    String Y_M_D_H_M_S_FORMAT = "yyyy-MM-dd HH:mm:ss";
}

```

调整`JsonUtils`

```java
static {
        OBJECT_MAPPER.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        OBJECT_MAPPER.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);

        // JavaTimeModule 用于指定序列化和反序列化规则
        JavaTimeModule javaTimeModule = new JavaTimeModule();
        javaTimeModule.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(DateConstants.Y_M_D_H_M_S_FORMAT)));
        javaTimeModule.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(DateConstants.Y_M_D_H_M_S_FORMAT)));

        OBJECT_MAPPER.registerModules(javaTimeModule); // 解决 LocalDateTime 的序列化问题
    }
```

重启后查看日志记录

```
====== 请求结束: [测试接口2], 耗时: 1ms, 出参: {"success":true,"message":null,"errorCode":null,"data":{"nickname":"无解","createTime":"2025-05-24 15:46:48"}} ===================================
```

现在可以看到打印日期格式友好很多了。
