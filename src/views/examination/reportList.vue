<template>
    <div class="reportList">
        <div class="title">
            答卷列表
        </div>
        <a-table :columns="columns" :data-source="tableData" :pagination="false" bordered>
            <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'index'">
                    {{ index + 1 }}
                </template>
                <template v-if="column.key === 'action' && levelId === 1">
                    <div style="display: flex;justify-content: center;align-items: center;">
                        <a-button size="small" @click="goPaperList(record)">查看试卷</a-button>
                        <a-divider type="vertical" />
                        <a-button size="small" @click="showModal(record)">分配</a-button>
                    </div>
                </template>
            </template>
        </a-table>
        <a-pagination class="pagination" v-model:current="currentPage" v-model:page-size="pageSize"
            :pageSizeOptions="['10', '15', '20', '50', '100']" :total="total"
            :show-total="(total: any) => `共 ${total} 条`" @change="changePage" />
        <a-modal :width="750" v-model:open="visible" destroyOnClose :title="'分配试卷-' + distributeData?.userName"
            :maskClosable="false">
            <distributePageVue :obj="distributeData" @upDateList="getList" ref="distributePage"></distributePageVue>
            <template #footer>
                <a-button key="back" @click="visible = false">关闭</a-button>
            </template>
        </a-modal>
        <a-modal :width="750" v-model:open="visible2" destroyOnClose title="所有答卷" :maskClosable="false">
            <paperList :obj="paperData"></paperList>
            <template #footer>
                <a-button key="back2" @click="visible2 = false">返回</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import { getStudentsPaper, type PaperDataType, type GetStudentsPaperListType } from "@/api/examination";
import distributePageVue from "./modal/distributePage.vue";
import paperList from "./modal/paperList.vue";

interface RecordType {
    id: number
    paperList: number[]
    userName: string
}

const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const columns = ref<ColumnsType>([
    {
        title: "序号",
        key: "index",
        align: "center",
        width: 60
    },
    {
        title: "姓名",
        dataIndex: "userName",
        key: "userName",
        width: 350
    },
    {
        title: "试卷数",
        dataIndex: "paperList",
        customRender: (opt) => opt.value.length,
        key: "paperList",
        width: 350
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        width: 240
    },
]);
const tableData = ref<any>();
const userInfo = ref<string | null>(sessionStorage.getItem("userInfo"));
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
    const params: GetStudentsPaperListType = {
        pageSize: pageSize.value,
        pageNo: currentPage.value
    };
    const res = await getStudentsPaper(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
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

function changePage(page: number, size: number) {
    pageSize.value = size;
    currentPage.value = page;
    getList();
}

onMounted(() => {
    getList();
})

</script>

<style lang="less" scoped>
.reportList {
    padding: 20px;

    .title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 15px 15px 0;
    }

    .pagination {
        text-align: right;
        margin-top: 20px;
    }
}
</style>