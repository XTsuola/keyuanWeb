<template>
    <div class="main">
        <div class="title">
            卡牌列表
        </div>
        <a-form class="searchHead" :wrapperCol="{ span: 16 }" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="阵营" style="width: 200px">
                <a-select v-model:value="formState.zhenyin" mode="multiple" style="width: 120px;" placeholder="请选择阵营">
                    <a-select-option v-for="item in zhenyinList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="品质" style="width: 200px">
                <a-select v-model:value="formState.quality" style="width: 120px;" placeholder="请选择品质">
                    <a-select-option v-for="item in qualityList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="费用" style="width: 200px">
                <a-select v-model:value="formState.cost" style="width: 120px;" placeholder="请选择费用">
                    <a-select-option v-for="item in costList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="类型" style="width: 200px">
                <a-select v-model:value="formState.type" style="width: 120px;" placeholder="请选择类型">
                    <a-select-option v-for="item in typeList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="等级" style="width: 200px">
                <a-select v-model:value="formState.level" style="width: 120px;" placeholder="请选择等级">
                    <a-select-option v-for="item in levelList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item>
                <div style="display: flex;justify-content: flex-start;">
                    <a-button size="small" style="margin: 0 12px 0 12px" @click="getList">查询</a-button>
                    <a-button size="small" @click="reset">重置</a-button>
                </div>
            </a-form-item>
        </a-form>
        <a-table :columns="columns" :data-source="data" :scroll="scrollObj">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                    <a>{{ record.name }}</a>
                </template>
                <template v-if="column.key === 'zhenyin'">
                    {{ zhenyinList.find((item: any) => item.value == record.zhenyin)?.label }}
                </template>
                <template v-if="column.key === 'action'">
                    <span style="display: flex;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                        <a-button size="small">查看详情</a-button>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import { Table as aTable, message } from "ant-design-vue"
import simangdiguo from "./cardInfo_15/simangdiguo.json"
import chanyigu from "./cardInfo_15/chanyigu.json"
import tiantanggang from "./cardInfo_15/tiantanggang.json"
import manshikuangye from "./cardInfo_15/manshikuangye.json"
import dongshenshitu from "./cardInfo_15/dongshenshitu.json"
import lianyushenyuan from "./cardInfo_15/lianyushenyuan.json"
import yinmizhe from "./cardInfo_15/yinmizhe.json"

export interface Type {
    label: string
    value: number | undefined
}

interface scrollType {
    x: number
    y: number | undefined
}

const total = ref<number>(0)
const visible = ref<boolean>(false)
const columns = ref<any>([
    {
        title: "序号",
        dataIndex: "id",
        key: "id",
        width: 80
    },
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 120
    },
    {
        title: "阵营",
        dataIndex: "zhenyin",
        key: "zhenyin",
        width: 100
    },
    {
        title: "品质",
        dataIndex: "quality",
        key: "quality",
        width: 80
    },
    {
        title: "等级",
        dataIndex: "level",
        key: "level",
        width: 100
    },
    {
        title: "费用",
        dataIndex: "cost",
        key: "cost",
        width: 100
    },
    {
        title: "类型",
        dataIndex: "type",
        key: "type",
        width: 100,
        customRender: (opt: any) => opt.value == 1 ? "战士" : "法术"
    },
    {
        title: "攻击",
        dataIndex: "attack",
        key: "attck",
        width: 100,
        sorter: (a: any, b: any) => {
            return parseInt(a.attack) - parseInt(b.attack)
        }
    },
    {
        title: "生命",
        dataIndex: "life",
        key: "life",
        width: 100,
        sorter: (a: any, b: any) => {
            return parseInt(a.life) - parseInt(b.life)
        }
    },
    {
        title: "总计",
        key: "remark",
        dataIndex: "remark",
        width: 100,
        customRender: (opt: any) => {
            return parseInt(opt.record.attack) + parseInt(opt.record.life)
        },
        sorter: (a: any, b: any) => {
            return (parseInt(a.life) + parseInt(a.attack)) - (parseInt(b.life) + parseInt(b.attack))
        }
    },
    {
        title: "效果",
        key: "effect",
        dataIndex: "effect",
        width: 300
    },
    /* {
        title: "操作",
        key: "action",
        width: 160
    }, */
])

