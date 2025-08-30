import { defineConfig } from "vitepress";
import { nav } from "./configs";
import timeline from "vitepress-markdown-timeline";
import { generateSidebar } from "vitepress-sidebar";
import vitepressProtectPlugin from "vitepress-protect-plugin";
import { MermaidMarkdown, MermaidPlugin } from "vitepress-plugin-mermaid";

const vitepressSidebarOptions = {
  /* Options... */
};

export default // https://vitepress.dev/reference/site-config
defineConfig({
  lang: "zh-CN",
  title: "无解的游戏",
  description: "文档记录和学习笔记",
  cleanUrls: true, // 开启纯净链接
  mermaid: {
    // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
  },
  mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container
  },
  base: "/",
  //fav图标
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "",
      },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
        rel: "stylesheet",
      },
    ],
  ],
  appearance: "dark", // 启用深色模式
  //markdown配置
  markdown: {
    image: {
      // 开启图片懒加载
      lazyLoading: true,
    },
    // toc显示1-6级标题
    toc: { level: [1, 2, 3, 4, 5, 6] },
    // 使用 `!!code` 防止转换
    codeTransformers: [
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, "[!code");
        },
      },
    ],
    lineNumbers: true,
    // 组件插入h1标题下
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options);
        if (tokens[idx].tag === "h1") htmlResult += `<ArticleMetadata />`;
        return htmlResult;
      };

      md.use(timeline);
      md.use(MermaidMarkdown);
    },
  },
  themeConfig: {
    logo: "/logo.png",
    //手机端深浅模式文字修改
    darkModeSwitchLabel: "深浅模式",
    //本地搜索
    search: {
      provider: "local",
    },
    //侧边栏文字更改(移动端)
    sidebarMenuLabel: "目录",
    //返回顶部文字修改
    returnToTopLabel: "返回顶部",
    outline: {
      level: [2, 4], // 显示2-4级标题
      // level: 'deep', // 显示2-6级标题
      label: "当前页大纲", // 文字显示
    },
    //自定义上下页名
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar: {
      "/guide/": [
        {
          //分组标题1
          text: "介绍",
          collapsed: false,
          items: [
            { text: "前言", link: "/guide/preface" },
            { text: "markdown案例", link: "/guide/markdown-examples" },
            { text: "api案例", link: "/guide/api-examples" },
          ],
        },
      ],
      "/life/": [
        {
          text: "生活&日常",
          collapsed: false,
          items: [{ text: "懒人蜜汁卤鸡翅", link: "/life/chicken" }],
        },
      ],
      "/front/": [
        {
          text: "React基础学习",
          items: [
            { text: "基础学习", link: "/front/base" },
            { text: "使用Context保存数据", link: "/front/react_context" },
          ],
        },
        { text: "Vue3", collapsed: false, items: [] },
        {
          text: "Electron",
          items: [],
        },
      ],
      "/backend/": [
        {
          text: "AI",
          items: [
            {
              text: "claude code proxy",
              link: "/backend/ai/claude_code_proxy",
            },
            {
              text: "coze工作流学习",
              link: "/backend/ai/coze_workflow",
            },
            {
              text: "chatbox使用",
              link: "/backend/ai/chatbox_use",
            },
            { text: "claude code使用kimi k2", link: "/backend/ai/kimi_k2" },
            {
              text: "cherry studio 智能体创建",
              link: "/backend/ai/cherry_studio_agent_1",
            },
            { text: "自定义 ai 小项目需求文档", link: "/backend/ai/rongyao" },
            { text: "6A 工作流", link: "/backend/ai/sixAworkflow" },
            { text: "Cursor 规则", link: "/backend/ai/cursor_rules" },
            { text: "claude code 入门", link: "/backend/ai/claude_code_xin" },
          ],
        },
        {
          text: "Go",
          collapsed: false,
          items: [
            {
              text: "项目",
              collapsed: false,
              items: [
                { text: "结构设计", link: "/backend/go/project/structure" },
                {
                  text: "工程实践",
                  link: "/backend/go/project/project_exercise",
                },
              ],
            },
            {
              text: "通知平台学习",
              collapsed: false,
              items: [
                { text: "幂等问题", link: "/backend/go/notification/mideng" },
              ],
            },
          ],
        },
        {
          text: "Java",
          collapsed: false,
          items: [
            {
              text: "随笔",
              link: "/backend/java/index",
            },
            { text: "自定义 Banner", link: "/backend/java/banner" },
            {
              text: "javase",
              collapsed: false,
              items: [
                {
                  text: "1.基础面试题",
                  link: "/backend/java/javase/interview",
                },
                {
                  text: "for循环练习",
                  link: "/backend/java/javase/for_exercise",
                },
                {
                  text: "Random",
                  link: "/backend/java/javase/random",
                },
                {
                  text: "数组",
                  link: "/backend/java/javase/array",
                },
              ],
            },
            { text: "javaee", collapsed: false, items: [] },
            { text: "javaweb", collapsed: false, items: [] },
            { text: "后端工程化", collapsed: false, items: [] },
            { text: "分布式", collapsed: false, items: [] },
            {
              text: "SpringBoot",
              collapsed: false,
              items: [
                {
                  text: "自定义 API 请求日志切面组件",
                  link: "/backend/java/springboot/log_aop_starter",
                },
                {
                  text: "springboot3整合mqtt",
                  link: "/backend/java/springboot/mqtt",
                },
              ],
            },
          ],
        },
        {
          text: "Python",
          collapsed: false,
          items: [
            {
              text: "pycharm配置代码模版",
              link: "/backend/python/file_template",
            },
            {
              text: "基础",
              collapsed: false,
              items: [
                {
                  text: "交互式工具",
                  link: "/backend/python/base/Interaction",
                },
                { text: "输入", link: "/backend/python/base/input" },
                { text: "运算符", link: "/backend/python/base/operator" },
              ],
            },
            { text: "爬虫", collapsed: false, items: [] },
            { text: "JS 逆向", collapsed: false, items: [] },
            { text: "安卓逆向", collapsed: false, items: [] },
          ],
        },
        {
          text: "C",
          items: [{ text: "开发环境", link: "/backend/c/env" }],
        },
        {
          text: "杂项",
          items: [
            { text: "终端配置", link: "/backend/terminal/index" },
            { text: "mysql8配置", link: "/backend/mysql/index" },
          ],
        },
      ],
    },

    //社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/sword-demon" },
      { icon: "discord", link: "https://chat.vitejs.dev/" },
    ],

    //页脚
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2019-2025 present 无解",
    },
  },
  vite: {
    plugins: [
      vitepressProtectPlugin({
        disableF12: true, // 禁用F12开发者模式
        // disableCopy: true, // 禁用文本复制
        // disableSelect: true, // 禁用文本选择
      }),
      MermaidPlugin(),
    ],
    optimizeDeps: {
      include: ["mermaid"],
    },
    ssr: {
      noExternal: ["mermaid"],
    },
  },
});
