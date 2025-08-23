# kimi k2

- claude code 终端形式
- vscode 里使用 cline 或 roo code

## claude code

接入月之暗面的 api,使用 kimi k2 模型

```bash
export ANTHROPIC_AUTH_TOKEN=sk-YOURKEY(your kimi api key)
export ANTHROPIC_BASE_URL=https://api.moonshot.cn/anthropic
```

回到 claude code 的`terminal`,可以`/status`就可以看到对应的 URL 已经变成了月之暗面的了.
国内的月之暗面可能有请求限制频率.

## Roo Code

在 vscode 里使用这个

- 设置`API Provider`为`Anthropic`
- 在`kimi`里申请的`api key`复制到`Anthropic API Key`里
- 同样的`Use custom base URL`也要换成`kimi`的接口地址

全部弄完之后点击`save`之后就行.
