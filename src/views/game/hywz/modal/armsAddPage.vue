<template>
    <div class="childMain">
        <a-form ref="armsAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }" autocomplete="off"
            :hideRequiredMark="prop.type === 'detail'">
            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="addData.name" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="类型" name="type" :rules="[{ required: true, message: '请输入类型!' }]">
                <a-input v-model:value="addData.type" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="生命">
                <a-input v-model:value="addData.life" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="攻击">
                <a-input v-model:value="addData.att" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="魔力">
                <a-input v-model:value="addData.magic" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="技巧">
                <a-input v-model:value="addData.skill" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="速度">
                <a-input v-model:value="addData.speed" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="幸运">
                <a-input v-model:value="addData.xingyun" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="防御">
                <a-input v-model:value="addData.def" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="魔防">
                <a-input v-model:value="addData.mof" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="体格">
                <a-input v-model:value="addData.tige" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="技能">
                <a-textarea v-model:value="addData.talent" :disabled="prop.type === 'detail'"></a-textarea>
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
import type { AddArmsParams } from "@/api/hywz";

const prop = defineProps<{
    type: AddType
    addParams: AddArmsParams
}>();
const armsAdd = ref();
const addData = ref<AddArmsParams>({
    name: "",
    type: "",
    life: "",
    att: "",
    magic: "",
    skill: "",
    speed: "",
    xingyun: "",
    def: "",
    mof: "",
    tige: "",
    talent: "",
    remark: ""
});
if (prop.type === "edit" || prop.type === "detail") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}

async function getAddData() {
    try {
        await armsAdd.value?.validate()
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