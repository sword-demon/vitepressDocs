<script lang="ts" setup>
import { useData } from "vitepress";
import { nextTick, provide } from "vue";
import DefaultTheme from "vitepress/theme";
import MouseClick from "./MouseClick.vue";
import MouseFollower from "./MouseFollower.vue";
import tags from "./tags.vue";
import backtotop from "./backtotop.vue";
// import notice from "./notice.vue";

const { isDark } = useData();

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    }
  );
});
</script>
<template>
  <DefaultTheme.Layout v-bind="$attrs">
    <!-- doc-before插槽 -->
    <template #doc-before>
      <tags />
    </template>

    <template #layout-top>
      <!-- <notice /> -->
      <MouseFollower />
      <MouseClick />
    </template>

    <!-- doc-footer-before插槽 -->
    <template #doc-footer-before>
      <backtotop />
    </template>
  </DefaultTheme.Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance .check {
  transform: none !important;
}

/* 修正因视图过渡导致的月牙图标偏移 */
.VPSwitchAppearance .check .icon {
  top: -2px;
}
</style>
