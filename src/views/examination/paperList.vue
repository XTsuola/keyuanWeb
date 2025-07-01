<template>
    <div class="title">
        试卷列表
        <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">添加试卷</a-button>
    </div>
    <a-table :columns="columns" :data-source="data" :scroll="scrollObj">
        <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
                {{ index + 1 }}
            </template>
            <template v-if="column.key === 'action' && levelId === 1">
                <span style="display: flex;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                    <a-button size="small" @click="goStemList(record.id)">查看试题</a-button>
                    <a-divider type="vertical" />
                    <a-button size="small" @click="showModal('edit', record)">修改</a-button>
                    <a-divider type="vertical" />
                    <a-popconfirm title="确定删除该试卷吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record)"
                        @cancel="cancel">
                        <a-button size="small">删除</a-button>
                    </a-popconfirm>
                </span>
            </template>
        </template>
    </a-table>
    <a-modal :width="750" v-model:visible="visible" destroyOnClose :title="title" :maskClosable="false">
        <paperAdd :obj="addData" :flag="flag" ref="addPage"></paperAdd>
        <template #footer>
            <a-button key="back" @click="visible = false">取消</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
        </template>
    </a-modal>
    <a-modal :width="750" v-model:visible="visible2" destroyOnClose title="所有题目" :maskClosable="false">
        <stemList :paperId="paperId"></stemList>
        <template #footer>
            <a-button key="back2" @click="visible2 = false">返回</a-button>
        </template>
    </a-modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { message, Table as aTable } from "ant-design-vue";
import type { AxiosPromise } from "axios";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import type { API as AddPageAPI } from "./modal/paperAddPage.vue";
import { addPaper, updatePaper, getPaperList, deletePaper, type EditPaperType, type StemArrType } from "@/api/examination";
import paperAdd from "./modal/paperAddPage.vue";
import stemList from "./modal/stemList.vue";

export type TypeFlag = "add" | "edit";

interface scrollType {
    x: number
    y: number | undefined
}

const flag = ref<TypeFlag>("add");
const columns = ref<ColumnsType>([
    {
        title: "序号",
        key: "index",
        width: 80
    },
    {
        title: "试卷名称",
        dataIndex: "paperName",
        key: "paperName",
        width: 200
    },
    {
        title: "总分",
        dataIndex: "score",
        key: "score",
        width: 100
    },
    {
        title: "时间",
        dataIndex: "time",
        key: "time",
        width: 120,
        customRender: (opt) => opt.value + "分钟"
    },
    {
        title: "备注",
        dataIndex: "remark",
        key: "remark",
        width: 160
    },
    {
        title: "操作",
        key: "action",
        width: 280
    },
]);
const loading = ref(false);
const data = ref<EditPaperType[]>([]);
const scrollObj = reactive<scrollType>({ x: 400, y: undefined });
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
const addData = reactive<EditPaperType>({
    id: 0,
    paperName: "",
    stemArr: [],
    score: 0,
    time: null,
    remark: ""
});
const paperId = ref<number>(0);
const addPage = ref<AddPageAPI>();

async function getList() {
    const res = await getPaperList();
    if (res.data.code === 200) {
        data.value = res.data.rows;
    }
}

function showModal(typeFlag: TypeFlag, record?: EditPaperType) {
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

async function handleOk(e: MouseEvent) {
    interface AType {
        axios: (data: EditPaperType) => AxiosPromise<any>
        msg: string
    }
    let a: AType = {
        msg: "新增失败",
        axios: addPaper
    };
    if (flag.value === "edit") {
        a.axios = updatePaper;
        a.msg = "修改失败";
    }
    try {
        const result = await addPage.value?.getAddData();
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

async function deleteOk(e: EditPaperType) {
    const res = await deletePaper(e.id);
    if (res.data.code === 200) {
        message.success(res.data.msg);
    } else {
        message.error(res.data.msg);
    }
    getList();
}

function cancel() {
    message.error("取消删除");
}

function goStemList(id: number) {
    visible2.value = true;
    paperId.value = id;
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

.stemArr {
    .stemArr_douhao:last-child {
        span {
            display: none;
        }
    }
}
</style>