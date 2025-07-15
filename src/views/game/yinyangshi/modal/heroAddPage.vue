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
            <a-form-item label="类别" name="star" :rules="[{ required: true, message: '请选择类别!' }]">
                <a-select style="width: 100%;" v-model:value="addData.star" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in starList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="攻击">
                <a-input v-model:value="addData.gj" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="生命">
                <a-input v-model:value="addData.sm" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="防御">
                <a-input v-model:value="addData.fy" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="速度">
                <a-input v-model:value="addData.sd" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="暴击">
                <a-input v-model:value="addData.bj" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="暴击伤害">
                <a-input v-model:value="addData.bs" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="效果命中">
                <a-input v-model:value="addData.mz" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="效果抵抗">
                <a-input v-model:value="addData.dk" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea style="height: 100px;" v-model:value="addData.remark"
                    :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { AddHeroParams, UpdateHeroParams } from "@/api/yys";
import type { AddParamsType } from "../heroList.vue";
import type { AddType, Type } from "@/utils/global";

export interface API {
    getAddData: () => Promise<false | AddHeroParams | UpdateHeroParams>
}

const prop = defineProps<{
    type: AddType
    addParams: AddParamsType
}>();
const heroAdd = ref();
const addData = ref<AddParamsType>({
    name: "",
    gender: undefined,
    star: undefined,
    gj: "",
    sm: "",
    fy: "",
    sd: "",
    bj: "",
    bs: "",
    mz: "",
    dk: "",
    remark: ""
});
if (prop.type === "edit" || prop.type === "detail") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}
const genderList = ref<Type[]>([{
    label: "男",
    value: 1
}, {
    label: "女",
    value: 2
}]);
const starList = ref<Type[]>([{
    label: "SP",
    value: 1
}, {
    label: "SSR",
    value: 2
}, {
    label: "SR",
    value: 3
}, {
    label: "R",
    value: 4
}, {
    label: "N",
    value: 5
}, {
    label: "呱太",
    value: 6
}, {
    label: "联动",
    value: 7
}]);

async function getAddData(): Promise<false | AddHeroParams | UpdateHeroParams> {
    try {
        await heroAdd.value?.validate();
        const returnData: AddHeroParams | UpdateHeroParams = {
            _id: addData.value._id,
            id: addData.value.id,
            name: addData.value.name,
            gender: addData.value.gender,
            gj: addData.value.gj,
            sm: addData.value.sm,
            fy: addData.value.fy,
            sd: addData.value.sd,
            bj: addData.value.bj,
            bs: addData.value.bs,
            mz: addData.value.mz,
            dk: addData.value.dk,
            star: addData.value.star,
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