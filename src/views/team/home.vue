<template>
    <div class="team-home">
        <header class="page-header">
            <h1 class="page-title">战队介绍</h1>
            <p class="page-sub">客缘战队 · QQ群 630350845</p>
        </header>

        <section class="panel">
            <h2 class="section-title">战队简介</h2>
            <p class="intro-text">客缘战队：区级战队，半养老，不摆烂。</p>
        </section>

        <section class="panel">
            <h2 class="section-title">成员展示</h2>
            <div class="carousel-wrap">
                <a-carousel autoplay :dots="true">
                    <div v-for="item in memberImages" :key="item" class="carousel-item">
                        <img :src="item" alt="成员展示" loading="lazy">
                    </div>
                </a-carousel>
            </div>
        </section>

        <section class="panel">
            <h2 class="section-title">宣传视频</h2>
            <div class="video-wrap">
                <video class="promo-video" :src="promoVideo" controls preload="metadata" />
            </div>
        </section>

        <section class="panel">
            <h2 class="section-title">收人标准</h2>
            <ul class="rule-list">
                <li v-for="(item, index) in rules" :key="index" class="rule-item">
                    <span class="rule-index">{{ index + 1 }}</span>
                    <span>{{ item }}</span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script lang="ts" setup>
const memberImages = [
    new URL("../../assets/images/manage/jiangnan.jpg", import.meta.url).href,
    new URL("../../assets/images/manage/luming.jpg", import.meta.url).href,
    new URL("../../assets/images/manage/yutu.jpg", import.meta.url).href,
];

const promoVideo =
    "https://suola-1300285550.cos.ap-nanjing.myqcloud.com/Thu%20May%2026%202022%2009%3A06%3A40%20GMT%2B0800%20%28%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4%29%E6%88%98%E9%98%9F%E9%9B%86%E9%94%A6.mp4";

const rules = [
    "男要求分路 25 段 / 巅峰分 1400 / 三个英雄战力 4500 以上",
    "女要求分路 15 段 / 巅峰赛 1200 / 两个英雄战力 4000 以上",
    "战队招收赞助，免打战队赛免审核",
    "战队赛每周至少两把（能打四把以上的可放低要求）",
    "战队禁止搞心态、禁止摆烂",
];
</script>

<style lang="less" scoped>
.team-home {
    --line: #e8e8e8;
    --text: #1f1f1f;
    --muted: #8c8c8c;
    --panel: #fafafa;

    padding: 24px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    color: var(--text);
}

.page-header {
    margin-bottom: 16px;
}

.page-title {
    margin: 0;
    font-size: 20px;
    font-weight: 650;
}

.page-sub {
    margin: 4px 0 0;
    color: var(--muted);
    font-size: 13px;
}

.panel {
    margin-bottom: 14px;
    padding: 16px 18px;
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 8px;
}

.section-title {
    margin: 0 0 12px;
    font-size: 15px;
    font-weight: 650;
}

.intro-text {
    margin: 0;
    font-size: 14px;
    line-height: 1.7;
    color: #595959;
}

.carousel-wrap {
    max-width: 920px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 8px;
    background: var(--panel);
}

.carousel-item {
    height: 0;
    padding-bottom: 56.25%;
    position: relative;

    img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
}

.video-wrap {
    max-width: 920px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 8px;
    background: #000;
}

.promo-video {
    display: block;
    width: 100%;
    max-height: 520px;
    aspect-ratio: 16 / 9;
    object-fit: contain;
    background: #000;
}

.rule-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.rule-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 12px;
    background: var(--panel);
    border-radius: 6px;
    font-size: 14px;
    line-height: 1.6;
}

.rule-index {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #1677ff;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
}

@media screen and (max-width: 768px) {
    .team-home {
        padding: 16px;
    }

    .panel {
        padding: 14px;
    }
}
</style>
