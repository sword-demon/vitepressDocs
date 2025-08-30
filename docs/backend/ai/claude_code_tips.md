# claude code 使用方法记录

## 自定义命令

在你的全局或项目目录里的`.claude`目录里新建一个`commands`文件夹,里面的新文件的名称都是以后新增的命令,这里新增一个`code_review.md`的文件

```markdown
对比这个分支: $ARGUMENTS, 与 main 分支的差异,并且提出你的 review 意见
```

这里也有可能是`master`分支,自己修改即可



## 前端让 AI 执行完代码自动执行格式化代码

前端原先都是执行`npx prettier --check .`命令来处理格式的问题

现在在`.claude`文件夹下新建`settings.json`

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|MultiEdit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --check ."
          }
        ]
      }
    ]
  }
}
```

`"matcher": "Edit|MultiEdit|Write",`每当完成文件的修改就会触发这个命令

- `PostToolUse`: 工具调用结束触发
- `PreToolUse`: 工具调用前触发
- `Notification`: 通知时触发