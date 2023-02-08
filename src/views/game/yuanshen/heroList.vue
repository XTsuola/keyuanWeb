<template>
    <div class="main">
        <div class="title">
            角色列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增角色
            </a-button>
        </div>
        <a-form class="searchHead" :model="formState" name="basic" :wrapperCol="{ span: 16 }" autocomplete="off">
            <a-form-item label="名称" style="width: 200px">
                <a-input v-model:value="formState.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item label="性别" style="width: 200px">
                <a-select v-model:value="formState.gender" @change="selectList" placeholder="请选择国家">
                    <a-select-option v-for="item in genderList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="国家" style="width: 200px">
                <a-select v-model:value="formState.country" @change="selectList" placeholder="请选择国家">
                    <a-select-option v-for="item in countryList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="武器" style="width: 200px">
                <a-select v-model:value="formState.arms" @change="selectList" placeholder="请选择武器">
                    <a-select-option v-for="item in armsList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="属性" style="width: 200px">
                <a-select v-model:value="formState.shuxing" @change="selectList" placeholder="请选择属性">
                    <a-select-option v-for="item in shuxingList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="星级" style="width: 200px">
                <a-select v-model:value="formState.star" @change="selectList" placeholder="请选择星级">
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
                <template v-else-if="column.key === 'country'">
                    <span>{{ countryList.find(item => item.value == record.country)?.label }}</span>
                </template>
                <template v-else-if="column.key === 'arms'">
                    <span>{{ armsList.find(item => item.value == record.arms)?.label }}</span>
                </template>
                <template v-else-if="column.key === 'shuxing'">
                    <span>{{ shuxingList.find(item => item.value == record.shuxing)?.label }}</span>
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
                            <a-popconfirm title="确定删除该角色吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record)"
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
import {
    Table as aTable, Divider as aDivider, Button as aButton, Popconfirm as aPopconfirm, message, Form as aForm, FormItem as aFormItem, Input as aInput, Select as aSelect, SelectOption as aSelectOption,
    Modal as aModal, Pagination as aPagination
} from 'ant-design-vue'
import { getHeroList, addHero, updateHero, deleteHero, type GetHeroListParams, type AddHeroParams, type UpdateHeroParams, type DeleteParams } from '@/api/yuanshen'
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
    country: number | undefined
    arms: number | undefined
    shuxing: number | undefined
    star: number | undefined
}
let addParams = reactive<AddParamsType>({
    _id: "",
    id: 0,
    name: "",
    gender: undefined,
    country: undefined,
    arms: undefined,
    shuxing: undefined,
    star: undefined,
    lifeSeat: "",
    life: "",
    att: "",
    def: "",
    breach: "",
    introduce: "",
    remark: ""
})

const current = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const title = ref<string>("添加角色")
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
    country: undefined,
    arms: undefined,
    shuxing: undefined,
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
const countryList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "蒙德",
    value: 1
}, {
    label: "璃月",
    value: 2
}, {
    label: "稻妻",
    value: 3
}, {
    label: "须弥",
    value: 4
}, {
    label: "枫丹",
    value: 5
}, {
    label: "穆娜塔",
    value: 6
}, {
    label: "至冬",
    value: 7
}, {
    label: "异世界",
    value: 8
}])
const armsList = ref<Type[]>([{
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
}])
const shuxingList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "风",
    value: 1
}, {
    label: "岩",
    value: 2
}, {
    label: "雷",
    value: 3
}, {
    label: "草",
    value: 4
}, {
    label: "水",
    value: 5
}, {
    label: "火",
    value: 6
}, {
    label: "冰",
    value: 7
}])
const starList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "五星",
    value: 1
}, {
    label: "四星",
    value: 2
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
        width: 120
    },
    {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        width: 60
    },
    {
        title: '国家',
        dataIndex: 'country',
        key: 'country',
        width: 80,
    },
    {
        title: '武器',
        dataIndex: 'arms',
        key: 'arms',
        width: 100,
    },
    {
        title: '属性',
        dataIndex: 'shuxing',
        key: 'shuxing',
        width: 60,
    },
    {
        title: '星级',
        dataIndex: 'star',
        key: 'star',
        width: 80,
    },
    {
        title: '生命',
        dataIndex: 'life',
        key: 'life',
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.life) - parseInt(b.life)
        }
    },
    {
        title: '攻击',
        dataIndex: 'att',
        key: 'att',
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.att) - parseInt(b.att)
        }
    },
    {
        title: '防御',
        dataIndex: 'def',
        key: 'def',
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.def) - parseInt(b.def)
        }
    },
    {
        title: '突破加成',
        dataIndex: 'breach',
        key: 'breach',
        width: 160,
    },
    {
        title: '命之座',
        dataIndex: 'lifeSeat',
        key: 'lifeSeat',
        width: 100,
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
        country: formState.country,
        arms: formState.arms,
        shuxing: formState.shuxing,
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
    formState.gender = formState.country = formState.arms = formState.shuxing = formState.star = undefined
    selectList()
}

function showModal(showType: AddType, item?: AddParamsType) {
    type.value = showType
    if (showType === 'edit') {
        title.value = "修改角色"
        if (item) {
            addParams._id = item._id
            addParams.name = item.name
            addParams.gender = item.gender
            addParams.country = item.country
            addParams.arms = item.arms
            addParams.shuxing = item.shuxing
            addParams.star = item.star
            addParams.lifeSeat = item.lifeSeat
            addParams.life = item.life
            addParams.att = item.att
            addParams.def = item.def
            addParams.breach = item.breach
            addParams.introduce = item.introduce
            addParams.remark = item.remark
            addParams.id = item.id
        }
    } else if (showType === 'add') {
        title.value = "添加角色"
        addParams.gender = addParams.country = addParams.arms = addParams.shuxing = addParams.star = undefined
        addParams._id = addParams.name = addParams.introduce = addParams.remark = ''
        addParams.id = 0
    } else if (showType === 'detail') {
        title.value = "查看详情"
        if (item) {
            addParams.name = item.name
            addParams.gender = item.gender
            addParams.country = item.country
            addParams.arms = item.arms
            addParams.shuxing = item.shuxing
            addParams.star = item.star
            addParams.lifeSeat = item.lifeSeat
            addParams.life = item.life
            addParams.att = item.att
            addParams.def = item.def
            addParams.breach = item.breach
            addParams.introduce = item.introduce
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