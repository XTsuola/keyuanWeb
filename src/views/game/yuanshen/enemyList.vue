<template>
    <div class="main">
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
        <a-table :columns="columns" :data-source="data" :scroll="scrollObj" :pagination="false">
            <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'index'">
                    {{ index + 1 }}
                </template>
                <template v-if="column.key === 'name'">
                    <a>{{ record.name }}</a>
                </template>
                <template v-else-if="column.key === 'enemyType'">
                    <span>{{enemyTypeList.find(item => item.value == record.enemyType)?.label}}</span>
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
            :show-total="total => `共 ${total} 条`" @change="getList" />
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
import { getEnemyList, addEnemy, updateEnemy, deleteEnemy, type GetEnemyListParams, type DeleteParams, type AddEnemyParams, type UpdateEnemyParams } from "@/api/yuanshen";
import AddPage from "./modal/enemyAddPage.vue";
import type { AddType, API as AddPageAPI } from "./modal/enemyAddPage.vue";
import type { AxiosPromise } from "axios";

export interface AddParamsType extends AddEnemyParams {
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
    enemyType: number | undefined
}

let addParams = reactive<AddParamsType>({
    name: "",
    enemyType: undefined,
    info: "",
    remark: ""
});
const current = ref<number>(1);
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
const formState = reactive<FormStateType>({
    name: "",
    enemyType: undefined
});
const columns = ref<ColumnType[]>([
    {
        title: "序号",
        key: "index",
        width: 80
    },
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 180
    },
    {
        title: "类型",
        dataIndex: "enemyType",
        key: "enemyType",
        width: 140
    },
    {
        title: "介绍",
        dataIndex: "info",
        key: "info",
        width: 500
    },
    {
        title: "备注",
        dataIndex: "remark",
        key: "remark",
        width: 140
    },
    {
        title: "操作",
        key: "action",
        width: 180
    },
]);
const loading = ref<boolean>(false);
const data = ref<DataType[]>([]);
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
    const params: GetEnemyListParams = {
        pageSize: pageSize.value,
        pageNo: current.value,
        name: formState.name,
        enemyType: formState.enemyType
    };
    const res = await getEnemyList(params);
    if (res.data.code === 200) {
        data.value = res.data.rows;
        total.value = res.data.total;
    }
}

async function deleteOk(e: DataType) {
    const params: DeleteParams = {
        _id: e._id
    };
    const res = await deleteEnemy(params)
    if (res.data.code === 200) {
        message.success(res.data.msg);
    } else {
        message.error("删除失败");
    }
    if (data.value.length == 1) {
        current.value--;
    }
    getList();
}

function cancel() {
    message.error("取消删除");
}

function selectList() {
    current.value = 1;
    getList();
}

function reset() {
    formState.name = "";
    formState.enemyType = undefined;
    selectList();
}

function showModal(showType: AddType, item?: AddParamsType) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改圣遗物";
        if (item) {
            addParams._id = item._id;
            addParams.name = item.name;
            addParams.enemyType = item.enemyType;
            addParams.info = item.info;
            addParams.remark = item.remark;
            addParams.id = item.id;
        }
    } else if (showType === "add") {
        title.value = "添加圣遗物";
        addParams._id = addParams.name = addParams.info = addParams.remark = "";
        addParams.enemyType = undefined;
        addParams.id = 0;
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
        axios: ((data: AddEnemyParams) => AxiosPromise<any>) | ((data: UpdateEnemyParams) => AxiosPromise<any>)
        msg: string
    }
    let a: AType = {
        msg: "新增失败",
        axios: addEnemy
    };
    if (type.value === "edit") {
        a.axios = updateEnemy;
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