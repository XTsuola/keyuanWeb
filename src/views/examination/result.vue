<template>
    <div class="title">
        <div style="font-size: 20px;">我的答卷</div>
        <div style="font-size: 20px;font-weight: 600;">试卷名称:{{ resultObj.paperName }} (得分:{{ resultObj.score }})</div>
        <div>
            <a-button @click="goBack()">返回</a-button>
        </div>
    </div>
    <a-table :columns="columns" :data-source="data" :scroll="scrollObj">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'type'">
                <span v-if="record.type == 1">选择题</span>
                <span v-if="record.type == 2">判断题</span>
                <span v-if="record.type == 3">填空题</span>
                <span v-if="record.type == 4">问答题</span>
            </template>
            <template v-if="column.key === 'selectArr'">
                <span>{{ getSelectResult(record.selectArr) }}</span>
            </template>
            <template v-if="column.key === 'rightAnwser'">
                <span v-if="record.type == 1">
                    <span v-if="record.rightAnwser === 0 || record.rightAnwser === '0'">A</span>
                    <span v-if="record.rightAnwser === 1 || record.rightAnwser === '1'">B</span>
                    <span v-if="record.rightAnwser === 2 || record.rightAnwser === '2'">C</span>
                    <span v-if="record.rightAnwser === 3 || record.rightAnwser === '3'">D</span>
                </span>
                <span v-if="record.type == 2">
                    <span v-if="record.rightAnwser === 0 || record.rightAnwser === '0'">正确</span>
                    <span v-if="record.rightAnwser === 1 || record.rightAnwser === '1'">错误</span>
                </span>
            </template>
            <template v-if="column.key === 'myAnwser'">
                <span v-if="record.type == 1">
                    <span v-if="record.myAnwser === 0 || record.myAnwser === '0'">A</span>
                    <span v-if="record.myAnwser === 1 || record.myAnwser === '1'">B</span>
                    <span v-if="record.myAnwser === 2 || record.myAnwser === '2'">C</span>
                    <span v-if="record.myAnwser === 3 || record.myAnwser === '3'">D</span>
                </span>
                <span v-if="record.type == 2">
                    <span v-if="record.myAnwser === 0 || record.myAnwser === '0'">正确</span>
                    <span v-if="record.myAnwser === 1 || record.myAnwser === '1'">错误</span>
                </span>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts" setup>

import { Table as aTable, Button as aButton } from 'ant-design-vue';
import { reactive, ref } from 'vue'
import type { ColumnsType } from 'ant-design-vue/es/table/interface';
import { getResult, type GetResult } from '@/api/examination';

interface scrollType {
    x: number
    y: number | undefined
}

interface DataType {
    index: number
    myAnwser: string
    remark: string
    selectArr: string[] | number[]
    stemName: string
    rightAnwser: string
    type: number
}

let resultObj: any = null
if (localStorage.getItem("resultObj")) {
    resultObj = JSON.parse(localStorage.getItem("resultObj") as string)
}

const columns = ref<ColumnsType>([
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 100,
        customRender: (opt) => opt.record.index + 1
    },
    {
        title: '题目名称',
        dataIndex: 'stemName',
        key: 'stemName'
    },
    {
        title: '题目类型',
        dataIndex: 'type',
        key: 'type'
    },
    {
        title: '选项',
        dataIndex: 'selectArr',
        key: 'selectArr'
    },
    {
        title: '正确答案',
        dataIndex: 'rightAnwser',
        key: 'rightAnwser'
    },
    {
        title: '你的答案',
        dataIndex: 'myAnwser',
        key: 'myAnwser'
    },
    {
        title: '解释说明',
        dataIndex: 'remark',
        key: 'remark',
        customRender: opt => opt.value ? opt.value : "/"
    },
])

const scrollObj = reactive<scrollType>({ x: 400, y: undefined })
const data = ref<DataType[]>()

function getSelectResult(arr: string[] | number[]) {
    if (arr[0] == "" && arr[1] == "" && arr[2] == 0 && arr[3] == "") {
        return "/"
    }
    let prefix = ""
    let brr = []
    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
            prefix = "A."
        } else if (i === 1) {
            prefix = "B."
        } else if (i === 2) {
            prefix = "C."
        } else if (i === 3) {
            prefix = "D."
        }
        brr.push(prefix + arr[i])
    }
    return brr.join(",")
}

function goBack() {
    history.go(-1)
}

async function getList() {
    let params: GetResult = {
        paperId: parseInt(resultObj.paperId),
        userId: parseInt(resultObj.userId)
    }
    const res = await getResult(params)
    if (res && res.data.code == 200) {
        data.value = res.data.rows
    }
}

getList()

</script>

<style lang="less" scoped>
.title {
    padding: 10px 20px 10px 20px;
    display: flex;
    justify-content: space-between;
}
</style>