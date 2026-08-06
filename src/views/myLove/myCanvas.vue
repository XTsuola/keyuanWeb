<template>
    <div class="canvas-page" @contextmenu.prevent>
        <header class="page-header">
            <div>
                <h1 class="page-title">绘画天地</h1>
                <p class="page-sub">双击选中 · 拖拽移动 · 右击另一物体连线</p>
            </div>
            <a-button type="primary" @click="addCube">添加物体</a-button>
        </header>
        <div class="canvas-wrap">
            <canvas
                ref="canvasRef"
                class="board"
                width="1400"
                height="700"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

interface Cube {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    type: "cube";
}

interface Line {
    id: number;
    id1: number;
    id2: number;
    color: string;
    type: "line";
}

type CanvasObj = Cube | Line;

const canvasRef = ref<HTMLCanvasElement | null>(null);
const objects: CanvasObj[] = [];
let ctx: CanvasRenderingContext2D | null = null;
let nowObj: Cube | null = null;
let dragging = false;
let prevX = 0;
let prevY = 0;

const handlers: Array<[keyof HTMLElementEventMap, EventListener]> = [];

function bind(el: HTMLCanvasElement, type: keyof HTMLElementEventMap, fn: EventListener) {
    el.addEventListener(type, fn);
    handlers.push([type, fn]);
}

function nextCubeId() {
    const ids = objects.filter((o): o is Cube => o.type === "cube").map((o) => o.id);
    return (ids.length ? Math.max(...ids) : 0) + 1;
}

function addObject(id: number, x: number, y: number, width: number, height: number, color: string) {
    objects.push({ id, x, y, width, height, color, type: "cube" });
}

function addLine(id: number, id1: number, id2: number, color: string) {
    objects.push({ id, id1, id2, color, type: "line" });
}

function clearCanvas() {
    const canvas = canvasRef.value;
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCube(object: Cube) {
    if (!ctx) return;
    ctx.fillStyle = object.color;
    ctx.fillRect(object.x, object.y, object.width, object.height);
}

function drawLine(object: Line) {
    if (!ctx) return;
    const a = objects.find((o): o is Cube => o.type === "cube" && o.id === object.id1);
    const b = objects.find((o): o is Cube => o.type === "cube" && o.id === object.id2);
    if (!a || !b) return;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = object.color;
    ctx.moveTo(a.x + a.width / 2, a.y + a.height / 2);
    ctx.lineTo(b.x + b.width / 2, b.y + b.height / 2);
    ctx.stroke();
}

function drawAll() {
    clearCanvas();
    objects.filter((o): o is Line => o.type === "line").forEach(drawLine);
    objects.filter((o): o is Cube => o.type === "cube").forEach(drawCube);
}

function drawSelect() {
    if (!ctx || !nowObj) return;
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000";
    ctx.strokeRect(nowObj.x - 2, nowObj.y - 2, nowObj.width + 4, nowObj.height + 4);
}

function getObjectAt(x: number, y: number) {
    for (let i = objects.length - 1; i >= 0; i--) {
        const o = objects[i];
        if (o.type !== "cube") continue;
        if (x >= o.x && x <= o.x + o.width && y >= o.y && y <= o.y + o.height) return o;
    }
    return null;
}

function addCube() {
    const width = Math.random() * 100 + 50;
    const height = Math.random() * 100 + 50;
    const color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
    addObject(nextCubeId(), 300, 300, width, height, color);
    drawAll();
    if (nowObj) drawSelect();
}

onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    if (!ctx) return;

    addObject(1, 50, 50, 100, 100, "red");
    addObject(2, 200, 200, 150, 80, "blue");
    addObject(3, 300, 300, 80, 150, "green");
    drawAll();

    bind(canvas, "mousedown", ((event: MouseEvent) => {
        if (!nowObj) return;
        const { offsetX, offsetY } = event;
        if (
            offsetX >= nowObj.x &&
            offsetX <= nowObj.x + nowObj.width &&
            offsetY >= nowObj.y &&
            offsetY <= nowObj.y + nowObj.height
        ) {
            dragging = true;
            prevX = offsetX;
            prevY = offsetY;
        }
    }) as EventListener);

    bind(canvas, "mousemove", ((event: MouseEvent) => {
        if (!dragging || !nowObj) return;
        const { offsetX, offsetY } = event;
        nowObj.x += offsetX - prevX;
        nowObj.y += offsetY - prevY;
        prevX = offsetX;
        prevY = offsetY;
        drawAll();
        drawSelect();
    }) as EventListener);

    bind(canvas, "mouseup", (() => {
        dragging = false;
        if (nowObj) {
            drawAll();
            drawSelect();
        }
    }) as EventListener);

    bind(canvas, "contextmenu", ((event: MouseEvent) => {
        if (!nowObj) return;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const clicked = getObjectAt(x, y);
        if (!clicked || clicked.id === nowObj.id) return;
        const exists = objects.some(
            (o) =>
                o.type === "line" &&
                ((o.id1 === nowObj!.id && o.id2 === clicked.id) ||
                    (o.id2 === nowObj!.id && o.id1 === clicked.id))
        );
        if (exists) return;
        addLine(Date.now(), nowObj.id, clicked.id, "#000");
        nowObj = null;
        drawAll();
    }) as EventListener);

    bind(canvas, "dblclick", ((event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const clicked = getObjectAt(x, y);
        if (clicked) {
            const ind = objects.findIndex((o) => o.type === "cube" && o.id === clicked.id);
            nowObj = objects[ind] as Cube;
            objects.splice(ind, 1);
            objects.push(nowObj);
            drawAll();
            drawSelect();
        } else {
            nowObj = null;
            drawAll();
        }
    }) as EventListener);
});

onBeforeUnmount(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    handlers.forEach(([type, fn]) => canvas.removeEventListener(type, fn));
    handlers.length = 0;
    ctx = null;
    nowObj = null;
});
</script>

<style lang="less" scoped>
.canvas-page {
    box-sizing: border-box;
    padding: 12px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: calc(100vh - 140px);
}

.page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.page-title {
    margin: 0;
    font-size: 18px;
    font-weight: 650;
}

.page-sub {
    margin: 2px 0 0;
    color: #8c8c8c;
    font-size: 12px;
}

.canvas-wrap {
    overflow: auto;
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    background: #fff;
}

.board {
    display: block;
    background: #fafafa;
}
</style>
