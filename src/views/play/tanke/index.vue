<template>
    <div class="tank-game">
        <template v-if="playing">
            <header class="page-header">
                <div>
                    <h1 class="page-title">坦克大战</h1>
                    <p class="page-sub">第 {{ level + 1 }} 关 · 方向键移动 · 空格射击</p>
                </div>
                <a-button size="small" @click="resetLevel">重置关卡</a-button>
            </header>
            <div class="game-body">
                <div class="board" :style="boardStyle">
                    <div v-for="(row, y) in mapList" :key="y" class="row">
                        <div v-for="(cell, x) in row" :key="`${x}-${y}`" class="cell">
                            <div v-if="cell === Cell.Obstacle" class="obstacle" />
                            <div v-else-if="cell === Cell.Wall" class="wall">📦</div>
                            <div v-else-if="cell === Cell.Bullet" class="bullet">❤️</div>
                            <EnemyTank v-else-if="cell === Cell.Enemy" />
                            <div v-if="player.x === x && player.y === y" class="player"
                                :style="{ transform: `rotate(${playerDeg})` }">
                                <div></div>
                                <div class="barrel"></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="controls">
                    <div class="dpad" aria-label="方向键">
                        <a-button class="key key-up" @click="handleMove('up')">↑</a-button>
                        <a-button class="key key-left" @click="handleMove('left')">←</a-button>
                        <a-button class="key key-down" @click="handleMove('down')">↓</a-button>
                        <a-button class="key key-right" @click="handleMove('right')">→</a-button>
                    </div>
                    <a-button type="primary" class="key key-fire" @click="handleMove('fire')">发射</a-button>
                </div>
            </div>
        </template>
        <div v-else class="win-panel">
            <h2>恭喜通关！</h2>
            <a-button type="primary" @click="restartGame">再来一次</a-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onBeforeUnmount, onMounted } from "vue";
import { levels } from "./levels";
import EnemyTank from "./tanke.vue";

const Cell = {
    Empty: 0,
    Enemy: 1,
    Wall: 2,
    Obstacle: 5,
    Bullet: 9,
} as const;

type Direction = "up" | "down" | "left" | "right";
type Action = Direction | "fire";

const MAP_SIZE = 9;
const BLOCKED = new Set<number>([Cell.Enemy, Cell.Wall]);
const DIR_DEG: Record<Direction, string> = {
    up: "-90deg",
    left: "180deg",
    down: "90deg",
    right: "0deg",
};
const DIR_DELTA: Record<Direction, { dx: number; dy: number }> = {
    up: { dx: 0, dy: -1 },
    down: { dx: 0, dy: 1 },
    left: { dx: -1, dy: 0 },
    right: { dx: 1, dy: 0 },
};
const KEY_MAP: Record<string, Action> = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    " ": "fire",
};

const playing = ref(true);
const level = ref(0);
const mapList = ref<number[][]>([]);
const playerDeg = ref(DIR_DEG.up);
const player = reactive({ x: 0, y: 0 });
const bulletTimers = new Set<ReturnType<typeof setInterval>>();

const boardStyle = computed(() => ({
    "--size": `${MAP_SIZE}`,
}));

function cloneMap(data: number[][]) {
    return data.map((row) => [...row]);
}

function inBounds(x: number, y: number) {
    return x >= 0 && x < MAP_SIZE && y >= 0 && y < MAP_SIZE;
}

function canEnter(x: number, y: number) {
    return inBounds(x, y) && !BLOCKED.has(mapList.value[y][x]);
}

function clearBulletTimers() {
    bulletTimers.forEach((timer) => clearInterval(timer));
    bulletTimers.clear();
}

function loadLevel(index: number) {
    const config = levels[index];
    if (!config) {
        playing.value = false;
        return;
    }
    clearBulletTimers();
    mapList.value = cloneMap(config.data);
    player.x = config.peopleX;
    player.y = config.peopleY;
    playerDeg.value = DIR_DEG.up;
    playing.value = true;
}

function resetLevel() {
    loadLevel(level.value);
}

function restartGame() {
    level.value = 0;
    loadLevel(0);
}

function movePlayer(dir: Direction) {
    if (playerDeg.value !== DIR_DEG[dir]) {
        playerDeg.value = DIR_DEG[dir];
        return;
    }

    const { dx, dy } = DIR_DELTA[dir];
    const nextX = player.x + dx;
    const nextY = player.y + dy;
    if (!canEnter(nextX, nextY)) return;

    mapList.value[nextY][nextX] = Cell.Empty;
    player.x = nextX;
    player.y = nextY;
}

