<template>
    <div class="main">
        <div class="title">
            卡牌列表
        </div>
        <a-form class="searchHead" :wrapperCol="{ span: 16 }" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="名称" style="width: 200px">
                <a-input v-model:value="formState.name" style="width: 120px;" placeholder="输入名称" />
            </a-form-item>
            <a-form-item label="阵营" style="width: 280px">
                <a-select v-model:value="formState.zhenyin" mode="multiple" style="width: 220px;" placeholder="请选择阵营">
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
        <div class="cardLevel">
            <span>蓝卡等级：{{ blueCard.toFixed(2) }}</span>
            <span>紫卡等级：{{ purpleCard.toFixed(2) }}</span>
            <span>橙卡等级：{{ orangeCard.toFixed(2) }}</span>
            <span>总计等级：{{ allCard.toFixed(2) }}</span>
        </div>
        <a-table :columns="columns" :data-source="data" :scroll="scrollObj" :pagination="{ pageSize: 30 }">
            <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'index'">
                    {{ index + 1 }}
                </template>
                <template v-if="column.key === 'name'">
                    <a>{{ record.name }}</a>
                </template>
                <template v-if="column.key === 'zhenyin'">
                    {{zhenyinList.find(item => item.value == record.zhenyin)?.label}}
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
import { getMyCard } from "@/utils/some";
import { onMounted, reactive, ref } from "vue";
import simangdiguo from "./myCardLevel/simangdiguo.json";
import yinmizhe from "./myCardLevel/yinmizhe.json";

export interface Type {
    label: string
    value: number | undefined
}

interface scrollType {
    x: number
    y: number | undefined
}

const total = ref<number>(0);
const visible = ref<boolean>(false);
const columns = ref<any>([
    {
        title: "序号",
        key: "index",
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
        width: 100,
        sorter: (a: any, b: any) => {
            return parseInt(a.level) - parseInt(b.level)
        }
    },
    {
        title: "费用",
        dataIndex: "cost",
        key: "cost",
        width: 100,
        sorter: (a: any, b: any) => {
            return parseInt(a.cost) - parseInt(b.cost)
        }
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
        title: "效果",
        key: "effect",
        dataIndex: "effect",
        width: 300
    },
    {
        title: "皮肤效果",
        key: "remark",
        dataIndex: "remark",
        width: 300
    },
]);

const data = ref<any>([]);
const scrollObj = reactive<scrollType>({ x: 400, y: undefined });
const mql = window.matchMedia('(max-width: 768px)');
const qualityList = [{
    label: "全部",
    value: ""
}, {
    label: "蓝",
    value: "蓝"
}, {
    label: "紫",
    value: "紫"
}, {
    label: "橙",
    value: "橙"
}];
const costList = [{
    label: "全部",
    value: "",
}, {
    label: "1费",
    value: 1
}, {
    label: "2费",
    value: 2
}, {
    label: "3费",
    value: 3
}, {
    label: "4费",
    value: 4
}, {
    label: "5费",
    value: 5
}, {
    label: "6费",
    value: 6
}, {
    label: "7费",
    value: 7
}, {
    label: "8费",
    value: 8
}, {
    label: "9费",
    value: 9
}, {
    label: "0费",
    value: 0
}];
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
}];
const zhenyinList = [{
    label: "四芒帝国",
    value: 1
}, {
    label: "隐秘者",
    value: 7
}];
const levelList = [{
    label: "全部",
    value: ""
}, {
    label: "18级",
    value: 18
}, {
    label: "17级",
    value: 17
}, {
    label: "16级",
    value: 16
}, {
    label: "15级",
    value: 15
}, {
    label: "14级",
    value: 14
}, {
    label: "13级",
    value: 13
}, {
    label: "12级",
    value: 12
}];
const formState = reactive({
    name: undefined,
    zhenyin: [],
    quality: undefined,
    level: undefined,
    cost: undefined,
    type: undefined
});
const blueCard = ref(0);
const purpleCard = ref(0);
const orangeCard = ref(0);
const allCard = ref(0);

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
    simangdiguo.forEach((item: any) => item.zhenyin = 1);
    yinmizhe.forEach((item: any) => item.zhenyin = 7);
    let tempData: any = [...simangdiguo, ...yinmizhe];
    const myCardList = ["圣殿斥候1", "学仆-观测型", "方尖魔碑", "天使琼浆", "沉重否定", "全数否定", "圣殿弩手", "增援战线", "光明惩戒1", "请示隐秘者",
        "隐形术", "四芒军旗", "圣殿御卫", "破魔系教授1", "破魔系教授2", "克隆术", "学仆-脉冲型1", "学仆-脉冲型2", "学仆-脉冲型3", "冲锋装备",
        "夺取阵地", "观星台大预言家1", "惩戒天使", "禁卫指挥官", "米拉方舟", "花光春影·安娜贝尔", "百花长枪·卡罗琳", "明日香·露娜", "月之神·米拉", "白袍·伊恩"];
    let allData = getMyCard(tempData, myCardList);
    const blueList = allData.filter(e => e.quality == "蓝").map(e => { return e.level });
    const purpleList = allData.filter(e => e.quality == "紫").map(e => { return e.level });
    const orangeList = allData.filter(e => e.quality == "橙").map(e => { return e.level });
    const allList = allData.map(e => { return e.level });
    blueCard.value = blueList.length != 0 ? blueList.reduce((a: any, b: any) => a + b) / blueList.length : 0;
    purpleCard.value = purpleList.length != 0 ? purpleList.reduce((a: any, b: any) => a + b) / purpleList.length : 0;
    orangeCard.value = orangeList.length != 0 ? orangeList.reduce((a: any, b: any) => a + b) / orangeList.length : 0;
    allCard.value = allList.length != 0 ? allList.reduce((a: any, b: any) => a + b) / allList.length : 0;
    if (formState.name) {
        allData = allData.filter((item: any) => item.name.includes(formState.name));
    }
    if (formState.zhenyin.length > 0) {
        allData = allData.filter((item: any) => formState.zhenyin.findIndex((e: any) => e == item.zhenyin) != -1)
    }
    if (formState.quality) {
        allData = allData.filter((item: any) => item.quality == formState.quality);
    }
    if (formState.cost != undefined && formState.cost != "") {
        allData = allData.filter((item: any) => item.cost == formState.cost);
    }
    if (formState.type) {
        allData = allData.filter((item: any) => item.type == formState.type);
    }
    if (formState.level) {
        allData = allData.filter((item: any) => item.level == formState.level);
    }
    total.value = allData.length;
    data.value = allData;
    for (let i = 0; i < data.value.length; i++) {
        data.value[i].id = i + 1;
    }
}

function reset() {
    formState.zhenyin = [];
    formState.name = formState.quality = formState.cost = formState.type = formState.level = undefined;
    getList();
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

    .cardLevel {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 8px;

        span {
            margin-right: 50px;
        }
    }

    .pagination {
        margin: 20px 0 20px 20px;
    }
}
</style>