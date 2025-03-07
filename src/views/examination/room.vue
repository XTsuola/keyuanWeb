<template>
    <div style="display:flex;height:100%;">
        <Kaoshi :paperId="paperId"></Kaoshi>
    </div>
</template>

<script lang="ts" setup>
import Kaoshi from "./kaoshi/kaoshi.vue";

let infoObj: any = null;
let paperId: number = 0;
if (localStorage.getItem("infoObj")) {
    infoObj = JSON.parse(localStorage.getItem("infoObj") as string);
}
if (infoObj.paperId) {
    paperId = parseInt(infoObj.paperId as string);
}
</script>

<style lang="less" scoped></style>