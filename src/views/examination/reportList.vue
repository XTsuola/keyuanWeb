<template>
    <div class="title">
        答卷列表
    </div>
    <a-table :columns="columns" :data-source="tableData" :scroll="scrollObj">
        <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
                {{ index + 1 }}
            </template>
            <template v-if="column.key === 'action' && levelId === 1">
                <span style="display: flex;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                    <a-button size="small" @click="goPaperList(record)">查看试卷</a-button>
                    <a-divider type="vertical" />
                    <a-button size="small" @click="showModal(record)">分配</a-button>
                </span>
            </template>
        </template>
    </a-table>
    <a-modal :width="750" v-model:visible="visible" destroyOnClose :title="'分配试卷-' + distributeData?.userName"
        :maskClosable="false">
        <distributePageVue :obj="distributeData" @upDateList="getList" ref="distributePage"></distributePageVue>
        <template #footer>
            <a-button key="back" @click="visible = false">关闭</a-button>
        </template>
    </a-modal>
    <a-modal :width="750" v-model:visible="visible2" destroyOnClose title="所有答卷" :maskClosable="false">
        <paperList :obj="paperData"></paperList>
        <template #footer>
            <a-button key="back2" @click="visible2 = false">返回</a-button>
        </template>
    </a-modal>
</template>

<script lang="ts" setup>
import { type UsersPaperType, getStudentsPaper, type PaperDataType } from "@/api/examination";
import { Table as aTable } from "ant-design-vue";
import { onMounted, reactive, ref } from "vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import distributePageVue from "./modal/distributePage.vue";
import paperList from "./modal/paperList.vue";

interface scrollType {
    x: number
    y: number | undefined
}

interface RecordType {
    id: number
    paperList: number[]
    userName: string
}

const columns = ref<ColumnsType>([
    {
        title: "序号",
        key: "index",
        width: 80
    },
    {
        title: "姓名",
        dataIndex: "userName",
        key: "userName",
        width: 200
    },
    {
        title: "试卷数",
        dataIndex: "paperList",
        customRender: (opt) => opt.value.length,
        key: "paperList",
        width: 100
    },
    {
        title: "操作",
        key: "action",
        width: 280
    },
]);
const tableData = ref<UsersPaperType[]>();
const scrollObj = reactive<scrollType>({ x: 400, y: undefined });
const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const paperData = ref<PaperDataType>({
    userId: 0,
    paperList: []
});
const visible = ref(false);
const visible2 = ref(false);
const distributeData = ref<RecordType | undefined>();

async function getList() {
    const res = await getStudentsPaper();
    if (res.data.code === 200) {
         tableData.value = res.data.rows
    }
}

function showModal(record: RecordType) {
    visible.value = true;
    distributeData.value = record;
}

function goPaperList(record: RecordType) {
    visible2.value = true;
    paperData.value = {
        userId: record.id,
        paperList: record.paperList
    };
}

onMounted(() => {
    getList();
})

</script>

<style lang="less" scoped>
.title {
    font-size: 18px;
    font-weight: 600;
    margin: 15px;
}

.box {
    display: flex;
    justify-content: flex-start;
    margin-top: 15px;
    margin-bottom: 15px;

    .box_title {
        width: 80px;
        white-space: nowrap;
    }
}

.img {
    width: 100%;
    height: 100%;
}

.paperList {
    .paperList_douhao:last-child {
        span {
            display: none;
        }
    }
}
</style>