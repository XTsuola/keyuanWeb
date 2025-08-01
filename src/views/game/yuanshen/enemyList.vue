<template>
    <div class="enemyList">
        <div class="title">
            怪物列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增怪物
            </a-button>
        </div>
        <a-form class="searchHead" :model="formState" name="basic" :wrapperCol="{ span: 16 }" autocomplete="off">
            <a-form-item label="怪物名称" style="width: 240px">
                <a-input v-model:value="formState.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item label="类型" style="width: 200px">
                <a-select v-model:value="formState.enemyType" @change="selectList" placeholder="请选择类型">
                    <a-select-option v-for="item in enemyTypeList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
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
import { getEnemyList, addEnemy, updateEnemy, deleteEnemy, type GetEnemyListParams, type AddEnemyParams } from "@/api/yuanshen";
import AddPage from "./modal/enemyAddPage.vue";
import MyTabel from "@/components/table.vue";

let addParams = reactive<AddEnemyParams>({
    id: undefined,
    name: "",
    enemyType: undefined,
    info: "",
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
const enemyTypeList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "深渊",
    value: 1
}, {
    label: "元素生命",
    value: 2
}, {
    label: "丘丘人",
    value: 3
}, {
    label: "遗迹机关",
    value: 4
}, {
    label: "愚人众",
    value: 5
}, {
    label: "盗宝团",
    value: 6
}, {
    label: "镀金旅团",
    value: 7
}, {
    label: "武士",
    value: 8
}, {
    label: "龙武士",
    value: 9
}, {
    label: "部族勇士",
    value: 10
}, {
    label: "boos",
    value: 80
}, {
    label: "超级boos",
    value: 90
}, {
    label: "其他",
    value: 99
}]);
const visible = ref<boolean>(false);
const formState = reactive<any>({
    name: "",
    enemyType: undefined
});
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
        width: 120
    },
    {
        title: "类型",
        dataIndex: "enemyType",
        key: "enemyType",
        width: 100,
        customRender: (opt: any) => {
            return enemyTypeList.value.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "介绍",
        dataIndex: "info",
        key: "info",
        width: 560
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
    const params: GetEnemyListParams = {
        pageSize: pageSize.value,
        pageNo: currentPage.value,
        name: formState.name,
        enemyType: formState.enemyType
    };
    const res = await getEnemyList(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
    }
}

async function deleteOk(id: number) {
    const res = await deleteEnemy(id)
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
    formState.name = "";
    formState.enemyType = undefined;
    selectList();
}

function showModal(showType: AddType, item?: AddEnemyParams) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改圣遗物";
        if (item) {
            addParams.id = item.id;
            addParams.name = item.name;
            addParams.enemyType = item.enemyType;
            addParams.info = item.info;
            addParams.remark = item.remark;
        }
    } else if (showType === "add") {
        title.value = "添加圣遗物";
        addParams.id = addParams.enemyType = undefined;
        addParams.name = addParams.info = addParams.remark = "";
    } else if (showType === "detail") {
        title.value = "查看详情";
        if (item) {
            addParams.name = item.name;
            addParams.enemyType = item.enemyType;
            addParams.info = item.info;
            addParams.remark = item.remark;
        }
    }
    visible.value = true;
}

async function handleOk(e: MouseEvent) {
    loading.value = true;
    interface AType {
        axios: ((data: AddEnemyParams) => AxiosPromise<any>)
    }
    let a: AType = {
        axios: addEnemy
    };
    if (type.value === "edit") {
        a.axios = updateEnemy;
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
.enemyList {
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