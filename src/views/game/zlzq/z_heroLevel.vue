@ -1,377 +0,0 @@
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

        <div class="cardLevel">
            <span>蓝卡等级：{{ blueCard.toFixed(2) }}</span>
            <span>紫卡等级：{{ purpleCard.toFixed(2) }}</span>
            <span>橙卡等级：{{ orangeCard.toFixed(2) }}</span>
            <span>平均等级：{{ allCard.toFixed(2) }}</span>
        </div>
        <div>
            <span>还需卡数量：</span>
            <div class="cardLevel">
                <span style="width: 130px;">蓝卡：{{ nowLevel.blue }}</span>
                <span style="width: 130px;">紫卡：{{ nowLevel.purple }}</span>
                <span style="width: 130px;">橙卡：{{ nowLevel.gold }}</span>
            </div>
        </div>
        <div>
            <span>当前等级已用资源：</span>
            <div class="cardLevel">
                <span style="width: 130px;">白石头：{{ nowLevel.baishitou }}</span>
                <span style="width: 130px;">黑石头：{{ nowLevel.heishitou }}</span>
                <span style="width: 130px;">红石头：{{ nowLevel.hongshitou }}</span>
                <span style="width: 130px;">黄石头：{{ nowLevel.huangshitou }}</span>
                <span style="width: 130px;">钻石：{{ (nowLevel.zuanshi / 10000).toFixed(2) }}万</span>
                <span style="width: 130px;">战力：{{ (nowLevel.zhanli / 10000).toFixed(2) }}万</span>
            </div>
        </div>
        <div>
            <span>20级满级所需资源：</span>
            <div class="cardLevel">
                <span style="width: 130px;">白石头：{{ to20Level.baishitou }}</span>
                <span style="width: 130px;">黑石头：{{ to20Level.heishitou }}</span>
                <span style="width: 130px;">红石头：{{ to20Level.hongshitou }}</span>
                <span style="width: 130px;">黄石头：{{ to20Level.huangshitou }}</span>
                <span style="width: 130px;">钻石：{{ (to20Level.zuanshi / 10000).toFixed(2) }}万</span>
                <span style="width: 130px;">战力：{{ (to20Level.zhanli / 10000).toFixed(2) }}万</span>
            </div>
        </div>
        <div>
            <span>当前到满级所需差值：</span>
            <div class="cardLevel">
                <span style="width: 130px;">白石头：{{ to20Level.baishitou - nowLevel.baishitou }}</span>
                <span style="width: 130px;">黑石头：{{ to20Level.heishitou - nowLevel.heishitou }}</span>
                <span style="width: 130px;">红石头：{{ to20Level.hongshitou - nowLevel.hongshitou }}</span>
                <span style="width: 130px;">黄石头：{{ to20Level.huangshitou - nowLevel.huangshitou }}</span>
                <span style="width: 130px;">钻石：{{ ((to20Level.zuanshi - nowLevel.zuanshi) / 10000).toFixed(2) }}万</span>
                <span style="width: 130px;">战力：{{ ((to20Level.zhanli - nowLevel.zhanli) / 10000).toFixed(2) }}万</span>
            </div>
        </div>
        <MyTabel :columnsData="columns" :dataSource="tableData" :pagination="false"></MyTabel>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { getMyCard, blueObj, purpleObj, goldObj } from "@/utils/global";
import simangdiguo from "./cardList/zz_myCard/simangdiguo.json";
import chanyigu from "./cardList/zz_myCard/chanyigu.json";
import tiantanggang from "./cardList/zz_myCard/tiantanggang.json";
import yinmizhe from "./cardList/zz_myCard/yinmizhe.json";
import MyTabel from "@/components/table.vue";

interface Prop {
    myData: string[]
    zhongzu: number[]
}

const to20Level = reactive<any>({
    baishitou: 0,
    heishitou: 0,
    hongshitou: 0,
    huangshitou: 0,
    zuanshi: 0,
    zhanli: 0,
})

const nowLevel = reactive<any>({
    baishitou: 0,
    heishitou: 0,
    hongshitou: 0,
    huangshitou: 0,
    zuanshi: 0,
    zhanli: 0,
    blue: 0,
    purple: 0,
    gold: 0
})

const blueCard = ref(0);
const purpleCard = ref(0);
const orangeCard = ref(0);
const allCard = ref(0);

