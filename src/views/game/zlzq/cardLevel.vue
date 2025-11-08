<template>
    <div class="main">
        <div class="title">
            卡牌列表
        </div>
        <a-form class="searchHead" :wrapperCol="{ span: 16 }" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="名称" style="width: 200px">
                <a-input v-model:value="formState.name" style="width: 120px;" placeholder="输入名称" />
            </a-form-item>
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
        <span style="margin-right: 30px;">白石头累计消耗：{{ countBaishitou }}</span>
        <span style="margin-right: 30px;">钻石累计消耗：{{ countZuanshi }}</span>
        <span style="margin-right: 30px;">蓝卡卡等：{{ blueLevel }}</span>
        <span style="margin-right: 30px;">紫卡卡等：{{ purpleLevel }}</span>
        <span style="margin-right: 30px;">金卡卡等：{{ goldLevel }}</span>
        <span>总卡等：{{ allLevel }}</span>
        <MyTabel :columnsData="columns" :dataSource="tableData" :pagination="false"></MyTabel>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { blueObj, purpleObj, goldObj } from "@/utils/global";
import simangdiguo from "./myCardLevel/simangdiguo.json";
import chanyigu from "./myCardLevel/chanyigu.json";
import tiantanggang from "./myCardLevel/tiantanggang.json";
import yinmizhe from "./myCardLevel/yinmizhe.json";
import MyTabel from "@/components/table.vue";

