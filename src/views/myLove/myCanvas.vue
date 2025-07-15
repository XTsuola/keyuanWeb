<template>
    <div @contextmenu="handleContextMenu">
        <canvas width="1400" height="700" class="myCanvas" id="canvas"></canvas>
    </div>
    <a-button @click="addCube">添加物体</a-button>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const isDragging = ref(false);
let prevMouseX = 0;
let prevMouseY = 0;
const objects: any = [];
let nowObj: any = null;
let context: any = null;

function handleContextMenu(event: any) { // 阻止右击默认行为
    event.preventDefault();
}

function addCube() { // 随机生成矩形物体
    const idList = objects.filter((item: any) => item.type == "cube").map((item: any) => item.id);
    let id = 0;
    let maxId = 0;
    for (let i = 0; i < idList.length; i++) {
        maxId = Math.max(maxId, idList[i]);
    }
    id = maxId + 1;
    let width = Math.random() * 100 + 50;
    let height = Math.random() * 100 + 50;
    let color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    addObject(id, 300, 300, width, height, color);
    objects.forEach(function (object: any) {
        drawObject(context, object);
    });
}

function addObject(id: number, x: any, y: any, width: any, height: any, color: any) { // 添加一个物体到数组中
    const object = {
        id: id,
        x: x,
        y: y,
        width: width,
        height: height,
        color: color,
        type: "cube"
    };;
    objects.push(object);
}

function addLine(id: number, id1: number, id2: number, color: string) { // 添加一条线到数组中
    const object = {
        id: id,
        id1: id1,
        id2: id2,
        color: color,
        type: "line"
    };
    objects.push(object);
}

function drawObject(context: any, object: any) { // 绘制矩形物体
    context.fillStyle = object.color;
    context.fillRect(object.x, object.y, object.width, object.height);
}

function drawLine(context: any, object: any) { // 绘制连线
    const obj1 = objects.find((item: any) => item.id == object.id1);
    const obj2 = objects.find((item: any) => item.id == object.id2);
    context.lineWidth = 2;
    context.strokeStyle = object.color;
    context.moveTo(obj1.x + obj1.width / 2, obj1.y + obj1.height / 2);
    context.lineTo(obj2.x + obj2.width / 2, obj2.y + obj2.height / 2);
    context.stroke();
}

onMounted(() => {
    const canvas: any = document.getElementById("canvas");
    context = canvas.getContext("2d");
    // 添加一些示例物体
    addObject(1, 50, 50, 100, 100, "red");
    addObject(2, 200, 200, 150, 80, "blue");
    addObject(3, 300, 300, 80, 150, "green");
    drawAll();

    function getObjectAtPosition(x: any, y: any) { // 获取鼠标点击的物体
        for (let i = objects.length - 1; i >= 0; i--) {
            const object = objects[i];
            if (
                x >= object.x && x <= object.x + object.width &&
                y >= object.y && y <= object.y + object.height
            ) {
                return object;
            }
        }
        return null;
    }

    function clearhb() { // 清空画布
        canvas.width = 1400;
        canvas.height = 700;
    }

    function handleMouseDown(event: any) { // 鼠标按下
        const { offsetX, offsetY } = event;
        if (nowObj && offsetX >= nowObj.x && offsetX <= nowObj.x + nowObj.width && offsetY >= nowObj.y && offsetY <= nowObj.y + nowObj.height) {
            isDragging.value = true;
            prevMouseX = offsetX;
            prevMouseY = offsetY;
        }
    }

    function handleMouseMove(event: any) { // 鼠标移动
        if (isDragging.value) {
            const { offsetX, offsetY } = event;
            const deltaX = offsetX - prevMouseX; // 计算当前鼠标位置和上一次位置的差值
            const deltaY = offsetY - prevMouseY;
            nowObj.x += deltaX; // 更新矩形位置
            nowObj.y += deltaY;
            prevMouseX = offsetX; // 更新上一次鼠标位置
            prevMouseY = offsetY;
            clearhb();
            drawAll();
        }
    }

    function handleMouseUp() { // 鼠标松开
        isDragging.value = false;
        if (nowObj) {
            drawAll();
            drawSelect();
        }
    }

    function drawAll() { // 绘制所有
        const objects1 = objects.filter((item: any) => item.type == "cube");
        const objects2 = objects.filter((item: any) => item.type == "line");
        objects2.forEach(function (object: any) {
            drawLine(context, object);
        });
        objects1.forEach(function (object: any) {
            drawObject(context, object);
        });
    }

    function drawSelect() { // 绘制被选中的物体边框
        context.lineWidth = 4;
        context.stroleStyle = "#000";
        context.strokeRect(nowObj.x - 2, nowObj.y - 2, nowObj.width + 4, nowObj.height + 4);
    }

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);;
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("contextmenu", function (event: any) { // 右击事件
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;;
        const y = event.clientY - rect.top;
        const clickedObject = getObjectAtPosition(x, y);
        if (clickedObject) {
            const ind = objects.findIndex((item: any) => item.id == clickedObject.id);
            if (nowObj && nowObj.id != objects[ind].id) {
                addLine(101, nowObj.id, objects[ind].id, "#000");
                clearhb();
                drawAll();
                nowObj = null;
            }
        }
    })
    canvas.addEventListener("dblclick", function (event: any) { // 双击事件
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const clickedObject = getObjectAtPosition(x, y);
        if (clickedObject) {
            clearhb();
            const ind = objects.findIndex((item: any) => item.id == clickedObject.id);
            nowObj = objects[ind];
            objects.splice(ind, 1);
            objects.push(nowObj);
            drawAll();
            drawSelect();
        } else {
            nowObj = null;
            clearhb();
            drawAll();
        }
    })
})

</script>

<style lang="less" scoped>
.myCanvas {
    border: 1px solid red;
}
</style>