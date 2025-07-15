<template>
    <div class="main">
        <div class="title">
            武器列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增武器
            </a-button>
        </div>
        <a-form class="searchHead" :model="formState" name="basic" :wrapperCol="{ span: 16 }" autocomplete="off">
            <a-form-item label="名称" style="width: 200px">
                <a-input v-model:value="formState.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item label="武器类型" style="width: 240px">
                <a-select v-model:value="formState.weaponType" @change="selectList" placeholder="请选择武器类型">
                    <a-select-option v-for="item in weaponTypeList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="星级" style="width:200px">
                <a-select v-model:value="formState.star" @change="selectList" placeholder="请选择星级">
                    <a-select-option v-for="item in starList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="基础攻击" style="width: 240px">
                <a-input v-model:value="formState.baseAttack" type="text" placeholder="请输入攻击" />
            </a-form-item>
            <a-form-item label="副词条" style="width: 220px">
                <a-input v-model:value="formState.attribute" type="text" placeholder="请输入词条" />
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
import { getWeaponList, addWeapon, updateWeapon, deleteWeapon, type GetWeaponListParams, type AddWeaponParams, type UpdateWeaponParams, type DeleteParams } from "@/api/yuanshen";
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
    weaponType: number | undefined
    star: number | undefined
    baseAttack: string
    attribute: string
}

let addParams = reactive<AddParamsType>({
    _id: "",
    id: 0,
    name: "",
    type: undefined,
    star: undefined,
    baseAttack: "",
    attribute: "",
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
    weaponType: undefined,
    star: undefined,
    baseAttack: "",
    attribute: ""
});
const weaponTypeList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "单手剑",
    value: 1
}, {
    label: "双手剑",
    value: 2
}, {
    label: "弓",
    value: 3
}, {
    label: "长柄武器",
    value: 4
}, {
    label: "法器",
    value: 5
}]);
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
}, {
    label: "二星",
    value: 2
}, {
    label: "一星",
    value: 1
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
        width: 100
    },
    {
        title: "武器类型",
        dataIndex: "type",
        key: "type",
        width: 80,
        customRender: (opt) => {
           return weaponTypeList.value.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "星级",
        dataIndex: "star",
        key: "star",
        width: 80,
        customRender: (opt) => {
           return starList.value.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "基础攻击",
        dataIndex: "baseAttack",
        key: "baseAttack",
        width: 100,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.baseAttack) - parseInt(b.baseAttack)
        }
    },
    {
        title: "副词条",
        dataIndex: "attribute",
        key: "attribute",
        width: 160
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
    const params: GetWeaponListParams = {
        pageSize: pageSize.value,
        pageNo: currentPage.value,
        name: formState.name,
        type: formState.weaponType,
        star: formState.star,
        baseAttack: formState.baseAttack,
        attribute: formState.attribute
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
    formState.weaponType = formState.star = undefined;
    formState.name = formState.baseAttack = formState.attribute = "";
    selectList();
}

function showModal(showType: AddType, item?: AddParamsType) {
    type.value = showType;
    if (showType === 'edit') {
        title.value = "修改武器";
        if (item) {
            addParams._id = item._id;
            addParams.name = item.name;
            addParams.type = item.type;
            addParams.star = item.star;
            addParams.baseAttack = item.baseAttack;
            addParams.attribute = item.attribute;
            addParams.introduce = item.introduce;
            addParams.remark = item.remark;
            addParams.id = item.id;
        }
    } else if (showType === 'add') {
        title.value = "添加武器";
        addParams.type = addParams.star = undefined;
        addParams._id = addParams.name = addParams.baseAttack = addParams.attribute = addParams.remark = "";
        addParams.id = 0;
    } else if (showType === 'detail') {
        title.value = "查看详情";
        if (item) {
            addParams.name = item.name;
            addParams.type = item.type;
            addParams.star = item.star;
            addParams.baseAttack = item.baseAttack;
            addParams.attribute = item.attribute;
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