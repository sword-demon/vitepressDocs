# Random 类

## 完成一个猜数字小游戏

```java
public class Demo01Random {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random rd = new Random();

        int rdNumber = rd.nextInt(100) + 1;
        while (true) {
            int scNumber = sc.nextInt();
            if (scNumber > rdNumber) {
                System.out.println("猜大了");
            } else if (scNumber < rdNumber) {
                System.out.println("猜小了");
            } else {
                System.out.println("恭喜你，猜对了！");
                break;
            }
        }
    }
}
```

```bash
21
猜小了
50
猜小了
60
猜大了
90
猜大了
77
猜大了
66
猜大了
50
猜小了
58
猜大了
55
猜大了
54
猜大了
53
猜大了
52
恭喜你，猜对了！
```
