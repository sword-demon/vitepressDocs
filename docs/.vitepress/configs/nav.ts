/* configs/nav.ts */
import type { DefaultTheme } from "vitepress";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("vitepress/package.json");

export const nav: DefaultTheme.Config["nav"] = [
  { text: "首页", link: "/" },
  {
    text: "🍉文档笔记",
    items: [
      {
        text: "介绍",
        items: [{ text: "前言", link: "preface" }],
      },
      {
        text: "C 语言学习",
        items: [{ text: "环境搭建", link: "/c/env" }],
      },
    ],
  },
  {
    text: `VitePress ${pkg.version}`,
    link: "https://vitepress.dev/",
    noIcon: true,
  },
];
