<template>
    <div class="heroList">
        <div class="title">
            角色列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增角色
            </a-button>
        </div>
        <MyTabel :columnsData="columns" :dataSource="tableData"
            :pagination="{ pageSize: pageSize, currentPage: currentPage, total: total }" @detail="showModal"
            @edit="showModal" @delete="deleteOk" @change-page="changePage"></MyTabel>
        <a-modal v-model:open="visible" destroyOnClose :title="title" :maskClosable="false">
            <AddPage :addParams="addParams" :type="type" :labelSpan="4" ref="addPage"></AddPage>
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
import { getHeroList, addHero, updateHero, deleteHero, type AddHeroParams } from "@/api/xingta";
import AddPage from "./modal/heroAddPage.vue";
import MyTabel from "@/components/table.vue";
import type { PaginationType } from "@/api/common";

let addParams = reactive<AddHeroParams>({
    id: undefined,
    name: "",
    title: "",
    mainShuxing: "",
    otherShuxing: "",
    weapon: "",
    gongfa: "",
    introduce: "",
    remark: ""
});
const currentPage = ref<number>(1);
const pageSize = ref<number>(20);
const total = ref<number>(0);
const title = ref<string>("添加角色");
const addPage = ref<any>();
const userInfo = ref<string | null>(window.sessionStorage.getItem('userInfo'));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const visible = ref<boolean>(false);
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
        width: 80
    },
    {
        title: "称号",
        dataIndex: "title",
        key: "title",
        width: 80
    },
    {
        title: "主属性",
        dataIndex: "mainShuxing",
        key: "mainShuxing",
        width: 80
    },
    {
        title: "副属性",
        dataIndex: "otherShuxing",
        key: "otherShuxing",
        width: 140
    },
    {
        title: "神器",
        dataIndex: "weapon",
        key: "weapon",
        width: 80
    },
    {
        title: "功法",
        dataIndex: "gongfa",
        key: "gongfa",
        width: 180,
    },
    {
        title: "介绍",
        dataIndex: "introduce",
        key: "introduce",
        width: 100
    },
    {
        title: "备注",
        key: "remark",
        dataIndex: "remark",
        width: 80
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        list: ["detail", "edit", "delete"],
        width: 120
    },
]);
const loading = ref<boolean>(false);
const tableData = ref<AddHeroParams[]>([]);
const type = ref<AddType>("add");

async function getList() {
    const params: PaginationType = {
        pageSize: pageSize.value,
        pageNo: currentPage.value,
    };
    const res = await getHeroList(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
    }
}

async function deleteOk(id: number) {
    const res = await deleteHero(id);
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

function showModal(showType: AddType, item?: AddHeroParams) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改角色";
        if (item) {
            addParams.name = item.name;
            addParams.title = item.title;
            addParams.mainShuxing = item.mainShuxing;
            addParams.otherShuxing = item.otherShuxing;
            addParams.weapon = item.weapon;
            addParams.gongfa = item.gongfa;
            addParams.introduce = item.introduce;
            addParams.remark = item.remark;
            addParams.id = item.id;
        }
    } else if (showType === "add") {
        title.value = "添加角色";
        addParams.name = addParams.title = addParams.mainShuxing = addParams.otherShuxing = addParams.weapon = addParams.gongfa = addParams.introduce = addParams.remark = "";
        addParams.id = 0;
    } else if (showType === "detail") {
        title.value = "查看详情";
        if (item) {
            addParams.name = item.name;
            addParams.title = item.title;
            addParams.mainShuxing = item.mainShuxing;
            addParams.otherShuxing = item.otherShuxing;
            addParams.weapon = item.weapon;
            addParams.gongfa = item.gongfa;
            addParams.introduce = item.introduce;
            addParams.remark = item.remark;
        }
    }
    visible.value = true;
}

async function handleOk(e: MouseEvent) {
    loading.value = true;
    interface AType {
        axios: ((data: AddHeroParams) => AxiosPromise<any>)
    }
    let a: AType = {
        axios: addHero
    };
    if (type.value === "edit") {
        a.axios = updateHero;
    }
    try {
        const result: any = await addPage.value?.getAddData();
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
    } catch (_) { }
    loading.value = false;
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
.heroList {
    padding: 20px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;

    .title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 15px 15px 0;
    }
}
</style>