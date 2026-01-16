<template>
    <div class="main">
        <div class="title">
            {{ name }}-卡组分析图 （当前生命：{{ nowLife }} / 距离满命：{{ maxLfie - nowLife }}）
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
            <span>22级满级所需资源：</span>
            <div class="cardLevel">
                <span style="width: 130px;">白石头：{{ to22Level.baishitou }}</span>
                <span style="width: 130px;">黑石头：{{ to22Level.heishitou }}</span>
                <span style="width: 130px;">红石头：{{ to22Level.hongshitou }}</span>
                <span style="width: 130px;">黄石头：{{ to22Level.huangshitou }}</span>
                <span style="width: 130px;">钻石：{{ (to22Level.zuanshi / 10000).toFixed(2) }}万</span>
                <span style="width: 130px;">战力：{{ (to22Level.zhanli / 10000).toFixed(2) }}万</span>
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
            <span>目前到满级的差值：</span>
            <div class="cardLevel">
                <span style="width: 130px;">白石头：{{ to22Level.baishitou - nowLevel.baishitou }}</span>
                <span style="width: 130px;">黑石头：{{ to22Level.heishitou - nowLevel.heishitou }}</span>
                <span style="width: 130px;">红石头：{{ to22Level.hongshitou - nowLevel.hongshitou }}</span>
                <span style="width: 130px;">黄石头：{{ to22Level.huangshitou - nowLevel.huangshitou }}</span>
                <span style="width: 130px;">钻石：{{ ((to22Level.zuanshi - nowLevel.zuanshi) / 10000).toFixed(2) }}万</span>
                <span style="width: 130px;">战力：{{ ((to22Level.zhanli - nowLevel.zhanli) / 10000).toFixed(2) }}万</span>
            </div>
        </div>
        <!-- <div>
            <span>还需资源折算人民币：</span>
            <div class="cardLevel">
                <span style="width: 130px;">白石头：{{ ((to22Level.baishitou - nowLevel.baishitou) * bai).toFixed(2)
                    }}元</span>
                <span style="width: 130px;">黑石头：{{ ((to22Level.heishitou - nowLevel.heishitou) * hei).toFixed(2)
                    }}元</span>
                <span style="width: 130px;">红石头：{{ ((to22Level.hongshitou - nowLevel.hongshitou) * hong).toFixed(2)
                    }}元</span>
                <span style="width: 130px;">黄石头：{{ ((to22Level.huangshitou - nowLevel.huangshitou) * huang).toFixed(2)
                    }}元</span>
                <span style="width: 130px;">钻石：{{ ((to22Level.zuanshi - nowLevel.zuanshi) * zuan).toFixed(2) }}元</span>
                <span style="width: 130px;">累计：{{ (((to22Level.baishitou - nowLevel.baishitou) * bai) +
                    ((to22Level.heishitou - nowLevel.heishitou) * hei) + ((to22Level.hongshitou -
                        nowLevel.hongshitou) * hong) + ((to22Level.huangshitou - nowLevel.huangshitou) *
                            huang) + ((to22Level.zuanshi - nowLevel.zuanshi) * zuan) + nowLevel.blue * 0.05 + nowLevel.purple *
                    0.15 + nowLevel.gold).toFixed(2) }}元 </span>
            </div>
        </div> -->
        <div>
            <div>强卡占比：</div>
            <div style="display: flex;justify-content: flex-start;flex-direction: column;">
                <div style="display: flex;justify-self: flex-start;">
                    <div style="width: 60px;">SS级：</div>{{ ((ss / 30) * 100).toFixed(2) }}%
                </div>
                <div style="display: flex;justify-self: flex-start;">
                    <div style="width: 60px;">S级：</div>{{ ((s / 30) * 100).toFixed(2) }}%
                </div>
                <div style="display: flex;justify-self: flex-start;">
                    <div style="width: 60px;">A+级：</div>{{ ((aa / 30) * 100).toFixed(2) }}%
                </div>
                <div style="display: flex;justify-self: flex-start;">
                    <div style="width: 60px;">A级：</div>{{ ((a / 30) * 100).toFixed(2) }}%
                </div>
                <div style="display: flex;justify-self: flex-start;">
                    <div style="width: 60px;">B级：</div>{{ ((b / 30) * 100).toFixed(2) }}%
                </div>
                <div style="display: flex;justify-self: flex-start;">
                    <div style="width: 60px;">C级：</div>{{ ((c / 30) * 100).toFixed(2) }}%
                </div>
                <div style="display: flex;justify-self: flex-start;">
                    <div style="width: 60px;">D级：</div>{{ ((d / 30) * 100).toFixed(2) }}%
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { blueObj, purpleObj, goldObj } from "@/utils/global";
import { gradeData as data, gradeData } from "./cardData22/data";
import { ceshiData } from "./zzzz_ceshiData";

