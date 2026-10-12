<template>
    <UnitList title="步兵列表" :list="bubingList" />
</template>

<script lang="ts" setup>
import { bubingList } from "./dataAll/1bubing";
import UnitList from "./unitList.vue";
</script>
