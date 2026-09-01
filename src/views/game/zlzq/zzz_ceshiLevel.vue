<template>
    <div class="main">
        <div class="toolbar">
            <a-button type="primary" size="small" :loading="exporting" @click="exportImage">导出图片</a-button>
        </div>
        <div ref="exportRef" class="export-area">
            <header class="page-header">
                <img class="hero-img" :src="heroImg" alt="hero">
                <div class="header-text">
                    <div class="title-row">
                        <h1 class="page-title">{{ name }}</h1>
                        <span class="page-sub">卡组分析图</span>
                        <div class="quality-legend">
                            <span v-for="item in qualityLegend" :key="item.key" class="legend-item"
                                :class="`quality-${item.key}`">
                                {{ item.label }} {{ item.count }}
                            </span>
                        </div>
                    </div>
                    <div class="life-bar">
                        <span>当前生命 <b>{{ nowLife }}</b></span>
                        <span class="divider">|</span>
                        <span>满命 <b>{{ maxLife }}</b></span>
                        <span class="divider">|</span>
                        <span>还差 <b class="accent">{{ maxLife - nowLife }}</b></span>
                    </div>
                </div>
                <div class="header-power">
                    <div class="power-chip">
                        <span class="chip-label">当前战力</span>
                        <span class="chip-value">{{ currentPowerWan.toFixed(2) }}万</span>
                    </div>
                    <div class="power-chip highlight">
                        <span class="chip-label">最终战力</span>
                        <span class="chip-value">{{ finalPowerWan.toFixed(2) }}万</span>
                    </div>
                </div>
            </header>
            <section class="power-section">
                <div class="power-head">
                    <h2 class="section-title">战力构成</h2>
                    <p class="section-note">卡牌 + 英雄满级 + 金神器 + 皮肤 5 星</p>
                </div>
                <div class="power-grid">
                    <div class="power-item" v-for="item in powerRows" :key="item.label"
                        :class="[item.qualityClass, { emphasis: item.emphasis }]">
                        <span class="power-label">{{ item.label }}</span>
                        <span class="power-value">
                            <em v-if="item.qualityTag" class="shenqi-tag">{{ item.qualityTag }}</em>
                            {{ item.value }}
                        </span>
                    </div>
                </div>
            </section>
            <div class="bottom-block">
                <section class="panel-grid">
                    <article class="card">
                        <h2 class="card-title">卡等分析</h2>
                        <div class="stat-pair-grid">
                            <ul class="stat-list">
                                <li class="stat-row" v-for="item in cardAvgRows" :key="item.label"
                                    :class="item.qualityClass">
                                    <span class="stat-label">{{ item.label }}</span>
                                    <span class="stat-value">{{ item.value }}</span>
                                </li>
                            </ul>
                            <ul class="stat-list">
                                <li class="stat-row" v-for="item in cardRatioRows" :key="item.label"
                                    :class="item.qualityClass">
                                    <span class="stat-label">{{ item.label }}</span>
                                    <span class="stat-value">
                                        {{ item.ratio }}
                                        <em>（{{ item.count }}）</em>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </article>
                    <article class="card">
                        <h2 class="card-title">资源消耗</h2>
                        <ul class="stat-list need-list">
                            <li class="stat-row" v-for="item in needCardRows" :key="item.label"
                                :class="item.qualityClass">
                                <span class="stat-label">{{ item.label }}</span>
                                <span class="stat-value">{{ item.value }}</span>
                            </li>
                        </ul>
                        <div class="resource-cols">
                            <div class="resource-block">
                                <h3 class="resource-subtitle">当前消耗</h3>
                                <ul class="stat-list resource-grid">
                                    <li class="stat-row" v-for="item in currentResourceRows" :key="item.label">
                                        <span class="stat-label">{{ item.label }}</span>
                                        <span class="stat-value">{{ item.value }}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="resource-block">
                                <h3 class="resource-subtitle">到 24 级还需</h3>
                                <ul class="stat-list resource-grid">
                                    <li class="stat-row" v-for="item in remainResourceRows" :key="item.label">
                                        <span class="stat-label">{{ item.label }}</span>
                                        <span class="stat-value">{{ item.value }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </article>
                    <article class="card">
                        <h2 class="card-title">评级分析</h2>
                        <ul class="stat-list grade-grid">
                            <li class="stat-row grade-row" v-for="item in gradeRows" :key="item.label"
                                :style="{ color: item.color }">
                                <span class="stat-label">
                                    <i class="grade-dot"></i>
                                    {{ item.label }}
                                </span>
                                <span class="stat-value">
                                    {{ item.ratio }}
                                    <em>（{{ item.count }}）</em>
                                </span>
                            </li>
                        </ul>
                    </article>
                </section>
                <section class="deck-section">
                    <h2 class="section-title">当前卡组</h2>
                    <ul class="deck-list">
                        <li v-for="(item, index) in deckCards" :key="`${item.name}-${index}`" class="deck-row"
                            :class="item.qualityClass">
                            <span class="deck-index">{{ index + 1 }}</span>
                            <span class="deck-grade-tag" :style="{
                                background: item.gradeColor,
                                color: item.gradeColor === '#d4a017' ? '#4a3500' : '#fff',
                            }">{{ item.gradeLabel }}</span>
                            <span class="deck-name">{{ item.name }}</span>
                            <span class="deck-level">{{ item.level }}级</span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";