function fireBullet() {
    const dir = (Object.keys(DIR_DEG) as Direction[]).find((key) => DIR_DEG[key] === playerDeg.value);
    if (!dir) return;

    const { dx, dy } = DIR_DELTA[dir];
    let x = player.x + dx;
    let y = player.y + dy;
    if (!inBounds(x, y) || mapList.value[y][x] === Cell.Wall) return;

    mapList.value[y][x] = Cell.Bullet;

    const timer = setInterval(() => {
        const nextX = x + dx;
        const nextY = y + dy;

        if (!inBounds(nextX, nextY) || mapList.value[nextY][nextX] === Cell.Wall) {
            mapList.value[y][x] = Cell.Empty;
            clearInterval(timer);
            bulletTimers.delete(timer);
            return;
        }

        mapList.value[y][x] = Cell.Empty;
        mapList.value[nextY][nextX] = Cell.Bullet;
        x = nextX;
        y = nextY;
    }, 50);

    bulletTimers.add(timer);
}

function handleMove(action: Action) {
    if (!playing.value) return;
    if (action === "fire") {
        fireBullet();
        return;
    }
    movePlayer(action);
}

function onKeydown(event: KeyboardEvent) {
    const action = KEY_MAP[event.key];
    if (!action) return;
    event.preventDefault();
    handleMove(action);
}

onMounted(() => {
    loadLevel(level.value);
    window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeydown);
    clearBulletTimers();
});
</script>

<style lang="less" scoped>
.tank-game {
    --text: #1f1f1f;
    --muted: #8c8c8c;
    /* 预留顶栏/面包屑/页头/操作区，格子随视口缩放，避免出现滚动条 */
    --cell: min(56px, calc((100vh - 280px) / 9));

    box-sizing: border-box;
    height: calc(100vh - 120px);
    padding: 8px 12px 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    color: var(--text);
}

.page-header {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
}

.page-title {
    margin: 0;
    font-size: 18px;
    font-weight: 650;
    line-height: 1.2;
}

.page-sub {
    margin: 2px 0 0;
    color: var(--muted);
    font-size: 12px;
    line-height: 1.2;
}

.game-body {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
}

.board {
    flex: none;
    width: calc(var(--cell) * 9);
    border: 1px solid #ff7875;
    background: #fff;
}

.row {
    display: flex;
}

.cell {
    position: relative;
    width: var(--cell);
    height: var(--cell);
    border: 1px solid #ffa39e;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}

.obstacle {
    width: 86%;
    height: 86%;
    background: url("@/assets/images/game/box/qiang.png") center / cover no-repeat;
}

.wall {
    font-size: calc(var(--cell) * 0.55);
    line-height: 1;
}

.bullet {
    position: absolute;
    font-size: 10px;
    line-height: 1;
}

.player {
    position: absolute;
    inset: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2%;
    background: #fff;
    border-radius: 2px;
    z-index: 1;

    div {
        width: 20%;
        height: 20%;
        background: #000;
        transform: translateX(-50%);
    }

    .barrel {
        transform: translateX(50%);
    }
}

.controls {
    display: flex;
    align-items: flex-end;
    gap: 16px;
}

.dpad {
    display: grid;
    grid-template-columns: repeat(3, 44px);
    grid-template-rows: repeat(2, 44px);
    gap: 6px;
}

.key {
    width: 44px;
    height: 44px;
    padding: 0;
    font-size: 16px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.key-up {
    grid-column: 2;
    grid-row: 1;
}

.key-left {
    grid-column: 1;
    grid-row: 2;
}

.key-down {
    grid-column: 2;
    grid-row: 2;
}

.key-right {
    grid-column: 3;
    grid-row: 2;
}

.key-fire {
    width: 72px;
    height: 44px;
    font-size: 14px;
}

.win-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    h2 {
        margin: 0;
        font-size: 28px;
    }
}

@media screen and (max-width: 768px) {
    .tank-game {
        --cell: min(9vw, calc((100vh - 280px) / 9));
        height: calc(100vh - 100px);
        padding: 8px;
    }

    .game-body {
        gap: 12px;
    }

    .controls {
        gap: 12px;
    }

    .dpad {
        grid-template-columns: repeat(3, 40px);
        grid-template-rows: repeat(2, 40px);
        gap: 5px;
    }

    .key {
        width: 40px;
        height: 40px;
        font-size: 15px;
    }

    .key-fire {
        width: 64px;
        height: 40px;
        font-size: 13px;
    }
}
</style>
