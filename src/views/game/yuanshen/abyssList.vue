<template>
    <div class="abyssList">
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
        <MyTabel :columnsData="columns" :dataSource="tableData"
            :pagination="{ pageSize: pageSize, currentPage: currentPage, total: total }" @detail="showModal"
            @edit="showModal" @delete="deleteOk" @change-page="changePage"></MyTabel>
        <a-modal v-model:open="visible" destroyOnClose :title="title" :maskClosable="false">
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
import { ref, reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import type { AxiosPromise } from "axios";
import type { AddType } from "@/utils/global";
import { getAbyssList, addAbyss, updateAbyss, deleteAbyss, type GetAbyssListParams, type AddAbyssParams } from "@/api/yuanshen";
import AddPage from "./modal/abyssAddPage.vue";
import MyTabel from "@/components/table.vue";

let addParams = reactive<AddAbyssParams>({
    id: undefined,
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
const addPage = ref<any>();
const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const visible = ref<boolean>(false);
const formState = reactive<any>({
    name: "",
});
const columns = ref<any>([
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
const tableData = ref<any>([]);
const type = ref<AddType>("add");

async function getList() {
    const params: GetAbyssListParams = {
        pageSize: pageSize.value,
        pageNo: currentPage.value,
        name: formState.name
    };
    const res = await getAbyssList(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
    }
}

async function deleteOk(id: number) {
    const res = await deleteAbyss(id);
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

function selectList() {
    currentPage.value = 1;
    getList();
}

function changePage(page: number, size: number) {
    pageSize.value = size;
    currentPage.value = page;
    getList();
}

function reset() {
    formState.name = "";
    selectList();
}

function showModal(showType: AddType, item?: AddAbyssParams) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改圣遗物";
        if (item) {
            addParams.id = item.id;
            addParams.version = item.version;
            addParams.firstUpper = item.firstUpper;
            addParams.firstLower = item.firstLower;
            addParams.secondUpper = item.secondUpper;
            addParams.secondLower = item.secondLower;
            addParams.thirdUpper = item.thirdUpper;
            addParams.thirdLower = item.thirdLower;
            addParams.remark = item.remark;;
        }
    } else if (showType === "add") {
        title.value = "添加圣遗物";
        addParams.id = undefined;
        addParams.version = addParams.firstUpper = addParams.firstLower = addParams.secondUpper = addParams.secondLower = addParams.thirdUpper = addParams.thirdLower = addParams.remark = "";
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
        axios: ((data: AddAbyssParams) => AxiosPromise<any>)
    }
    let a: AType = {
        axios: addAbyss
    };
    if (type.value === "edit") {
        a.axios = updateAbyss;
    }
    const result = await addPage.value?.getAddData();
    if (result && a.axios) {
        const res = await a.axios(result);
        if (res.data.code === 200) {
            getList();
            message.success(res.data.msg);
            visible.value = false;
        } else {
            message.error(res.data.msg);
        }
    }
    loading.value = false;
}

onMounted(() => {
    getList();
})

</script>

<style lang="less" scoped>
.abyssList {
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
}
</style>