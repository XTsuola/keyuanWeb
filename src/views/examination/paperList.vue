<template>
    <div class="paperList">
        <div class="title">
            试卷列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')"
                v-if="levelId === 1">添加试卷</a-button>
        </div>
        <a-table :columns="columns" :data-source="tableData" :pagination="false" bordered>
            <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'index'">
                    {{ index + 1 }}
                </template>
                <template v-if="column.key === 'action' && levelId === 1">
                    <div style="display: flex;justify-content: center;align-items: center;">
                        <a-button size="small" @click="goStemList(record.id)">查看试题</a-button>
                        <a-divider type="vertical" />
                        <a-button size="small" @click="showModal('edit', record)">修改</a-button>
                        <a-divider type="vertical" />
                        <a-popconfirm title="确定删除该试卷吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record.id)">
                            <a-button size="small">删除</a-button>
                        </a-popconfirm>
                    </div>
                </template>
            </template>
        </a-table>
        <a-pagination class="pagination" v-model:current="currentPage" v-model:page-size="pageSize"
            :pageSizeOptions="['10', '15', '20', '50', '100']" :total="total"
            :show-total="(total: any) => `共 ${total} 条`" @change="changePage" />
        <a-modal :width="750" v-model:open="visible" destroyOnClose :title="title" :maskClosable="false">
            <paperAdd :addParams="addData" :flag="flag" ref="addPage"></paperAdd>
            <template #footer>
                <a-button key="back" @click="visible = false">取消</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
            </template>
        </a-modal>
        <a-modal :width="750" v-model:open="visible2" destroyOnClose title="所有题目" :maskClosable="false">
            <stemList :paperId="paperId"></stemList>
            <template #footer>
                <a-button key="back2" @click="visible2 = false">返回</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import type { AxiosPromise } from "axios";
import type { AddType } from "@/utils/global";
import { addPaper, updatePaper, getPaperList, deletePaper, type GetPaperListType, type AddPaperType } from "@/api/examination";
import paperAdd from "./modal/paperAddPage.vue";
import stemList from "./modal/stemList.vue";

const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const flag = ref<AddType>("add");
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
        width: 240
    },
    {
        title: "总分",
        dataIndex: "score",
        key: "score",
        width: 120
    },
    {
        title: "时间",
        dataIndex: "time",
        key: "time",
        customRender: (opt) => opt.value + "分钟",
        width: 140
    },
    {
        title: "备注",
        dataIndex: "remark",
        key: "remark",
        width: 200
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        width: 240
    },
]);
const loading = ref(false);
const tableData = ref<any>([]);
const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const visible = ref(false);
const visible2 = ref(false);
const title = ref("");
const addData = reactive<AddPaperType>({
    paperName: "",
    stemArr: [],
    score: 0,
    time: null,
    remark: ""
});
const paperId = ref<number>(0);
const addPage = ref<any>();

async function getList() {
    const params: GetPaperListType = {
        pageSize: pageSize.value,
        pageNo: currentPage.value
    };
    const res = await getPaperList(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
    }
}

function showModal(typeFlag: AddType, record?: AddPaperType) {
    visible.value = true;
    flag.value = typeFlag;
    if (typeFlag === "add") {
        title.value = "添加试卷";
        addData.id = 0;
        addData.paperName = addData.remark = "";
        addData.stemArr = [];
    } else {
        if (record) {
            title.value = "修改试卷";
            addData.id = record.id;
            addData.paperName = record.paperName;
            addData.stemArr = record.stemArr;
            addData.time = record.time;
            addData.remark = record.remark;
        }
    }
}

async function handleOk() {
    interface AType {
        axios: (data: AddPaperType) => AxiosPromise<any>
    }
    let a: AType = {
        axios: addPaper
    };
    if (flag.value === "edit") {
        a.axios = updatePaper;
    }
    try {
        const result: any = await addPage.value?.getAddData();
        if (result && a.axios) {
            loading.value = true;
            const res = await a.axios(result);
            if (res.data.code === 200) {
                getList();
                visible.value = false;
                message.success(res.data.msg);
            } else {
                message.error(res.data.msg);
            }
        }
    } catch (_) { }
    loading.value = false;
}

async function deleteOk(id: number) {
    const res = await deletePaper(id);
    if (res.data.code === 200) {
        message.success(res.data.msg);
    } else {
        message.error(res.data.msg);
    }
    if (tableData.value.length == 1) {
        currentPage.value--;
    }
    getList();
}

function goStemList(id: number) {
    visible2.value = true;
    paperId.value = id;
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
.paperList {
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