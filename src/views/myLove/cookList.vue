<template>
    <div class="cookList">
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
import { getCookList, addCook, updateCook, deleteCook, type GetCookListType, type AddCookParams } from "@/api/myLove";
import type { AddType, ScrollType, Type } from "@/utils/global";
import MyTabel from "@/components/table.vue";
import AddPage from "./modal/cookAddPage.vue";

let addParams = reactive<AddCookParams>({
    id: undefined,
    name: "",
    cookType: undefined,
    hunsu: undefined,
    mastery: undefined,
    foodMaterials: "",
    practice: "",
    count: "",
    remark: ""
});
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const title = ref<string>("添加菜谱");
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
    cookType: undefined,
    hunsu: undefined,
    mastery: undefined
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
        title: "类型",
        dataIndex: "cookType",
        key: "cookType",
        customRender: (opt: any) => {
            return cookTypeList.value.find(item => item.value == opt.value)?.label
        },
        width: 80,
    },
    {
        title: "荤素",
        dataIndex: "hunsu",
        key: "hunsu",
        customRender: (opt: any) => {
            return hunsuList.value.find(item => item.value == opt.value)?.label
        },
        width: 80,
    },
    {
        title: "熟练度",
        dataIndex: "mastery",
        key: "mastery",
        customRender: (opt: any) => {
            return masteryList.value.find(item => item.value == opt.value)?.label
        },
        width: 80,
    },
    {
        title: "次数",
        dataIndex: "count",
        key: "count",
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
        align: "center",
        list: ["detail", "edit", "delete"],
        width: 240
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
    const params: GetCookListType = {
        pageSize: pageSize.value,
        pageNo: currentPage.value,
        name: formState.name,
        cookType: formState.cookType,
        hunsu: formState.hunsu,
        mastery: formState.mastery
    };
    const res = await getCookList(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
    }
}

async function deleteOk(id: number) {
    const res = await deleteCook(id);
    if (res.data.code === 200) {
        message.success(res.data.msg);
    } else {
        message.error("删除失败");
    }
    if (tableData.value.length == 1) {
        currentPage.value = 1;
    }
    getList();
}

function groupChange() {
    currentPage.value = 1;
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
    formState.cookType = formState.hunsu = formState.mastery = undefined;
    selectList();
}

function showModal(showType: AddType, item?: AddCookParams) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改菜谱";
        if (item) {
            addParams.id = item.id;
            addParams.name = item.name;
            addParams.cookType = item.cookType;
            addParams.hunsu = item.hunsu;
            addParams.mastery = item.mastery;
            addParams.foodMaterials = item.foodMaterials;
            addParams.practice = item.practice;
            addParams.count = item.count;
            addParams.remark = item.remark;

        }
    } else if (showType === "add") {
        title.value = "添加菜谱";
        addParams.id = addParams.cookType = addParams.hunsu = addParams.mastery = undefined;
        addParams.name = addParams.foodMaterials = addParams.practice = addParams.count = addParams.remark = "";
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

async function handleOk() {
    loading.value = true;
    interface AType {
        axios: ((data: AddCookParams) => AxiosPromise<any>)
    }
    let a: AType = {
        axios: addCook
    };
    if (type.value === "edit") {
        a.axios = updateCook;
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
.cookList {
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