import { message } from "ant-design-vue";
import html2canvas from "html2canvas";
import { blueObj, purpleObj, goldObj, blueShenqiList, purpleShenqiList, goldShenqiList, type CardLevelConfig } from "@/utils/global";
import { gradeData } from "./dataAll/cardData";
import { heroData } from "./dataAll/heroData";
import { ceshiData } from "./zzzz_ceshiData";

const DECK_SIZE = 30;
const MAX_COUNT = { blue: 6528, purple: 4352, gold: 2720 } as const;
const qualityClassMap: Record<number, string> = {
    1: "quality-white",
    2: "quality-blue",
    3: "quality-purple",
    4: "quality-orange",
};
const shenqiMap: Record<number, { label: string; qualityClass: string; list: typeof blueShenqiList }> = {
    1: { label: "蓝色", qualityClass: "quality-blue", list: blueShenqiList },
    2: { label: "紫色", qualityClass: "quality-purple", list: purpleShenqiList },
    3: { label: "橙色", qualityClass: "quality-orange", list: goldShenqiList },
};
const gradeList = [
    { label: "SSS真神", short: "SSS", key: "sss", value: 6, color: "#d4a017" },
    { label: "SS神话", short: "SS", key: "ss", value: 5, color: "#000000" },
    { label: "S顶级", short: "S", key: "s", value: 4, color: "#ff0000" },
    { label: "A高级", short: "A", key: "a", value: 3, color: "#ff6633" },
    { label: "B能带", short: "B", key: "b", value: 2, color: "#8e488e" },
    { label: "C普通", short: "C", key: "c", value: 1, color: "#2db7f5" },
    { label: "D垃圾", short: "D", key: "d", value: 0, color: "#87d068" },
] as const;
const gradeCounterKeys = ["d", "c", "b", "a", "s", "ss", "sss"] as const;
const gradeMetaByValue = Object.fromEntries(
    gradeList.map((item) => [item.value, item])
) as Record<number, (typeof gradeList)[number]>;

function resolveGradeMeta(grade: number) {
    if (grade >= 6) return gradeMetaByValue[6];
    return gradeMetaByValue[grade] ?? gradeMetaByValue[0];
}

