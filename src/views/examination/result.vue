<template>
    <div class="result">
        <div style="font-size: 20px;">我的答卷</div>
        <div style="font-size: 20px;font-weight: 600;">试卷名称:{{ resultObj.paperName }} (得分:{{ resultObj.score }})</div>
        <div>
            <a-button @click="goBack()">返回</a-button>
        </div>
    </div>
    <a-table :columns="columns" :data-source="data" :scroll="scrollObj">
        <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
                {{ index + 1 }}
            </template>
            <template v-if="column.key === 'type'">
                <span v-if="record.type == 1">选择题</span>
                <span v-if="record.type == 2">判断题</span>
                <span v-if="record.type == 3">填空题</span>
                <span v-if="record.type == 4">问答题</span>
                <span v-if="record.type == 5">操作题</span>
            </template>
            <template v-if="column.key === 'a'">
                <span>{{ record.a != "" ? getSelectResult(record) : "/" }}</span>
            </template>
            <template v-if="column.key === 'rightAnswer'">
                <span v-if="record.type == 1">
                    <span v-if="record.rightAnswer === 1 || record.rightAnswer === '1'">A</span>
                    <span v-if="record.rightAnswer === 2 || record.rightAnswer === '2'">B</span>
                    <span v-if="record.rightAnswer === 3 || record.rightAnswer === '3'">C</span>
                    <span v-if="record.rightAnswer === 4 || record.rightAnswer === '4'">D</span>
                </span>
                <span v-if="record.type == 2">
                    <span v-if="record.rightAnswer === 0 || record.rightAnswer === '0'">正确</span>
                    <span v-if="record.rightAnswer === 1 || record.rightAnswer === '1'">错误</span>
                </span>
            </template>
            <template v-if="column.key === 'myAnswer'">
                <span v-if="record.type == 1">
                    <span v-if="record.myAnswer === 1 || record.myAnswer === '1'">A</span>
                    <span v-if="record.myAnswer === 2 || record.myAnswer === '2'">B</span>
                    <span v-if="record.myAnswer === 3 || record.myAnswer === '3'">C</span>
                    <span v-if="record.myAnswer === 4 || record.myAnswer === '4'">D</span>
                </span>
                <span v-if="record.type == 2">
                    <span v-if="record.myAnswer === 0 || record.myAnswer === '0'">正确</span>
                    <span v-if="record.myAnswer === 1 || record.myAnswer === '1'">错误</span>
                </span>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Table as aTable } from "ant-design-vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import { getResult } from "@/api/examination";
import type { ScrollType } from "@/utils/global";

interface DataType {
    index: number
    myAnswer: string
    remark: string
    selectArr: string[] | number[]
    stemName: string
    rightAnswer: string
    type: number
}

let resultObj: any = null;
if (localStorage.getItem("resultObj")) {
    resultObj = JSON.parse(localStorage.getItem("resultObj") as string);
}
const columns = ref<ColumnsType>([
    {
        title: "序号",
        key: "index",
        width: 80
    },
    {
        title: "题目名称",
        dataIndex: "stemName",
        key: "stemName"
    },
    {
        title: "题目类型",
        dataIndex: "type",
        key: "type"
    },
    {
        title: "选项",
        dataIndex: "a",
        key: "a"
    },
    {
        title: "正确答案",
        dataIndex: "rightAnswer",
        key: "rightAnswer"
    },
    {
        title: "你的答案",
        dataIndex: "myAnswer",
        key: "myAnswer"
    },
    {
        title: "分值",
        dataIndex: "score",
        key: "score"
    },
    {
        title: "得分",
        dataIndex: "myScore",
        key: "myScore"
    },
    {
        title: "解释说明",
        dataIndex: "remark",
        key: "remark",
        customRender: opt => opt.value ? opt.value : "/"
    },
]);
const scrollObj = reactive<ScrollType>({ x: 400, y: undefined });
const data = ref<DataType[]>();

function getSelectResult(record: any) {
    if (record.a == "" && record.b == "" && record.c == "" && record.d == "") {
        return "/";
    }
    return ["A." + record.a, "B." + record.b, "C." + record.c, "D." + record.d].join("，");
}

function goBack() {
    history.back();
}

async function getList() {
    const res = await getResult(resultObj.id);
    if (res && res.data.code == 200) {
        data.value = res.data.rows;
    }
}
getList();

</script>

<style lang="less" scoped>
.result {
    padding: 10px 20px 10px 20px;
    display: flex;
    justify-content: space-between;
}
</style>