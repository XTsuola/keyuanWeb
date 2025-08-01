<template>
    <div class="relicsList">
        <div class="title">
            圣遗物列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增圣遗物
            </a-button>
        </div>
        <a-form class="searchHead" :model="formState" name="basic" :wrapperCol="{ span: 16 }" autocomplete="off">
            <a-form-item label="名称" style="width: 200px">
                <a-input v-model:value="formState.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item label="星级" style="width: 200px">
                <a-select v-model:value="formState.star" @change="selectList" placeholder="请选择星级">
                    <a-select-option v-for="item in starList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="关键词" style="width: 220px">
                <a-input v-model:value="formState.tag" type="text" placeholder="请输入关键词" />
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
import { message } from "ant-design-vue";
import type { AxiosPromise } from "axios";
import type { AddType, ScrollType, Type } from "@/utils/global";
import { getRelicsList, addRelics, updateRelics, deleteRelics, type GetRelicsListParams, type AddRelicsParams } from "@/api/yuanshen";
import AddPage from "./modal/relicsAddPage.vue";
import MyTabel from "@/components/table.vue";

let addParams = reactive<AddRelicsParams>({
    id: undefined,
    name: "",
    star: undefined,
    twoEffect: "",
    fourEffect: "",
    tag: "",
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
    star: undefined,
    tag: ""
});
const starList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "五星",
    value: 5
}, {
    label: "四星",
    value: 4
}, {
    label: "三星",
    value: 3
}]);
const columns = ref<any>([
    {
        title: "序号",
        key: "index",
        align: "center",
        width: 60
    },
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 140
    },
    {
        title: "星级",
        dataIndex: "star",
        key: "star",
        width: 80,
        customRender: (opt: any) => {
            return starList.value.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "两件套效果",
        dataIndex: "twoEffect",
        key: "twoEffect",
        width: 200,
    },
    {
        title: "四件套效果",
        dataIndex: "fourEffect",
        key: "fourEffect",
        width: 200,
    },
    {
        title: "关键词",
        dataIndex: "tag",
        key: "tag",
        width: 160
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
const scrollObj = reactive<ScrollType>({ x: 400, y: undefined });
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
    const params: GetRelicsListParams = {
        pageSize: pageSize.value,
        pageNo: currentPage.value,
        name: formState.name,
        star: formState.star,
        tag: formState.tag
    };
    const res = await getRelicsList(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
    }
}

async function deleteOk(id: number) {
    const res = await deleteRelics(id);
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

function changePage(page: number) {
    currentPage.value = page;
    getList();
}

function reset() {
    formState.star = undefined;
    formState.name = formState.tag = "";
    selectList();
}

function showModal(showType: AddType, item?: AddRelicsParams) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改圣遗物";
        if (item) {
            addParams.id = item.id;
            addParams.name = item.name;
            addParams.star = item.star;
            addParams.twoEffect = item.twoEffect;
            addParams.fourEffect = item.fourEffect;
            addParams.tag = item.tag;
            addParams.remark = item.remark;
        }
    } else if (showType === 'add') {
        title.value = "添加圣遗物";
        addParams.id = addParams.star = undefined;
        addParams.name = addParams.twoEffect = addParams.fourEffect = addParams.tag = addParams.remark = "";
    } else if (showType === 'detail') {
        title.value = "查看详情";
        if (item) {
            addParams.name = item.name;
            addParams.star = item.star;
            addParams.twoEffect = item.twoEffect;
            addParams.fourEffect = item.fourEffect;
            addParams.tag = item.tag;
            addParams.remark = item.remark;
        }
    }
    visible.value = true;
}

async function handleOk(e: MouseEvent) {
    loading.value = true;
    interface AType {
        axios: ((data: AddRelicsParams) => AxiosPromise<any>)
    }
    let a: AType = {
        axios: addRelics
    };
    if (type.value === "edit") {
        a.axios = updateRelics;
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
.relicsList {
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