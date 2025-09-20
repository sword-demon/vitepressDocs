# 模版



## 安装vscode插件

- crates
- Even Better TOML
- Better Comments
- Error Lens
- Prettier
- ident-rainbow
- rust-analyzer
- Rust Test lens
- Rust Test Explorer
- TODO Highlight
- YAML



## 安装 cargo generate

是用于生成项目模版的工具。它会使用已有的 github repo 作为模版生成新的项目。



```bash
cargo install cargo-generate
```



## 安装 pre-commit

```bash
pip install pre-commit

# 有的可能是
pip3 install pre-commit
```

> 还需要在你的新项目里使用`pre-commit install`一下，才能放到对应的`.git`文件夹里生效。

## 安装 Cargo deny

是一个检查依赖的插件

```bash
cargo install --locked cargo-deny
```

如果出现以下类似的情况

```
cannot install package cargo-deny 0.18.4, it requires rustc 1.88.0 or newer, while the currently active rustc version is 1.86.0 cargo-deny 0.18.3 supports rustc 1.85.0
```

升级`Rust`

```bash
rustup update stable
rustc --version
```

⚡ 推荐：
 如果项目没被 Rust 版本锁死，**升级 Rust** 是更长期的方案，因为很多 crate 都会逐渐要求更新的编译器版本。



## 安装 typos

拼写检查工具



```bash
cargo install typos-cli
```



##  安装 git cliff

是一个生成`changelog`的工具

```bash
cargo install git-cliff
```



## 安装 cargo nextest

是一个Rust增强测试工具

```bash
cargo install cargo-nextest --locked
```



## Cargo.toml

关键的配置文件，描述你这个项目的介绍，里面有一个`edition`，会尽量的保证向后兼容，Rust每3年会发布一个`edition`，当你更新一个`edition`的时候，你的代码应该不会有太大的问题，可能会有一些编译的报警。

`dependencies`是你的依赖，如果你安装了`crate`插件就会看到这个下载的依赖的版本还能点击到对应的文档地址。



## cargo build

```bash
cat ~/.cargo/config.toml
```

意味着你所有的项目的编译的都会放在这个目录，原因是清理垃圾的时候很方便，否则的一般都会输出在项目目录的本地。

```bash
[build]
target-dir = "/Users/wxvirus/.target"
#rustc-wrapper = "/Users/wxvirus/.cargo/bin/sccache"
```

