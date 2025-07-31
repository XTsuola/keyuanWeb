<template>
    <!-- {{ $t('hello.hello') }} -->
    <div class="main">
        <div class="title">
            成员列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增成员
            </a-button>
        </div>
        <a-form class="searchHead" :wrapperCol="{ span: 16 }" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="分组" style="width: 200px">
                <a-select v-model:value="formState.groupName" style="width: 120px;" @change="groupChange"
                    placeholder="请选择分组">
                    <a-select-option v-for="item in groupList" :key="item.groupId" :value="item.value">{{
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
            :pagination="{ pageSize: pageSize, currentPage: currentPage, total: total }" @edit="showModal"
            @delete="deleteOk" @change-page="changePage"></MyTabel>
        <a-modal v-model:visible="visible" destroyOnClose :title="title" :maskClosable="false">
            <AddPage :addParams="addParams" :type="type" ref="addPage"></AddPage>
            <template #footer>
                <a-button key="back" @click="visible = false">取消</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import type { AxiosPromise } from "axios";
import { groupList, type AddType, type ScrollType } from '@/utils/global';
import { getMemberList, addMember, updateMember, deleteMember, type GetMemberListParams, type AddMemberParams } from "@/api/team";
import MyTabel from "@/components/table.vue";
import AddPage from "./modal/memberAddPage.vue";

interface FormStateType {
    groupName: number | undefined;
}

const { locale } = useI18n();
locale.value = "cn";
let addParams = reactive<AddMemberParams>({
    id: undefined,
    name: "",
    qq: "",
    groupName: "",
    position: "",
    remark: ""
});
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const title = ref<string>("添加成员");
const addPage = ref<any>();
const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const visible = ref<boolean>(false);
const formState = reactive<FormStateType>({
    groupName: undefined
});

const columns = ref<any>([
    {
        title: "序号",
        key: "index",
        align: "center",
        width: 60
    },
    {
        title: "成员名称",
        dataIndex: "name",
        key: "name",
        width: 140
    },
    {
        title: "QQ号",
        dataIndex: "qq",
        key: "qq",
        width: 140
    },
    {
        title: "所属分队",
        dataIndex: "groupName",
        key: "groupName",
        width: 140
    },
    {
        title: "擅长位置",
        dataIndex: "position",
        key: "position",
        width: 140
    },
    {
        title: "备注",
        key: "remark",
        dataIndex: "remark",
        width: 200
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        list: ["edit", "delete"],
        width: 180
    }
]);
const loading = ref<boolean>(false);
const tableData = ref<AddMemberParams[]>([]);
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
    const params: GetMemberListParams = {
        pageSize: pageSize.value,
        pageNo: currentPage.value,
        groupName: formState.groupName
    };
    const res = await getMemberList(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
    }
}

async function deleteOk(id: number) {
    const res = await deleteMember(id);
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

function groupChange() {
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
    formState.groupName = undefined;
    getList();
}

function showModal(showType: AddType, item?: AddMemberParams) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改成员";
        if (item) {
            addParams.id = item.id;
            addParams.name = item.name;
            addParams.qq = item.qq;
            addParams.groupName = item.groupName;
            addParams.position = item.position;
            addParams.remark = item.remark;
        }
    } else {
        title.value = "添加成员";
        addParams.id = 0;
        addParams.name = addParams.qq = addParams.groupName = addParams.position = addParams.remark = "";
    }
    visible.value = true;
}

async function handleOk() {
    loading.value = true;
    interface AType {
        axios: ((data: AddMemberParams) => AxiosPromise<any>)
    }
    let a: AType = {
        axios: addMember
    };
    if (type.value === "edit") {
        a.axios = updateMember;
    }
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

:deep(.ant-card-body) {
    padding: 2px;
}
</style>