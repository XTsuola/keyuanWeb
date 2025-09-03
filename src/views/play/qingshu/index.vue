<template>
    <!-- <div class="p-4">
        <div class="flex gap-2 my-2">
            <input v-model="input" placeholder="输入消息" class="border px-2 py-1 rounded" />
            <button @click="handleSend" class="bg-blue-500 text-white px-3 py-1 rounded">
                发送
            </button>
        </div>
        <h3 class="mt-4 font-semibold">收到的消息:</h3>
        <ul class="list-disc pl-6">
            <li v-for="(msg, index) in messages" :key="index">
                {{ msg }}
            </li>
        </ul>
    </div> -->
    <div class="qingshu">
        <div class="bottom20">
            牌堆区域：{{cardPile.map(e => qingshuBase.role.find(v => v.id == e)?.name).join("、")}}
        </div>
        <div class="bottom20">
            干扰区域：{{disPile.map(e => qingshuBase.role.find(v => v.id == e)?.name).join("、")}}
        </div>
        <div>
            <span>游戏状态：{{ gameStatus ? (round % 2 == 0 ? "江南回合" : "月色回合") : "游戏结束" }}、 回合数：{{ round }}</span>
        </div>
        <div class="container bottom20">
            <div class="container_left">
                <div>我的状态： <a-tag :color="statusList[myStatus].color">{{ statusList[myStatus].name }}</a-tag>
                </div>
                <div>我的手牌：{{myHandCards.map(e => qingshuBase.role.find(v => v.id == e)?.name).join("、")}}</div>
                <div>我的弃牌：{{myDisCards.map(e => qingshuBase.role.find(v => v.id == e)?.name).join("、")}}</div>
                <div class="myBtn">
                    <a-button style="margin-right: 10px;" type="primary" @click="getNewCard(1)"
                        :disabled="myHandCards.length > 1 || round % 2 == 0">摸牌</a-button>
                    <a-button type="primary" @click="disNowCard(1)" :disabled="myHandCards.length < 2">出牌</a-button>
                </div>

            </div>
            <div class="container_right">
                <div>她的状态： <a-tag :color="statusList[yourStatus].color">{{ statusList[yourStatus].name }}</a-tag>
                </div>
                <div>她的手牌：{{yourHandCards.map(e => qingshuBase.role.find(v => v.id == e)?.name).join("、")}}</div>
                <div>她的弃牌：{{yourDisCards.map(e => qingshuBase.role.find(v => v.id == e)?.name).join("、")}}</div>
                <div class="myBtn">
                    <a-button style="margin-right: 10px;" type="primary" @click="getNewCard(2)"
                        :disabled="yourHandCards.length > 1 || round % 2 == 1">摸牌</a-button>
                    <a-button type="primary" @click="disNowCard(2,)" :disabled="yourHandCards.length < 2">出牌</a-button>
                </div>
            </div>
        </div>
        <div class="bottom20">
            <a-button type="primary" @click="reset">重置游戏</a-button>
        </div>
        <div>
            <a-button @click="showRule = true">规则</a-button>
        </div>
        <a-modal v-model:open="showRule" destroyOnClose title="游戏规则" :maskClosable="false">
            <div class="rule_title">{{ qingshuBase.backgroundTitle }}</div>
            <div>{{ qingshuBase.background }}</div>
            <div class="rule_title">{{ qingshuBase.roleTitle }}</div>
            <div v-for="value in qingshuBase.roleIntroduce">{{ value }}</div>
            <template #footer>
                <a-button key="back" @click="showRule = false">关闭</a-button>
            </template>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useWebSocket } from "@/utils/useWebsocket";
import { qingshuBase } from "@/utils/global";
import { disCard, getCard, getGameMap, resetGame } from "@/api/qingshu";
import { message } from "ant-design-vue";

const { status, messages, sendMessage } = useWebSocket('ws://127.0.0.1:7001/ws');

const statusList = [{
    name: "未开始",
    status: 0,
    color: "#ccc",
}, {
    name: "存活",
    status: 1,
    color: "#87d068",
}, {
    name: "淘汰",
    status: 2,
    color: "#f50",
}, {
    name: "保护",
    status: 3,
    color: "#2db7f5",
}]
const gameStatus = ref(true);
const input = ref('')
const showRule = ref(false);
const cardPile = ref<number[]>([]);
const disPile = ref<number[]>([]);
const myHandCards = ref<number[]>([]);
const myDisCards = ref<number[]>([]);
const myStatus = ref<number>(1);
const yourHandCards = ref<number[]>([]);
const yourDisCards = ref<number[]>([]);
const yourStatus = ref<number>(1);

const round = ref(1);

// 发送按钮点击事件
function handleSend() {
    if (input.value.trim() !== '') {
        sendMessage(input.value)
        input.value = ''
    }
}

async function getList() {
    const res = await getGameMap();
    if (res.status == 200) {
        cardPile.value = res.data.rows.cardPile;
        disPile.value = res.data.rows.disPile;
        round.value = res.data.rows.round;
        myHandCards.value = res.data.rows.userData[0].handCards;
        myDisCards.value = res.data.rows.userData[0].disCards;
        myStatus.value = res.data.rows.userData[0].status;
        yourHandCards.value = res.data.rows.userData[1].handCards;
        yourDisCards.value = res.data.rows.userData[1].disCards;
        yourStatus.value = res.data.rows.userData[1].status;
        for (let i = 0; i < res.data.rows.userData.length; i++) {
            if (res.data.rows.userData[i].status == 2) {
                gameStatus.value = false;
                return
            }
        }
    }
}

async function reset() {
    const res = await resetGame();
    if (res.status == 200) {
        getList();
        gameStatus.value = true;
    }
}

async function getNewCard(userId: number) {
    if (!gameStatus.value) {
        message.error("游戏结束！")
        return
    }
    const res = await getCard(userId)
    if (res.status == 200) {
        getList();
    }
}

async function disNowCard(userId: number) {
    const params: any = {
        myId: userId,
        pai: userId == 1 ? myHandCards.value[0] : yourHandCards.value[0]
    }
    const res = await disCard(params)
    if (res.status == 200) {
        if (cardPile.value.length == 0) {
            gameStatus.value = false;
            message.error("游戏结束！")
        }
        getList();
    }
}

onMounted(() => {
    getList();
})

</script>
<style lang="less" scoped>
.qingshu {
    padding: 20px;

    .container {
        display: flex;
        justify-content: space-between;
        border: 1px solid #cccccc;
        min-height: 200px;

        .container_left {
            position: relative;
            padding: 10px;
            width: 50%;
            border-right: 1px solid #cccccc;
        }

        .container_right {
            position: relative;
            padding: 10px;
            width: 50%;
        }
    }

    .myBtn {
        position: absolute;
        right: 5px;
        bottom: 5px;
    }
}

.bold {
    font-weight: bold;
}

.bottom20 {
    margin-bottom: 20px;
}

.rule_title {
    margin-top: 15px;
    font-size: 16px;
    font-weight: bold;
}
</style>