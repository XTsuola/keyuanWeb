<template>
    <div class="main">
        <div class="title">
            深渊12层怪物列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增数据
            </a-button>
        </div>
        <a-form class="searchHead" :model="formState" name="basic" :wrapperCol="{ span: 16 }" autocomplete="off">
            <a-form-item label="怪物名称" style="width: 200px">
                <a-input v-model:value="formState.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item>
                <div style="display: flex;justify-content: flex-start;">
                    <a-button size="small" style="margin: 0 12px 0 12px" @click="selectList">查询</a-button>
                    <a-button size="small" @click="reset">重置</a-button>
                </div>
            </a-form-item>
        </a-form>
        <MyTabel :columnsData="columns" :dataSource="tableData" :loading="tableLoading"
            :pagination="{ pageSize: pageSize, currentPage: currentPage, total: total }" @detail="showModal"
            @edit="showModal" @delete="deleteOk" @change-page="changePage"></MyTabel>
        <!-- <a-table :columns="columns" :data-source="data" :scroll="scrollObj" :pagination="false">
            <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'index'">
                    {{ index + 1 }}
                </template>
                <template v-if="column.key === 'name'">
                    <a>{{ record.name }}</a>
                </template>
                <template v-else-if="column.key === 'action' && levelId === 1">
                    <span style="display: flex;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                        <a-button size="small" @click="showModal('detail', record)">查看详情</a-button>
                        <span v-if="levelId === 1">
                            <a-divider type="vertical" />
                            <a-button size="small" @click="showModal('edit', record)">修改</a-button>
                            <a-divider type="vertical" />
                            <a-popconfirm title="确定删除该条数据吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record)"
                                @cancel="cancel">
                                <a-button size="small">删除</a-button>
                            </a-popconfirm>
                        </span>
                    </span>
                </template>
            </template>
        </a-table>
        <a-pagination class="pagination" v-model:current="current" v-model:page-size="pageSize" :total="total"
            :show-total="total => `共 ${total} 条`" @change="getList" /> -->
        <a-modal v-model:visible="visible" destroyOnClose :title="title" :maskClosable="false">
            <AddPage :addParams="addParams" :type="type" ref="addPage"></AddPage>
            <template #footer>
                <a-button key="back" @click="visible = false">{{ type === 'detail' ? "关闭" : "取消" }}</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="handleOk" v-if="type !== 'detail'">确定
                </a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { Table as aTable, message } from "ant-design-vue";
import { getAbyss12List, addAbyss12, updateAbyss12, deleteAbyss12, type GetAbyss12ListParams, type DeleteParams, type AddAbyss12Params, type UpdateAbyss12Params } from "@/api/yuanshen";
import type { AddType, API as AddPageAPI } from "./modal/abyss12AddPage.vue";
import type { AxiosPromise } from "axios";
import AddPage from "./modal/abyss12AddPage.vue";
import MyTabel from "@/components/table.vue";

export interface AddParamsType extends AddAbyss12Params {
    _id?: string
    id?: number
}

export interface Type {
    label: string
    value: number | undefined
}

interface ColumnType {
    title: string
    dataIndex?: string
    key: string
    width?: number
    sorter?: any
}

interface scrollType {
    x: number
    y: number | undefined
}

interface DataType {
    _id: string
    id: number
    name: string
    gender: number | undefined
    country: number | undefined
    arms: number | undefined
    shuxing: number | undefined
    star: number | undefined
    introduce: string
    remark: string
}

interface FormStateType {
    name: string
}

