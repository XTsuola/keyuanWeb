<template>
    <UnitList title="其他列表" :list="qitaList" />
</template>

<script lang="ts" setup>
import { qitaList } from "./dataAll/6qita";
import UnitList from "./unitList.vue";
</script>
