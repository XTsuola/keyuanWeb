<template>
    <div class="childMain">
        <a-form ref="heroAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }" autocomplete="off"
            :hideRequiredMark="prop.type === 'detail'">
            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="addData.name" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="稀有度" name="star" :rules="[{ required: true, message: '请选择稀有度!' }]">
                <a-select style="width: 100%;" v-model:value="addData.star" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in starList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="武器类别" name="weaponType" :rules="[{ required: true, message: '请选择武器类别!' }]">
                <a-select style="width: 100%;" v-model:value="addData.weaponType" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in weaponTypeList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="是否专属" name="isExclusive" :rules="[{ required: true, message: '请选阵营!' }]">
                <a-select style="width: 100%;" v-model:value="addData.isExclusive" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in isExclusiveList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="属性">
                <a-input v-model:value="addData.shuxing" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="技能">
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
import type { AddWeaponParams, UpdateWeaponParams } from "@/api/mhmnz";
import type { AddParamsType, Type } from "../weaponList.vue";

export interface API {
    getAddData: () => Promise<false | AddWeaponParams | UpdateWeaponParams>
}

export type AddType = "add" | "edit" | "detail";

const prop = defineProps<{
    type: AddType
    addParams: AddParamsType
}>();
const heroAdd = ref();
const addData = ref<AddParamsType>({
    name: "",
    star: undefined,
    weaponType: undefined,
    isExclusive: undefined,
    shuxing: "",
    introduce: "",
    remark: ""

});
if (prop.type === "edit" || prop.type === "detail") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}
const starList = ref<Type[]>([{
    label: "SSR",
    value: 4
}, {
    label: "SR",
    value: 3
}, {
    label: "R",
    value: 2
}, {
    label: "N",
    value: 1
}]);
const weaponTypeList = ref<Type[]>([{
    label: "武器",
    value: 1,
}, {
    label: "防具",
    value: 2,
}, {
    label: "头饰",
    value: 3,
}, {
    label: "饰品",
    value: 4,
}]);
const isExclusiveList = ref<Type[]>([{
    label: "是",
    value: 1,
}, {
    label: "否",
    value: 2,
}]);

async function getAddData(): Promise<false | AddWeaponParams | UpdateWeaponParams> {
    try {
        await heroAdd.value?.validate();
        const returnData: AddWeaponParams | UpdateWeaponParams = {
            _id: addData.value._id,
            id: addData.value.id,
            name: addData.value.name,
            star: addData.value.star,
            weaponType: addData.value.weaponType,
            isExclusive: addData.value.isExclusive,
            shuxing: addData.value.shuxing,
            introduce: addData.value.introduce,
            remark: addData.value.remark
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