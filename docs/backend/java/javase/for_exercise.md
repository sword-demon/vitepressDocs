# for 循环练习

## 求出 1-100 之间所有偶数的和

```java
/**
 * 练习: 求出 1-100 的偶数的和
 * 步骤:
 * 1. 定义一个变量,接收 2 个数的和 sum
 * 2. 利用 for 循环,将 1-100 的数表示出来
 * 3. 判断,如果是偶数,再相加,将结果赋值给 sum
 * 4. 输出 sum 的值
 */
public class Demo02For {
    public static void main(String[] args) {
        // 定义一个变量,接收 2 个数的和 sum
        int sum = 0;
        // 1-100 的数 是可以等的
        for (int i = 1; i <= 100; i++) {
            if (i % 2 ==0) {
                sum += i;
            }
        }

        System.out.println("sum = " + sum);
    }
}
```

## 统计 1-100 之间的偶数的个数

```java
public class Demo03For {
    public static void main(String[] args) {
        int count = 0;
        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0) {
                count++;
            }
        }

        System.out.println("count = " + count);
    }
}

```

## idea 里 for 循环快捷键

循环几次就`数字.fori`然后回车

## 嵌套循环

> 概述: 循环中套循环,尽量不要超过 3 次(_基本上不会遇到_)

:::danger 重点
重点: 掌握嵌套循环的执行流程
先走外层循环,再走内层循环,内存循环就一直循环,直到内存循环结束了,外层循环进入下一次循环,以此类推,直到外层循环都结束了,程序整体才会结束.
:::

### 打印分秒来看执行流程

```java
public class Demo04ForInFor {
    public static void main(String[] args) {
        for (int fen = 0; fen < 60; fen++) {
            for (int miao = 0; miao < 60; miao++) {
                System.out.println(fen + "分" + miao + "秒");
                // 0分0秒
                // 0分1秒
                // 0分2秒
                // ...
                // 0分59秒
                // 1分0秒
                // 1分1秒
                // ...
                // 1分59秒
                // 2分0秒
                // ...
                // 59分59秒
            }
        }
    }
}
```

### 练习:打印矩形

```java
public class Demo05ForInFor {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}

```

### 练习:打印直角三角形

```java
public class Demo06ForInFor {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```