const prop = defineProps<Prop>();
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
        width: 80,
        customRender: (opt: any) => {
            return zhenyinList.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "品质",
        dataIndex: "quality",
        key: "quality",
        width: 60
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
        title: "费用",
        dataIndex: "cost",
        key: "cost",
        width: 60,
        sorter: (a: any, b: any) => {
            return parseInt(a.cost) - parseInt(b.cost)
        }
    },
    {
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

async function getList() {
    let tempData: any = [];
    nowLevel.baishitou = nowLevel.heishitou = nowLevel.hongshitou = nowLevel.huangshitou = nowLevel.zhanli = nowLevel.zuanshi = nowLevel.blue = nowLevel.purple = nowLevel.gold = 0;
    if (prop.zhongzu.findIndex((e: any) => e == 1) != -1) {
        simangdiguo.forEach((item: any) => item.zhenyin = 1)
        tempData = [...tempData, ...simangdiguo]
    }
    if (prop.zhongzu.findIndex((e: any) => e == 2) != -1) {
        chanyigu.forEach((item: any) => item.zhenyin = 2)
        tempData = [...tempData, ...chanyigu]
    }
    if (prop.zhongzu.findIndex((e: any) => e == 3) != -1) {
        tiantanggang.forEach((item: any) => item.zhenyin = 3)
        tempData = [...tempData, ...tiantanggang]
    }
    if (prop.zhongzu.findIndex((e: any) => e == 7) != -1) {
        yinmizhe.forEach((item: any) => item.zhenyin = 7)
        tempData = [...tempData, ...yinmizhe]
    }
    let allData = getMyCard(tempData, prop.myData);
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
    const blueList = allData.filter(e => e.quality == "蓝");
    const purpleList = allData.filter(e => e.quality == "紫");
    const goldList = allData.filter(e => e.quality == "橙");
    let blueLevel = 0, purpleLevel = 0, goldLevel = 0;
    for (let i = 0; i < blueList.length; i++) {
        blueLevel += blueList[i].level;
        nowLevel.baishitou += blueObj[blueList[i].level - 1].cailiao[3];
        nowLevel.heishitou += blueObj[blueList[i].level - 1].cailiao[2];
        nowLevel.hongshitou += blueObj[blueList[i].level - 1].cailiao[1];
        nowLevel.huangshitou += blueObj[blueList[i].level - 1].cailiao[0];
        nowLevel.zuanshi += blueObj[blueList[i].level - 1].zuanshi;
        nowLevel.zhanli += blueObj[blueList[i].level - 1].zhanli;
        nowLevel.blue += (3584 - blueObj[blueList[i].level - 1].count);
    }

    for (let i = 0; i < purpleList.length; i++) {
        purpleLevel += purpleList[i].level;
        nowLevel.baishitou += purpleObj[purpleList[i].level - 1].cailiao[3];
        nowLevel.heishitou += purpleObj[purpleList[i].level - 1].cailiao[2];
        nowLevel.hongshitou += purpleObj[purpleList[i].level - 1].cailiao[1];
        nowLevel.huangshitou += purpleObj[purpleList[i].level - 1].cailiao[0];
        nowLevel.zuanshi += purpleObj[purpleList[i].level - 1].zuanshi;
        nowLevel.zhanli += purpleObj[purpleList[i].level - 1].zhanli;
        nowLevel.purple += (2368 - purpleObj[purpleList[i].level - 1].count);
    }
    for (let i = 0; i < goldList.length; i++) {
        goldLevel += goldList[i].level;
        nowLevel.baishitou += goldObj[goldList[i].level - 1].cailiao[3];
        nowLevel.heishitou += goldObj[goldList[i].level - 1].cailiao[2];
        nowLevel.hongshitou += goldObj[goldList[i].level - 1].cailiao[1];
        nowLevel.huangshitou += goldObj[goldList[i].level - 1].cailiao[0];
        nowLevel.zuanshi += goldObj[goldList[i].level - 1].zuanshi;
        nowLevel.zhanli += goldObj[goldList[i].level - 1].zhanli;
        nowLevel.gold += (1600 - goldObj[goldList[i].level - 1].count);
    }
    blueCard.value = blueLevel / blueList.length;
    purpleCard.value = purpleLevel / purpleList.length;
    orangeCard.value = goldLevel / goldList.length;
    allCard.value = (blueLevel + purpleLevel + goldLevel) / (blueList.length + purpleList.length + goldList.length);

    to20Level.baishitou = (blueList.length * blueObj[19].cailiao[3]) + (purpleList.length * purpleObj[19].cailiao[3]) + (goldList.length * goldObj[19].cailiao[3]);
    to20Level.heishitou = (blueList.length * blueObj[19].cailiao[2]) + (purpleList.length * purpleObj[19].cailiao[2]) + (goldList.length * goldObj[19].cailiao[2]);
    to20Level.hongshitou = (blueList.length * blueObj[19].cailiao[1]) + (purpleList.length * purpleObj[19].cailiao[1]) + (goldList.length * goldObj[19].cailiao[1]);
    to20Level.huangshitou = (blueList.length * blueObj[19].cailiao[0]) + (purpleList.length * purpleObj[19].cailiao[0]) + (goldList.length * goldObj[19].cailiao[0]);
    to20Level.zuanshi = (blueList.length * blueObj[19].zuanshi) + (purpleList.length * purpleObj[19].zuanshi) + (goldList.length * goldObj[19].zuanshi);
    to20Level.zhanli = (blueList.length * blueObj[19].zhanli) + (purpleList.length * purpleObj[19].zhanli) + (goldList.length * goldObj[19].zhanli);
    tableData.value = allData;
    for (let i = 0; i < tableData.value.length; i++) {
        tableData.value[i].id = i + 1;
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