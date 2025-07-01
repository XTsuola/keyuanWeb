<template>
    <div class="title">
        用户列表
        <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增用户</a-button>
    </div>
    <a-table :columns="columns" :data-source="data" :scroll="scrollObj">
        <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
                {{ index + 1 }}
            </template>
            <template v-if="column.key === 'action' && levelId === 1">
                <span style="display: flex;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                    <a-button size="small" @click="showModal('edit', record)">修改</a-button>
                    <a-divider type="vertical" />
                    <a-popconfirm title="确定删除该用户吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record)"
                        @cancel="cancel">
                        <a-button size="small">删除</a-button>
                    </a-popconfirm>
                </span>
            </template>
        </template>
    </a-table>
    <a-modal :width="750" v-model:visible="visible" destroyOnClose :title="title" :maskClosable="false">
        <userAdd :obj="addData" :flag="flag" ref="addPage"></userAdd>
        <template #footer>
            <a-button key="back" @click="visible = false">取消</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
        </template>
    </a-modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { message, Table as aTable } from "ant-design-vue";
import type { AxiosPromise } from "axios";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import type { API as UserPageAPI } from "./modal/userAddPage.vue";
import { levelName } from "@/utils/global";
import { addUser, updateUser, getUserList, deleteUser, type EditUserType } from "@/api/examination";
import md5 from "js-md5";
import userAdd from "./modal/userAddPage.vue";

export type TypeFlag = "add" | "edit";

interface scrollType {
    x: number
    y: number | undefined
}

const flag = ref<TypeFlag>("add");
const columns = ref<ColumnsType>([
    {
        title: "序号",
        key: "index",
        width: 80
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
        key: "account"
    },
    {
        title: "密码",
        dataIndex: "password",
        key: "password"
    },
    {
        title: "年龄",
        dataIndex: "age",
        key: "age"
    },
    {
        title: "身份",
        dataIndex: "level",
        key: "level",
        customRender: (opt) => levelName[opt.value as keyof typeof levelName]
    },
    {
        title: "备注",
        dataIndex: "remark",
        key: "remark",
        width: 200
    },
    {
        title: "操作",
        key: "action",
        width: 280
    },
]);
const loading = ref(false);
const data = ref<EditUserType[]>([]);
const scrollObj = reactive<scrollType>({ x: 400, y: undefined });
const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const visible = ref(false);
const title = ref("");
const addData = reactive<EditUserType>({
    id: 0,
    userName: "",
    account: "",
    password: "",
    age: "",
    level: undefined,
    remark: ""
});
const addPage = ref<UserPageAPI>();

async function getList() {
    const res = await getUserList();
    if (res.data.code === 200) {
        data.value = res.data.rows;
    }
}

function showModal(typeFlag: TypeFlag, record?: EditUserType) {
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
        axios: (data: EditUserType) => AxiosPromise<any>
        msg: string
    }
    let a: AType = {
        msg: "新增失败",
        axios: addUser
    };
    if (flag.value === "edit") {
        a.axios = updateUser;
        a.msg = "修改失败";
    }
    const result = await addPage.value?.getAddData();
    if (result && a.axios) {
        result.password = md5(result.password);
        const res = await a.axios(result);
        if (res.data.code === 200) {
            getList();
            visible.value = false;
            message.success(res.data.msg);
        } else {
            message.error(a.msg);
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
    getList()
}

function cancel() {
    message.error("取消删除");
}

onMounted(() => {
    getList();
})

</script>

<style lang="less" scoped>
.title {
    font-size: 18px;
    font-weight: 600;
    margin: 15px;
}

.box {
    display: flex;
    justify-content: flex-start;
    margin-top: 15px;
    margin-bottom: 15px;

    .box_title {
        width: 80px;
        white-space: nowrap;
    }
}

.img {
    width: 100%;
    height: 100%;
}

.stemArr {
    .stemArr_douhao:last-child {
        span {
            display: none;
        }
    }
}
</style>