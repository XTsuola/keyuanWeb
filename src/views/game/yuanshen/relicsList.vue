<template>
    <div class="main">
        <div class="title">
            圣遗物列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增圣遗物
            </a-button>
        </div>
        <div class="selectDiv">
            <div>
                <span>星级:</span>
                <a-select ref="select" v-model:value="star" style="width: 120px;" @change="groupChange"
                    placeholder="请选择星级">
                    <a-select-option v-for="item in starList" :key="item.value" :value="item.value">{{
                            item.label
                    }}</a-select-option>
                </a-select>
            </div>
            <div>
                <span>关键词:</span>
                <a-input v-model:value="tag" type="text" style="width:120px" placeholder="请输入关键词" />
            </div>
            <div>
                <a-button size="small" @click="getList">查询</a-button>
                <a-button size="small" @click="reset">重置</a-button>
            </div>

        </div>

        <a-table :columns="columns" :data-source="data" :scroll="scrollObj" :pagination="false">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                    <a>{{ record.name }}</a>
                </template>
                <template v-else-if="column.key === 'star'">
                    <span>{{ starList.find(item => item.value == record.star)?.label }}</span>
                </template>
                <template v-else-if="column.key === 'action' && levelId === 1">
                    <span style="display: flex;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                        <a-button size="small" @click="showModal('detail', record)">查看详情</a-button>
                        <span v-if="levelId === 1">
                            <a-divider type="vertical" />
                            <a-button size="small" @click="showModal('edit', record)">修改</a-button>
                            <a-divider type="vertical" />
                            <a-popconfirm title="确定删除该圣遗物吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record)"
                                @cancel="cancel">
                                <a-button size="small">删除</a-button>
                            </a-popconfirm>
                        </span>
                    </span>
                </template>
            </template>
        </a-table>
        <a-pagination class="pagination" v-model:current="current" v-model:page-size="pageSize" :total="total"
            :show-total="(total: number) => `共 ${total} 条`" @change="changeList" />
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
import { onMounted, reactive, ref, watch } from 'vue'
import {
    Table as aTable, Divider as aDivider, Button as aButton, Popconfirm as aPopconfirm, message, Select as aSelect, SelectOption as aSelectOption,
    Modal as aModal, Pagination as aPagination
} from 'ant-design-vue'
import { getRelicsList, addRelics, updateRelics, deleteRelics, type GetRelicsListParams, type DeleteParams, type AddRelicsParams, type UpdateRelicsParams } from '@/api/yuanshen'
import type { SelectValue } from 'ant-design-vue/lib/select'
import AddPage, { type AddType, type API as AddPageAPI } from "./modal/relicsAddPage.vue"
import type { AxiosPromise } from 'axios'

export interface AddParamsType extends AddRelicsParams {
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
let addParams = reactive<AddParamsType>({
    _id: '',
    id: 0,
    name: '',
    star: undefined,
    twoEffect: "",
    fourEffect: "",
    tag: "",
    remark: ''
})

const current = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const title = ref<string>("添加圣遗物")
const addPage = ref<AddPageAPI>()
const userInfo = ref<string | null>(window.sessionStorage.getItem('userInfo'))
const levelId = ref<number | null>(null)
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level
} else {
    levelId.value = null
}
const visible = ref<boolean>(false)

const star = ref<number | undefined>(undefined)
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
}])
const tag = ref<string>("")
const columns = ref<ColumnType[]>([
    {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        width: 80
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 140
    },
    {
        title: '星级',
        dataIndex: 'star',
        key: 'star',
        width: 80,
    },
    {
        title: '两件套效果',
        dataIndex: 'twoEffect',
        key: 'twoEffect',
        width: 300,
    },
    {
        title: '四件套效果',
        dataIndex: 'fourEffect',
        key: 'fourEffect',
        width: 300,
    },
    {
        title: '关键词',
        dataIndex: 'tag',
        key: 'tag',
        width: 200
    },
    {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark',
        width: 300
    },
    {
        title: '操作',
        key: 'action',
        width: 160
    },
])
const loading = ref<boolean>(false)
const data = ref<DataType[]>([])
const scrollObj = reactive<scrollType>({ x: 400, y: undefined })
const mql = window.matchMedia('(max-width: 768px)')
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

async function getList() {
    const params: GetRelicsListParams = {
        pageSize: pageSize.value,
        pageNo: current.value,
        star: star.value,
        tag: tag.value
    }
    const res = await getRelicsList(params)
    if (res.data.code === 200) {
        data.value = res.data.rows
        total.value = res.data.total
    }
}

async function deleteOk(e: DataType) {
    const params: DeleteParams = {
        _id: e._id
    }
    const res = await deleteRelics(params)
    if (res.data.code === 200) {
        message.success(res.data.msg)
    } else {
        message.error('删除失败')
    }
    if (data.value.length == 1) {
        current.value--
    }
    getList()
}

function cancel() {
    message.error('取消删除');
}

function groupChange(e: SelectValue) {
    current.value = 1
    getList()
}

function reset() {
    star.value = undefined
    tag.value = ""
    current.value = 1
    getList()
}

function changeList() {
    getList()
}

function showModal(showType: AddType, item?: AddParamsType) {
    type.value = showType
    if (showType === 'edit') {
        title.value = "修改圣遗物"
        if (item) {
            addParams._id = item._id
            addParams.name = item.name
            addParams.star = item.star
            addParams.twoEffect = item.twoEffect
            addParams.fourEffect = item.fourEffect
            addParams.tag = item.tag
            addParams.id = item.id
        }
    } else if (showType === 'add') {
        title.value = "添加圣遗物"
        addParams.star = undefined
        addParams._id = addParams.name = addParams.twoEffect = addParams.fourEffect = addParams.tag = addParams.remark = ''
        addParams.id = 0
    } else if (showType === 'detail') {
        title.value = "查看详情"
        if (item) {
            addParams.name = item.name
            addParams.star = item.star
            addParams.twoEffect = item.twoEffect
            addParams.fourEffect = item.fourEffect
            addParams.tag = item.tag
        }
    }
    visible.value = true
}

async function handleOk(e: MouseEvent) {
    loading.value = true
    interface AType {
        axios: ((data: AddRelicsParams) => AxiosPromise<any>) | ((data: UpdateRelicsParams) => AxiosPromise<any>)
        msg: string
    }
    let a: AType = {
        msg: '新增失败',
        axios: addRelics
    }
    if (type.value === "edit") {
        a.axios = updateRelics
        a.msg = '修改失败'
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
})

</script>

<style lang="less" scoped>
.main {
    max-height: calc(100vh - 100px);
    overflow-y: auto;

    .title {
        font-size: 18px;
        font-weight: 600;
        margin: 15px;
        overflow: hidden;
    }

    .selectDiv {
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        column-gap: 10px;
        margin: 15px;
        flex-wrap: wrap;

        div {
            margin: 8px 8px 8px 0;

            button {
                margin-right: 8px;
            }
        }
    }

    .pagination {
        margin: 20px 0 20px 20px;
    }
}
</style>