<template>
    <div class="main">
        <div class="title">
            角色列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增角色
            </a-button>
        </div>
        <a-table :columns="columns" :data-source="data" :scroll="scrollObj" :pagination="false">
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
                            <a-popconfirm title="确定删除该角色吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record)"
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
import type { AxiosPromise } from "axios";
import type { AddType, API as AddPageAPI } from "./modal/heroAddPage.vue";
import { getHeroList, addHero, updateHero, deleteHero, type GetHeroListParams, type AddHeroParams, type UpdateHeroParams, type DeleteParams } from "@/api/xingta";
import AddPage from "./modal/heroAddPage.vue";

export interface AddParamsType extends AddHeroParams {
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

let addParams = reactive<AddParamsType>({
    id: 0,
    name: "",
    title: "",
    mainShuxing: "",
    otherShuxing: "",
    weapon: "",
    gongfa: "",
    introduce: "",
    remark: ""
});
const current = ref<number>(1);
const pageSize = ref<number>(20);
const total = ref<number>(0);
const title = ref<string>("添加角色");
const addPage = ref<AddPageAPI>();
const userInfo = ref<string | null>(window.sessionStorage.getItem('userInfo'));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const visible = ref<boolean>(false);
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
        width: 120
    },
    {
        title: "称号",
        dataIndex: "title",
        key: "title",
        width: 100
    },
    {
        title: "主属性",
        dataIndex: "mainShuxing",
        key: "mainShuxing",
        width: 100
    },
    {
        title: "副属性",
        dataIndex: "otherShuxing",
        key: "otherShuxing",
        width: 160
    },
    {
        title: "神器",
        dataIndex: "weapon",
        key: "weapon",
        width: 100
    },
    {
        title: "功法",
        dataIndex: "gongfa",
        key: "gongfa",
        width: 200,
    },
    {
        title: "介绍",
        dataIndex: "introduce",
        key: "introduce",
        width: 160
    },
    {
        title: "备注",
        key: "remark",
        dataIndex: "remark",
        width: 160
    },
    {
        title: "操作",
        key: "action",
        width: 160
    },
]);
const loading = ref<boolean>(false);
const data = ref<DataType[]>([]);
const scrollObj = reactive<scrollType>({ x: 400, y: undefined });
const mql = window.matchMedia('(max-width: 768px)');
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
    const params: GetHeroListParams = {
        pageSize: pageSize.value,
        pageNo: current.value,
    };
    const res = await getHeroList(params);
    if (res.data.code === 200) {
        data.value = res.data.rows;
        total.value = res.data.total;
    }
}

async function deleteOk(e: DataType) {
    const res = await deleteHero(e.id);
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

function showModal(showType: AddType, item?: AddParamsType) {
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
        axios: ((data: AddHeroParams) => AxiosPromise<any>) | ((data: UpdateHeroParams) => AxiosPromise<any>)
        msg: string
    }
    let a: AType = {
        msg: "新增失败",
        axios: addHero
    };
    if (type.value === "edit") {
        a.axios = updateHero;
        a.msg = "修改失败";
    }
    try {
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
    } catch (_) { }
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

    .pagination {
        margin: 20px 0 20px 20px;
    }
}
</style>