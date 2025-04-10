<template>
    <div class="childMain">
        <a-form ref="heroAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
            autocomplete="off" :hideRequiredMark="prop.type === 'detail'">
            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="addData.name" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="稀有度" name="star" :rules="[{ required: true, message: '请选择稀有度!' }]">
                <a-select style="width: 100%;" v-model:value="addData.star" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in starList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="性别" name="gender" :rules="[{ required: true, message: '请选择性别!' }]">
                <a-select style="width: 100%;" v-model:value="addData.gender" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in genderList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="阵营" name="camp" :rules="[{ required: true, message: '请选阵营!' }]">
                <a-select style="width: 100%;" mode="multiple" v-model:value="addData.camp"
                    :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in campList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="天赋">
                <a-textarea style="min-height: 140px;" v-model:value="addData.talent"
                    :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="技能组">
                <a-textarea v-model:value="addData.skillGroup" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="3C技能">
                <a-textarea style="min-height: 120px;" v-model:value="addData.superSkill"
                    :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="兵种">
                <a-textarea style="min-height: 80px;" v-model:value="addData.arms"
                    :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="专属装备">
                <a-input v-model:value="addData.exclusive" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="铸纹技能">
                <a-textarea style="min-height: 80px;" v-model:value="addData.castGrainSkill"
                    :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="皮肤">
                <a-textarea v-model:value="addData.skin" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="介绍">
                <a-textarea v-model:value="addData.introduce" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { AddHeroParams, UpdateHeroParams } from "@/api/mhmnz";
import type { AddParamsType, Type } from "../heroList.vue";

export interface API {
    getAddData: () => Promise<false | AddHeroParams | UpdateHeroParams>
}

export type AddType = "add" | "edit" | "detail";

const prop = defineProps<{
    type: AddType
    addParams: AddParamsType
}>();
const heroAdd = ref();
const addData = ref<AddParamsType>({
    name: "",
    star: undefined,
    gender: undefined,
    camp: [],
    exclusive: "",
    arms: "",
    superSkill: "",
    skillGroup: "",
    castGrainSkill: "",
    talent: "",
    skin: "",
    introduce: ""
});
if (prop.type === "edit" || prop.type === "detail") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}
const starList = ref<Type[]>([{
    label: "LLR",
    value: 5
}, {
    label: "SP",
    value: 4
}, {
    label: "SSR",
    value: 3
}, {
    label: "SR",
    value: 2
}, {
    label: "R",
    value: 1
}]);
const genderList = ref<Type[]>([{
    label: "男",
    value: 1,
}, {
    label: "女",
    value: 2,
}]);
const campList = ref<Type[]>([{
    label: "主角光环",
    value: 1,
}, {
    label: "光辉军团",
    value: 2,
}, {
    label: "光之起源",
    value: 3,
}, {
    label: "帝国之辉",
    value: 4,
}, {
    label: "黑暗轮回",
    value: 5,
}, {
    label: "公主联盟",
    value: 6,
}, {
    label: "战略大师",
    value: 7,
}, {
    label: "流星直击",
    value: 8,
}, {
    label: "传说彼端",
    value: 9,
}, {
    label: "时空枢纽",
    value: 10,
}, {
    label: "超凡领域",
    value: 11,
}, {
    label: "梦幻转生",
    value: 12,
}]);

async function getAddData(): Promise<false | AddHeroParams | UpdateHeroParams> {
    try {
        await heroAdd.value?.validate()
        const returnData: AddHeroParams | UpdateHeroParams = {
            _id: addData.value._id,
            id: addData.value.id,
            name: addData.value.name,
            star: addData.value.star,
            gender: addData.value.gender,
            camp: addData.value.camp,
            exclusive: addData.value.exclusive,
            arms: addData.value.arms,
            superSkill: addData.value.superSkill,
            skillGroup: addData.value.skillGroup,
            castGrainSkill: addData.value.castGrainSkill,
            talent: addData.value.talent,
            skin: addData.value.skin,
            introduce: addData.value.introduce
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