<template>
    <div class="main">
        <div class="title">
            菜谱列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增菜谱
            </a-button>
        </div>
        <a-form class="searchHead" :model="formState" name="basic" :wrapperCol="{ span: 16 }" autocomplete="off">
            <a-form-item label="名称" style="width: 200px">
                <a-input v-model:value="formState.name" type="text" style="width:140px" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item label="类型" style="width: 200px">
                <a-select ref="select" v-model:value="formState.cookType" style="width: 140px;" @change="groupChange"
                    placeholder="请选择类型">
                    <a-select-option v-for="item in cookTypeList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="荤素" style="width: 200px">
                <a-select ref="select" v-model:value="formState.hunsu" style="width: 140px;" @change="groupChange"
                    placeholder="请选择荤素">
                    <a-select-option v-for="item in hunsuList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="熟练度" style="width: 220px">
                <a-select ref="select" v-model:value="formState.mastery" style="width: 140px;" @change="groupChange"
                    placeholder="请选择熟练度">
                    <a-select-option v-for="item in masteryList" :key="item.value" :value="item.value">{{
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
                <template v-else-if="column.key === 'cookType'">
                    <span>{{cookTypeList.find(item => item.value == record.cookType)?.label}}</span>
                </template>
                <template v-else-if="column.key === 'hunsu'">
                    <span>{{hunsuList.find(item => item.value == record.hunsu)?.label}}</span>
                </template>
                <template v-else-if="column.key === 'mastery'">
                    <span>{{masteryList.find(item => item.value == record.mastery)?.label}}</span>
                </template>
                <template v-else-if="column.key === 'action' && levelId === 1">
                    <span style="display: flex;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                        <a-button size="small" @click="showModal('detail', record)">查看详情</a-button>
                        <span v-if="levelId === 1">
                            <a-divider type="vertical" />
                            <a-button size="small" @click="showModal('edit', record)">修改</a-button>
                            <a-divider type="vertical" />
                            <a-popconfirm title="确定删除该圣遗物吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record)">
                                <a-button size="small">删除</a-button>
                            </a-popconfirm>
                        </span>
                    </span>
                </template>
            </template>
        </a-table>
        <a-pagination class="pagination" v-model:current="current" v-model:page-size="pageSize" :total="total"
            :show-total="(total: any) => `共 ${total} 条`" @change="changeList" />
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
import { getCookList, addCook, updateCook, deleteCook, type DeleteParams, type GetCookListParams, type AddCookParams, type UpdateCookParams } from "@/api/myLove";
import type { SelectValue } from "ant-design-vue/lib/select";
import AddPage from "./modal/cookAddPage.vue";
import type { AddType, API as AddPageAPI } from "./modal/cookAddPage.vue";
import type { AxiosPromise } from "axios";
import type { ScrollType, Type } from "@/utils/global";

export interface AddParamsType extends AddCookParams {
    _id?: string
    id?: number
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
    cookType: number | undefined
    hunsu: number | undefined
    mastery: number | undefined
    star: number | undefined
}

let addParams = reactive<AddParamsType>({
    _id: "",
    id: 0,
    name: "",
    cookType: undefined,
    hunsu: undefined,
    mastery: undefined,
    foodMaterials: "",
    practice: "",
    count: "",
    remark: ""
});
const current = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const title = ref<string>("添加菜谱");
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
    cookType: undefined,
    hunsu: undefined,
    mastery: undefined,
    star: undefined,
});
const cookTypeList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "烧菜",
    value: 1
}, {
    label: "炒菜",
    value: 2
}, {
    label: "油炸",
    value: 3
}, {
    label: "煲汤",
    value: 4
}, {
    label: "蒸菜",
    value: 5
}, {
    label: "主食",
    value: 6
}, {
    label: "其他",
    value: 7
}]);
const hunsuList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "荤菜",
    value: 1
}, {
    label: "素菜",
    value: 2
}, {
    label: "其他",
    value: 3
}]);
const masteryList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "未学",
    value: 1
}, {
    label: "入门",
    value: 2
}, {
    label: "熟练",
    value: 3
}, {
    label: "精通",
    value: 4
}]);
const columns = ref<any>([
    {
        title: "序号",
        key: "index",
        width: 80
    },
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 140
    },
    {
        title: "类型",
        dataIndex: "cookType",
        key: "cookType",
        width: 80,
    },
    {
        title: "荤素",
        dataIndex: "hunsu",
        key: "hunsu",
        width: 80,
    },
    {
        title: "熟练度",
        dataIndex: "mastery",
        key: "mastery",
        width: 90,
    },
    {
        title: "食材",
        dataIndex: "foodMaterials",
        key: "foodMaterials",
        width: 200
    },
    {
        title: "次数",
        dataIndex: "count",
        key: "count",
        width: 180
    },
    {
        title: "备注",
        key: "remark",
        dataIndex: "remark",
        width: 180
    },
    {
        title: "操作",
        key: "action",
        width: 160
    },
]);
const loading = ref<boolean>(false);
const data = ref<DataType[]>([]);
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
    const params: GetCookListParams = {
        pageSize: pageSize.value,
        pageNo: current.value,
        name: formState.name,
        cookType: formState.cookType,
        hunsu: formState.hunsu,
        mastery: formState.mastery
    };
    const res = await getCookList(params);
    if (res.data.code === 200) {
        data.value = res.data.rows;
        total.value = res.data.total;
    }
}

async function deleteOk(e: DataType) {
    const params: DeleteParams = {
        _id: e._id
    };
    const res = await deleteCook(params);
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

function groupChange(e: SelectValue) {
    current.value = 1;
    getList();
}

function selectList() {
    current.value = 1;
    getList();
}

function reset() {
    formState.name = "";
    formState.cookType = formState.hunsu = formState.mastery = undefined;
    current.value = 1;
    getList();
}

function changeList() {
    getList();
}

function showModal(showType: AddType, item?: AddParamsType) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改菜谱";
        if (item) {
            addParams._id = item._id;
            addParams.name = item.name;
            addParams.cookType = item.cookType;
            addParams.hunsu = item.hunsu;
            addParams.mastery = item.mastery;
            addParams.foodMaterials = item.foodMaterials;
            addParams.practice = item.practice;
            addParams.count = item.count;
            addParams.remark = item.remark;
            addParams.id = item.id;
        }
    } else if (showType === "add") {
        title.value = "添加菜谱";
        addParams.cookType = addParams.hunsu = addParams.mastery = undefined;
        addParams._id = addParams.name = addParams.foodMaterials = addParams.practice = addParams.count = addParams.remark = "";
        addParams.id = 0;
    } else if (showType === "detail") {
        title.value = "查看详情";
        if (item) {
            addParams.name = item.name;
            addParams.cookType = item.cookType;
            addParams.hunsu = item.hunsu;
            addParams.mastery = item.mastery;
            addParams.foodMaterials = item.foodMaterials;
            addParams.practice = item.practice;
            addParams.count = item.count;
            addParams.remark = item.remark;
        }
    }
    visible.value = true;
}

async function handleOk(e: MouseEvent) {
    loading.value = true;
    interface AType {
        axios: ((data: AddCookParams) => AxiosPromise<any>) | ((data: UpdateCookParams) => AxiosPromise<any>)
        msg: string
    }
    let a: AType = {
        msg: "新增失败",
        axios: addCook
    };
    if (type.value === "edit") {
        a.axios = updateCook;
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