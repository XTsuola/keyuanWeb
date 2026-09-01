<template>
    <div class="chess">
        <header class="page-header">
            <div>
                <h1 class="page-title">中国象棋</h1>
                <p class="page-sub">点击棋子选中，再点落点走子 · 红先黑后</p>
            </div>
            <a-button size="small" @click="reset">重新开始</a-button>
        </header>
        <div class="game-body">
            <div class="board-wrap">
                <div class="board">
                    <div v-for="(row, y) in mapData" :key="y" class="row" :class="rowClass(y)">
                        <div v-for="(cell, x) in row" :key="`${y}-${x}`" class="cell" @click="onCellClick(y, x)">
                            <div v-if="isPalaceDiagA(y, x)" class="diag diag-a" />
                            <div v-if="isPalaceDiagB(y, x)" class="diag diag-b" />

                            <button v-if="cell > 0" type="button" class="piece" :class="[
                                isRed(cell) ? 'piece-red' : 'piece-black',
                                selectedKey === posKey(y, x) ? 'is-selected' : '',
                            ]">
                                {{ PieceName[cell] }}
                            </button>
                            <span v-else-if="canMap[y]?.[x] === 1" class="hint" />
                            <span v-if="cell > 0 && canMap[y]?.[x] === 1" class="hint hint-capture" />
                        </div>
                    </div>
                    <div class="river">
                        <span>楚河</span>
                        <span>汉界</span>
                    </div>
                </div>
                <aside class="status">
                    <template v-if="status === 1">
                        当前：
                        <strong :class="nowPlay === 1 ? 'red' : 'black'">
                            {{ nowPlay === 1 ? "红方" : "黑方" }}
                        </strong>
                    </template>
                    <template v-else>
                        对局结束 ·
                        <strong :class="nowPlay === 1 ? 'black' : 'red'">
                            {{ nowPlay === 1 ? "黑方获胜" : "红方获胜" }}
                        </strong>
                    </template>
                </aside>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import { getChessMap, resetChessMap, updateChessMap } from "@/api/chess";
import { INITIAL_BOARD, PieceName, cloneBoard, emptyHints, isRed, posKey, type Board } from "./board";
import { getMoves } from "./rules";

const mapData = ref<Board>(cloneBoard(INITIAL_BOARD));
const canMap = ref(emptyHints());
const status = ref(1);
const nowPlay = ref(1);
const selectedKey = ref<number | null>(null);
const selectedPiece = ref<number | null>(null);

function rowClass(y: number) {
    if (y === 0 || y === 5) return "row-top-edge";
    if (y === 4 || y === 9) return "row-bottom-edge";
    return "row-mid";
}

function isPalaceDiagA(y: number, x: number) {
    return (
        (y === 0 && x === 3) ||
        (y === 1 && x === 4) ||
        (y === 7 && x === 3) ||
        (y === 8 && x === 4)
    );
}

function isPalaceDiagB(y: number, x: number) {
    return (
        (y === 0 && x === 4) ||
        (y === 1 && x === 3) ||
        (y === 7 && x === 4) ||
        (y === 8 && x === 3)
    );
}

function clearSelection() {
    selectedKey.value = null;
    selectedPiece.value = null;
    canMap.value = emptyHints();
}

function selectPiece(y: number, x: number) {
    canMap.value = getMoves(y, x, mapData.value);
    selectedKey.value = posKey(y, x);
    selectedPiece.value = mapData.value[y][x];
}

async function applyMove(toY: number, toX: number) {
    if (selectedKey.value == null || selectedPiece.value == null) return;
    const res = await updateChessMap({
        nowPlay: nowPlay.value,
        nowIndex: selectedKey.value,
        index1: toY,
        index2: toX,
        qizi: selectedPiece.value,
    });
    if (res.data.code !== 200) return;
    clearSelection();
    await fetchBoard();
}

async function onCellClick(y: number, x: number) {
    if (status.value !== 1) {
        message.warning(`对局已结束，${nowPlay.value === 1 ? "黑方" : "红方"}获胜`);
        return;
    }
    const cell = mapData.value[y][x];
    const myTurnRed = nowPlay.value === 1;
    const isMine = myTurnRed ? isRed(cell) : cell > 10;
    if (isMine) {
        selectPiece(y, x);
        return;
    }
    if (canMap.value[y]?.[x] === 1) await applyMove(y, x);
}

async function fetchBoard() {
    const res = await getChessMap();
    if (res.data.code !== 200) return;
    const row = res.data.rows;
    mapData.value = row.map;
    nowPlay.value = row.nowPlay;
    status.value = row.status;
    if (row.status === 2) message.success(`${nowPlay.value === 1 ? "黑方" : "红方"}获胜`);
}

