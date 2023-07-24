<template>
  <a-config-provider :locale="zhCN">
    <RouterView class="routerView" />
  </a-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import zhCN from 'ant-design-vue/es/locale/zh_CN'

</script>

<style>
@import "@/assets/base.css";

.routerView {
  font-family: 'hwhm';
}
</style>
