<template>
    <UnitList title="攻城武器" :list="gongchengList" />
</template>

<script lang="ts" setup>
import { gongchengList } from "./dataAll/4gongcheng";
import UnitList from "./unitList.vue";
</script>
