<template>
    <a-form ref="formRef" :model="form" :label-col="{ span: 5 }" autocomplete="off">
        <a-form-item label="成员名称" name="name" :rules="[{ required: true, message: '请输入成员名称' }]">
            <a-input v-model:value="form.name" placeholder="请输入成员名称" allow-clear />
        </a-form-item>
        <a-form-item label="QQ账号">
            <a-input v-model:value="form.qq" placeholder="请输入QQ账号" allow-clear />
        </a-form-item>
        <a-form-item label="所属分组">
            <a-select v-model:value="form.groupName" placeholder="请选择分组" allow-clear>
                <a-select-option v-for="item in groupList" :key="String(item.value)" :value="item.value">
                    {{ item.label }}
                </a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="擅长位置">
            <a-input v-model:value="form.position" placeholder="请输入擅长位置" allow-clear />
        </a-form-item>
        <a-form-item label="备注">
            <a-textarea v-model:value="form.remark" :rows="3" placeholder="可选备注" />
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { FormInstance } from "ant-design-vue";
import { groupList, type AddType } from "@/utils/global";
import type { AddMemberParams } from "@/api/team";

const props = defineProps<{
    type: AddType;
    addParams: AddMemberParams;
}>();

const formRef = ref<FormInstance>();
const form = ref<AddMemberParams>({
    id: undefined,
    name: "",
    qq: "",
    groupName: "",
    position: "",
    remark: "",
});

if (props.type === "edit") {
    form.value = structuredClone(props.addParams);
}

async function getAddData() {
    try {
        await formRef.value?.validate();
        return form.value;
    } catch {
        return false;
    }
}

defineExpose({ getAddData });
</script>
