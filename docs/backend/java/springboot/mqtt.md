---
date: 2025-03-09 16:25:00
---

# SpringBoot3 整合 MQTT

## 1. MQTT 简介

- MQTT（Message Queuing Telemetry Transport，消息队列遥测传输协议）是 IBM 公司开发的一个即时通讯协议，它是一种轻量级的、基于发布/订阅（publish/subscribe）模式的、为网络受限环境（如机器与机器之间的通信）设计的消息传输协议。
- MQTT 协议广泛应用于物联网（IoT）领域，它具有以下特点：

- Spring Integration: 是 Spring 针对信息流的抽象（消息传递的规范），支持 mqtt、mail、amqp 协议
- Spring Data：针对数据库访问过程的抽象（统一的数据库访问方式）
- Spring Integration 实现 mqtt 客户端所使用的类库：`eclipse.phao.client.mqttv3`

```xml
<properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

  <!-- springboot版本 -->
  <spring.boot.version>3.0.2</spring.boot.version>
  <!-- spring integration 版本 -->
  <spring.integration.version>6.2.6</spring.integration.version>
  <lombok.version>1.18.24</lombok.version>
</properties>
```

```xml
<!-- 全局导入，子模块不需要声明，就可以使用依赖 -->
<dependencies>
  <!-- 简化Java代码 -->
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>${lombok.version}</version>
    <scope>provided</scope>
  </dependency>
  <!-- 单元测试 -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
  </dependency></dependencies>
```

```xml
<!-- 子模块声明才能真正的导入 -->
<dependencyManagement>
  <dependencies>    <!-- springboot导入的2种方式
      1. 引入spring-boot-starter-parent <parent></parent>
      2. 引入spring-boot-dependencies   <dependency></dependency>
     -->    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-dependencies</artifactId>
      <version>${spring.boot.version}</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
    <!-- 核心包 -->
    <dependency>
      <groupId>org.springframework.integration</groupId>
      <artifactId>spring-integration-core</artifactId>
      <version>${spring.integration.version}</version>
    </dependency>
    <!-- 流支持依赖包 -->
    <dependency>
      <groupId>org.springframework.integration</groupId>
      <artifactId>spring-integration-stream</artifactId>
      <version>${spring.integration.version}</version>
    </dependency>
    <!-- integration 的 mqtt 依赖包 -->
    <dependency>
      <groupId>org.springframework.integration</groupId>
      <artifactId>spring-integration-mqtt</artifactId>
      <version>${spring.integration.version}</version>
    </dependency>
    <!-- springboot整合spring integration依赖包 -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-integration</artifactId>
      <version>${spring.boot.version}</version>
    </dependency>  </dependencies></dependencyManagement>
```
