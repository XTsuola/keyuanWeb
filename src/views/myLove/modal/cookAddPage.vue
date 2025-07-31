<template>
    <div class="childMain">
        <a-form ref="relicsAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
            autocomplete="off">
            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="addData.name" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="类型" name="cookType" :rules="[{ required: true, message: '请选择类型!' }]">
                <a-select ref="select" style="width: 100%;" v-model:value="addData.cookType"
                    :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in cookTypeList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="荤素" name="hunsu" :rules="[{ required: true, message: '请选择荤素!' }]">
                <a-select ref="select" style="width: 100%;" v-model:value="addData.hunsu"
                    :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in hunsuList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="熟练度" name="mastery" :rules="[{ required: true, message: '请选择熟练度!' }]">
                <a-select ref="select" style="width: 100%;" v-model:value="addData.mastery"
                    :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in masteryList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="次数" name="count" :rules="[{ required: true, message: '请输入次数!' }]">
                <a-input v-model:value="addData.count" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="食材">
                <a-textarea v-model:value="addData.foodMaterials" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="做法">
                <a-textarea style="min-height: 140px;" v-model:value="addData.practice"
                    :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-model:value="addData.remark" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import type { AddCookParams } from "@/api/myLove"
import type { AddType, Type } from "@/utils/global";
import { ref } from "vue"

const prop = defineProps<{
    type: AddType
    addParams: AddCookParams
}>()
const relicsAdd = ref()
const addData = ref<AddCookParams>({
    name: "",
    cookType: undefined,
    hunsu: undefined,
    mastery: undefined,
    foodMaterials: "",
    practice: "",
    count: "",
    remark: ""
})
if (prop.type === "edit" || prop.type === "detail") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams))
}
const cookTypeList = ref<Type[]>([{
    label: "烧菜",
    value: 1
}, {
    label: "炒菜",
    value: 2
}, {
    label: "油炸",
    value: 3
}, {
    label: "煲汤",
    value: 4
}, {
    label: "蒸菜",
    value: 5
}, {
    label: "主食",
    value: 6
}, {
    label: "其他",
    value: 7
}])
const hunsuList = ref<Type[]>([{
    label: "荤菜",
    value: 1
}, {
    label: "素菜",
    value: 2
}, {
    label: "其他",
    value: 3
}])
const masteryList = ref<Type[]>([{
    label: "未学",
    value: 1
}, {
    label: "入门",
    value: 2
}, {
    label: "熟练",
    value: 3
}, {
    label: "精通",
    value: 4
}])

async function getAddData() {
    try {
        await relicsAdd.value?.validate()
        const returnData: AddCookParams = {
            id: addData.value.id,
            name: addData.value.name,
            cookType: addData.value.cookType,
            hunsu: addData.value.hunsu,
            mastery: addData.value.mastery,
            foodMaterials: addData.value.foodMaterials,
            practice: addData.value.practice,
            count: addData.value.count,
            remark: addData.value.remark
        }
        return returnData
    } catch (_) {
        return false
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