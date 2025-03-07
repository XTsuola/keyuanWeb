<template>
    <div class="main">
        <a-card v-for="item in peopleList" :key="item" class="cardBox" hoverable>
            <template #title>
                <span style="font-size: 20px;font-weight: 600;">{{ item.name }}</span>
            </template>
            <template #extra>
                <img style="width: 26px;height: 26px;" :src="item.icon" />
            </template>
            <div>
                <p>QQ：{{ item.qq }}</p>
                <div class="qianming">
                    <p style="width: 70px;">个性签名：</p>
                    <P style="flex: 1">{{ item.motto }}</P>
                </div>

            </div>
        </a-card>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

interface PeopleType {
    name: string
    qq: string
    motto: string
    icon: any
}

const peopleList = ref<PeopleType[]>([{
    name: "天罗星-月色",
    qq: "2049434978",
    motto: "逆风的方向更适合飞翔",
    icon: new URL("../../assets/images/manage/moon.png", import.meta.url)
}, {
    name: "逍遥星-江南",
    qq: "2604369384",
    motto: "热爱是一种永恒的可能",
    icon: new URL("../../assets/images/manage/sakura.png", import.meta.url)
}, {
    name: "北冥星-黄果树",
    qq: "1782424540",
    motto: "你要努力，你想要的要自己给自己",
    icon: new URL("../../assets/images/manage/smile.png", import.meta.url)
}, {
    name: "南灵星-鹿鸣",
    qq: "2467118140",
    motto: "无论你在这个世界上的什么地方，我都一定会再去见你",
    icon: new URL("../../assets/images/manage/lu.png", import.meta.url)
}]);

</script>
<style lang="less" scoped>
.main {
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    display: flex;
    justify-content: flex-start;
    column-gap: 20px;
    row-gap: 15px;
    padding: 30px;
    flex-wrap: wrap;

    .cardBox {
        position: relative;
        background-color: aliceblue;
        width: 300px;
        height: 200px;
    }

    .cardBox::before {
        pointer-events: none;
        top: 0;
        left: 0;
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        border: 4px solid aliceblue;
        animation: bgc 1s forwards infinite linear;
    }
}

@keyframes bgc {
    0% {
        border-image: linear-gradient(330deg, red, blue, blue) 1;
    }

    25% {
        border-image: linear-gradient(240deg, blue, blue, red) 1;
    }

    50% {
        border-image: linear-gradient(150deg, red, blue, blue) 1;
    }

    75% {
        border-image: linear-gradient(60deg, blue, blue, red) 1;
    }

    100% {
        border-image: linear-gradient(-30deg, red, blue, blue) 1;
    }
}

.qianming {
    display: flex;
    justify-content: flex-start;
}
</style>