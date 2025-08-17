# 运算符

## 示例代码

```python
# -*- coding: utf-8 -*-
"""
@File    : 运算符.py
@Author  : wxvirus
@Time    : 2025/8/17 16:30
@Desc    :
"""

"""
运算符优先级
幂运算 > 乘除 > % > // > 加减
"""

result = 10 + 5.5 * 2
print(result)
print(type(result))

result = 9 / 3  # 整型与整型相除 得到的是浮点型
print(result)
print(type(result))

res = 9 / 3 * 2
print(res)
print(type(res))

res = 10 % 3
print(res)
print(type(res))

# 取整 计算结果的整数位
res = 8 // 3
print(res)

print('*' * 30)  # 作为打印数据中的分隔符使用

print(2 ** 3)

print(1 == '1')

print('3' > '4')  # ascii 编码集里有大小之分,比较的是 ascii 里的编号的大小

```
