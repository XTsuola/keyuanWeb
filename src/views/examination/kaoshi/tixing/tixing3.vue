<!-- 填空题 -->
<template>
    <div class="type">填空题（分值：{{ prop.obj.score }}）</div>
    <div class="main">
        <div class="title">
            {{ prop.obj.index }}、
            <div class="stem">
                <div>{{ prop.obj.stem.split('_')[0] }}</div>
                <div>
                    <a-input class="input" v-model:value="prop.obj.answer" type="text" placeholder="" />
                </div>
                <div>{{ prop.obj.stem.split('_')[1] }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Test3 } from "./tixing";

const prop = defineProps<{
    obj: Test3
}>();

</script>

<style lang="less" scoped>
.type {
    color: darkgreen;
}

.main {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    div {
        width: 100%;
    }

    .title {
        display: flex;
        justify-content: flex-start;

        .stem {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;

            .input {
                width: 100px;
            }
        }
    }
}
</style>