<template>
    <div class="main">
        <div class="title">
            {{ name }}分析图 （当前生命：{{ xueliang }} / 距离满命：{{ manXue - xueliang }}）
        </div>
        <div class="cardLevel">
            <span>蓝卡等级：{{ blueCard.toFixed(2) }}（{{ blueList.length }}张）</span>
            <span>紫卡等级：{{ purpleCard.toFixed(2) }}（{{ purpleList.length }}张）</span>
            <span>橙卡等级：{{ orangeCard.toFixed(2) }}（{{ goldList.length }}张）</span>
            <span>平均等级：{{ allCard.toFixed(2) }}</span>
        </div>
        <div>

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
            <span>还需卡折算人民币：</span>
            <div class="cardLevel">
                <span style="width: 130px;">蓝卡：{{ (nowLevel.blue * 0.01).toFixed(2) }}元</span>
                <span style="width: 130px;">紫卡：{{ (nowLevel.purple * 0.15).toFixed(2) }}元</span>
                <span style="width: 130px;">橙卡：{{ (nowLevel.gold).toFixed(2) }}元</span>
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
        <div>
            <span>还需资源折算人民币：</span>
            <div class="cardLevel">
                <span style="width: 130px;">白石头：{{ ((to20Level.baishitou - nowLevel.baishitou) * bai).toFixed(2)
                    }}元</span>
                <span style="width: 130px;">黑石头：{{ ((to20Level.heishitou - nowLevel.heishitou) * hei).toFixed(2)
                    }}元</span>
                <span style="width: 130px;">红石头：{{ ((to20Level.hongshitou - nowLevel.hongshitou) * hong).toFixed(2)
                    }}元</span>
                <span style="width: 130px;">黄石头：{{ ((to20Level.huangshitou - nowLevel.huangshitou) * huang).toFixed(2)
                    }}元</span>
                <span style="width: 130px;">钻石：{{ ((to20Level.zuanshi - nowLevel.zuanshi) * zuan).toFixed(2) }}元</span>
                <span style="width: 130px;">累计：{{ (((to20Level.baishitou - nowLevel.baishitou) * bai) +
                    ((to20Level.heishitou - nowLevel.heishitou) * hei) + ((to20Level.hongshitou -
                        nowLevel.hongshitou) * hong) + ((to20Level.huangshitou - nowLevel.huangshitou) *
                            huang) + ((to20Level.zuanshi - nowLevel.zuanshi) * zuan) + nowLevel.blue * 0.05 + nowLevel.purple *
                    0.15 + nowLevel.gold).toFixed(2) }}元 </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { blueObj, purpleObj, goldObj } from "@/utils/global";
import { ceshiData } from "./zzzz_ceshiData";
// const blueList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// const purpleList = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// const goldList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let huang = 0;
let hong = 0;
let hei = 0;
let bai = 0;
let zuan = 0.0026666
let manXue = 269;

const name = ref<any>("测试");
const xueliang = ref<any>(0);
const blueList: any = [...ceshiData[0]];
const purpleList: any = [...ceshiData[1]];
const goldList: any = [...ceshiData[2]];
name.value = ceshiData[3][0]
xueliang.value = ceshiData[3][1]

console.log(blueList)

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

async function getList() {
    let blueLevel = 0, purpleLevel = 0, goldLevel = 0;

    for (let i = 0; i < blueList.length; i++) {
        blueLevel += blueList[i];
        nowLevel.baishitou += blueObj[blueList[i] - 1].cailiao[3];
        nowLevel.heishitou += blueObj[blueList[i] - 1].cailiao[2];
        nowLevel.hongshitou += blueObj[blueList[i] - 1].cailiao[1];
        nowLevel.huangshitou += blueObj[blueList[i] - 1].cailiao[0];
        nowLevel.zuanshi += blueObj[blueList[i] - 1].zuanshi;
        nowLevel.zhanli += blueObj[blueList[i] - 1].zhanli;
        nowLevel.blue += (3584 - blueObj[blueList[i] - 1].count);
    }

    for (let i = 0; i < purpleList.length; i++) {
        purpleLevel += purpleList[i];
        nowLevel.baishitou += purpleObj[purpleList[i] - 1].cailiao[3];
        nowLevel.heishitou += purpleObj[purpleList[i] - 1].cailiao[2];
        nowLevel.hongshitou += purpleObj[purpleList[i] - 1].cailiao[1];
        nowLevel.huangshitou += purpleObj[purpleList[i] - 1].cailiao[0];
        nowLevel.zuanshi += purpleObj[purpleList[i] - 1].zuanshi;
        nowLevel.zhanli += purpleObj[purpleList[i] - 1].zhanli;
        nowLevel.purple += (2368 - purpleObj[purpleList[i] - 1].count);
    }
    for (let i = 0; i < goldList.length; i++) {
        goldLevel += goldList[i];
        nowLevel.baishitou += goldObj[goldList[i] - 1].cailiao[3];
        nowLevel.heishitou += goldObj[goldList[i] - 1].cailiao[2];
        nowLevel.hongshitou += goldObj[goldList[i] - 1].cailiao[1];
        nowLevel.huangshitou += goldObj[goldList[i] - 1].cailiao[0];
        nowLevel.zuanshi += goldObj[goldList[i] - 1].zuanshi;
        nowLevel.zhanli += goldObj[goldList[i] - 1].zhanli;
        nowLevel.gold += (1600 - goldObj[goldList[i] - 1].count)
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