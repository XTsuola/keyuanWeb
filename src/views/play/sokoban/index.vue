<template>
    <div class="main" v-if="flag">
        <div class="title">
            第{{ level + 1 }}关：
            <a-button size="small" @click="reset">重置关卡</a-button>
        </div>
        <div class="box">
            <div class="list" v-for="(list, y) in mapList" :key="y">
                <div class="boxItem" v-for="(item, x) in list" :key="item + x">
                    <div v-if="item === 0">
                        <div></div>
                    </div>
                    <div v-if="item === 1">
                        <div class="obstacle"></div>
                    </div>
                    <div v-if="item === 8">
                        <div style="font-size: 24px;">❤️</div>
                    </div>
                    <div v-if="item === 2">
                        <div style="font-size: 36px;">📦</div>
                    </div>
                    <div v-if="x === people.x && y === people.y">
                        <div class="people"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="action">
            <div>
                <a-button style="transform: translateX(100%);" @click="moveIt('ArrowUp')">上</a-button>
            </div>
            <div>
                <a-button @click="moveIt('ArrowLeft')">左</a-button>
                <a-button @click="moveIt('ArrowDown')">下</a-button>
                <a-button @click="moveIt('ArrowRight')">右</a-button>
            </div>
        </div>
    </div>
    <div v-if="!flag">恭喜通关！！！</div>
</template>

<script lang="tsx" setup>
import { reactive, ref, watch } from "vue";
import { message } from "ant-design-vue";
import jsonData from "./data.json";

interface PositionType {
    x: number
    y: number
}

const renwuDir = ref("translate(-50%,-50%) rotateY(0)");
const flag = ref<boolean>(true);
const level = ref<number>(0);
const mapList = ref<number[][]>([]);
mapList.value = JSON.parse(JSON.stringify(jsonData[level.value].data));
const people = reactive<PositionType>({
    x: jsonData[level.value].peopleX,
    y: jsonData[level.value].peopleY
});
let heartList: PositionType[] = [];
const count = ref<number>(0);

