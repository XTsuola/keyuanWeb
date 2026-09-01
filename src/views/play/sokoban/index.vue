<template>
    <div class="sokoban">
        <template v-if="playing">
            <header class="page-header">
                <div>
                    <h1 class="page-title">推箱子</h1>
                    <p class="page-sub">第 {{ level + 1 }} 关 · 方向键移动 · 把箱子推到 ❤️</p>
                </div>
                <a-button size="small" @click="resetLevel">重置关卡</a-button>
            </header>
            <div class="game-body">
                <div class="board">
                    <div v-for="(row, y) in mapList" :key="y" class="row">
                        <div v-for="(cell, x) in row" :key="`${x}-${y}`" class="cell">
                            <div v-if="cell === Cell.Wall" class="wall" />
                            <div v-else-if="cell === Cell.Target" class="target">❤️</div>
                            <div v-else-if="cell === Cell.Box" class="box">📦</div>
                            <div v-if="player.x === x && player.y === y" class="player"
                                :style="{ transform: playerTransform }" />
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
import { ref, reactive, computed, onBeforeUnmount,  } from "vue";
import { message } from "ant-design-vue";
import { levels } from "./levels";

const Cell = {
    Empty: 0,
    Wall: 1,
    Box: 2,
    Target: 8,
} as const;

type Direction = "up" | "down" | "left" | "right";
type Pos = { x: number; y: number };

const MAP_SIZE = 9;
const DIR_DELTA: Record<Direction, Pos> = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
};
const KEY_MAP: Record<string, Direction> = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
};
const playing = ref(true);
const level = ref(0);
const mapList = ref<number[][]>([]);
const player = reactive<Pos>({ x: 0, y: 0 });
const faceLeft = ref(false);
const targets = ref<Pos[]>([]);
const playerTransform = computed(() =>
    faceLeft.value ? "translate(-50%, -50%) rotateY(180deg)" : "translate(-50%, -50%) rotateY(0deg)"
);

function cloneMap(data: number[][]) {
    return data.map((row) => [...row]);
}

function collectTargets(data: number[][]) {
    const list: Pos[] = [];
    data.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === Cell.Target) list.push({ x, y });
        });
    });
    return list;
}

function inBounds(x: number, y: number) {
    return x >= 0 && x < MAP_SIZE && y >= 0 && y < MAP_SIZE;
}

function isTarget(x: number, y: number) {
    return targets.value.some((t) => t.x === x && t.y === y);
}

function floorAt(x: number, y: number) {
    return isTarget(x, y) ? Cell.Target : Cell.Empty;
}

function matchedCount() {
    return targets.value.filter((t) => mapList.value[t.y][t.x] === Cell.Box).length;
}

function loadLevel(index: number) {
    const cfg = levels[index];
    mapList.value = cloneMap(cfg.data);
    targets.value = collectTargets(cfg.data);
    player.x = cfg.peopleX;
    player.y = cfg.peopleY;
    faceLeft.value = false;
}

function checkClear() {
    if (matchedCount() < levels[level.value].score) return;
    if (level.value < levels.length - 1) {
        level.value += 1;
        loadLevel(level.value);
        message.success(`进入第${level.value + 1}关`);
        return;
    }
    message.success("恭喜通关");
    playing.value = false;
}

function handleMove(dir: Direction) {
    if (!playing.value) return;
    if (dir === "left") faceLeft.value = true;
    if (dir === "right") faceLeft.value = false;
    const { x: dx, y: dy } = DIR_DELTA[dir];
    const nx = player.x + dx;
    const ny = player.y + dy;
    if (!inBounds(nx, ny)) return;
    const next = mapList.value[ny][nx];
    if (next === Cell.Wall) return;
    if (next === Cell.Box) {
        const bx = nx + dx;
        const by = ny + dy;
        if (!inBounds(bx, by)) return;
        const beyond = mapList.value[by][bx];
        if (beyond === Cell.Wall || beyond === Cell.Box) return;
        mapList.value[by][bx] = Cell.Box;
        mapList.value[ny][nx] = floorAt(nx, ny);
    }
    player.x = nx;
    player.y = ny;
    checkClear();
}

function onKeydown(e: KeyboardEvent) {
    const dir = KEY_MAP[e.key];
    if (!dir) return;
    e.preventDefault();
    handleMove(dir);
}

function resetLevel() {
    loadLevel(level.value);
}

function restartGame() {
    level.value = 0;
    playing.value = true;
    loadLevel(0);
}

loadLevel(0);

onMounted(() => {
    window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeydown);
});
</script>

<style lang="less" scoped>
.sokoban {
    --text: #1f1f1f;
    --muted: #8c8c8c;
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

.wall {
    width: 86%;
    height: 86%;
    background: url("@/assets/images/game/box/qiang.png") center / cover no-repeat;
}

.target {
    font-size: calc(var(--cell) * 0.4);
    line-height: 1;
}

.box {
    font-size: calc(var(--cell) * 0.55);
    line-height: 1;
}

.player {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 78%;
    height: 78%;
    background: url("@/assets/images/game/box/caiwenji.jpg") center / 110% no-repeat;
    z-index: 1;
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
    .sokoban {
        --cell: min(9vw, calc((100vh - 280px) / 9));
        height: calc(100vh - 100px);
        padding: 8px;
    }

    .game-body {
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
}
</style>
