<template>
    <a-table :columns="columns" :data-source="data" :scroll="scrollObj">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'type'">{{ typeArr[record.type - 1] }}</template>
        </template>
    </a-table>
</template>

<script lang="ts" setup>
import { Table as aTable } from 'ant-design-vue';
import { getStemArrList } from '@/api/examination'
import { reactive, ref } from 'vue';
import type { ColumnsType } from 'ant-design-vue/es/table/interface';

export interface stemType {
    _id: string
    id: number
    stem: string
    type: number
    url: string
    selectArr: string[]
    anwser: string
    remark: string
}

interface scrollType {
    x: number
    y: number | undefined
}

interface dataType {
    anwser: string
    id: number
    remark: string
    selectArr: string[]
    stem: string
    type: number
    url: string
    _id: string
}

const columns = ref<ColumnsType>([
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 80
    },
    {
        title: '题目',
        dataIndex: 'stem',
        key: 'stem',
        width: 200
    },
    {
        title: '题目类型',
        dataIndex: 'type',
        key: 'type',
        width: 100
    },
    {
        title: '媒体',
        key: 'url',
        dataIndex: 'url',
        width: 160
    }
])
const typeArr = ['选择题', '判断题', '填空题', '问答题', '操作题']
const scrollObj = reactive<scrollType>({ x: 400, y: undefined })
const data = ref<dataType[]>()
const prop = defineProps<{
    obj: number[]
}>()

async function getList() {
    const res = await getStemArrList(prop.obj)
    data.value = res.data.rows
}
getList()

</script>

<style lang="less" scoped>
</style>