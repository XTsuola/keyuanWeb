<template>
    <div class="WeaponList">
        <div class="title">
            武器列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增武器
            </a-button>
        </div>
        <a-form class="searchHead" :wrapperCol="{ span: 17 }" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="名称" style="width: 200px">
                <a-input v-model:value="formState.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item label="星级" style="width: 200px">
                <a-select v-model:value="formState.star" placeholder="请选择星级">
                    <a-select-option :value="5">五星</a-select-option>
                    <a-select-option :value="4">四星</a-select-option>
                    <a-select-option :value="3">三星</a-select-option>
                    <a-select-option :value="2">二星</a-select-option>
                    <a-select-option :value="1">一星</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="类型" style="width: 200px">
                <a-select v-model:value="formState.weaponType" placeholder="请选择类型">
                    <a-select-option value="单手剑">单手剑</a-select-option>
                    <a-select-option value="双手剑">双手剑</a-select-option>
                    <a-select-option value="弓">弓</a-select-option>
                    <a-select-option value="长柄武器">长柄武器</a-select-option>
                    <a-select-option value="法器">法器</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="标签" style="width: 200px">
                <a-select v-model:value="formState.tag" style="width: 100%" mode="multiple" placeholder="请选择标签">
                    <a-select-option v-for="item in tabList" :key="item" :value="item">{{
                        item
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
        <a-modal v-model:open="visible" destroyOnClose :title="title" :maskClosable="false">
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
import { ref, reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import { tabList } from "./func.js";
import { getWeaponList, addWeapon, updateWeapon, deleteWeapon, type GetWeaponListParams, type AddWeaponParams } from "@/api/yuanshen";
import AddPage from "./modal/weaponAddPage.vue";
import type { AxiosPromise } from "axios";
import type { AddType } from "@/utils/global";
import MyTabel from "@/components/table.vue";

const addParams = reactive<AddWeaponParams>({
    id: undefined,
    name: "",
    star: undefined,
    weaponType: undefined,
    attack: "",
    buff: "",
    tag: [],
    info: "",
    remark: ""
});
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const title = ref<string>("添加武器");
const addPage = ref<any>();
const userInfo = ref<string | null>(sessionStorage.getItem("userInfo"));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const visible = ref<boolean>(false);
const formState = reactive<any>({
    name: undefined,
    star: undefined,
    weaponType: undefined,
    tag: undefined
});
const columns = ref<any>([
    {
        title: "序号",
        key: "index",
        align: "center",
        width: 60
    },
    {
        title: "头像",
        dataIndex: "headImg",
        key: "headImg",
        width: 50,
        scopedSlots: { customRender: "pic" }
    },
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 100
    },
    {
        title: "星级",
        dataIndex: "star",
        key: "element",
        width: 60,
        customRender: (opt: any) => getStarName(opt.value),
    },
    {
        title: "类型",
        dataIndex: "weaponType",
        key: "weaponType",
        width: 80
    },
    {
        title: "攻击",
        dataIndex: "attack",
        key: "attack",
        width: 80
    },
    {
        title: "加成",
        dataIndex: "buff",
        key: "buff",
        width: 120
    },
    {
        title: "技能",
        dataIndex: "info",
        key: "info",
        width: 180
    },
    {
        title: "标签",
        dataIndex: "tag",
        key: "tag",
        width: 180,
        customRender: (opt: any) => getTagName(opt.value),
    },
    {
        title: "备注",
        dataIndex: "remark",
        key: "remark",
        width: 240
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        list: ["detail", "edit", "delete"],
        width: 180
    },
]);
const loading = ref<boolean>(false);
const tableData = ref<any>([]);
const type = ref<AddType>("add");

async function getList() {
    const params: GetWeaponListParams = {
        pageSize: pageSize.value,
        pageNo: currentPage.value,
        ...formState
    };
    const res = await getWeaponList(params);
    if (res.data.code === 200) {
        const data = res.data.rows;
        for (let i = 0; i < data.length; i++) {
            data[i].headImg = import.meta.env.VITE_APP_BASE_URL + "yuanshen/wuqi/" + data[i].name + ".png";
        }
        tableData.value = data;
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

function selectList() {
    currentPage.value = 1;
    getList();
}

function changePage(page: number, size: number) {
    pageSize.value = size;
    currentPage.value = page;
    getList();
}

function reset() {
    formState.name = formState.star = formState.weaponType = formState.tag = undefined;
    selectList();
}

function showModal(showType: AddType, item?: AddWeaponParams) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改武器";
        if (item) Object.assign(addParams, item);
    } else if (showType === "add") {
        title.value = "添加武器";
        addParams.id = addParams.star = addParams.weaponType = undefined;
        addParams.name = addParams.attack = addParams.buff = addParams.info = addParams.remark = "";
        addParams.tag = [];
    } else if (showType == "detail") {
        title.value = "查看详情";
        if (item) Object.assign(addParams, item);
    }
    visible.value = true;
}

async function handleOk() {
    loading.value = true;
    interface AType {
        axios: ((data: AddWeaponParams) => AxiosPromise<any>)
    }
    let a: AType = {
        axios: addWeapon
    };
    if (type.value === "edit") {
        a.axios = updateWeapon;
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

function getStarName(star: number) {
    switch (star) {
        case 1: return "一星";
        case 2: return "二星";
        case 3: return "三星";
        case 4: return "四星";
        case 5: return "五星";
        default: return ""
    }
}

function getTagName(list: number[]) {
    return list.join("、");
}

onMounted(() => {
    getList();
})

</script>

<style lang="less" scoped>
.WeaponList {
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