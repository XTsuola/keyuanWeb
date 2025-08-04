<template>
    <a-table :columns="columns" :data-source="tableData" :scroll="scrollObj"></a-table>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Table as aTable } from "ant-design-vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import type { ScrollType } from "@/utils/global";
import { getUserPaperList, type PaperDataType } from "@/api/examination";

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
            if (opt.record.flag == 0) {
                return "/"
            } else {
                return opt.value
            }
        },
    },
])
const scrollObj = reactive<ScrollType>({ x: 400, y: undefined })
const tableData = ref<any>()
const prop = defineProps<{
    obj: PaperDataType
}>()

async function getList() {
    const res = await getUserPaperList(prop.obj)
    tableData.value = res.data.rows
}
getList()

</script>

<style lang="less" scoped></style>