let huang = 0.00213;
let hong = 0.01093;
let hei = 0.06453;
let bai = 0.054;
let zuan = 0.0026666
let maxLfie = 321;

const name = ref<any>("测试");
const nowLife = ref<any>(0);
const ss = ref(0);
const s = ref(0);
const aa = ref(0);
const a = ref(0);
const b = ref(0);
const c = ref(0);
const d = ref(0);
const cardList: string[] = ceshiData.cardList;
const cardLevel: number[] = ceshiData.cardLevel;
const blueList: number[] = [];
const purpleList: number[] = [];
const goldList: number[] = [];
for (let i = 0; i < cardList.length; i++) {
    const obj: any = gradeData.find((e: any) => e.name == cardList[i]);
    const grade = JSON.parse(obj.grade)[0];
    const qulaity = obj.quality;
    if (qulaity == 4) goldList.push(cardLevel[i]);
    else if (qulaity == 3) purpleList.push(cardLevel[i]);
    else if (qulaity == 2) blueList.push(cardLevel[i]);
    if (grade == 6) ss.value++;
    else if (grade == 5) s.value++;
    else if (grade == 4) aa.value++;
    else if (grade == 3) a.value++;
    else if (grade == 2) b.value++;
    else if (grade == 1) c.value++;
    else if (grade == 0) d.value++;
}

name.value = ceshiData.name + "-" + ceshiData.hero.name;
nowLife.value = ceshiData.hero.life;

const to22Level = reactive<any>({
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
        nowLevel.blue += (4864 - blueObj[blueList[i] - 1].count);
    }

    for (let i = 0; i < purpleList.length; i++) {
        purpleLevel += purpleList[i];
        nowLevel.baishitou += purpleObj[purpleList[i] - 1].cailiao[3];
        nowLevel.heishitou += purpleObj[purpleList[i] - 1].cailiao[2];
        nowLevel.hongshitou += purpleObj[purpleList[i] - 1].cailiao[1];
        nowLevel.huangshitou += purpleObj[purpleList[i] - 1].cailiao[0];
        nowLevel.zuanshi += purpleObj[purpleList[i] - 1].zuanshi;
        nowLevel.zhanli += purpleObj[purpleList[i] - 1].zhanli;
        nowLevel.purple += (3200 - purpleObj[purpleList[i] - 1].count);
    }
    for (let i = 0; i < goldList.length; i++) {
        goldLevel += goldList[i];
        nowLevel.baishitou += goldObj[goldList[i] - 1].cailiao[3];
        nowLevel.heishitou += goldObj[goldList[i] - 1].cailiao[2];
        nowLevel.hongshitou += goldObj[goldList[i] - 1].cailiao[1];
        nowLevel.huangshitou += goldObj[goldList[i] - 1].cailiao[0];
        nowLevel.zuanshi += goldObj[goldList[i] - 1].zuanshi;
        nowLevel.zhanli += goldObj[goldList[i] - 1].zhanli;
        nowLevel.gold += (2112 - goldObj[goldList[i] - 1].count)
    }
    blueCard.value = blueLevel / blueList.length;
    purpleCard.value = purpleLevel / purpleList.length;
    orangeCard.value = goldLevel / goldList.length;
    allCard.value = (blueLevel + purpleLevel + goldLevel) / (blueList.length + purpleList.length + goldList.length);

    to22Level.baishitou = (blueList.length * blueObj[21].cailiao[3]) + (purpleList.length * purpleObj[21].cailiao[3]) + (goldList.length * goldObj[21].cailiao[3]);
    to22Level.heishitou = (blueList.length * blueObj[21].cailiao[2]) + (purpleList.length * purpleObj[21].cailiao[2]) + (goldList.length * goldObj[21].cailiao[2]);
    to22Level.hongshitou = (blueList.length * blueObj[21].cailiao[1]) + (purpleList.length * purpleObj[21].cailiao[1]) + (goldList.length * goldObj[21].cailiao[1]);
    to22Level.huangshitou = (blueList.length * blueObj[21].cailiao[0]) + (purpleList.length * purpleObj[21].cailiao[0]) + (goldList.length * goldObj[21].cailiao[0]);
    to22Level.zuanshi = (blueList.length * blueObj[21].zuanshi) + (purpleList.length * purpleObj[21].zuanshi) + (goldList.length * goldObj[21].zuanshi);
    to22Level.zhanli = (blueList.length * blueObj[21].zhanli) + (purpleList.length * purpleObj[21].zhanli) + (goldList.length * goldObj[21].zhanli);
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