const exportRef = ref<HTMLElement | null>(null);
const exporting = ref(false);
const maxLife = 349;
const name = ref("");
const heroImg = ref("");
const nowLife = ref(0);
const gradeCount = reactive({ sss: 0, ss: 0, s: 0, a: 0, b: 0, c: 0, d: 0 });
const whiteList: number[] = [];
const blueList: number[] = [];
const purpleList: number[] = [];
const goldList: number[] = [];
const deckCards: Array<{
    name: string;
    level: number;
    qualityClass: string;
    gradeLabel: string;
    gradeColor: string;
}> = [];
for (let i = 0; i < ceshiData.cardList.length; i++) {
    const cardName = ceshiData.cardList[i];
    const card = gradeData.find((e: any) => e.name === cardName);
    const level = ceshiData.cardLevel[i];
    const quality = (card?.quality ?? 1) as number;
    const grade = card ? (JSON.parse(card.grade)[0] as number) : -1;
    const gradeMeta = resolveGradeMeta(grade);
    deckCards.push({
        name: cardName,
        level,
        qualityClass: qualityClassMap[quality] ?? "quality-white",
        gradeLabel: gradeMeta.short,
        gradeColor: gradeMeta.color,
    });
    if (!card) continue;
    if (quality === 4) goldList.push(level);
    else if (quality === 3) purpleList.push(level);
    else if (quality === 2) blueList.push(level);
    else whiteList.push(level);
    if (grade >= 6) gradeCount.sss++;
    else if (grade >= 0 && grade <= 5) {
        gradeCount[gradeCounterKeys[grade]]++;
    }
}
name.value = `${ceshiData.name}-${ceshiData.hero.name}`;
const img = heroData.find((e: any) => e.id == ceshiData.hero.id)?.img;
heroImg.value = img ? String(img) : "";
nowLife.value = ceshiData.hero.life;
const to24Level = reactive({
    baishitou: 0,
    heishitou: 0,
    hongshitou: 0,
    huangshitou: 0,
    zuanshi: 0,
    zhanli: 0,
});
const nowLevel = reactive({
    baishitou: 0,
    heishitou: 0,
    hongshitou: 0,
    huangshitou: 0,
    zuanshi: 0,
    zhanli: 0,
    blue: 0,
    purple: 0,
    gold: 0,
});
const whiteCard = ref(0);
const blueCard = ref(0);
const purpleCard = ref(0);
const orangeCard = ref(0);
const allCard = ref(0);

function avg(levels: number[]) {
    if (!levels.length) return 0;
    return levels.reduce((sum, cur) => sum + cur, 0) / levels.length;
}

function formatAmount(value: number) {
    return value > 10000 ? `${(value / 10000).toFixed(2)} 万` : String(value);
}

function accumulateLevels(levels: number[], config: CardLevelConfig[], maxCount: number, key: "blue" | "purple" | "gold") {
    for (const level of levels) {
        const row = config[level - 1];
        if (!row) continue;
        nowLevel.huangshitou += row.cailiao[0];
        nowLevel.hongshitou += row.cailiao[1];
        nowLevel.heishitou += row.cailiao[2];
        nowLevel.baishitou += row.cailiao[3];
        nowLevel.zuanshi += row.zuanshi;
        nowLevel.zhanli += row.zhanli;
        nowLevel[key] += maxCount - row.count;
    }
}

function calcTo24() {
    const tables = [
        { list: blueList, table: blueObj },
        { list: purpleList, table: purpleObj },
        { list: goldList, table: goldObj },
    ];
    for (const { list, table } of tables) {
        const full = table[23];
        to24Level.baishitou += list.length * full.cailiao[3];
        to24Level.heishitou += list.length * full.cailiao[2];
        to24Level.hongshitou += list.length * full.cailiao[1];
        to24Level.huangshitou += list.length * full.cailiao[0];
        to24Level.zuanshi += list.length * full.zuanshi;
        to24Level.zhanli += list.length * full.zhanli;
    }
}

function getList() {
    accumulateLevels(blueList, blueObj, MAX_COUNT.blue, "blue");
    accumulateLevels(purpleList, purpleObj, MAX_COUNT.purple, "purple");
    accumulateLevels(goldList, goldObj, MAX_COUNT.gold, "gold");
    whiteCard.value = avg(whiteList);
    blueCard.value = avg(blueList);
    purpleCard.value = avg(purpleList);
    orangeCard.value = avg(goldList);
    allCard.value = avg([...whiteList, ...blueList, ...purpleList, ...goldList]);
    calcTo24();
}

function getShenqiZhanli(list: number[]) {
    const wuqiCfg = shenqiMap[list[0]];
    const baowuCfg = shenqiMap[list[2]];
    const wuqi = wuqiCfg?.list[list[1] - 1]?.value ?? 0;
    const baowu = baowuCfg?.list[list[3] - 1]?.value ?? 0;
    return {
        zhanliWuqi: Math.floor(wuqi / 10000),
        zhanliBaowu: Math.floor(baowu / 10000),
        wuqiLabel: wuqiCfg?.label ?? "",
        baowuLabel: baowuCfg?.label ?? "",
        wuqiStar: list[1],
        baowuStar: list[3],
        wuqiQualityClass: wuqiCfg?.qualityClass ?? "",
        baowuQualityClass: baowuCfg?.qualityClass ?? "",
        wuqi: `${wuqiCfg?.label ?? ""}${list[1]}星`,
        baowu: `${baowuCfg?.label ?? ""}${list[3]}星`,
    };
}

