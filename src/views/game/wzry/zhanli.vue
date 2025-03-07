<template>
    <div class="main">
        <div class="title">战力计算</div>
        <div class="sx"><span>英雄基础分：</span><a-input v-model:value="obj.jc" /></div>
        <div class="sx"><span>排位表现分：</span><a-input v-model:value="obj.pw" /></div>
        <div class="sx"><span>巅峰表现分：</span><a-input v-model:value="obj.df" /></div>
        <div class="sx"><span>巅峰赛分数：</span><a-input v-model:value="obj.fs" /></div>
        <div class="sx"><span>巅峰赛系数：</span><a-input v-model:value="obj.xs" readonly /></div>
        <div class="sx"><span>英雄总分数：</span><a-input v-model:value="obj.zf" readonly /></div>
        <div class="btn"><a-button @click="js(obj)">点击计算</a-button></div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { message } from "ant-design-vue";

interface ObjType {
    jc: string
    pw: string
    df: string
    fs: string
    xs: string
    zf: string
}

const obj = reactive<ObjType>({
    jc: "",
    pw: "",
    df: "",
    fs: "",
    xs: "",
    zf: ""
});

function js(obj: ObjType) {
    let str = "";
    if (obj.jc === "" || obj.pw === "" || obj.df === "" || obj.fs === "") {
        str = "数据不能为空";
    }
    if (str) {
        message.error(str);
        return false;
    }
    const n = parseInt(obj.jc) + parseInt(obj.pw) + parseInt(obj.df);
    const xs = (1 + (parseInt(((parseInt(obj.fs) - 1200) / 20 + "")) / 100));
    const zf = parseInt(n * xs + "");
    obj.xs = xs + "";
    obj.zf = zf + "";
}

</script>

<style lang="less" scoped>
.main {
    width: 20%;
    margin: 100px 20%;

    .title {
        font-size: 20px;
        text-align: center;
        font-weight: 600;
    }

    .sx {
        display: flex;
        justify-content: flex-start;

        span {
            width: 160px;
        }

        margin-top: 20px;
    }

    .btn {
        margin-top: 20px;
    }
}
</style>