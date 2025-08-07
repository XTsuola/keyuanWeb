<template>
    <div class="myReportList">
        <div class="title">
            我的试卷
        </div>
        <a-table :columns="columns" :data-source="tableData" :pagination="false" bordered>
            <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'index'">
                    {{ index + 1 }}
                </template>
                <template v-if="column.key === 'action'">
                    <a-button v-if="record.flag == 0" size="small" @click="goRoom(record)">开始考试</a-button>
                    <div v-else>
                        <a-button style="margin-right: 15px;" size="small" @click="lookResult(record)">查看答卷</a-button>
                        <a-button size="small" @click="resetPaper(record.id)">重新考试</a-button>
                    </div>
                </template>
            </template>
        </a-table>
        <a-pagination class="pagination" v-model:current="currentPage" v-model:page-size="pageSize"
            :pageSizeOptions="['10', '15', '20', '50', '100']" :total="total"
            :show-total="(total: any) => `共 ${total} 条`" @change="changePage" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import { getMyPaperList, resetNowPaper, type GetMyPaperListType } from "@/api/examination";
import router from "@/router";

const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"));
const userId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).userId) {
    userId.value = JSON.parse(userInfo.value).userId;
} else {
    userId.value = null;
}
const columns = ref<ColumnsType>([
    {
        title: "序号",
        key: "index",
        align: "center",
        width: 60
    },
    {
        title: "试卷名称",
        dataIndex: "paperName",
        key: "paperName",
        width: 200
    },
    {
        title: "试卷总分",
        dataIndex: "allScore",
        key: "allScore",
        width: 180
    },
    {
        title: "考试时长",
        dataIndex: "time",
        key: "time",
        customRender: (opt) => opt.value + "分钟",
        width: 140
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
        width: 180
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        width: 240
    }
]);
const tableData = ref<any>([]);

function goRoom(record: any) {
    const infoObj = {
        userId: record.userId,
        paperId: record.paperId,
    };
    localStorage.setItem("infoObj", JSON.stringify(infoObj));
    router.push({ path: "/room" });
}

function lookResult(record: any) {
    const resultObj = {
        id: record.id,
        paperName: record.paperName,
        score: record.score
    };
    localStorage.setItem("resultObj", JSON.stringify(resultObj));
    router.push({ path: "/result" });
}

async function resetPaper(id: number) {
    const res = await resetNowPaper(id);
    if (res.data.code == 200) {
        getList();
    }
}

async function getList() {
    if (userId.value) {
        const params: GetMyPaperListType = {
            id: userId.value,
            pageSize: pageSize.value,
            pageNo: currentPage.value
        };
        const res = await getMyPaperList(params);
        if (res.data.code === 200) {
            tableData.value = res.data.rows;
            total.value = res.data.total;
        }
    }
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
.myReportList {
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