const zhanliObj = ref(getShenqiZhanli(ceshiData.shenqiList));
const qualityLegend = computed(() => [
    { key: "white", label: "白", count: whiteList.length },
    { key: "blue", label: "蓝", count: blueList.length },
    { key: "purple", label: "紫", count: purpleList.length },
    { key: "orange", label: "橙", count: goldList.length },
]);
const cardAvgRows = computed(() => [
    { label: "白卡等级", value: `${whiteCard.value.toFixed(2)} 级`, qualityClass: "quality-white" },
    { label: "蓝卡等级", value: `${blueCard.value.toFixed(2)} 级`, qualityClass: "quality-blue" },
    { label: "紫卡等级", value: `${purpleCard.value.toFixed(2)} 级`, qualityClass: "quality-purple" },
    { label: "橙卡等级", value: `${orangeCard.value.toFixed(2)} 级`, qualityClass: "quality-orange" },
    { label: "平均等级", value: `${allCard.value.toFixed(2)} 级`, qualityClass: "" },
]);
const cardRatioRows = computed(() => [
    { label: "白卡占比", ratio: `${((whiteList.length / DECK_SIZE) * 100).toFixed(2)}%`, count: whiteList.length, qualityClass: "quality-white" },
    { label: "蓝卡占比", ratio: `${((blueList.length / DECK_SIZE) * 100).toFixed(2)}%`, count: blueList.length, qualityClass: "quality-blue" },
    { label: "紫卡占比", ratio: `${((purpleList.length / DECK_SIZE) * 100).toFixed(2)}%`, count: purpleList.length, qualityClass: "quality-purple" },
    { label: "橙卡占比", ratio: `${((goldList.length / DECK_SIZE) * 100).toFixed(2)}%`, count: goldList.length, qualityClass: "quality-orange" },
]);
const needCardRows = computed(() => [
    { label: "蓝卡", value: `${nowLevel.blue} 张`, qualityClass: "quality-blue" },
    { label: "紫卡", value: `${nowLevel.purple} 张`, qualityClass: "quality-purple" },
    { label: "橙卡", value: `${nowLevel.gold} 张`, qualityClass: "quality-orange" },
]);
const currentResourceRows = computed(() => [
    { label: "黄石头", value: formatAmount(nowLevel.huangshitou) },
    { label: "红石头", value: formatAmount(nowLevel.hongshitou) },
    { label: "黑石头", value: formatAmount(nowLevel.heishitou) },
    { label: "白石头", value: formatAmount(nowLevel.baishitou) },
    { label: "钻石", value: formatAmount(nowLevel.zuanshi) },
]);
const remainResourceRows = computed(() => [
    { label: "黄石头", value: formatAmount(to24Level.huangshitou - nowLevel.huangshitou) },
    { label: "红石头", value: formatAmount(to24Level.hongshitou - nowLevel.hongshitou) },
    { label: "黑石头", value: formatAmount(to24Level.heishitou - nowLevel.heishitou) },
    { label: "白石头", value: formatAmount(to24Level.baishitou - nowLevel.baishitou) },
    { label: "钻石", value: formatAmount(to24Level.zuanshi - nowLevel.zuanshi) },
]);
const gradeRows = computed(() =>
    gradeList.map((item) => {
        const count = gradeCount[item.key];
        return {
            label: item.label,
            count,
            color: item.color,
            ratio: `${((count / DECK_SIZE) * 100).toFixed(2)}%`,
        };
    })
);
const cardPowerWan = computed(() => nowLevel.zhanli / 10000 + goldList.length * 2);
const currentPowerWan = computed(() => 187 + zhanliObj.value.zhanliWuqi + zhanliObj.value.zhanliBaowu + goldList.length * 2 + nowLevel.zhanli / 10000);
const finalPowerWan = computed(() => 687 + goldList.length * 2 + to24Level.zhanli / 10000);
const powerRows = computed(() => {
    const shenqi = zhanliObj.value;
    const wuqiName = ceshiData.shenqiList[4] ? `${ceshiData.shenqiList[4]} · ` : "";
    const baowuName = ceshiData.shenqiList[5] ? `${ceshiData.shenqiList[5]} · ` : "";
    return [
        { label: "英雄满级战力", value: "187万" },
        { label: "卡牌战力（含皮肤）", value: `${cardPowerWan.value.toFixed(2)}万` },
        {
            label: "武器",
            qualityTag: `${shenqi.wuqiLabel}${shenqi.wuqiStar}星`,
            qualityClass: shenqi.wuqiQualityClass,
            value: `${wuqiName}${shenqi.zhanliWuqi}万`,
        },
        {
            label: "宝物",
            qualityTag: `${shenqi.baowuLabel}${shenqi.baowuStar}星`,
            qualityClass: shenqi.baowuQualityClass,
            value: `${baowuName}${shenqi.zhanliBaowu}万`,
        },
        { label: "当前战力", value: `${currentPowerWan.value.toFixed(2)}万`, emphasis: true },
        { label: "最终战力", value: `${finalPowerWan.value.toFixed(2)}万`, emphasis: true },
    ];
});

