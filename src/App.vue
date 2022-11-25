<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ConfigProvider as aConfigProvider } from "ant-design-vue"
import zhCN from 'ant-design-vue/es/locale/zh_CN';

</script>

<style>
@import "@/assets/base.css";
</style>
