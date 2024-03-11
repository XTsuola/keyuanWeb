
<template>
    {{ $t('hello.hello') }}
    <div class="main">
        <div class="title">
            成员列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增成员
            </a-button>
        </div>
        <a-form class="searchHead" :wrapperCol="{ span: 16 }" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="分组" style="width: 200px">
                <a-select v-model:value="formState.groupValue" style="width: 120px;" @change="groupChange"
                    placeholder="请选择分组">
                    <a-select-option v-for="item in groupList" :key="item.groupId" :value="item.groupValue">{{
                        item.groupName
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
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                    <a>{{ record.name }}</a>
                </template>
                <template v-else-if="column.key === 'position'">
                    <span>{{ record.position }}</span>
                </template>
                <template v-else-if="column.key === 'action' && levelId === 1">
                    <span style="display: flex;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                        <a-button size="small" @click="showModal('edit', record)">修改</a-button>
                        <a-divider type="vertical" />
                        <a-popconfirm title="确定删除该成员吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record)"
                            @cancel="cancel">
                            <a-button size="small">删除</a-button>
                        </a-popconfirm>
                    </span>
                </template>
            </template>
        </a-table>
        <a-pagination class="pagination" v-model:current="current" v-model:page-size="pageSize" :total="total"
            :show-total="(total: number) => `共 ${total} 条`" @change="getList" />
        <a-modal v-model:visible="visible" destroyOnClose :title="title" :maskClosable="false">
            <AddPage :addParams="addParams" :type="type" ref="addPage"></AddPage>
            <template #footer>
                <a-button key="back" @click="visible = false">取消</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
            </template>
        </a-modal>
        <!-- <a-card style="width: 300px;height: 200px;border:1px solid red;padding: 0;">
            <a-image :width="200" :height="200" :src="img" />
        </a-card> -->
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import { Table as aTable, message } from "ant-design-vue"
import { getGroupInfo, getMemberList, addMember, updateMember, deleteMember, type GetMemberListParams, type AddMemberParams, type UpdateMemberParams, type DeleteParams } from "@/api/team"
import type { SelectValue } from "ant-design-vue/lib/select"
import AddPage, { type AddType, type API as AddPageAPI } from "./modal/memberAddPage.vue"
import type { AxiosPromise } from "axios"
import { useI18n } from "vue-i18n"
import { render } from "vue"
import { effect } from "vue"

export interface GroupListType {
    groupId: number
    groupName: string
    groupValue: string
}

export interface AddParamsType extends AddMemberParams {
    _id?: string
    id?: number
}

interface ColumnType {
    title: string
    dataIndex?: string
    key: string
    width: number
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

const { locale, messages } = useI18n();
locale.value = "cn"

let addParams = reactive<AddParamsType>({
    _id: "",
    id: 0,
    name: "",
    qq: "",
    group: "",
    position: "",
    remark: ""
})

interface FormStateType {
    groupValue: number | undefined
}

const current = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const title = ref<string>("添加成员")
const addPage = ref<AddPageAPI>()
const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"))
const levelId = ref<number | null>(null)
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level
} else {
    levelId.value = null
}
const visible = ref<boolean>(false)
const formState = reactive<FormStateType>({
    groupValue: undefined
})
const groupList = ref<GroupListType[]>([])
const columns = ref<ColumnType[]>([
    {
        title: "成员名称",
        dataIndex: "name",
        key: "name",
        width: 120
    },
    {
        title: "QQ号",
        dataIndex: "qq",
        key: "qq",
        width: 150
    },
    {
        title: "所属分队",
        dataIndex: "group",
        key: "group",
        width: 160
    },
    {
        title: "擅长位置",
        dataIndex: "position",
        key: "position",
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
        width: 280
    },
])
const loading = ref<boolean>(false)
const data = ref<DataType[]>([])
const scrollObj = reactive<scrollType>({ x: 400, y: undefined })
const mql = window.matchMedia("(max-width: 768px)")
const type = ref<AddType>("add")

function mediaMatchs() {
    if (mql.matches) {
        scrollObj.y = 550
    } else {
        scrollObj.y = undefined
    }
}
mediaMatchs()
mql.addEventListener("change", mediaMatchs)

async function getGroup() {
    const res = await getGroupInfo()
    if (res.data.code === 200) {
        groupList.value = res.data.rows
    }
}

async function getList() {
    const params: GetMemberListParams = {
        pageSize: pageSize.value,
        pageNo: current.value,
        group: formState.groupValue
    }
    const res = await getMemberList(params)
    if (res.data.code === 200) {
        data.value = res.data.rows
        total.value = res.data.total
    }
}

async function deleteOk(e: DataType) {
    const params: DeleteParams = {
        _id: e._id
    }
    const res = await deleteMember(params)
    if (res.data.code === 200) {
        message.success(res.data.msg)
    } else {
        message.error("删除失败")
    }
    getList()
}

function cancel() {
    message.error("取消删除")
}

function groupChange(e: SelectValue) {
    getList()
}

function selectList() {
    current.value = 1
    getList()
}

function reset() {
    formState.groupValue = undefined
    getList()
}

function showModal(showType: AddType, item?: AddParamsType) {
    type.value = showType
    if (showType === "edit") {
        title.value = "修改成员"
        if (item) {
            addParams._id = item._id
            addParams.name = item.name
            addParams.qq = item.qq
            addParams.group = item.group
            addParams.position = item.position
            addParams.remark = item.remark
            addParams.id = item.id
        }
    } else {
        title.value = "添加成员"
        addParams._id = addParams.name = addParams.qq = addParams.group = addParams.position = addParams.remark = ''
        addParams.id = 0
    }
    visible.value = true
}

async function handleOk(e: MouseEvent) {
    loading.value = true
    interface AType {
        axios: ((data: AddMemberParams) => AxiosPromise<any>) | ((data: UpdateMemberParams) => AxiosPromise<any>)
        msg: string
    }
    let a: AType = {
        msg: "新增失败",
        axios: addMember
    }
    if (type.value === "edit") {
        a.axios = updateMember
        a.msg = "修改失败"
    }
    const result = await addPage.value?.getAddData()
    if (result && a.axios) {
        const res = await a.axios(result)
        if (res.data.code === 200) {
            getList()
            message.success(res.data.msg)
            visible.value = false
        } else {
            message.error(a.msg)
        }
    }
    loading.value = false
}

onMounted(() => {
    getList()
    getGroup()
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