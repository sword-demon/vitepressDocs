# 输入

> `python`中有一个内置的方法可以用来接收用户输入的数据

## input 的使用

`input`是`python`提供的一个可以接收用户输入信息的功能

1. `input`接收的是用户在键盘上输入的一些信息
2. 接收的信息的类型是一个字符串

---

```python

local_username = "wujie"
local_password = "123456"

username = input("请输入账号: ")  # 运行后处于阻塞状态等待用户输入
print(username)

password = input("请输入密码: ")

if username == local_username and password == local_password:
    print("登录成功")
else:
    print("登录失败")

```
