<template>
    <div class="childMain">
        <a-form ref="weaponAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
            autocomplete="off" :hideRequiredMark="prop.type === 'detail'">
            <a-form-item label="武器名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="addData.name" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="武器类型" name="type" :rules="[{ required: true, message: '请选择类型!' }]">
                <a-select style="width: 100%;" v-model:value="addData.type" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in weaponTypeList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="星级" name="star" :rules="[{ required: true, message: '请选择星级!' }]">
                <a-select style="width: 100%;" v-model:value="addData.star" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in starList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="基础攻击" name="baseAttack" :rules="[{ required: true, message: '请输入基础攻击!' }]">
                <a-input v-model:value="addData.baseAttack" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="副词条" name="attribute">
                <a-input v-model:value="addData.attribute" :disabled="prop.type === 'detail'"></a-input>
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
import type { AddType, Type } from "@/utils/global";
import type { AddWeaponParams } from "@/api/yuanshen";

const prop = defineProps<{
    type: AddType
    addParams: AddWeaponParams
}>();
const weaponAdd = ref();
const addData = ref<AddWeaponParams>({
    name: "",
    type: undefined,
    star: undefined,
    baseAttack: "",
    attribute: "",
    introduce: "",
    remark: ""
});
if (prop.type === "edit" || prop.type === "detail") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}
const weaponTypeList = ref<Type[]>([{
    label: "单手剑",
    value: 1
}, {
    label: "双手剑",
    value: 2
}, {
    label: "弓",
    value: 3
}, {
    label: "长柄武器",
    value: 4
}, {
    label: "法器",
    value: 5
}]);
const starList = ref<Type[]>([{
    label: "五星",
    value: 5
}, {
    label: "四星",
    value: 4
}, {
    label: "三星",
    value: 3
}, {
    label: "二星",
    value: 2
}, {
    label: "一星",
    value: 1
}]);

async function getAddData() {
    try {
        await weaponAdd.value?.validate();
        const returnData: AddWeaponParams = {
            id: addData.value.id,
            name: addData.value.name,
            type: addData.value.type,
            star: addData.value.star,
            baseAttack: addData.value.baseAttack,
            attribute: addData.value.attribute,
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