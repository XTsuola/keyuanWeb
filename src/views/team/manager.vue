<template>
    <div class="manager-page">
        <header class="page-header">
            <h1 class="page-title">战队高管</h1>
            <p class="page-sub">共 {{ peopleList.length }} 位</p>
        </header>
        <div class="card-grid">
            <article v-for="item in peopleList" :key="item.qq" class="manager-card">
                <header class="card-head">
                    <h2 class="card-name">{{ item.name }}</h2>
                    <img class="card-icon" :src="item.icon" :alt="item.name">
                </header>
                <div class="card-body">
                    <p class="card-row">
                        <span class="label">QQ</span>
                        <span>{{ item.qq }}</span>
                    </p>
                    <p class="card-row motto">
                        <span class="label">签名</span>
                        <span>{{ item.motto }}</span>
                    </p>
                </div>
            </article>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface PeopleItem {
    name: string;
    qq: string;
    motto: string;
    icon: string;
}

const peopleList: PeopleItem[] = [
    {
        name: "天罗星-月色",
        qq: "2049434978",
        motto: "逆风的方向更适合飞翔",
        icon: new URL("../../assets/images/manage/moon.png", import.meta.url).href,
    },
    {
        name: "逍遥星-江南",
        qq: "2604369384",
        motto: "热爱是一种永恒的可能",
        icon: new URL("../../assets/images/manage/sakura.png", import.meta.url).href,
    },
    {
        name: "北冥星-黄果树",
        qq: "1782424540",
        motto: "你要努力，你想要的要自己给自己",
        icon: new URL("../../assets/images/manage/smile.png", import.meta.url).href,
    },
    {
        name: "南灵星-鹿鸣",
        qq: "2467118140",
        motto: "无论你在这个世界上的什么地方，我都一定会再去见你",
        icon: new URL("../../assets/images/manage/lu.png", import.meta.url).href,
    },
];
</script>

<style lang="less" scoped>
.manager-page {
    --line: #e8e8e8;
    --text: #1f1f1f;
    --muted: #8c8c8c;
    --panel: #f5f9ff;

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

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
}

.manager-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 180px;
    padding: 16px 18px;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 10px;
    overflow: hidden;
    transition: box-shadow 0.2s, transform 0.2s;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 10px;
        padding: 2px;
        background: linear-gradient(120deg, #69b1ff, #b37feb, #ff85c0, #69b1ff);
        background-size: 300% 300%;
        animation: border-flow 4s linear infinite;
        -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(22, 119, 255, 0.1);
    }
}

.card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(232, 232, 232, 0.9);
}

.card-name {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.3;
}

.card-icon {
    width: 28px;
    height: 28px;
    object-fit: contain;
    flex-shrink: 0;
}

.card-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
}

.card-row {
    display: flex;
    gap: 8px;
    margin: 0;
    font-size: 14px;
    line-height: 1.6;

    &.motto {
        align-items: flex-start;
    }
}

.label {
    flex-shrink: 0;
    width: 36px;
    color: var(--muted);
}

@keyframes border-flow {
    0% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 100% 50%;
    }
}
</style>
