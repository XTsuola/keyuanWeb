<template>
    <div class="childMain">
        <a-form ref="relicsAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
            autocomplete="off" :hideRequiredMark="prop.type === 'detail'">
            <a-form-item label="怪物名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="addData.name" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="类型" name="enemyType" :rules="[{ required: true, message: '请选择类型!' }]">
                <a-select style="width: 100%;" v-model:value="addData.enemyType" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in enemyTypeList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="介绍">
                <a-textarea style="height: 360px;" v-model:value="addData.info"
                    :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-model:value="addData.remark" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { AddEnemyParams, UpdateEnemyParams } from "@/api/yuanshen";
import type { AddParamsType } from "../enemyList.vue";

export interface API {
    getAddData: () => Promise<false | AddEnemyParams | UpdateEnemyParams>
}

export type AddType = "add" | "edit" | "detail";

export interface Type {
    label: string
    value: number | undefined
}

const prop = defineProps<{
    type: AddType
    addParams: AddParamsType
}>();
const relicsAdd = ref();
const addData = ref<AddParamsType>({
    name: "",
    enemyType: undefined,
    info: "",
    remark: ""
});
if (prop.type === "edit" || prop.type === "detail") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}

const enemyTypeList = ref<Type[]>([{
    label: "深渊",
    value: 1
}, {
    label: "元素生命",
    value: 2
}, {
    label: "丘丘人",
    value: 3
}, {
    label: "遗迹机关",
    value: 4
}, {
    label: "愚人众",
    value: 5
}, {
    label: "盗宝团",
    value: 6
}, {
    label: "镀金旅团",
    value: 7
}, {
    label: "武士",
    value: 8
}, {
    label: "龙武士",
    value: 9
}, {
    label: "部族勇士",
    value: 10
}, {
    label: "boos",
    value: 80
}, {
    label: "超级boos",
    value: 90
}, {
    label: "其他",
    value: 99
}]);

async function getAddData(): Promise<false | AddEnemyParams | UpdateEnemyParams> {
    try {
        await relicsAdd.value?.validate();
        const returnData: AddEnemyParams | UpdateEnemyParams = {
            _id: addData.value._id,
            id: addData.value.id,
            name: addData.value.name,
            enemyType: addData.value.enemyType,
            info: addData.value.info,
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