<template>
    <UnitList title="骑兵列表" :list="qibingList" />
</template>

<script lang="ts" setup>
import { qibingList } from "./dataAll/3qibing";
import UnitList from "./unitList.vue";
</script>
