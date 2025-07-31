<template>
    <div class="paperAddBox">
        <a-form ref="paperAdd" :model="addData" name="paperAdd" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
            autocomplete="off">
            <a-form-item label="试卷名称" name="paperName" :rules="[{ required: true, message: '请输入试卷名称!' }]">
                <a-input v-model:value="addData.paperName" />
            </a-form-item>
            <a-form-item label="试卷内容" name="list" :rules="[{ required: true, message: '请选择试卷内容!' }]">
                <a-transfer :list-style="{
                    width: '300px',
                    height: '400px',
                }" v-model:target-keys="targetKeys" v-model:selected-keys="selectedKeys" :data-source="allList"
                    :render="(item: any) => item.title" :disabled="disabled" :showSelectAll="false"
                    @change="handleChange" />
            </a-form-item>
            <a-form-item label="每题分值" name="scoreList" v-if="addData.scoreList.length > 0">
                <ul>
                    <li v-for="(item, index) in addData.scoreList" :key="index">
                        <div style="margin-right: 2px;">
                            {{ item.key }}.
                        </div>
                        <a-input-number style="width: 100%;" v-model:value="item.score" />
                    </li>
                </ul>
            </a-form-item>
            <a-form-item label="考试时长" name="time" :rules="[{ required: true, message: '请输入考试时长!' }]">
                <a-input-number v-model:value="addData.time" style="width: calc(100% - 80px);" /><span
                    style="margin-left: 8px;">分钟</span>
            </a-form-item>
            <a-form-item label="试卷备注" name="remark">
                <a-textarea v-model:value="addData.remark" />
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import type { AddType } from "@/utils/global";
import { getQuestionList, type AddPaperType, type StemArrType } from "@/api/examination";

interface AddPaperParamsType {
    id?: number
    paperName: string
    list: string[]
    scoreList: StemArrType[],
    time: number | null
    remark: string
}

interface listType {
    key: string
    title: string
}

const prop = defineProps<{
    flag: AddType
    obj: AddPaperType
}>();
const disabled = ref<boolean>(false);
const targetKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);
const addData = ref<AddPaperParamsType>({
    paperName: "",
    list: [],
    scoreList: [],
    time: null,
    remark: ""
});
const paperAdd = ref();
const allList = ref<listType[]>();

if (prop.flag === "edit") {
    const data: AddPaperType = JSON.parse(JSON.stringify(prop.obj));
    addData.value.id = data.id;
    addData.value.paperName = data.paperName;
    if (data.stemArr) {
        addData.value.list = data.stemArr.map(item => item.key.toString());
        targetKeys.value = addData.value.list;
    }
    addData.value.scoreList = []
    if (data.stemArr) {
        for (let i = 0; i <= data.stemArr.length - 1; i++) {
            addData.value.scoreList.push({
                key: data.stemArr[i].key.toString(),
                score: data.stemArr[i].score.toString()
            });
        }
    }
    addData.value.time = data.time;
    addData.value.remark = data.remark;
}

function handleChange(nextTargetKeys: string[]) {
    addData.value.scoreList = nextTargetKeys.map(item => { return { key: item, score: "" } });
    addData.value.list = nextTargetKeys.map(item => item.toString());
}

function scoreAdd(list: StemArrType[]) {
    let sum = 0;
    for (let i = 0; i <= list.length - 1; i++) {
        sum += parseFloat(list[i].score as string);
    }
    return sum;
}

async function getAddData() {
    for (let i = 0; i <= addData.value.scoreList.length - 1; i++) {
        if (addData.value.scoreList[i].score == "") {
            message.error("请填写分数！");
            return false;
        }
    }
    try {
        await paperAdd.value?.validate()
        let stemArr = [];
        for (let i = 0; i < addData.value.list.length; i++) {
            stemArr.push({
                key: parseInt(addData.value.list[i]),
                score: parseFloat(addData.value.scoreList[i].score as string)
            });
        }
        const returnData: AddPaperType = {
            id: addData.value.id,
            paperName: addData.value.paperName,
            stemArr: stemArr,
            score: scoreAdd(addData.value.scoreList),
            time: JSON.parse(addData.value.time as any),
            remark: addData.value.remark
        };
        return returnData;
    } catch (error) {
        return false;
    }
}

async function getAll() {
    const res = await getQuestionList({ pageSize: 999, pageNo: 1 });
    if (res.data.code === 200) {
        allList.value = res.data.rows;
        allList.value = res.data.rows.map((item: any) => {
            return {
                key: item.id.toString(),
                title: `${item.id.toString()}、${item.stem}`
            }
        });
    }
}
getAll();

defineExpose({
    getAddData
})

</script>

<style lang="less" scoped>
.paperAddBox {
    margin-top: 20px;
}

ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
        margin-top: 10px;
        width: 48%;
        display: flex;
        justify-content: flex-start;
    }
}
</style>