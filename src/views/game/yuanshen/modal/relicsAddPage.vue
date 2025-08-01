<template>
    <div class="childMain">
        <a-form ref="relicsAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
            autocomplete="off" :hideRequiredMark="prop.type === 'detail'">
            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="addData.name" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="星级" name="star" :rules="[{ required: true, message: '请选择星级!' }]">
                <a-select style="width: 100%;" v-model:value="addData.star" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in starList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="两件套效果">
                <a-textarea v-model:value="addData.twoEffect" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="四件套效果">
                <a-textarea v-model:value="addData.fourEffect" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="关键词">
                <a-textarea v-model:value="addData.tag" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea style="min-height: 200px;" v-model:value="addData.remark"
                    :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { AddType, Type } from "@/utils/global";
import type { AddRelicsParams } from "@/api/yuanshen";


const prop = defineProps<{
    type: AddType
    addParams: AddRelicsParams
}>();
const relicsAdd = ref();
const addData = ref<AddRelicsParams>({
    name: "",
    star: undefined,
    twoEffect: "",
    fourEffect: "",
    tag: "",
    remark: ""
});
if (prop.type === "edit" || prop.type === "detail") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}
const starList = ref<Type[]>([{
    label: "五星",
    value: 5
}, {
    label: "四星",
    value: 4
}, {
    label: "三星",
    value: 3
}]);

async function getAddData(): Promise<false | AddRelicsParams> {
    try {
        await relicsAdd.value?.validate();
        const returnData: AddRelicsParams = {
            id: addData.value.id,
            name: addData.value.name,
            star: addData.value.star,
            twoEffect: addData.value.twoEffect,
            fourEffect: addData.value.fourEffect,
            tag: addData.value.tag,
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