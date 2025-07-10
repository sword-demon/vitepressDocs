# C 开发环境

## 代码编辑器

`Notepad++`

- 下载地址：[https://notepad-plus.en.softonic.com/](https://notepad-plus.en.softonic.com)
  - 注意钓鱼网站，分辨下载的`exe`是否是想要的东西
- 打开文件的拓展名，这样可以新建`C`语言的代码，以`.c`为后缀
  - windows 环境需要点击文件夹里的查看，把拓展名显示打开
- `notepad++`补充配置
  - 颜色：主题选择`Deep Dark`
  - 字体大小：可以通过鼠标滚轮+ctrl 进行放大缩小
  - 中文编码：配置-首选项-新建-默认语言 C 语言，设置简体中文编码 GBK
  - 其实最好还是选点自己喜欢的编辑器，那样不需要去考虑什么编码问题
  - 或者还是选择`visual studio`作为编辑器

> 第一段代码

```c
#include <stdio.h>

int main()
{
  printf("hello world");
  return 0;
}
```

## 代码的编译工具

- 安装`gcc`工具

  - `mingw`
    - 下载地址：[http://www.mingw-w64.org/doku.php/download/mingw-builds](https://www.mingw-w64.org/downloads/)。 注意下载离线安装版本
    - [https://sourceforge.net/projects/mingw-w64/files/mingw-w64/mingw-w64-release/](https://sourceforge.net/projects/mingw-w64/files/mingw-w64/mingw-w64-release/)
    - 博客参考：[https://blog.csdn.net/Leo_LiangXuYuan/article/details/86763735](https://blog.csdn.net/Leo_LiangXuYuan/article/details/86763735)
    - 现在最新的版本是`12.0.0`
    - 教程里的是`8.1.0`，以前的网址找不到了，现在在 [https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/8.1.0/threads-posix/seh/](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/8.1.0/threads-posix/seh/) 这个目录下面
    - 如果去搜安装方法，需要在搜索引擎下面选择工具，选择时间选择较近的时间范围里，否则看到的都是老的博客或笔记内容

- 配置环境变量：目的是为了让在终端能够识别`gcc`指令

- 使用

  - 打开命令行终端`cmd`

  - `cd`指令跳转到代码的所在的目录

  - 编译和运行

    - `-o`选项：指定输出的生成的程序的名字

      ```bash
      gcc test.c -o test

      # windows 环境下会生成一个 text.exe
      ```

    - 运行：`./test.exe`即可执行
