/* configs/nav.ts */
import type { DefaultTheme } from "vitepress";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("vitepress/package.json");

export const nav: DefaultTheme.Config["nav"] = [
  { text: "首页", link: "/" },
  { text: "指南", link: "/guide/preface" },
  { text: "生活&日常", link: "/life/" },
  { text: "前端学习", link: "/front/" },
  { text: "后端学习", link: "/backend/" },
  {
    text: `VitePress ${pkg.version}`,
    link: "https://vitepress.dev/",
    noIcon: true,
  },
];