const total = ref<number>(0);
const columns = ref<any>([
    {
        title: "序号",
        key: "index",
        align: "center",
        width: 60
    },
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 100
    },
    {
        title: "阵营",
        dataIndex: "zhenyin",
        key: "zhenyin",
        width: 100,
        customRender: (opt: any) => {
            return zhenyinList.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "品质",
        dataIndex: "quality",
        key: "quality",
        width: 80
    },
    {
        title: "费用",
        dataIndex: "cost",
        key: "cost",
        width: 80,
        sorter: (a: any, b: any) => {
            return parseInt(a.cost) - parseInt(b.cost)
        }
    },
    {
        title: "等级",
        dataIndex: "level",
        key: "level",
        width: 80,
        sorter: (a: any, b: any) => {
            return parseInt(a.level) - parseInt(b.level)
        }
    },
    {
        title: "当前卡数",
        dataIndex: "count",
        key: "count",
        width: 100,
        customRender: (opt: any) => {
            switch (opt.record.quality) {
                case "蓝":
                    return opt.record.count;
                case "紫":
                    return opt.record.count;
                case "橙":
                    return opt.record.count;
                default:
                    return ""
            }
        },
        sorter: (a: any, b: any) => {
            return parseInt(a.count) - parseInt(b.count)
        }
    },
    {
        title: "贷款数",
        dataIndex: "daikuan",
        key: "daikuan",
        width: 100,
        sorter: (a: any, b: any) => {
            return parseInt(a.daikuan) - parseInt(b.daikuan)
        }
    },
    {
        title: "下级还差",
        dataIndex: "nextlevel",
        key: "nextlevel",
        width: 100,
        customRender: (opt: any) => {
            switch (opt.record.quality) {
                case "蓝":
                    return opt.record.level == 20 ? "/" : blueObj[opt.record.level].count - opt.record.count;
                case "紫":
                    return opt.record.level == 20 ? "/" : purpleObj[opt.record.level].count - opt.record.count;
                case "橙":
                    return opt.record.level == 20 ? "/" : goldObj[opt.record.level].count - opt.record.count;
                default:
                    return ""
            }
        }
    },
    /* {
        title: "类型",
        dataIndex: "type",
        key: "type",
        width: 80,
        customRender: (opt: any) => opt.value == 1 ? "战士" : "法术"
    },
    {
        title: "攻击",
        dataIndex: "attack",
        key: "attck",
        width: 80,
        sorter: (a: any, b: any) => {
            return parseInt(a.attack) - parseInt(b.attack)
        }
    },
    {
        title: "生命",
        dataIndex: "life",
        key: "life",
        width: 80,
        sorter: (a: any, b: any) => {
            return parseInt(a.life) - parseInt(b.life)
        }
    },
    {
        title: "效果",
        key: "effect",
        dataIndex: "effect",
        width: 160
    },
    {
        title: "皮肤效果",
        key: "remark",
        dataIndex: "remark",
        width: 160
    }, */
    {
        title: "钻石",
        key: "zuanshi",
        dataIndex: "zuanshi",
        width: 100,
        sorter: (a: any, b: any) => {
            return parseInt(a.zuanshi) - parseInt(b.zuanshi)
        }
    },
    {
        title: "白石头消耗",
        key: "bai",
        dataIndex: "bai",
        width: 100,
        sorter: (a: any, b: any) => {
            return parseInt(a.bai) - parseInt(b.bai)
        }
    }
]);
const tableData = ref<any>([]);
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
    label: "禅意谷",
    value: 2
}, {
    label: "天堂港",
    value: 3
}, {
    label: "隐秘者",
    value: 7
}];
const levelList = [{
    label: "全部",
    value: ""
}, {
    label: "20级",
    value: 20
}, {
    label: "19级",
    value: 19
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
const countBaishitou = ref(0);
const countZuanshi = ref(0);
const blueLevel = ref<any>(1);
const purpleLevel = ref<any>(1);
const goldLevel = ref<any>(1);
const allLevel = ref<any>(1);

async function getList() {
    countBaishitou.value = countZuanshi.value = 0;
    simangdiguo.forEach((item: any) => item.zhenyin = 1);
    chanyigu.forEach((item: any) => item.zhenyin = 2);
    tiantanggang.forEach((item: any) => item.zhenyin = 3);
    yinmizhe.forEach((item: any) => item.zhenyin = 7);
    let allData: any = [...simangdiguo, ...chanyigu, ...tiantanggang, ...yinmizhe];
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
    let leveDataBlue = allData.filter((e: any) => e.quality == "蓝").map((e: any) => e.level);
    let leveDataPurple = allData.filter((e: any) => e.quality == "紫").map((e: any) => e.level);
    let leveDataGold = allData.filter((e: any) => e.quality == "橙").map((e: any) => e.level);
    let levelDataAll = allData.map((e: any) => e.level);
    blueLevel.value = (leveDataBlue.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0) / leveDataBlue.length).toFixed(2);
    purpleLevel.value = (leveDataPurple.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0) / leveDataPurple.length).toFixed(2);
    goldLevel.value = (leveDataGold.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0) / leveDataGold.length).toFixed(2);
    allLevel.value = (levelDataAll.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0) / levelDataAll.length).toFixed(2);
    tableData.value = allData;
    for (let i = 0; i < tableData.value.length; i++) {
        tableData.value[i].id = i + 1;
        tableData.value[i].bai = getBai(tableData.value[i].quality, tableData.value[i].level);
        tableData.value[i].zuanshi = getZuan(tableData.value[i].quality, tableData.value[i].level);
        countBaishitou.value += tableData.value[i].bai;
        countZuanshi.value += tableData.value[i].zuanshi;
    }
}

function getBai(quality: string, level: number) {
    if (quality == "蓝") {
        return blueObj[level - 1].cailiao[3];
    } else if (quality == "紫") {
        return purpleObj[level - 1].cailiao[3];
    } else if (quality == "橙") {
        return goldObj[level - 1].cailiao[3];
    } else {
        return 0;
    }
}

function getZuan(quality: string, level: number) {
    if (quality == "蓝") {
        return blueObj[level - 1].zuanshi;
    } else if (quality == "紫") {
        return purpleObj[level - 1].zuanshi;
    } else if (quality == "橙") {
        return goldObj[level - 1].zuanshi;
    } else {
        return 0;
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

    .pagination {
        margin: 20px 0 20px 20px;
    }
}
</style>