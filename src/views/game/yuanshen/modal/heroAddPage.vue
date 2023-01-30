<template>
    <div class="childMain">
        <a-form ref="heroAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
            autocomplete="off" :hideRequiredMark="prop.type === 'detail'">
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
            <a-form-item label="所属国家" name="country" :rules="[{ required: true, message: '请选择国家!' }]">
                <a-select style="width: 100%;" v-model:value="addData.country" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in countryList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="武器类型" name="arms" :rules="[{ required: true, message: '请选择武器类型!' }]">
                <a-select style="width: 100%;" v-model:value="addData.arms" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in armsList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="属性" name="shuxing" :rules="[{ required: true, message: '请选择属性!' }]">
                <a-select style="width: 100%;" v-model:value="addData.shuxing" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in shuxingList" :key="item.value" :value="item.value">{{
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
            <a-form-item label="命之座">
                <a-input v-model:value="addData.lifeSeat" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="介绍">
                <a-textarea style="min-height: 180px;" v-model:value="addData.introduce"
                    :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-model:value="addData.remark" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import type { AddHeroParams, UpdateHeroParams } from '@/api/yuanshen';
import { Input as aInput, Select as aSelect, Textarea as aTextarea, type FormInstance, Form as aForm, FormItem as aFormItem, SelectOption as aSelectOption } from 'ant-design-vue'
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
const heroAdd = ref<FormInstance>()
const addData = ref<AddParamsType>({
    name: "",
    gender: undefined,
    country: undefined,
    arms: undefined,
    shuxing: undefined,
    lifeSeat: "",
    star: undefined,
    introduce: "",
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
const countryList = ref<Type[]>([{
    label: "蒙德",
    value: 1
}, {
    label: "璃月",
    value: 2
}, {
    label: "稻妻",
    value: 3
}, {
    label: "须弥",
    value: 4
}, {
    label: "枫丹",
    value: 5
}, {
    label: "穆娜塔",
    value: 6
}, {
    label: "至冬",
    value: 7
}, {
    label: "异世界",
    value: 8
}])
const armsList = ref<Type[]>([{
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
}])
const shuxingList = ref<Type[]>([{
    label: "风",
    value: 1
}, {
    label: "岩",
    value: 2
}, {
    label: "雷",
    value: 3
}, {
    label: "草",
    value: 4
}, {
    label: "水",
    value: 5
}, {
    label: "火",
    value: 6
}, {
    label: "冰",
    value: 7
}])
const starList = ref<Type[]>([{
    label: "五星",
    value: 1
}, {
    label: "四星",
    value: 2
}])

async function getAddData(): Promise<false | AddHeroParams | UpdateHeroParams> {
    try {
        await heroAdd.value?.validate()
        const returnData: AddHeroParams | UpdateHeroParams = {
            _id: addData.value._id,
            id: addData.value.id,
            name: addData.value.name,
            gender: addData.value.gender,
            country: addData.value.country,
            arms: addData.value.arms,
            shuxing: addData.value.shuxing,
            lifeSeat: addData.value.lifeSeat,
            star: addData.value.star,
            introduce: addData.value.introduce,
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