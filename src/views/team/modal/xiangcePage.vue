<template>
    <div @click="change(1)">
        <slot name="slotHeader"></slot>
    </div>
    <div>我是{{ name2 }}</div>
    <div @click="change(2)">
        <slot name="slotBottom"></slot>
    </div>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";

let name: any = inject("name");
const name2 = ref<string>();
name2.value = name.value;

function change(value: number) {
    switch (value) {
        case 1:
            name2.value = "超人";
            break
        case 2:
            name2.value = name.value;
    }
}

</script>

<style lang="less" scoped></style>