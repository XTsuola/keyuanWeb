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
            <a-form-item label="定位" name="position" :rules="[{ required: true, message: '请选定位!' }]">
                <a-select style="width: 100%;" mode="multiple" v-model:value="addData.position"
                    :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in positionList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="皮肤">
                <a-textarea style="height: 200px;" v-model:value="addData.skin" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-model:value="addData.remark" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { AddHeroParams, UpdateHeroParams } from "@/api/wzry";
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
    position: [],
    skin: "",
    remark: ""
});
if (prop.type === "edit" || prop.type === "detail") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}
const genderList = ref<Type[]>([{
    label: "男",
    value: 1,
}, {
    label: "女",
    value: 2,
}]);
const positionList = ref<Type[]>([{
    label: "战士",
    value: 1,
}, {
    label: "坦克",
    value: 2,
}, {
    label: "刺客",
    value: 3,
}, {
    label: "法师",
    value: 4,
}, {
    label: "射手",
    value: 5,
}, {
    label: "辅助",
    value: 6,
}]);

async function getAddData(): Promise<false | AddHeroParams | UpdateHeroParams> {
    try {
        await heroAdd.value?.validate();
        const returnData: AddHeroParams | UpdateHeroParams = {
            _id: addData.value._id,
            id: addData.value.id,
            name: addData.value.name,
            gender: addData.value.gender,
            position: addData.value.position,
            skin: addData.value.skin,
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