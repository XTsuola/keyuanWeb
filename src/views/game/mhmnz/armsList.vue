<template>
    <div class="main">
        <div class="title">
            兵种列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增兵种
            </a-button>
        </div>
        <a-form class="searchHead" :wrapperCol="{ span: 16 }" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="名称" style="width: 200px">
                <a-input v-model:value="formState.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item label="兵种" style="width: 200px">
                <a-select v-model:value="formState.armsType" @change="selectList" placeholder="请选择兵种">
                    <a-select-option v-for="item in typeList" :key="item.value" :value="item.value">{{
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
import { getArmsList, addArms, updateArms, deleteArms, type GetArmsListParams, type AddArmsParams, type UpdateArmsParams, type DeleteParams } from "@/api/mhmnz";
import AddPage from "./modal/armsAddPage.vue";
import type { AddType, API as AddPageAPI } from "./modal/armsAddPage.vue";
import type { AxiosPromise } from "axios";
import MyTabel from "@/components/table.vue";

export interface AddParamsType extends AddArmsParams {
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
    armsType: number | undefined
}

let addParams = reactive<AddParamsType>({
    _id: "",
    id: 0,
    name: "",
    type: undefined,
    life: "",
    att: "",
    def: "",
    mof: "",
    talent: "",
    skin: "",
    remark: ""
});
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const title = ref<string>("添加兵种");
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
    armsType: undefined
});
const typeList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "步兵",
    value: 1
}, {
    label: "枪兵",
    value: 2
}, {
    label: "骑兵",
    value: 3
}, {
    label: "飞兵",
    value: 4
}, {
    label: "水兵",
    value: 5
}, {
    label: "弓兵",
    value: 6
}, {
    label: "刺客",
    value: 7
}, {
    label: "法师",
    value: 8
}, {
    label: "僧侣",
    value: 9
}, {
    label: "魔物",
    value: 10
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
        title: "类型",
        dataIndex: "type",
        key: "type",
        width: 80,
        customRender: (opt) => {
           return typeList.value.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "生命",
        dataIndex: "life",
        key: "life",
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.life) - parseInt(b.life)
        }
    },
    {
        title: "攻击",
        dataIndex: "att",
        key: "att",
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.att) - parseInt(b.att)
        }
    },
    {
        title: "防御",
        dataIndex: "def",
        key: "def",
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.def) - parseInt(b.def)
        }
    },
    {
        title: "魔防",
        dataIndex: "mof",
        key: "mof",
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.mof) - parseInt(b.mof)
        }
    },
    {
        title: "技能",
        dataIndex: "talent",
        key: "talent",
        width: 280
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
    const params: GetArmsListParams = {
        pageSize: pageSize.value,
        pageNo: currentPage.value,
        name: formState.name,
        type: formState.armsType
    };
    const res = await getArmsList(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
    }
}

async function deleteOk(id: number) {
    const res = await deleteArms(id);
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
    formState.armsType = undefined;
    selectList();
}

function showModal(showType: AddType, item?: AddParamsType) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改兵种";
        if (item) {
            addParams._id = item._id;
            addParams.name = item.name;
            addParams.type = item.type;
            addParams.life = item.life;
            addParams.att = item.att;
            addParams.def = item.def;
            addParams.mof = item.mof;
            addParams.talent = item.talent;
            addParams.skin = item.skin;
            addParams.remark = item.remark;
            addParams.id = item.id;
        }
    } else if (showType === "add") {
        title.value = "添加兵种";
        addParams.type = undefined;
        addParams._id = addParams.name = addParams.life = addParams.att = addParams.def = addParams.mof = addParams.talent = addParams.skin = addParams.remark = "";
        addParams.id = 0;
    } else if (showType == "detail") {
        title.value = "查看详情";
        if (item) {
            addParams.name = item.name;
            addParams.type = item.type;
            addParams.life = item.life;
            addParams.att = item.att;
            addParams.def = item.def;
            addParams.mof = item.mof;
            addParams.talent = item.talent;
            addParams.skin = item.skin;
            addParams.remark = item.remark;
        }
    }
    visible.value = true;
}

async function handleOk(e: MouseEvent) {
    loading.value = true;
    interface AType {
        axios: ((data: AddArmsParams) => AxiosPromise<any>) | ((data: UpdateArmsParams) => AxiosPromise<any>)
        msg: string
    }
    let a: AType = {
        msg: "新增失败",
        axios: addArms
    };
    if (type.value === "edit") {
        a.axios = updateArms;
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