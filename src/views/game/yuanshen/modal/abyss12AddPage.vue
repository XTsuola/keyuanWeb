<template>
    <div class="childMain">
        <a-form ref="relicsAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
            autocomplete="off" :hideRequiredMark="prop.type === 'detail'">
            <a-form-item label="深渊版本" name="version" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="addData.version" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="第一间上半">
                <a-textarea v-model:value="addData.firstUpper" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="第一间下半">
                <a-textarea v-model:value="addData.firstLower" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="第二间上半">
                <a-textarea v-model:value="addData.secondUpper" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="第二间下半">
                <a-textarea v-model:value="addData.secondLower" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="第三间上半">
                <a-textarea v-model:value="addData.thirdUpper" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="第三间下半">
                <a-textarea v-model:value="addData.thirdLower" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-model:value="addData.remark" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { AddAbyss12Params, UpdateAbyss12Params } from "@/api/yuanshen";
import type { AddParamsType } from "../abyss12.vue";

export interface API {
    getAddData: () => Promise<false | AddAbyss12Params | UpdateAbyss12Params>
}

export type AddType = "add" | "edit" | "detail";

const prop = defineProps<{
    type: AddType
    addParams: AddParamsType
}>();
const relicsAdd = ref();
const addData = ref<AddParamsType>({
    version: "",
    firstUpper: "",
    firstLower: "",
    secondUpper: "",
    secondLower: "",
    thirdUpper: "",
    thirdLower: "",
    remark: ""
});
if (prop.type === "edit" || prop.type === "detail") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}

async function getAddData(): Promise<false | AddAbyss12Params | UpdateAbyss12Params> {
    try {
        await relicsAdd.value?.validate();
        const returnData: AddAbyss12Params | UpdateAbyss12Params = {
            _id: addData.value._id,
            id: addData.value.id,
            version: addData.value.version,
            firstUpper: addData.value.firstUpper,
            firstLower: addData.value.firstLower,
            secondUpper: addData.value.secondUpper,
            secondLower: addData.value.secondLower,
            thirdUpper: addData.value.thirdUpper,
            thirdLower: addData.value.thirdLower,
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