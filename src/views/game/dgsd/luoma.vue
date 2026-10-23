<template>
    <UnitList title="罗马列表" :list="luomaList" />
</template>

<script lang="ts" setup>
import { luomaList } from "./dataAll/8luoma";
import UnitList from "./unitList.vue";
</script>
