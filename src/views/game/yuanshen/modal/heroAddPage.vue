<template>
    <div class="childMain">
        <a-form ref="heroAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 3 }"
            autocomplete="off" :hideRequiredMark="prop.type === 'detail'">
            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入英雄名称!' }]">
                <a-input v-model:value="addData.name" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="性别" name="gender" :rules="[{ required: true, message: '请选择英雄性别!' }]">
                <a-select v-model:value="addData.gender" :disabled="prop.type === 'detail'">
                    <a-select-option :value="1">男</a-select-option>
                    <a-select-option :value="0">女</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="体型" name="figure" :rules="[{ required: true, message: '请选择体型!' }]">
                <a-select v-model:value="addData.figure" :disabled="prop.type === 'detail'">
                    <a-select-option value="成女">成女</a-select-option>
                    <a-select-option value="少女">少女</a-select-option>
                    <a-select-option value="幼女">幼女</a-select-option>
                    <a-select-option value="成男">成男</a-select-option>
                    <a-select-option value="少年">少年</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="星级" name="star" :rules="[{ required: true, message: '请选择英雄星级!' }]">
                <a-select v-model:value="addData.star" :disabled="prop.type === 'detail'">
                    <a-select-option :value="5">五星</a-select-option>
                    <a-select-option :value="4">四星</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="元素" name="element" :rules="[{ required: true, message: '请选择元素类型!' }]">
                <a-select v-model:value="addData.element" :disabled="prop.type === 'detail'">
                    <a-select-option value="风">风</a-select-option>
                    <a-select-option value="岩">岩</a-select-option>
                    <a-select-option value="雷">雷</a-select-option>
                    <a-select-option value="草">草</a-select-option>
                    <a-select-option value="水">水</a-select-option>
                    <a-select-option value="火">火</a-select-option>
                    <a-select-option value="冰">冰</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="武器" name="weaponType" :rules="[{ required: true, message: '请输选择武器类型!' }]">
                <a-select v-model:value="addData.weaponType" :disabled="prop.type === 'detail'">
                    <a-select-option value="单手剑">单手剑</a-select-option>
                    <a-select-option value="双手剑">双手剑</a-select-option>
                    <a-select-option value="弓">弓</a-select-option>
                    <a-select-option value="长柄武器">长柄武器</a-select-option>
                    <a-select-option value="法器">法器</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="属地" name="country" :rules="[{ required: true, message: '请输选择属地!' }]">
                <a-select v-model:value="addData.country" :disabled="prop.type === 'detail'">
                    <a-select-option value="蒙德">蒙德</a-select-option>
                    <a-select-option value="璃月">璃月</a-select-option>
                    <a-select-option value="稻妻">稻妻</a-select-option>
                    <a-select-option value="须弥">须弥</a-select-option>
                    <a-select-option value="枫丹">枫丹</a-select-option>
                    <a-select-option value="纳塔">纳塔</a-select-option>
                    <a-select-option value="挪德卡莱">挪德卡莱</a-select-option>
                    <a-select-option value="至冬">至冬</a-select-option>
                    <a-select-option value="魔女会">魔女会</a-select-option>
                    <a-select-option value="异世界">异世界</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="命座" name="constellation" :rules="[{ required: true, message: '请输入命之座!' }]">
                <a-input v-model:value="addData.constellation" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="生日" name="birthday" :rules="[{ required: true, message: '请输入生日!' }]">
                <a-input v-model:value="addData.birthday" :disabled="prop.type === 'detail'"></a-input>
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
import type { AddHeroParams } from "@/api/yuanshen";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const prop = defineProps<{
    type: AddType
    addParams: AddHeroParams
}>();

const heroAdd = ref();
const addData = ref<AddHeroParams>({
    name: "",
    gender: undefined,
    figure: undefined,
    star: undefined,
    country: undefined,
    element: undefined,
    weaponType: undefined,
    constellation: "",
    birthday: "",
    remark: ""
});
if (prop.type === "edit" || prop.type === "detail") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
}

async function getAddData() {
    try {
        await heroAdd.value?.validate()
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