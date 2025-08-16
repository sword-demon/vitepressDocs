# Java 基础面试题

## JDK 和 JRE 有什么区别?

- JRE 是运行环境(Java Runtime Environment),包含了 JVM 和 Java 核心类库
- JDK 是 Java 开发工具包(Java Developer's Kit),包含了 JRE 和 Java 常见的开发工具(javac, java, jconsole,jvisualvm...)

## 说一下你对==和 equals 的认识,它们有什么差别?[高频]

1. `==`可以比较引用数据类型也可以比较基本数据类型

   - 比较基本数据类型,比较的是数值
   - 比较引用数据类型,比较的是地址值

2. `equals`只能比较引用数据类型,是因为`equals`是`Object`类中的一个方法,要使用方法只能通过对象进行使用,而对象就是引用数据类型
   - 默认情况下比较的也是对象的地址值
   ```java
    public boolean equals(Object obj) {
        return this == obj;
    }
   ```
   - 可以通过重写`Object`类中的`equals`方法实现比较 2 个对象的属性

## 如果 2 个对象的 hashCode 值一样,则它们用 equals 比较也是为 true,是不是?[高频]

> 不是

`hashCode`方法和`equals`方法是 2 个独立的方法,本质上没有任何的关系.它们都是`Object`类中的方法,这两个方法可以被子类进行重写,子类重写可以自定义具体的逻辑

```java
public class Demo {

    public static void main(String[] args) {
        String s1 = "重地";
        String s2 = "通话";

        System.out.println(s1.hashCode() == s2.hashCode()); // true
        System.out.println(s1.equals(s2)); // false
    }
}

```

## 综合说下 final 的作用?

- 修饰在变量上,叫常量,该常量必须初始化,初始化之后的值就不能修改,而常量一般全部都是用大写来命名
- 修饰在类上,该类不能被继承
- 修饰在方法上,该方法不能被重写

## String 是基本数据类型吗?

`String`不是基本数据类型,基础类型有 8 种: `byte, boolean, char, short, int, float, long, double`.
`String`属于引用数据类型

## 对字符串操作都有哪些类并详细的介绍它们之间的区别?[高频]

对字符串操作的类有: `String, StringBuffer, StringBuilder`

1. `String`是不可变的字符串

```java
String a = "abc";
a = "bcd";
```

:::danger 注意
不可变指的是字符串常量`"abc"`不可变,作为字符串的变量`a`是可变的
:::

2. `StringBuilder, StringBuffer`是可变的字符串
3. `StringBuffer`是线程安全的,`StringBuilder`是线程不安全的
4. `StringBuffer`保证线程安全的原理: 就是针对每一个方法都添加了一个`synchronized`关键字,将其声明为了同步方法.