function xuanran(x: number, y: number, direction: string) {
    if (direction === "ArrowUp") {
        for (var i = 0; i < heartList.length; i++) {
            if (heartList[i].x === x && heartList[i].y === y) {
                if (mapList.value[y - 1][x] === 1) {
                    continue;
                } else if (mapList.value[y - 1][x] === 8) {
                    mapList.value[y][x] = 8;
                    heartList.push({ x: x, y: y - 1 });
                    mapList.value[y - 1][x] = 2;
                    heartList.splice(i, 1);
                } else {
                    mapList.value[y][x] = 8;
                    mapList.value[y - 1][x] = 2;
                    count.value--;
                    heartList.splice(i, 1);
                }
            }
        }
        if (mapList.value[y] && mapList.value[y][x] === 2) {
            if (mapList.value[y - 1]) {
                if (!(mapList.value[y - 1][x] === 2 || mapList.value[y - 1][x] === 1)) {
                    if (mapList.value[y - 1][x] === 8) {
                        heartList.push({ x: x, y: y - 1 });
                        count.value++;
                    }
                    people.y--;
                    mapList.value[y][x] = 0;
                    mapList.value[y - 1][x] = 2;
                }
            }
        } else {
            people.y--;
        }
    } else if (direction === "ArrowLeft") {
        for (var i = 0; i < heartList.length; i++) {
            if (heartList[i].x === x && heartList[i].y === y) {
                if (mapList.value[y][x] === 1) {
                    continue;
                } else if (mapList.value[y][x - 1] === 8) {
                    mapList.value[y][x] = 8;
                    heartList.push({ x: x - 1, y: y });
                    mapList.value[y][x - 1] = 2;
                    heartList.splice(i, 1);
                } else {
                    mapList.value[y][x] = 8;
                    mapList.value[y][x - 1] = 2;
                    count.value--;
                    heartList.splice(i, 1);
                }
            }
        }
        if (mapList.value[y][x] === 2) {
            if (mapList.value[y][x - 1] !== undefined) {
                if (!(mapList.value[y][x - 1] === 2 || mapList.value[y][x - 1] === 1)) {
                    if (mapList.value[y][x - 1] === 8) {
                        heartList.push({ x: x - 1, y: y });
                        count.value++;
                    }
                    people.x--;
                    mapList.value[y][x] = 0;
                    mapList.value[y][x - 1] = 2;
                }
            }
        } else {
            people.x--;
        }
    } else if (direction === "ArrowDown") {
        for (var i = 0; i < heartList.length; i++) {
            if (heartList[i].x === x && heartList[i].y === y) {
                if (mapList.value[y + 1][x] === 1) {
                    continue;
                } else if (mapList.value[y + 1][x] === 8) {
                    mapList.value[y][x] = 8;
                    heartList.push({ x: x, y: y + 1 });
                    mapList.value[y + 1][x] = 2;
                    heartList.splice(i, 1);
                } else {
                    mapList.value[y][x] = 8;
                    mapList.value[y + 1][x] = 2;
                    count.value--;
                    heartList.splice(i, 1);
                }
            }
        }
        if (mapList.value[y] && mapList.value[y][x] === 2) {
            if (mapList.value[y + 1]) {
                if (!(mapList.value[y + 1][x] === 2 || mapList.value[y + 1][x] === 1)) {
                    if (mapList.value[y + 1][x] === 8) {
                        heartList.push({ x: x, y: y + 1 });
                        count.value++;
                    }
                    people.y++;
                    mapList.value[y][x] = 0;
                    mapList.value[y + 1][x] = 2;
                }
            }
        } else {
            people.y++;
        }
    } else if (direction === "ArrowRight") {
        for (var i = 0; i < heartList.length; i++) {
            if (heartList[i].x === x && heartList[i].y === y) {
                if (mapList.value[y][x] === 1) {
                    continue;
                } else if (mapList.value[y][x + 1] === 8) {
                    mapList.value[y][x] = 8;
                    heartList.push({ x: x + 1, y: y });
                    mapList.value[y][x + 1] = 2;
                    heartList.splice(i, 1);
                } else {
                    mapList.value[y][x] = 8;
                    mapList.value[y][x + 1] = 2;
                    count.value--;
                    heartList.splice(i, 1);
                }
            }
        }
        if (mapList.value[y][x] === 2) {
            if (mapList.value[y][x + 1] !== undefined) {
                if (!(mapList.value[y][x + 1] === 2 || mapList.value[y][x + 1] === 1)) {
                    if (mapList.value[y][x + 1] === 8) {
                        heartList.push({ x: x + 1, y: y });
                        count.value++;
                    }
                    people.x++;
                    mapList.value[y][x] = 0;
                    mapList.value[y][x + 1] = 2;
                }
            }
        } else {
            people.x++;
        }
    }
}

function moveIt(direction: string) {
    if (direction === "ArrowUp") {
        if (people.y > 0 && mapList.value[people.y - 1][people.x] !== 1 && !(mapList.value[people.y - 1][people.x] === 2 && mapList.value[people.y - 2] && mapList.value[people.y - 2][people.x] === 2)) {
            xuanran(people.x, people.y - 1, direction);
        }
    } else if (direction === "ArrowLeft") {
        renwuDir.value = "translate(-50%,-50%) rotateY(180deg)";
        if (people.x > 0 && mapList.value[people.y][people.x - 1] !== 1 && !(mapList.value[people.y][people.x - 1] === 2 && mapList.value[people.y][people.x - 2] === 2)) {
            xuanran(people.x - 1, people.y, direction);
        }
    } else if (direction === "ArrowDown") {
        if (people.y < 8 && mapList.value[people.y + 1][people.x] !== 1 && !(mapList.value[people.y + 1][people.x] === 2 && mapList.value[people.y + 2] && mapList.value[people.y + 2][people.x] === 2)) {
            xuanran(people.x, people.y + 1, direction);
        }
    } else if (direction === "ArrowRight") {
        renwuDir.value = "translate(-50%,-50%) rotateY(0)";
        if (people.x < 8 && mapList.value[people.y][people.x + 1] !== 1 && !(mapList.value[people.y][people.x + 1] === 2 && mapList.value[people.y][people.x + 2] === 2)) {
            xuanran(people.x + 1, people.y, direction);
        }
    }
}

