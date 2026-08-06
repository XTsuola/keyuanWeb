<template>
    <div class="cook-form">
        <a-form
            ref="cookAdd"
            :model="addData"
            name="cook-add"
            :label-col="{ span: 4 }"
            autocomplete="off"
        >
            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="addData.name" :disabled="isDetail" />
            </a-form-item>
            <a-form-item label="类型" name="cookType" :rules="[{ required: true, message: '请选择类型!' }]">
                <a-select v-model:value="addData.cookType" style="width: 100%" :disabled="isDetail">
                    <a-select-option v-for="item in cookTypeList" :key="item.value" :value="item.value">
                        {{ item.label }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="荤素" name="hunsu" :rules="[{ required: true, message: '请选择荤素!' }]">
                <a-select v-model:value="addData.hunsu" style="width: 100%" :disabled="isDetail">
                    <a-select-option v-for="item in hunsuList" :key="item.value" :value="item.value">
                        {{ item.label }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="熟练度" name="mastery" :rules="[{ required: true, message: '请选择熟练度!' }]">
                <a-select v-model:value="addData.mastery" style="width: 100%" :disabled="isDetail">
                    <a-select-option v-for="item in masteryList" :key="item.value" :value="item.value">
                        {{ item.label }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="次数" name="count" :rules="[{ required: true, message: '请输入次数!' }]">
                <a-input v-model:value="addData.count" :disabled="isDetail" />
            </a-form-item>
            <a-form-item label="食材">
                <a-textarea v-model:value="addData.foodMaterials" :disabled="isDetail" />
            </a-form-item>
            <a-form-item label="做法">
                <a-textarea v-model:value="addData.practice" :rows="5" :disabled="isDetail" />
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-model:value="addData.remark" :disabled="isDetail" />
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import type { AddType, Type } from "@/utils/global";
import type { AddCookParams } from "@/api/myLove";

const props = defineProps<{
    type: AddType;
    addParams: AddCookParams;
}>();

const cookAdd = ref();
const isDetail = computed(() => props.type === "detail");
const addData = ref<AddCookParams>({
    name: "",
    cookType: undefined,
    hunsu: undefined,
    mastery: undefined,
    foodMaterials: "",
    practice: "",
    count: "",
    remark: "",
});

const cookTypeList: Type[] = [
    { label: "烧菜", value: 1 },
    { label: "炒菜", value: 2 },
    { label: "油炸", value: 3 },
    { label: "煲汤", value: 4 },
    { label: "蒸菜", value: 5 },
    { label: "主食", value: 6 },
    { label: "其他", value: 7 },
];
const hunsuList: Type[] = [
    { label: "荤菜", value: 1 },
    { label: "素菜", value: 2 },
    { label: "其他", value: 3 },
];
const masteryList: Type[] = [
    { label: "未学", value: 1 },
    { label: "入门", value: 2 },
    { label: "熟练", value: 3 },
    { label: "精通", value: 4 },
];

watch(
    () => props.addParams,
    (val) => {
        if (props.type === "edit" || props.type === "detail") {
            addData.value = structuredClone(val);
        }
    },
    { immediate: true, deep: true }
);

async function getAddData() {
    try {
        await cookAdd.value?.validate();
        return addData.value;
    } catch {
        return false;
    }
}

defineExpose({ getAddData });
</script>

<style lang="less" scoped>
.cook-form {
    width: 100%;
}
</style>
