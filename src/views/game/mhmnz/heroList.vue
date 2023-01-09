<template>
    <div class="main">
        <div class="title">
            英雄列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增英雄
            </a-button>
        </div>
        <a-form class="searchHead" :wrapperCol="{ span: 16 }" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="稀有度" style="width: 220px">
                <a-select v-model:value="formState.star" @change="selectList" placeholder="请选择稀有度">
                    <a-select-option v-for="item in starList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="性别" style="width: 200px">
                <a-select v-model:value="formState.gender" @change="selectList" placeholder="请选择性别">
                    <a-select-option v-for="item in genderList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="阵营" style="width: 200px">
                <a-select v-model:value="formState.camp" @change="selectList" placeholder="请选择阵营">
                    <a-select-option v-for="item in campList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="技能组" style="width: 220px">
                <a-input v-model:value="formState.superSkill" placeholder="请输入技能组" />
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
                <template v-else-if="column.key === 'star'">
                    <span>{{ starList.find(item => item.value == record.star)?.label }}</span>
                </template>
                <template v-else-if="column.key === 'gender'">
                    <span>{{ genderList.find(item => item.value == record.gender)?.label }}</span>
                </template>
                <template v-else-if="column.key === 'camp'">
                    <span>{{ getCamp(record.camp) }}</span>
                </template>
                <template v-else-if="column.key === 'action'">
                    <span style="display: flex;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                        <a-button size="small" @click="showModal('detail', record)">查看详情</a-button>
                        <span v-if="levelId === 1">
                            <a-divider type="vertical" />
                            <a-button size="small" @click="showModal('edit', record)">修改</a-button>
                            <a-divider type="vertical" />
                            <a-popconfirm title="确定删除该英雄吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record)"
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
    Table as aTable, Divider as aDivider, Button as aButton, Popconfirm as aPopconfirm, message, Select as aSelect, SelectOption as aSelectOption,
    Modal as aModal, Pagination as aPagination, Form as aForm, FormItem as aFormItem
} from 'ant-design-vue'
import { getHeroList, addHero, updateHero, deleteHero, type GetHeroListParams, type AddHeroParams, type UpdateHeroParams, type DeleteParams } from '@/api/mhmnz'
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
    qq: string
    group: string
    position: string
    castGrainSkill: string
}
let addParams = reactive<AddParamsType>({
    _id: '',
    id: 0,
    name: '',
    gender: undefined,
    star: undefined,
    camp: [],
    exclusive: '',
    superSkill: '',
    castGrainSkill: '',
    talent: '',
    introduce: ''
})

const current = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const title = ref<string>("添加兵种")
const addPage = ref<AddPageAPI>()
const userInfo = ref<string | null>(window.sessionStorage.getItem('userInfo'))
const levelId = ref<number | null>(null)
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level
} else {
    levelId.value = null
}
const visible = ref<boolean>(false)
interface FormStateType {
    star: number | undefined
    gender: number | undefined
    camp: number | undefined
    superSkill: string
}
const formState = reactive<FormStateType>({
    star: undefined,
    gender: undefined,
    camp: undefined,
    superSkill: ""
})
const starList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "SP",
    value: 4
}, {
    label: "SSR",
    value: 3
}, {
    label: "SR",
    value: 2
}, {
    label: "R",
    value: 1
}])
const genderList = ref<Type[]>([{
    label: "全部",
    value: 0,
}, {
    label: "男",
    value: 1,
}, {
    label: "女",
    value: 2,
}])
const campList = ref<Type[]>([{
    label: "全部",
    value: 0,
}, {
    label: "主角光环",
    value: 1,
}, {
    label: "光辉军团",
    value: 2,
}, {
    label: "光之起源",
    value: 3,
}, {
    label: "帝国之辉",
    value: 4,
}, {
    label: "黑暗轮回",
    value: 5,
}, {
    label: "公主联盟",
    value: 6,
}, {
    label: "战略大师",
    value: 7,
}, {
    label: "流星直击",
    value: 8,
}, {
    label: "传说彼端",
    value: 9,
}, {
    label: "时空枢纽",
    value: 10,
}, {
    label: "超凡领域",
    value: 11,
}, {
    label: "梦幻转生",
    value: 12,
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
        width: 100
    },
    {
        title: '稀有度',
        dataIndex: 'star',
        key: 'star',
        width: 100,
    },
    {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        width: 80
    },
    {
        title: '阵营',
        dataIndex: 'camp',
        key: 'camp',
        width: 200
    },
    {
        title: '专属',
        dataIndex: 'exclusive',
        key: 'exclusive',
        width: 140
    },
    {
        title: '技能组',
        dataIndex: 'superSkill',
        key: 'superSkill',
        width: 280
    },
    {
        title: '铸纹技能',
        dataIndex: 'castGrainSkill',
        key: 'castGrainSkill',
        width: 200
    },
    {
        title: '介绍',
        dataIndex: 'introduce',
        key: 'introduce',
        width: 200
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
const type = ref<AddType>("add")
const mql = window.matchMedia('(max-width: 768px)')
function mediaMatchs() {
    if (mql.matches) {
        scrollObj.y = 550
    } else {
        scrollObj.y = undefined
    }
}
mediaMatchs()
mql.addEventListener("change", mediaMatchs)

function getCamp(arr: number[]) {
    let brr = []
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let str = campList.value.find(item => item.value == arr[i])?.label ? campList.value.find(item => item.value == arr[i])?.label : ""
            brr.push(str)
        }
    }
    let result = brr.join("、")
    return result
}

async function getList() {
    const params: GetHeroListParams = {
        pageSize: pageSize.value,
        pageNo: current.value,
        star: formState.star,
        gender: formState.gender,
        camp: formState.camp,
        superSkill: formState.superSkill
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
    formState.star = formState.gender = formState.camp = undefined
    formState.superSkill = ""
    selectList()
}

function showModal(showType: AddType, item?: AddParamsType) {
    type.value = showType
    if (showType === 'edit') {
        title.value = "修改英雄"
        if (item) {
            addParams._id = item._id
            addParams.name = item.name
            addParams.gender = item.gender
            addParams.star = item.star
            addParams.introduce = item.introduce
            addParams.exclusive = item.exclusive
            addParams.superSkill = item.superSkill
            addParams.castGrainSkill = item.castGrainSkill
            addParams.talent = item.talent
            addParams.camp = item.camp
            addParams.id = item.id
        }
    } else if (showType === 'add') {
        title.value = "添加英雄"
        addParams.gender = addParams.star = undefined
        addParams.camp = []
        addParams._id = addParams.name = addParams.exclusive = addParams.superSkill = addParams.castGrainSkill = addParams.introduce = ''
        addParams.id = 0
    } else if (showType === 'detail') {
        title.value = "查看详情"
        if (item) {
            addParams.name = item.name
            addParams.gender = item.gender
            addParams.star = item.star
            addParams.introduce = item.introduce
            addParams.exclusive = item.exclusive
            addParams.superSkill = item.superSkill
            addParams.castGrainSkill = item.castGrainSkill
            addParams.talent = item.talent
            addParams.camp = item.camp
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