<template>
    <div class="member-page">
        <div class="page-header">
            <div class="title">群成员</div>
            <div class="result-tip">共 {{ tableData.length }} 人</div>
        </div>
        <MyTabel :columnsData="columns" :dataSource="tableData" :pagination="false" />
    </div>
</template>

<script lang="ts" setup>
import { member } from "@/utils/sxsyzlzq/qunchengyuan";
import MyTabel from "@/components/table.vue";

const columns = [
    { title: "序号", key: "index", align: "center", width: 70 },
    { title: "名称", dataIndex: "name", key: "name", width: 220 },
    { title: "备注", dataIndex: "remark", key: "remark" },
];

const tableData = [...member]
    .sort((a, b) => Number(!a.remark.trim()) - Number(!b.remark.trim()))
    .map((item, index) => ({
        id: index + 1,
        name: item.name,
        remark: item.remark,
    }));
</script>

<style lang="less" scoped>
.member-page {
    padding: 20px 24px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
}

.page-header {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 14px;

    .title {
        font-size: 18px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.88);
        line-height: 1.3;
    }

    .result-tip {
        font-size: 13px;
        color: rgba(0, 0, 0, 0.45);
    }
}
</style>
