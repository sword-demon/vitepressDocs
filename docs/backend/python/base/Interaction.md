# python 下交互式工具

```bash
pip install ipython -i https://pypi.douban.com/simple
```

> `-i`是选择一个国内源的地址来快速下载,一般是不需要加上的

## 常用的格式符号

- `%c`: 字符
- `%s`: 字符串
- `%d`: 有符号十进制整数
- `%u`: 无符号十进制整数
- `%o`: 八进制整数
- `%x`: 十六进制整数(小写字母是 0x)
- `%X`: 十六进制整数(大写字母是 0X)
- `%f`: 浮点数
- `%e`: 科学计数法(小写 e)
- `%E`: 科学计数法(大写 E)
- `%g`: `%f`和`%e`的简写
- `%G`: `%f`和`%E`的简写

## 特殊字符

`r`: 代表将字符串中的包含的特殊字符转换成普通字符

```python
print(r'hello\nworld') # 这里的\n不会变成换行符打印
```

## 生成器嵌套 for 循环

```python
def test():
    yield [1, 2, 3, 4]


# 嵌套 for 循环
for i in test():
    for it in i:
        print(it)

```