async function exportImage() {
    if (!exportRef.value) return;
    exporting.value = true;
    try {
        const canvas = await html2canvas(exportRef.value, {
            backgroundColor: "#f7f8fa",
            scale: 2,
            useCORS: true,
        });
        const link = document.createElement("a");
        link.download = `${name.value || "卡组分析"}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        message.success("导出成功");
    } catch (error) {
        console.error(error);
        message.error("导出失败，请重试");
    } finally {
        exporting.value = false;
    }
}

onMounted(() => {
    getList();
});
</script>

<style lang="less" scoped>
.main {
    --line: #e8e8e8;
    --text: #1f1f1f;
    --muted: #8c8c8c;
    --accent: #3860f4;
    --panel: #f7f8fa;
    --white: #8c8c8c;
    --white-bg: #f5f5f5;
    --blue: #1677ff;
    --blue-bg: #e6f4ff;
    --purple: #722ed1;
    --purple-bg: #f9f0ff;
    --orange: #d46b08;
    --orange-bg: #fff7e6;

    height: calc(100vh - 88px);
    padding: 8px 12px 10px;
    overflow: hidden;
    color: var(--text);
    background: #fff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.toolbar {
    display: flex;
    justify-content: flex-end;
    flex-shrink: 0;
}

.export-area {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 2px;
    background: var(--panel);
    border-radius: 8px;
    box-sizing: border-box;
    overflow: hidden;
}

.page-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 6px;
    flex-shrink: 0;
}

.hero-img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border: 1px solid var(--line);
    border-radius: 5px;
    flex-shrink: 0;
}

.header-text {
    min-width: 0;
    flex: 1;
}

.title-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 10px;
    margin-bottom: 4px;
}

.page-title {
    margin: 0;
    font-size: 16px;
    font-weight: 650;
    line-height: 1.2;
}

.page-sub {
    color: var(--muted);
    font-size: 12px;
}

.life-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 8px;
    font-size: 12px;
    color: #595959;

    b {
        font-weight: 600;
        color: var(--text);
    }

    .accent {
        color: var(--accent);
    }

    .divider {
        color: #d0d0d0;
    }
}

.header-power {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}

.power-chip {
    min-width: 96px;
    padding: 6px 10px;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: #fff;
    text-align: right;

    &.highlight {
        border-color: #ffd591;
        background: var(--orange-bg);

        .chip-value {
            color: var(--orange);
        }
    }
}

.chip-label {
    display: block;
    font-size: 11px;
    color: var(--muted);
    margin-bottom: 2px;
}

.chip-value {
    font-size: 15px;
    font-weight: 650;
    font-variant-numeric: tabular-nums;
}

.quality-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}

.legend-item {
    padding: 1px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
}

.bottom-block {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.panel-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    flex: 0.85 1 0;
    min-height: 0;
    align-items: stretch;
}

.card {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 8px 10px;
    min-width: 0;
    min-height: 0;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow: hidden;
}

.card-title {
    margin: 0;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--line);
    font-size: 13px;
    font-weight: 650;
    flex-shrink: 0;
}

.stat-pair-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    flex: 1;
    min-height: 0;
}

.stat-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.stat-pair-grid .stat-list {
    height: 100%;
    min-height: 0;
}

.stat-pair-grid .stat-row {
    flex: 1;
}

.need-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 4px;
    flex-shrink: 0;
}

.resource-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    flex: 1;
    min-height: 0;
}

.resource-block {
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.resource-subtitle {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    color: var(--muted);
    flex-shrink: 0;
}

.resource-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
    gap: 4px;
    flex: 1;
    min-height: 0;
}

.grade-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 1fr;
    gap: 4px;
    flex: 1;
    min-height: 0;
}

.stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    line-height: 1.25;
    padding: 4px 6px;
    border-radius: 4px;
    background: var(--panel);
}

.stat-label {
    color: #595959;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

.stat-value {
    text-align: right;
    font-variant-numeric: tabular-nums;
    font-weight: 550;

    em {
        margin-left: 2px;
        font-style: normal;
        font-weight: 400;
        color: var(--muted);
        font-size: 12px;
    }
}

.quality-white {
    color: var(--white);
    background: var(--white-bg);
}

.quality-blue {
    color: var(--blue);
    background: var(--blue-bg);
}

.quality-purple {
    color: var(--purple);
    background: var(--purple-bg);
}

.quality-orange {
    color: var(--orange);
    background: var(--orange-bg);
}

.stat-row.quality-white,
.stat-row.quality-blue,
.stat-row.quality-purple,
.stat-row.quality-orange {

    .stat-label,
    .stat-value {
        color: inherit;
    }

    .stat-value em {
        color: inherit;
        opacity: 0.75;
    }
}

.grade-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
}

.grade-row {

    .stat-label,
    .stat-value {
        color: inherit;
    }

    .stat-value em {
        color: inherit;
        opacity: 0.75;
    }
}

.power-section {
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 8px 10px;
    background: #fff;
    flex-shrink: 0;
}

.power-head {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 6px;
}

.section-title {
    margin: 0;
    font-size: 13px;
    font-weight: 650;
}

.section-note {
    margin: 0;
    font-size: 11px;
    color: var(--muted);
    line-height: 1.3;
}

.power-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 6px;
}

.power-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px 10px;
    background: var(--panel);
    border-radius: 4px;
    min-width: 0;

    &.quality-blue,
    &.quality-purple,
    &.quality-orange {

        .power-label,
        .power-value {
            color: inherit;
        }
    }

    &.emphasis {
        .power-value {
            color: var(--orange);
            font-size: 14px;
        }
    }
}

.power-label {
    font-size: 11px;
    color: var(--muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.power-value {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    font-size: 13px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    min-width: 0;
}

.shenqi-tag {
    display: inline-flex;
    align-items: center;
    padding: 0 5px;
    border-radius: 3px;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    color: #fff !important;
}

.power-item.quality-blue .shenqi-tag {
    background: var(--blue);
}

.power-item.quality-purple .shenqi-tag {
    background: var(--purple);
}

.power-item.quality-orange .shenqi-tag {
    background: var(--orange);
}

.deck-section {
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 10px 12px;
    background: #fff;
    flex: 1.35 1 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
}

.deck-section .section-title {
    margin-bottom: 8px;
    flex-shrink: 0;
}

.deck-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-rows: minmax(0, 1fr);
    gap: 4px 10px;
    flex: 1;
    min-height: 0;
    overflow: hidden;
}

.deck-row {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    padding: 4px 8px;
    border-radius: 4px;
    box-sizing: border-box;
}

.deck-index {
    flex-shrink: 0;
    width: 18px;
    font-size: 11px;
    font-variant-numeric: tabular-nums;
    color: var(--muted);
    text-align: right;
}

.deck-grade-tag {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 16px;
    padding: 0 5px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
    box-sizing: border-box;
}

.deck-name {
    min-width: 0;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.2;
    color: inherit;
}

.deck-level {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    opacity: 0.75;
    color: inherit;
}

@media screen and (max-width: 1100px) {
    .power-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .deck-list {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media screen and (max-width: 768px) {
    .main {
        height: auto;
        min-height: calc(100vh - 88px);
        overflow-y: auto;
    }

    .page-header {
        flex-wrap: wrap;
    }

    .header-power {
        width: 100%;
    }

    .power-chip {
        flex: 1;
    }

    .panel-grid {
        grid-template-columns: 1fr;
    }

    .power-grid {
        grid-template-columns: 1fr 1fr;
    }

    .deck-list {
        grid-template-columns: 1fr;
        overflow: auto;
    }
}
</style>
