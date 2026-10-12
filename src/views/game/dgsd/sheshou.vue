<template>
    <UnitList title="射手列表" :list="sheshouList" />
</template>

<script lang="ts" setup>
import { sheshouList } from "./dataAll/2sheshou";
import UnitList from "./unitList.vue";
</script>
