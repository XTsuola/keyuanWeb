<template>
    <div class="childMain">
        <a-form ref="heroAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
            autocomplete="off" :hideRequiredMark="prop.type === 'detail'">
            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="addData.name" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="性别" name="gender" :rules="[{ required: true, message: '请选择性别!' }]">
                <a-select style="width: 100%;" v-model:value="addData.gender" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in genderList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="所属国家" name="country" :rules="[{ required: true, message: '请选择国家!' }]">
                <a-select style="width: 100%;" v-model:value="addData.country" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in countryList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="武器类型" name="arms" :rules="[{ required: true, message: '请选择武器类型!' }]">
                <a-select style="width: 100%;" v-model:value="addData.arms" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in armsList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="属性" name="shuxing" :rules="[{ required: true, message: '请选择属性!' }]">
                <a-select style="width: 100%;" v-model:value="addData.shuxing" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in shuxingList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="星级" name="star" :rules="[{ required: true, message: '请选择星级!' }]">
                <a-select style="width: 100%;" v-model:value="addData.star" :disabled="prop.type === 'detail'">
                    <a-select-option v-for="item in starList" :key="item.value" :value="item.value">{{
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
            <a-form-item label="突破加成">
                <a-input v-model:value="addData.breach" :disabled="prop.type === 'detail'"></a-input>
            </a-form-item>
            <a-form-item label="命之座">
                <a-textarea v-model:value="addData.lifeSeat" :disabled="prop.type === 'detail'"
                    style="height: 240px;"></a-textarea>
            </a-form-item>
            <a-form-item label="介绍">
                <a-textarea v-model:value="addData.introduce" :disabled="prop.type === 'detail'"
                    style="height: 160px;"></a-textarea>
            </a-form-item>
            <a-form-item label="初次见面">
                <a-textarea v-model:value="addData.firstLook" :disabled="prop.type === 'detail'"
                    style="height: 100px;"></a-textarea>
            </a-form-item>
            <a-form-item label="生日祝福">
                <a-textarea v-model:value="addData.birthday" :disabled="prop.type === 'detail'"
                    style="height: 100px;"></a-textarea>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-model:value="addData.remark" :disabled="prop.type === 'detail'"></a-textarea>
            </a-form-item>
            <a-form-item label="图片">
                <div v-if="prop.type === 'detail'">
                    <a :href="imgSrc" target="_blank">{{ addData.img }}</a>
                </div>
                <a-upload v-else v-model:file-list="fileList" action="" :customRequest="uploadImg"
                    @remove="handleRemove" :maxCount="1" accept="image/png, image/jpeg, image/jpg">
                    <a-button v-if="fileList.length == 0">上传</a-button>
                </a-upload>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { AddType, Type } from "@/utils/global";
import type { AddHeroParams } from "@/api/yuanshen";

const prop = defineProps<{
    type: AddType
    addParams: AddHeroParams
}>();
const fileList = ref<any[]>([]);
const heroAdd = ref();
const addData = ref<AddHeroParams>({
    name: "",
    gender: undefined,
    country: undefined,
    arms: undefined,
    shuxing: undefined,
    life: "",
    att: "",
    def: "",
    breach: "",
    lifeSeat: "",
    star: undefined,
    introduce: "",
    firstLook: "",
    birthday: "",
    remark: "",
    img: ""
});
const imgSrc = ref<any>("");
if (prop.type === "edit" || prop.type === "detail") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams));
    const str = import.meta.env.VITE_APP_BASE_URL + "yuanshenImg/hero/" + addData.value.img;
    imgSrc.value = new URL(str, import.meta.url);
    if (addData.value.img) {
        fileList.value = [];
        fileList.value.push({ url: imgSrc.value.href, name: addData.value.img });
    }
}

const genderList = ref<Type[]>([{
    label: "男",
    value: 1
}, {
    label: "女",
    value: 2
}]);
const countryList = ref<Type[]>([{
    label: "蒙德",
    value: 1
}, {
    label: "璃月",
    value: 2
}, {
    label: "稻妻",
    value: 3
}, {
    label: "须弥",
    value: 4
}, {
    label: "枫丹",
    value: 5
}, {
    label: "纳塔",
    value: 6
}, {
    label: "至冬",
    value: 7
}, {
    label: "异世界",
    value: 8
}]);
const armsList = ref<Type[]>([{
    label: "单手剑",
    value: 1
}, {
    label: "双手剑",
    value: 2
}, {
    label: "弓",
    value: 3
}, {
    label: "长柄武器",
    value: 4
}, {
    label: "法器",
    value: 5
}]);
const shuxingList = ref<Type[]>([{
    label: "风",
    value: 1
}, {
    label: "岩",
    value: 2
}, {
    label: "雷",
    value: 3
}, {
    label: "草",
    value: 4
}, {
    label: "水",
    value: 5
}, {
    label: "火",
    value: 6
}, {
    label: "冰",
    value: 7
}]);
const starList = ref<Type[]>([{
    label: "五星",
    value: 1
}, {
    label: "四星",
    value: 2
}]);

function uploadImg(file: any) {
    fileList.value = [];
    addData.value.img = "";
    const target = file.file;
    if (target) {
        const reader = new FileReader();
        reader.readAsDataURL(target);
        reader.addEventListener("load", async (e) => {
            if (e.target && typeof e.target.result === "string") {
                addData.value.img = e.target.result as any;
                fileList.value.push({ url: addData.value.img, name: file.file.name });
            }
        })
    }
}

function handleRemove() {
    fileList.value = [];
    addData.value.img = undefined;
}

async function getAddData() {
    try {
        await heroAdd.value?.validate();
        const returnData: AddHeroParams = {
            id: addData.value.id,
            name: addData.value.name,
            gender: addData.value.gender,
            country: addData.value.country,
            arms: addData.value.arms,
            shuxing: addData.value.shuxing,
            life: addData.value.life,
            att: addData.value.att,
            def: addData.value.def,
            breach: addData.value.breach,
            lifeSeat: addData.value.lifeSeat,
            star: addData.value.star,
            introduce: addData.value.introduce,
            firstLook: addData.value.firstLook,
            birthday: addData.value.birthday,
            remark: addData.value.remark,
            img: addData.value.img
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