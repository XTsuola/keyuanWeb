<template>
    <a-table :columns="columns" :data-source="data" :scroll="scrollObj">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'type'">{{ typeArr[record.type - 1] }}</template>
        </template>
    </a-table>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Table as aTable } from "ant-design-vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import type { ScrollType } from "@/utils/global";
import { getStemArrList } from "@/api/examination";

export interface stemType {
    id: number
    stem: string
    type: number
    answer: string
    remark: string
}

interface dataType {
    answer: string
    id: number
    remark: string
    stem: string
    type: number
}

const columns = ref<ColumnsType>([
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 80
    },
    {
        title: "题目",
        dataIndex: "stem",
        key: "stem",
        width: 200
    },
    {
        title: "题目类型",
        dataIndex: "type",
        key: "type",
        width: 100
    },
    {
        title: "分数",
        dataIndex: "score",
        key: "score",
        width: 100
    }
]);
const typeArr = ["选择题", "判断题", "填空题", "问答题", "操作题"];
const scrollObj = reactive<ScrollType>({ x: 400, y: undefined });
const data = ref<dataType[]>();
const prop = defineProps<{
    paperId: number
}>();

async function getList() {
    const res = await getStemArrList(prop.paperId);
    data.value = res.data.rows;
}
getList();

</script>

<style lang="less" scoped></style>