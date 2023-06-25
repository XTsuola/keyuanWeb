<template>
    <div class="childMain">
        <a-form ref="heroAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }" autocomplete="off"
            :hideRequiredMark="prop.type === 'detail'">
            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="addData.name" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="性别" name="gender" :rules="[{ required: true, message: '请选择性别!' }]">
                <a-select style="width: 100%;" v-model:value="addData.gender" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in genderList" :key="item.value" :value="item.value">{{
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
            <a-form-item label="阵营" name="country" :rules="[{ required: true, message: '请选择阵营!' }]">
                <a-select style="width: 100%;" v-model:value="addData.country" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in countryList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="连携">
                <a-textarea v-model:value="addData.link" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="技能">
                <a-textarea v-model:value="addData.skill" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="专武">
                <a-input v-model:value="addData.weapon" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-model:value="addData.remark" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import type { AddHeroParams, UpdateHeroParams } from '@/api/yjz';
import { ref } from 'vue';
import type { AddParamsType, Type } from '../heroList.vue';

export interface API {
    getAddData: () => Promise<false | AddHeroParams | UpdateHeroParams>
}

export type AddType = "add" | "edit" | "detail"

const prop = defineProps<{
    type: AddType
    addParams: AddParamsType
}>()
const heroAdd = ref()
const addData = ref<AddParamsType>({
    name: "",
    gender: undefined,
    star: undefined,
    country: undefined,
    link: "",
    skill: "",
    weapon: "",
    remark: ""
})
if (prop.type === 'edit' || prop.type === 'detail') {
    addData.value = JSON.parse(JSON.stringify(prop.addParams))
}
const genderList = ref<Type[]>([{
    label: "男",
    value: 1
}, {
    label: "女",
    value: 2
}])
const starList = ref<Type[]>([{
    label: "红卡",
    value: 1
}, {
    label: "橙卡",
    value: 2
}, {
    label: "紫卡",
    value: 3
}, {
    label: "蓝卡",
    value: 4
}])
const countryList = ref<Type[]>([{
    label: "蜀国",
    value: 1
}, {
    label: "魏国",
    value: 2
}, {
    label: "吴国",
    value: 3
}, {
    label: "群雄",
    value: 4
}])

async function getAddData(): Promise<false | AddHeroParams | UpdateHeroParams> {
    try {
        await heroAdd.value?.validate()
        const returnData: AddHeroParams | UpdateHeroParams = {
            _id: addData.value._id,
            id: addData.value.id,
            name: addData.value.name,
            gender: addData.value.gender,
            star: addData.value.star,
            country: addData.value.country,
            link: addData.value.link,
            skill: addData.value.skill,
            weapon: addData.value.weapon,
            remark: addData.value.remark,
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