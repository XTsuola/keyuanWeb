<template>
    <UnitList title="舰船列表" :list="jianchuanList" />
</template>

<script lang="ts" setup>
import { jianchuanList } from "./dataAll/5jianchuan";
import UnitList from "./unitList.vue";
</script>
