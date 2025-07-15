<template>
    <div class="childMain">
        <a-form ref="heroAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
            autocomplete="off" :hideRequiredMark="prop.type === 'detail'">
            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="addData.name" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="称号" name="title" :rules="[{ required: true, message: '请输入称号!' }]">
                <a-input v-model:value="addData.title" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="主属性" name="mainShuxing" :rules="[{ required: true, message: '请输入主属性!' }]">
                <a-input v-model:value="addData.mainShuxing" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="副属性">
                <a-input v-model:value="addData.otherShuxing" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="神器">
                <a-input v-model:value="addData.weapon" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="功法">
                <a-textarea v-model:value="addData.gongfa" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="介绍">
                <a-textarea v-model:value="addData.introduce" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-model:value="addData.remark" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { AddType } from "@/utils/global";
import type { AddHeroParams, UpdateHeroParams } from "@/api/xingta";
import type { AddParamsType } from "../heroList.vue";

export interface API {
    getAddData: () => Promise<false | AddHeroParams | UpdateHeroParams>
}

const prop = defineProps<{
    type: AddType
    addParams: AddParamsType
}>();
const heroAdd = ref();;
const addData = ref<AddParamsType>({
    name: "",
    title: "",
    mainShuxing: "",
    otherShuxing: "",
    weapon: "",
    gongfa: "",
    introduce: "",
    remark: ""
});
if (prop.type === "edit" || prop.type === "detail") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}

async function getAddData(): Promise<false | AddHeroParams | UpdateHeroParams> {
    try {
        await heroAdd.value?.validate();
        const returnData: AddHeroParams | UpdateHeroParams = {
            id: addData.value.id,
            name: addData.value.name,
            title: addData.value.title,
            mainShuxing: addData.value.mainShuxing,
            otherShuxing: addData.value.otherShuxing,
            weapon: addData.value.weapon,
            gongfa: addData.value.gongfa,
            introduce: addData.value.introduce,
            remark: addData.value.remark,
        };
        return returnData;
    } catch (_) {
        return false;
    }
}

defineExpose({
    getAddData
})

</script>

<style lang="less" scoped>
.childMain {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    row-gap: 15px;
}
</style>