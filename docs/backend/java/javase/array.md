# 数组

## 求数组里的最大值

```java
public class Demo02Array {
    public static void main(String[] args) {
        int[] arr = {12, 3213, 143, 4325, 4546, 457, 12312};
        // 比较每一个元素,相邻的 2 个进行比较,较大的赋值给一个变量,直到循环结束
        int max = arr[0];
        // 第一次比较就可以去掉一次循环
        for (int i = 1; i < arr.length; i++) {
            if (max < arr[i]) {
                max = arr[i];
            }
        }
        System.out.println(max);
    }
}
```

> 发散思维之后就可以求最小值
