<template>
    <div class="childMain">
        <a-form ref="memberAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
            autocomplete="off">
            <a-form-item label="成员名称" name="name" :rules="[{ required: true, message: '成员名称', trigger: 'blur' }]">
                <a-input v-model:value="addData.name" />
            </a-form-item>
            <a-form-item label="QQ账号">
                <a-input v-model:value="addData.qq" />
            </a-form-item>
            <a-form-item label="所属分组">
                <a-select v-model:value="addData.groupName" placeholder="请选择分组">
                    <a-select-option v-for="item in groupList" :key="item.groupId" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="擅长位置">
                <a-input v-model:value="addData.position" />
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-model:value="addData.remark" />
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { groupList, type AddType } from '@/utils/global';
import type { AddMemberParams } from "@/api/team";

const prop = defineProps<{
    type: AddType
    addParams: AddMemberParams
}>();
const memberAdd = ref();
const addData = ref<AddMemberParams>({
    name: "",
    qq: "",
    groupName: "",
    position: "",
    remark: ""
});
if (prop.type === "edit") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}

async function getAddData() {
    try {
        await memberAdd.value?.validate();
        return addData.value;
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