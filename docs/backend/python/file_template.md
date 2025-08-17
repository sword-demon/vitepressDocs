# pycharm 创建 py 代码模版配置

在 PyCharm 里可以设置 **Python 文件创建时自动生成的注释模板**，方法如下：

---

### 1. 打开文件模板设置

1. 打开 **PyCharm**
2. 菜单栏 → `Preferences` (macOS) 或 `Settings` (Windows/Linux)
3. 找到 **Editor → File and Code Templates**

---

### 2. 修改 Python 文件模板

1. 在左边选择 **Python Script**
2. 在右侧编辑框里写上你想要的模板内容，比如：

```python
# -*- coding: utf-8 -*-
"""
@File    : ${NAME}.py
@Author  : ${USER}
@Time    : ${DATE} ${TIME}
@Desc    :
"""
```

---

### 3. 常用内置变量

PyCharm 模板里可以用一些内置变量：

- `${NAME}` → 新建文件名
- `${USER}` → 当前系统用户名
- `${DATE}` → 当前日期（格式：yyyy/MM/dd）
- `${TIME}` → 当前时间（格式：HH\:mm）
- `${YEAR}` → 当前年份
- `${MONTH}` → 当前月份
- `${DAY}` → 当前日
- `${PROJECT_NAME}` → 当前项目名

---

### 4. 效果

以后新建 Python 文件时，就会自动带上你定义的注释头。
