<template>
    <a-table :columns="columns" :data-source="data" :scroll="scrollObj"></a-table>
</template>

<script lang="ts" setup>
import { Table as aTable } from "ant-design-vue"
import { getUserPaperList, type PaperDataType } from "@/api/examination"
import { reactive, ref } from "vue"
import type { ColumnsType } from "ant-design-vue/es/table/interface"

export default {
  name: 'PaperList',
}

interface scrollType {
    x: number
    y: number | undefined
}

interface dataType {
    answerArr: string[] | number[]
    flag: boolean
    paperId: number
    paperName: string
    remarkArr: string[]
    rightArr: string[] | number[]
    score: string
    userId: number
    _id: string
}

const columns = ref<ColumnsType>([
    {
        title: "试卷ID",
        dataIndex: "paperId",
        key: "paperId"
    },
    {
        title: "试卷名称",
        dataIndex: "paperName",
        key: "paperName"
    },
    {
        title: "试卷总分",
        dataIndex: "allScore",
        key: "allScore"
    },
    {
        title: "考试时长",
        dataIndex: "time",
        key: "time",
        customRender: (opt) => opt.value + "分钟"
    },
    {
        title: "我的分数",
        dataIndex: "score",
        key: "paperName",
        customRender: (opt) => {
            if (opt.record.flag) {
                return "/"
            } else {
                return opt.value
            }
        },
    },
])
const scrollObj = reactive<scrollType>({ x: 400, y: undefined })
const data = ref<dataType[]>()
const prop = defineProps<{
    obj: PaperDataType
}>()

async function getList() {
    const res = await getUserPaperList(prop.obj)
    data.value = res.data.rows
}
getList()

</script>

<style lang="less" scoped></style>