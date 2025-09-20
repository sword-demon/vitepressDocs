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



## 二分查找

1. 中心思想：每次查找都干掉数组的一半

   1. 先找中间索引，然后用搜索的`key`和中间索引对应的元素进行比较，如果找不到，下一次干掉数组的一半，重新找中间索引

   2. **如何找中间索引？**

      1. *长度/2是不合适的*

      2. ```java
         int min = 0;
         int max = arr.length - 1;
         int mid = (min + max) / 2;
         ```

      3. 如果此时的`mid`对应的值和搜索的值比较，如果小，则`mid=mid+1; min = mid`，反之`mid = mid - 1; max = mid;`

      4. `if (key) > arr[mid] => min = mid + 1`; `if key < arr[mid]; => max = mid - 1;` `if key == arr[mid] 找着了，就返回`

2. 作用：提高我们查询的效率

3. 前提：数组是升序的



```java
/**
 * @author wxvirus
 */
public class Demo01BinarySearch {
    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
        int key = 11;

        int index = binarySearch(arr);
        System.out.println("index = " + index);
        System.out.println("arr[index] = " + arr[index]);
    }

    private static int binarySearch(int[] arr) {
        int min = 0;
        int max = arr.length - 1;
        // 定义一个mid代表中间索引
        int mid = 0;
        // 定义一个key代表要查询的元素
        int key = 11;

        while (min <= max) {
            mid = (min + max) / 2;
            if (arr[mid] < key) {
                min = mid + 1;
            } else if (arr[mid] > key) {
                max = mid - 1;
            } else {
                System.out.println("找到了，索引为：" + mid);
                return mid;
            }
        }
        // 代表的是找不到
        return -1;
    }
}

```

