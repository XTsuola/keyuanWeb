<template>
    <div class="userAddBox">
        <a-form ref="userAdd" :model="addData" name="userAdd" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
            autocomplete="off">
            <a-form-item label="姓名" name="userName" :rules="[{ required: true, message: '请输入姓名!' }]">
                <a-input v-model:value="addData.userName" />
            </a-form-item>
            <a-form-item label="账号" name="account" :rules="[{ required: true, message: '请输入账号!' }]">
                <a-input v-model:value="addData.account" />
            </a-form-item>
            <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
                <a-input v-model:value="addData.password" />
            </a-form-item>
            <a-form-item label="年龄" name="age" :rules="[{ required: true, message: '请输入年龄!' }]">
                <a-input-number style="width: 100%;" v-model:value="addData.age" :precision="0" />
            </a-form-item>
            <a-form-item label="身份" name="level" :rules="[{ required: true, message: '请选择身份!' }]"
                v-if="addData.level !== 1">
                <a-select v-model:value="addData.level">
                    <a-select-option :value="2">管理员</a-select-option>
                    <a-select-option :value="3">普通成员</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="备注" name="remark">
                <a-textarea v-model:value="addData.remark" />
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { AddType } from "@/utils/global";
import type { AddUserType } from "@/api/examination";

const prop = defineProps<{
    flag: AddType
    addParams: AddUserType
}>();

const userAdd = ref();
const addData = ref<AddUserType>({
    userName: "",
    account: "",
    password: "",
    age: "",
    level: undefined,
    remark: ""
});

if (prop.flag === "edit") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}

async function getAddData() {
    try {
        await userAdd.value?.validate();
        return addData.value;
    } catch (error) {
        return false;
    }
}

defineExpose({
    getAddData
})

</script>

<style lang="less" scoped>
.userAddBox {
    margin-top: 20px;
}
</style>