const data = ref<any>([])
const scrollObj = reactive<scrollType>({ x: 400, y: undefined })
const mql = window.matchMedia('(max-width: 768px)')

const qualityList = [{
    label: "全部",
    value: ""
}, {
    label: "橙",
    value: "橙"
}, {
    label: "紫",
    value: "紫"
}, {
    label: "蓝",
    value: "蓝"
}, {
    label: "白",
    value: "白"
}]

const costList = [{
    label: "全部",
    value: "",
}, {
    label: "9费",
    value: 9
}, {
    label: "8费",
    value: 8
}, {
    label: "7费",
    value: 7
}, {
    label: "6费",
    value: 6
}, {
    label: "5费",
    value: 5
}, {
    label: "4费",
    value: 4
}, {
    label: "3费",
    value: 3
}, {
    label: "2费",
    value: 2
}, {
    label: "1费",
    value: 1
}, {
    label: "0费",
    value: 0
}]

const typeList = [{
    label: "全部",
    value: ""
}, {
    label: "战士",
    value: 1
}, {
    label: "法术",
    value: 2
}, {
    label: "传记",
    value: 3
}]

const zhenyinList = [{
    label: "四芒帝国",
    value: 1
}, {
    label: "禅意谷",
    value: 2
}, {
    label: "天堂港",
    value: 3
}, {
    label: "蛮石旷野",
    value: 4
}, {
    label: "冬神使徒",
    value: 5
}, {
    label: "炼狱深渊",
    value: 6
}, {
    label: "隐秘者",
    value: 7
}]

const levelList = [{
    label: "全部",
    value: ""
}, {
    label: "10级",
    value: 10
}, {
    label: "12级",
    value: 12
}, {
    label: "15级",
    value: 15
}, {
    label: "16级",
    value: 16
}]

const formState = reactive({
    zhenyin: [],
    quality: undefined,
    level: undefined,
    cost: undefined,
    type: undefined
})

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
    simangdiguo.forEach((item: any) => item.zhenyin = 1)
    chanyigu.forEach((item: any) => item.zhenyin = 2)
    tiantanggang.forEach((item: any) => item.zhenyin = 3)
    manshikuangye.forEach((item: any) => item.zhenyin = 4)
    dongshenshitu.forEach((item: any) => item.zhenyin = 5)
    lianyushenyuan.forEach((item: any) => item.zhenyin = 6)
    yinmizhe.forEach((item: any) => item.zhenyin = 7)
    let allData: any = [...simangdiguo, ...chanyigu, ...tiantanggang, ...manshikuangye, ...dongshenshitu, ...lianyushenyuan, ...yinmizhe]
    if (formState.zhenyin.length > 0) {
        allData = allData.filter((item: any) => formState.zhenyin.findIndex((e: any) => e == item.zhenyin) != -1)
    }
    if (formState.quality) {
        allData = allData.filter((item: any) => item.quality == formState.quality)
    }
    if (formState.cost != undefined && formState.cost != "") {
        allData = allData.filter((item: any) => item.cost == formState.cost)
    }
    if (formState.type) {
        allData = allData.filter((item: any) => item.type == formState.type)
    }
    if (formState.level) {
        allData = allData.filter((item: any) => item.level == formState.level)
    }

    total.value = allData.length
    data.value = allData
    for (let i = 0; i < data.value.length; i++) {
        data.value[i].id = i + 1
    }
    /* const params: GetHeroListParams = {
        pageSize: pageSize.value,
        pageNo: current.value,
    }
    const res = await getHeroList(params)
    if (res.data.code === 200) {
        data.value = res.data.rows
        total.value = res.data.total
    } */
}

function reset() {
    formState.zhenyin = []
    formState.quality = formState.cost = formState.type = formState.level = undefined
    getList()
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