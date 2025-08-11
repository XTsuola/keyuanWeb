<template>
    <div class="userList">
        <div class="title">
            用户列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')"
                v-if="levelId === 1">新增用户</a-button>
        </div>
        <a-table :columns="columns" :data-source="tableData" :pagination="false" bordered>
            <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'index'">
                    {{ index + 1 }}
                </template>
                <template v-if="column.key === 'action' && levelId === 1">
                    <div style="display: flex;justify-content: center;align-items: center;">
                        <a-button size="small" @click="showModal('edit', record)">修改</a-button>
                        <a-divider type="vertical" />
                        <a-popconfirm title="确定删除该用户吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record)">
                            <a-button size="small">删除</a-button>
                        </a-popconfirm>
                    </div>
                </template>
            </template>
        </a-table>
        <a-pagination class="pagination" v-model:current="currentPage" v-model:page-size="pageSize"
            :pageSizeOptions="['10', '15', '20', '50', '100']" :total="total"
            :show-total="(total: any) => `共 ${total} 条`" @change="changePage" />
        <a-modal :width="750" v-model:open="visible" destroyOnClose :title="title" :maskClosable="false">
            <userAdd :addParams="addData" :flag="flag" ref="addPage"></userAdd>
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
import type { AxiosPromise } from "axios";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import { levelName, type AddType } from "@/utils/global";
import { addUser, updateUser, getUserList, deleteUser, type GetPaperListType, type AddUserType } from "@/api/examination";
import MD5 from "crypto-js/md5";
import userAdd from "./modal/userAddPage.vue";

const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const flag = ref<AddType>("add");
const columns = ref<ColumnsType>([
    {
        title: "序号",
        key: "index",
        align: "center",
        width: 60
    },
    {
        title: "姓名",
        dataIndex: "userName",
        key: "userName",
        width: 140
    },
    {
        title: "账号",
        dataIndex: "account",
        key: "account",
        width: 140
    },
    {
        title: "年龄",
        dataIndex: "age",
        key: "age",
        width: 140
    },
    {
        title: "身份",
        dataIndex: "level",
        key: "level",
        customRender: (opt) => levelName[opt.value as keyof typeof levelName],
        width: 140
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
        align: "center",
        width: 240
    },
]);
const loading = ref(false);
const tableData = ref<any>([]);
const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const visible = ref(false);
const title = ref("");
const addData = reactive<AddUserType>({
    id: 0,
    userName: "",
    account: "",
    password: "",
    age: "",
    level: undefined,
    remark: ""
});
const addPage = ref<any>();

async function getList() {
    const params: GetPaperListType = {
        pageSize: pageSize.value,
        pageNo: currentPage.value
    };
    const res = await getUserList(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
    }
}

function showModal(typeFlag: AddType, record?: AddUserType) {
    visible.value = true;
    flag.value = typeFlag;
    if (typeFlag === "add") {
        title.value = "添加用户";
        addData.id = 0;
        addData.userName = addData.account = addData.password = addData.age = addData.remark = "";
        addData.level = undefined;
    } else {
        if (record) {
            title.value = "修改用户";
            addData.id = record.id;
            addData.userName = record.userName;
            addData.account = record.account;
            addData.password = record.password;
            addData.age = record.age;
            addData.level = record.level;
            addData.remark = record.remark;
        }
    }
}

async function handleOk(e: MouseEvent) {
    loading.value = true;
    interface AType {
        axios: (data: AddUserType) => AxiosPromise<any>;
    }
    let a: AType = {
        axios: addUser
    };
    if (flag.value === "edit") {
        a.axios = updateUser;
    }
    const result: any = await addPage.value?.getAddData();
    if (result && a.axios) {
        result.password = MD5(result.password).toString();
        const res = await a.axios(result);
        if (res.data.code === 200) {
            getList();
            visible.value = false;
            message.success(res.data.msg);
        } else {
            message.error(res.data.msg);
        }
    }
    loading.value = false;
}

async function deleteOk(e: any) {
    const res = await deleteUser(e.id, e.level);
    if (res.data.code === 200) {
        message.success(res.data.msg);
    } else {
        message.error(res.data.msg);
    }
    if (tableData.value.length == 1) {
        currentPage.value--;
    }
    getList()
}

function changePage(page: number, size: number) {
    pageSize.value = size;
    currentPage.value = page;
    getList();
}

onMounted(() => {
    getList();
})

</script>

<style lang="less" scoped>
.userList {
    padding: 20px;

    .title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 15px 15px 0;
    }

    .pagination {
        text-align: right;
        margin-top: 20px;
    }
}
</style>