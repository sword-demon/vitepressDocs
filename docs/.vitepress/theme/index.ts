/* .vitepress/theme/index.ts */
import DefaultTheme from "vitepress/theme";
import Linkcard from "./components/Linkcard.vue";
import HomeUnderline from "./components/HomeUnderline.vue";
import MouseClick from "./components/MouseClick.vue";
import MouseFollower from "./components/MouseFollower.vue";
import ArticleMetadata from "./components/ArticleMetadata.vue";
import MyLayout from "./components/MyLayout.vue";
import "./style/index.css";
// 只需添加以下一行代码，引入时间线样式
import "vitepress-markdown-timeline/dist/theme/index.css";
import mediumZoom from "medium-zoom";
import { onMounted, watch, nextTick } from "vue";
import { useRoute } from "vitepress";
import { NProgress } from "nprogress-v2/dist/index.js"; // 进度条组件
import "nprogress-v2/dist/index.css"; // 进度条样式
import { inBrowser } from "vitepress";

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
  // ...DefaultTheme, //或者这样写也可
  enhanceApp({ app, router }) {
    app.component("Linkcard", Linkcard);
    app.component("HomeUnderline", HomeUnderline);
    app.component("MouseClick", MouseClick);
    app.component("MouseFollower", MouseFollower);
    app.component("ArticleMetadata", ArticleMetadata);

    if (inBrowser) {
      NProgress.configure({ showSpinner: false });
      router.onBeforeRouteChange = () => {
        NProgress.start(); // 开始进度条
      };
      router.onAfterRouteChange = () => {
        NProgress.done(); // 停止进度条
      };
    }
  },
  Layout: MyLayout,
};
