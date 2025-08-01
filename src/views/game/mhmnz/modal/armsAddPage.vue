<template>
    <div class="childMain">
        <a-form ref="armsAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }" autocomplete="off"
            :hideRequiredMark="prop.type === 'detail'">
            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="addData.name" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="类型" name="type" :rules="[{ required: true, message: '请选择类型!' }]">
                <a-select style="width: 100%;" v-model:value="addData.type" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in typeList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="生命">
                <a-input v-model:value="addData.life" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="攻击">
                <a-input v-model:value="addData.att" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="防御">
                <a-input v-model:value="addData.def" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="魔防">
                <a-input v-model:value="addData.mof" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="技能">
                <a-textarea style="min-height: 80px;" v-model:value="addData.talent" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="皮肤">
                <a-textarea v-model:value="addData.skin" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-model:value="addData.remark" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { AddType, Type } from "@/utils/global";
import type { AddArmsParams } from "@/api/mhmnz";

const prop = defineProps<{
    type: AddType
    addParams: AddArmsParams
}>();
const armsAdd = ref();
const addData = ref<AddArmsParams>({
    name: "",
    type: undefined,
    life: "",
    att: "",
    def: "",
    mof: "",
    talent: "",
    skin: "",
    remark: ""
});
if (prop.type === "edit" || prop.type === "detail") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}
const typeList = ref<Type[]>([{
    label: "步兵",
    value: 1
}, {
    label: "枪兵",
    value: 2
}, {
    label: "骑兵",
    value: 3
}, {
    label: "飞兵",
    value: 4
}, {
    label: "水兵",
    value: 5
}, {
    label: "弓兵",
    value: 6
}, {
    label: "刺客",
    value: 7
}, {
    label: "法师",
    value: 8
}, {
    label: "僧侣",
    value: 9
}, {
    label: "魔物",
    value: 10
}]);

async function getAddData() {
    try {
        await armsAdd.value?.validate();
        const returnData: AddArmsParams = {
            id: addData.value.id,
            name: addData.value.name,
            type: addData.value.type,
            life: addData.value.life,
            att: addData.value.att,
            def: addData.value.def,
            mof: addData.value.mof,
            talent: addData.value.talent,
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