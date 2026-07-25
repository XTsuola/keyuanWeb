<template>
    <div class="childMain">
        <a-form ref="weaponAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 3 }"
            autocomplete="off" :hideRequiredMark="prop.type === 'detail'">
            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入英雄名称!' }]">
                <a-input v-model:value="addData.name" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="星级" name="star" :rules="[{ required: true, message: '请选择英雄星级!' }]">
                <a-select v-model:value="addData.star" :disabled="prop.type === 'detail'">
                    <a-select-option :value="5">五星</a-select-option>
                    <a-select-option :value="4">四星</a-select-option>
                    <a-select-option :value="3">三星</a-select-option>
                    <a-select-option :value="2">二星</a-select-option>
                    <a-select-option :value="1">一星</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="类型" name="weaponType" :rules="[{ required: true, message: '请输选择武器类型!' }]">
                <a-select v-model:value="addData.weaponType" :disabled="prop.type === 'detail'">
                    <a-select-option value="单手剑">单手剑</a-select-option>
                    <a-select-option value="双手剑">双手剑</a-select-option>
                    <a-select-option value="弓">弓</a-select-option>
                    <a-select-option value="长柄武器">长柄武器</a-select-option>
                    <a-select-option value="法器">法器</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="攻击" name="attack" :rules="[{ required: true, message: '请输入武器攻击!' }]">
                <a-input v-model:value="addData.attack" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="加成" name="buff" :rules="[{ required: true, message: '请输入武器加成!' }]">
                <a-input v-model:value="addData.buff" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="标签">
                <a-checkbox-group v-model:value="addData.tag" name="checkboxgroup" :options="tabList"
                    :disabled="prop.type === 'detail'" />
            </a-form-item>
            <a-form-item label="技能" name="info" :rules="[{ required: true, message: '请输入技能!' }]">
                <a-textarea style="height: 100px;" v-model:value="addData.info"
                    :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-model:value="addData.remark" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { AddType } from "@/utils/global";
import { tabList } from "../func";
import type { AddWeaponParams } from "@/api/yuanshen";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const prop = defineProps<{
    type: AddType
    addParams: AddWeaponParams
}>();

const weaponAdd = ref();
const addData = ref<AddWeaponParams>({
    name: "",
    star: undefined,
    weaponType: undefined,
    attack: "",
    buff: "",
    tag: [],
    info: "",
    remark: ""
});
if (prop.type === "edit" || prop.type === "detail") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}

async function getAddData() {
    try {
        await weaponAdd.value?.validate()
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