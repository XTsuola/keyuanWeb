<template>
    <div class="enemy-tank" aria-hidden="true">
        <div></div>
        <div class="barrel"></div>
        <div></div>
    </div>
</template>

<style lang="less" scoped>
.enemy-tank {
    position: absolute;
    inset: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2%;
    background: #fff;
    border-radius: 2px;

    div {
        width: 20%;
        height: 20%;
        background: #fa8c16;
        transform: translateX(-50%);
    }

    .barrel {
        transform: translateX(50%);
    }
}
</style>
