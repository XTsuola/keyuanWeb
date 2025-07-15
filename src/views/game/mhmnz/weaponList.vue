<template>
    <div class="main">
        <div class="title">
            装备列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增装备
            </a-button>
        </div>
        <a-form class="searchHead" :wrapperCol="{ span: 16 }" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="名称" style="width: 200px">
                <a-input v-model:value="formState.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item label="稀有度" style="width: 220px">
                <a-select v-model:value="formState.star" @change="selectList" placeholder="请选择稀有度">
                    <a-select-option v-for="item in starList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="装备类型" style="width: 240px">
                <a-select v-model:value="formState.weaponType" @change="selectList" placeholder="请选择装备">
                    <a-select-option v-for="item in weaponTypeList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="是否专属" style="width: 240px">
                <a-select v-model:value="formState.isExclusive" @change="selectList" placeholder="请选择">
                    <a-select-option v-for="item in isExclusiveList" :key="item.value" :value="item.value">{{
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
        <MyTabel :columnsData="columns" :dataSource="tableData" :loading="tableLoading"
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
import { Table as aTable, message } from "ant-design-vue";
import { getWeaponList, addWeapon, updateWeapon, deleteWeapon, type GetWeaponListParams, type AddWeaponParams, type UpdateWeaponParams, type DeleteParams } from "@/api/mhmnz";
import AddPage from "./modal/weaponAddPage.vue";
import type { AddType, API as AddPageAPI } from "./modal/weaponAddPage.vue";
import type { AxiosPromise } from "axios";
import MyTabel from "@/components/table.vue";

export interface AddParamsType extends AddWeaponParams {
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
    qq: string
    group: string
    position: string
    remark: string
}

interface FormStateType {
    name: string
    star: number | undefined
    weaponType: number | undefined
    isExclusive: number | undefined
}

let addParams = reactive<AddParamsType>({
    _id: "",
    id: 0,
    name: "",
    star: undefined,
    weaponType: undefined,
    isExclusive: undefined,
    shuxing: "",
    introduce: "",
    remark: ""
});
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const title = ref<string>("添加武器");
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
    star: undefined,
    weaponType: undefined,
    isExclusive: undefined
});
const starList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "SSR",
    value: 4
}, {
    label: "SR",
    value: 3
}, {
    label: "R",
    value: 2
}, {
    label: "N",
    value: 1
}]);
const weaponTypeList = ref<Type[]>([{
    label: "全部",
    value: 0,
}, {
    label: "武器",
    value: 1,
}, {
    label: "防具",
    value: 2,
}, {
    label: "头饰",
    value: 3,
}, {
    label: "饰品",
    value: 4,
}]);
const isExclusiveList = ref<Type[]>([{
    label: "全部",
    value: 0,
}, {
    label: "是",
    value: 1,
}, {
    label: "否",
    value: 2,
}]);
const columns = ref<ColumnType[]>([
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
        title: "稀有度",
        dataIndex: "star",
        key: "star",
        width: 60,
        customRender: (opt) => {
           return starList.value.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "部位",
        dataIndex: "weaponType",
        key: "weaponType",
        width: 80,
        customRender: (opt) => {
           return weaponTypeList.value.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "是否专属",
        dataIndex: "isExclusive",
        key: "isExclusive",
        width: 60,
        customRender: (opt) => {
           return isExclusiveList.value.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "属性",
        dataIndex: "shuxing",
        key: "shuxing",
        width: 140
    },
    {
        title: "技能",
        dataIndex: "introduce",
        key: "introduce",
        width: 260
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        list: ["detail", "edit", "delete"],
        width: 200
    },
]);
const loading = ref<boolean>(false);
const tableData = ref<DataType[]>([]);
const scrollObj = reactive<scrollType>({ x: 400, y: undefined });
const type = ref<AddType>("add");
const mql = window.matchMedia("(max-width: 768px)");

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
    const params: GetWeaponListParams = {
        pageSize: pageSize.value,
        pageNo: currentPage.value,
        name: formState.name,
        star: formState.star,
        weaponType: formState.weaponType,
        isExclusive: formState.isExclusive
    };
    const res = await getWeaponList(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
    }
}

async function deleteOk(id: number) {
    const res = await deleteWeapon(id);
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
    formState.star = formState.weaponType = formState.isExclusive = undefined;
    selectList();
}

function showModal(showType: AddType, item?: AddParamsType) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改装备";
        if (item) {
            addParams._id = item._id;
            addParams.name = item.name;
            addParams.star = item.star;
            addParams.weaponType = item.weaponType;
            addParams.isExclusive = item.isExclusive;
            addParams.shuxing = item.shuxing;
            addParams.introduce = item.introduce;
            addParams.remark = item.remark;
            addParams.id = item.id;
        }
    } else if (showType === "add") {
        title.value = "添加装备";
        addParams.star = addParams.weaponType = addParams.isExclusive = undefined;
        addParams._id = addParams.name = addParams.shuxing = addParams.introduce = addParams.remark = "";
        addParams.id = 0;
    } else if (showType === "detail") {
        title.value = "查看详情";
        if (item) {
            addParams.name = item.name;
            addParams.star = item.star;
            addParams.weaponType = item.weaponType;
            addParams.isExclusive = item.isExclusive;
            addParams.shuxing = item.shuxing;
            addParams.introduce = item.introduce;
            addParams.remark = item.remark;
        }
    }
    visible.value = true;
}

async function handleOk(e: MouseEvent) {
    loading.value = true;
    interface AType {
        axios: ((data: AddWeaponParams) => AxiosPromise<any>) | ((data: UpdateWeaponParams) => AxiosPromise<any>)
        msg: string
    }
    let a: AType = {
        msg: "新增失败",
        axios: addWeapon
    };
    if (type.value === "edit") {
        a.axios = updateWeapon;
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