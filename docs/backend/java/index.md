---
date: 2025-07-12
---

# Java 随手记录

## 依赖包查询网站

[https://central.sonatype.com/](https://central.sonatype.com/)

> 可以查找对应的`SpringBoot`版本对应的各个组件的兼容版本的依赖

## 同时安装多个版本的 jdk

将对应的 jdk 下载下来之后我们创建一个文件夹 jdk 用来保存 jdk 相关内容。
然后将压缩包解压，放到 jdk 目录下。最终得到类似于

- D:\programs\jdk\jdk-17.0.11
- D:\programs\jdk\jdk1.8.0_351

并且在不同版本的 jdk 下，都有 bin 目录。

可以分别使用`cmd`进入对应`bin`目录使用`java -version`可以看到不同的版本

这里我们有 2 个 java 版本,可以创建 2 个环境变量

---

第一个:

- 变量名: `JAVA_HOME_8`
- 变量值: `D:\programs\jdk\jdk1.8.0_351`

第二个:

- 变量名: `JAVA_HOME_17`
- 变量值: `D:\programs\jdk\jdk-17.0.11`

:::info 注意配置使用哪个

- 变量名: `JAVA_HOME`
- 变量值: `%JAVA_HOME_17%`
  :::

添加`path`变量

找到`path`编辑-新建
输入: `%JAVA_HOME%\bin\`
一路点击确定即可

---

> 验证环境

如果是`windows`下,一定要重新打开一个新的`cmd`来验证一下`java -version`

---

如果要换版本,则通过修改`JAVA_HOME`变量对应的变量值即可

## 操作数组容易出现的问题

### 数组索引越界异常 ArrayIndexOutOfBoundsException

出现问题的原因: 操作的索引超出了数组的索引范围

```
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3
	at com.code.day04.Demo01Array.main(Demo01Array.java:15)
```

### 空指针异常 NullPointerException

原因: 数组为`null`,再操作数组

```java
int[] arr = new int[3];
System.out.println(arr.length);
arr = null;
System.out.println(arr.length);
```
