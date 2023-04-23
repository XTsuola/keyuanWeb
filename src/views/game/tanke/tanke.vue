<template>
    <div class="tanke">
        <div></div>
        <div class="tanke_tou"></div>
        <div></div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.tanke {
    position: absolute;
    width: 90%;
    height: 90%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 2%;
    transform: translate(-50%, -50%);

    div {
        width: 20%;
        height: 20%;
        background: orange;
        transform: translateX(-50%);
    }

    .tanke_tou {
        transform: translateX(50%);
    }
}
</style>