document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.key === "ArrowUp") {
        if (people.y > 0 && mapList.value[people.y - 1][people.x] !== 1 && !(mapList.value[people.y - 1][people.x] === 2 && mapList.value[people.y - 2] && mapList.value[people.y - 2][people.x] === 2)) {
            xuanran(people.x, people.y - 1, e.key);
        }
    } else if (e && e.key === "ArrowLeft") {
        renwuDir.value = "translate(-50%,-50%) rotateY(180deg)";
        if (people.x > 0 && mapList.value[people.y][people.x - 1] !== 1 && !(mapList.value[people.y][people.x - 1] === 2 && mapList.value[people.y][people.x - 2] === 2)) {
            xuanran(people.x - 1, people.y, e.key);
        }
    } else if (e && e.key === "ArrowDown") {
        if (people.y < 8 && mapList.value[people.y + 1][people.x] !== 1 && !(mapList.value[people.y + 1][people.x] === 2 && mapList.value[people.y + 2] && mapList.value[people.y + 2][people.x] === 2)) {
            xuanran(people.x, people.y + 1, e.key);
        }
    } else if (e && e.key === "ArrowRight") {
        renwuDir.value = "translate(-50%,-50%) rotateY(0)";
        if (people.x < 8 && mapList.value[people.y][people.x + 1] !== 1 && !(mapList.value[people.y][people.x + 1] === 2 && mapList.value[people.y][people.x + 2] === 2)) {
            xuanran(people.x + 1, people.y, e.key);
        }
    }
}

function reset() {
    heartList = [];
    count.value = 0;
    mapList.value = JSON.parse(JSON.stringify(jsonData[level.value].data));
    people.x = jsonData[level.value].peopleX;
    people.y = jsonData[level.value].peopleY;
}

watch(count, (newValue) => {
    if (newValue === jsonData[level.value].score) {
        heartList = [];
        count.value = 0;
        if (level.value < jsonData.length - 1) {
            level.value++;
            message.success(`进入第${level.value + 1}关`);
            mapList.value = JSON.parse(JSON.stringify(jsonData[level.value].data));
            people.x = jsonData[level.value].peopleX;
            people.y = jsonData[level.value].peopleY;
        } else {
            message.success("恭喜通关");
            flag.value = false;
        }
    }
})

</script>

<style lang="less" scoped>
@media screen and (max-width: 768px) {
    .box {
        width: 81vw !important;
        height: 81vw !important;

        .list {
            width: 81vw !important;
            height: 9vw !important;

            .boxItem {
                width: 9vw !important;
                height: 9vw !important;

                .people {
                    width: 8vw !important;
                    height: 8vw !important;
                }

                .obstacle {
                    width: 8vw !important;
                    height: 8vw !important;
                }
            }
        }
    }
}

.main {
    padding: 0 10px 10px;

    .title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 15px;
        margin-top: 10px;
    }

    .action {
        margin-top: 15px;
        margin-left: 15px;
    }
}

.box {
    width: 630px;
    height: 630px;
    border: 1px solid red;

    .list {
        width: 630px;
        height: 70px;
        display: flex;
        justify-content: center;

        .boxItem {
            position: relative;
            width: 70px;
            height: 70px;
            border: 1px solid rgb(235, 90, 90);
            display: flex;
            justify-content: center;
            align-items: center;

            .people {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: v-bind(renwuDir);
                background: orange;
                width: 50px;
                height: 50px;
                background: url("@/assets/images/game/box/caiwenji.jpg");
                background-size: 110%;
                background-position: 50% 50%;
            }

            .obstacle {
                background: orange;
                width: 60px;
                height: 60px;
                background: url("@/assets/images/game/box/qiang.png");
            }
        }
    }
}
</style>