let addParams = reactive<AddParamsType>({
    version: "",
    firstUpper: "",
    firstLower: "",
    secondUpper: "",
    secondLower: "",
    thirdUpper: "",
    thirdLower: "",
    remark: ""
});
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const title = ref<string>("添加圣遗物");
const addPage = ref<AddPageAPI>();
const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const visible = ref<boolean>(false);
const formState = reactive<FormStateType>({
    name: "",
});
const columns = ref<ColumnType[]>([
    {
        title: "序号",
        key: "index",
        align: "center",
        width: 60
    },
    {
        title: "深渊版本",
        dataIndex: "version",
        key: "version",
        width: 60
    },
    {
        title: "第一间上半",
        dataIndex: "firstUpper",
        key: "firstUpper",
        width: 120
    },
    {
        title: "第一间下半",
        dataIndex: "firstLower",
        key: "firstLower",
        width: 120
    },
    {
        title: "第二间上半",
        dataIndex: "secondUpper",
        key: "secondUpper",
        width: 120
    },
    {
        title: "第二间下半",
        dataIndex: "secondLower",
        key: "secondLower",
        width: 120
    },
    {
        title: "第三间上半",
        dataIndex: "thirdUpper",
        key: "thirdUpper",
        width: 120
    },
    {
        title: "第三间下半",
        dataIndex: "thirdLower",
        key: "thirdLower",
        width: 120
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        list: ["detail", "edit", "delete"],
        width: 160
    },
]);
const loading = ref<boolean>(false);
const tableData = ref<DataType[]>([]);
const scrollObj = reactive<scrollType>({ x: 400, y: undefined });
const mql = window.matchMedia("(max-width: 768px)");
const type = ref<AddType>("add");

function mediaMatchs() {
    if (mql.matches) {
        scrollObj.y = 550;
    } else {
        scrollObj.y = undefined;
    }
}
mediaMatchs();
mql.addEventListener("change", mediaMatchs);

async function getList() {
    const params: GetAbyss12ListParams = {
        pageSize: pageSize.value,
        pageNo: currentPage.value,
        name: formState.name
    };
    const res = await getAbyss12List(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
    }
}

async function deleteOk(id: number) {
    const res = await deleteAbyss12(id);
    if (res.data.code === 200) {
        message.success(res.data.msg);
    } else {
        message.error("删除失败");
    }
    if (tableData.value.length == 1) {
        currentPage.value--;
    }
    getList();
}

function cancel() {
    message.error("取消删除");
}

function selectList() {
    currentPage.value = 1;
    getList();
}

function changePage(page: number) {
    currentPage.value = page;
    getList();
}

function reset() {
    formState.name = "";
    selectList();
}

function showModal(showType: AddType, item?: AddParamsType) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改圣遗物";
        if (item) {
            addParams._id = item._id;
            addParams.version = item.version;
            addParams.firstUpper = item.firstUpper;
            addParams.firstLower = item.firstLower;
            addParams.secondUpper = item.secondUpper;
            addParams.secondLower = item.secondLower;
            addParams.thirdUpper = item.thirdUpper;
            addParams.thirdLower = item.thirdLower;
            addParams.remark = item.remark;;
            addParams.id = item.id;
        }
    } else if (showType === "add") {
        title.value = "添加圣遗物";
        addParams._id = addParams.version = addParams.firstUpper = addParams.firstLower = addParams.secondUpper = addParams.secondLower = addParams.thirdUpper = addParams.thirdLower = addParams.remark = "";
        addParams.id = 0;
    } else if (showType === "detail") {
        title.value = "查看详情";
        if (item) {
            addParams.version = item.version;
            addParams.firstUpper = item.firstUpper;
            addParams.firstLower = item.firstLower;
            addParams.secondUpper = item.secondUpper;
            addParams.secondLower = item.secondLower;
            addParams.thirdUpper = item.thirdUpper;
            addParams.thirdLower = item.thirdLower;
            addParams.remark = item.remark;
        }
    }
    visible.value = true;
}

async function handleOk(e: MouseEvent) {
    loading.value = true;
    interface AType {
        axios: ((data: AddAbyss12Params) => AxiosPromise<any>) | ((data: UpdateAbyss12Params) => AxiosPromise<any>)
        msg: string
    }
    let a: AType = {
        msg: "新增失败",
        axios: addAbyss12
    };
    if (type.value === "edit") {
        a.axios = updateAbyss12;
        a.msg = "修改失败";
    }
    const result = await addPage.value?.getAddData();
    if (result && a.axios) {
        const res = await a.axios(result);
        if (res.data.code === 200) {
            getList();
            message.success(res.data.msg);
            visible.value = false;
        } else {
            message.error(a.msg);
        }
    }
    loading.value = false;
}

onMounted(() => {
    getList();
})

</script>

<style lang="less" scoped>
.main {
    padding: 20px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;

    .title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 15px 15px 0;
    }

    .searchHead {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .pagination {
        margin: 20px 0 20px 20px;
    }
}
</style>