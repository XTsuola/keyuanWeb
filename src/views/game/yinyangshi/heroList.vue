<template>
    <div class="main">
        <div class="title">
            式神列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增式神
            </a-button>
        </div>
        <a-form class="searchHead" :model="formState" name="basic" :wrapperCol="{ span: 16 }" autocomplete="off">
            <a-form-item label="名称" style="width: 200px">
                <a-input v-model:value="formState.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item label="性别" style="width: 200px">
                <a-select v-model:value="formState.gender" @change="selectList" placeholder="请选择性别">
                    <a-select-option v-for="item in genderList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="类别" style="width: 200px">
                <a-select v-model:value="formState.star" @change="selectList" placeholder="请选择类别">
                    <a-select-option v-for="item in starList" :key="item.value" :value="item.value">{{
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
        <a-table :columns="columns" :data-source="data" :scroll="scrollObj" :pagination="false">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                    <a>{{ record.name }}</a>
                </template>
                <template v-else-if="column.key === 'gender'">
                    <span>{{ genderList.find(item => item.value == record.gender)?.label }}</span>
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
                            <a-popconfirm title="确定删除该式神吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record)"
                                @cancel="cancel">
                                <a-button size="small">删除</a-button>
                            </a-popconfirm>
                        </span>
                    </span>
                </template>
            </template>
        </a-table>
        <a-pagination class="pagination" v-model:current="current" v-model:page-size="pageSize" :total="total"
            :show-total="(total: number) => `共 ${total} 条`" @change="getList" />
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
import { onMounted, reactive, ref } from 'vue'
import { Table as aTable, message } from 'ant-design-vue'
import { getHeroList, addHero, updateHero, deleteHero, type GetHeroListParams, type AddHeroParams, type UpdateHeroParams, type DeleteParams } from '@/api/yys'
import AddPage, { type AddType, type API as AddPageAPI } from "./modal/heroAddPage.vue"
import type { AxiosPromise } from 'axios'

export interface AddParamsType extends AddHeroParams {
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
    gender: number | undefined
    star: number | undefined
}

let addParams = reactive<AddParamsType>({
    _id: "",
    id: 0,
    name: "",
    gender: undefined,
    star: undefined,
    gj: "",
    sm: "",
    fy: "",
    sd: "",
    bj: "",
    bs: "",
    mz: "",
    dk: "",
    remark: ""
})
const current = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const title = ref<string>("添加式神")
const addPage = ref<AddPageAPI>()
const userInfo = ref<string | null>(window.sessionStorage.getItem('userInfo'))
const levelId = ref<number | null>(null)
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level
} else {
    levelId.value = null
}
const visible = ref<boolean>(false)
const formState = reactive<FormStateType>({
    name: "",
    gender: undefined,
    star: undefined,
})
const genderList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "男",
    value: 1
}, {
    label: "女",
    value: 2
}])
const starList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "SP",
    value: 1
}, {
    label: "SSR",
    value: 2
}, {
    label: "SR",
    value: 3
}, {
    label: "R",
    value: 4
}, {
    label: "N",
    value: 5
}, {
    label: "呱太",
    value: 6
}, {
    label: "联动",
    value: 7
}])
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
        width: 160
    },
    {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        width: 80
    },
    {
        title: '类别',
        dataIndex: 'star',
        key: 'star',
        width: 80,
    },
    {
        title: '攻击',
        dataIndex: 'gj',
        key: 'gj',
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.gj) - parseInt(b.gj)
        }
    },
    {
        title: '生命',
        dataIndex: 'sm',
        key: 'sm',
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.sm) - parseInt(b.sm)
        }
    },
    {
        title: '防御',
        dataIndex: 'fy',
        key: 'fy',
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.fy) - parseInt(b.fy)
        }
    },
    {
        title: '速度',
        dataIndex: 'sd',
        key: 'sd',
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.sd) - parseInt(b.sd)
        }
    },
    {
        title: '暴击',
        dataIndex: 'bj',
        key: 'bj',
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.bj) - parseInt(b.bj)
        }
    },
    {
        title: '爆击伤害',
        dataIndex: 'bs',
        key: 'bs',
        width: 120,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.bs) - parseInt(b.bs)
        }
    },
    {
        title: '效果命中',
        dataIndex: 'mz',
        key: 'mz',
        width: 120,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.mz) - parseInt(b.mz)
        }
    },
    {
        title: '效果抵抗',
        dataIndex: 'dk',
        key: 'dk',
        width: 120,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.dk) - parseInt(b.dk)
        }
    },
    {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark',
        width: 240
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
    const params: GetHeroListParams = {
        pageSize: pageSize.value,
        pageNo: current.value,
        name: formState.name,
        gender: formState.gender,
        star: formState.star
    }
    const res = await getHeroList(params)
    if (res.data.code === 200) {
        data.value = res.data.rows
        total.value = res.data.total
    }
}

async function deleteOk(e: DataType) {
    const params: DeleteParams = {
        _id: e._id
    }
    const res = await deleteHero(params)
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

function selectList() {
    current.value = 1
    getList()
}

function reset() {
    formState.name = ""
    formState.gender = formState.star = undefined
    selectList()
}

function showModal(showType: AddType, item?: AddParamsType) {
    type.value = showType
    if (showType === 'edit') {
        title.value = "修改式神"
        if (item) {
            addParams._id = item._id
            addParams.name = item.name
            addParams.gender = item.gender
            addParams.star = item.star
            addParams.gj = item.gj
            addParams.sm = item.sm
            addParams.fy = item.fy
            addParams.sd = item.sd
            addParams.bj = item.bj
            addParams.bs = item.bs
            addParams.mz = item.mz
            addParams.dk = item.dk
            addParams.remark = item.remark
            addParams.id = item.id
        }
    } else if (showType === 'add') {
        title.value = "添加式神"
        addParams.gender = addParams.star = undefined
        addParams._id = addParams.name = addParams.gj = addParams.sm = addParams.fy = addParams.sd = addParams.bj = addParams.bs = addParams.mz = addParams.dk = addParams.remark = ''
        addParams.id = 0
    } else if (showType === 'detail') {
        title.value = "查看详情"
        if (item) {
            addParams.name = item.name
            addParams.gender = item.gender
            addParams.star = item.star
            addParams.gj = item.gj
            addParams.sm = item.sm
            addParams.fy = item.fy
            addParams.sd = item.sd
            addParams.bj = item.bj
            addParams.bs = item.bs
            addParams.mz = item.mz
            addParams.dk = item.dk
            addParams.remark = item.remark
        }
    }
    visible.value = true
}

async function handleOk(e: MouseEvent) {
    loading.value = true
    interface AType {
        axios: ((data: AddHeroParams) => AxiosPromise<any>) | ((data: UpdateHeroParams) => AxiosPromise<any>)
        msg: string
    }
    let a: AType = {
        msg: '新增失败',
        axios: addHero
    }
    if (type.value === "edit") {
        a.axios = updateHero
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