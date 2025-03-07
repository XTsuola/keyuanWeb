<template>
    <img :src="resultObj.url" />
</template>

<script lang="ts" setup>
import { ref } from "vue";

let resultObj = ref<any>(null);
if (localStorage.getItem("imgObj")) {
    resultObj.value = JSON.parse(localStorage.getItem("imgObj") as string);
}

</script>

<style lang="less" scoped>

</style>