async function reset() {
    const res = await resetChessMap();
    if (res.data.code === 200) {
        clearSelection();
        nowPlay.value = 1;
        status.value = 1;
    }
    await fetchBoard();
}

onMounted(() => {
    fetchBoard();
});
</script>

<style lang="less" scoped>
.chess {
    --text: #1f1f1f;
    --muted: #8c8c8c;
    --line: #1f1f1f;
    --cell: min(48px, calc((100vh - 180px) / 10), calc((100vw - 120px) / 9));

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
    align-items: center;
    justify-content: center;
}

.board-wrap {
    position: relative;
    display: flex;
    align-items: center;
    gap: 20px;
}

.board {
    position: relative;
    width: calc(var(--cell) * 9);
    height: calc(var(--cell) * 10);
    border: 1px solid var(--line);
    border-radius: 8px;
    background: #f7e7c6;
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
    height: var(--cell);
}

.cell {
    position: relative;
    width: var(--cell);
    height: var(--cell);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.row-mid .cell::before,
.row-top-edge .cell::before,
.row-bottom-edge .cell::before {
    position: absolute;
    content: "";
    width: var(--cell);
    height: 1px;
    background: var(--line);
}

.row-mid .cell:first-child::before,
.row-top-edge .cell:first-child::before,
.row-bottom-edge .cell:first-child::before,
.row-mid .cell:last-child::before,
.row-top-edge .cell:last-child::before,
.row-bottom-edge .cell:last-child::before {
    width: calc(var(--cell) / 2);
}

.row-mid .cell:first-child::before,
.row-top-edge .cell:first-child::before,
.row-bottom-edge .cell:first-child::before {
    transform: translateX(calc(var(--cell) / 4));
}

.row-mid .cell:last-child::before,
.row-top-edge .cell:last-child::before,
.row-bottom-edge .cell:last-child::before {
    transform: translateX(calc(var(--cell) / -4));
}

.row-mid .cell::after {
    position: absolute;
    content: "";
    width: 1px;
    height: var(--cell);
    background: var(--line);
}

.row-top-edge .cell::after,
.row-bottom-edge .cell::after {
    position: absolute;
    content: "";
    width: 1px;
    height: calc(var(--cell) / 2);
    background: var(--line);
}

.row-top-edge .cell::after {
    transform: translateY(calc(var(--cell) / 4));
}

.row-bottom-edge .cell::after {
    transform: translateY(calc(var(--cell) / -4));
}

.diag {
    position: absolute;
    width: calc(var(--cell) * 1.414);
    height: calc(var(--cell) * 1.414);
    border-left: 1px dashed var(--line);
    transform-origin: 0 0;
    pointer-events: none;
    z-index: 1;
}

.diag-a {
    transform: translate(calc(var(--cell) * 0.7), calc(var(--cell) * 0.7)) rotate(-45deg);
}

.diag-b {
    transform: translate(calc(var(--cell) * 1.7), calc(var(--cell) * 0.7)) rotate(45deg);
}

.piece {
    position: relative;
    z-index: 2;
    width: calc(var(--cell) * 0.72);
    height: calc(var(--cell) * 0.72);
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: calc(var(--cell) * 0.34);
    font-weight: 650;
    background: #fffdf5;
    cursor: pointer;
    padding: 0;
    line-height: 1;
}

.piece-red {
    border: 1px solid #cf1322;
    color: #cf1322;
}

.piece-black {
    border: 1px solid #1f1f1f;
    color: #1f1f1f;
}

.is-selected {
    border-width: 2px;
    border-color: #1677ff;
    background: #fffbe6;
}

.hint {
    position: absolute;
    z-index: 3;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.35);
}

.hint-capture {
    background: #cf1322;
}

.river {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-around;
    pointer-events: none;
    font-size: calc(var(--cell) * 0.32);
    color: #5c4a32;
    letter-spacing: 0.2em;
}

.status {
    min-width: 96px;
    font-size: 14px;
    color: var(--muted);
}

.red {
    color: #cf1322;
}

.black {
    color: #1f1f1f;
}

@media screen and (max-width: 768px) {
    .chess {
        --cell: min(9.5vw, calc((100vh - 160px) / 10));
        height: calc(100vh - 100px);
        padding: 8px;
    }

    .board-wrap {
        flex-direction: column;
        gap: 10px;
    }

    .status {
        min-width: 0;
        text-align: center;
    }
}
</style>
