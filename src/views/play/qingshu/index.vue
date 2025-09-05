<template>
    <div class="qingshu">
        <div class="bottom20">
            <span v-if="gameStatus">
                牌堆区域：{{cardPile.map(e => qingshuBase.role.find(v => v.id == e)?.name ? "?" : "").join("、")}}
            </span>
            <span v-else>
                牌堆区域：{{cardPile.map(e => qingshuBase.role.find(v => v.id == e)?.name).join("、")}}
            </span>

        </div>
        <div class="bottom20">
            <span v-if="gameStatus">
                干扰区域：{{disPile.map(e => qingshuBase.role.find(v => v.id == e)?.name ? "?" : "").join("、")}}
            </span>
            <span v-else>
                干扰区域：{{disPile.map(e => qingshuBase.role.find(v => v.id == e)?.name).join("、")}}
            </span>

        </div>
        <div>
            <span>游戏状态：{{ gameStatus ? (round % 2 == 0 ? "江南回合" : "月色回合") : "游戏结束" }}</span>
        </div>
        <div class="container bottom20">
            <div class="container_left">
                <div>我的状态： <a-tag :color="statusList[myStatus].color">{{ statusList[myStatus].name }}</a-tag>
                </div>
                <div>我的手牌：</div>
                <div style="display: flex;justify-content: flex-start;align-items: center;height: 40px;">
                    <div class="cardBox" :class="nowIndex == index && myHandCards.length > 1 ? 'borderRed' : ''"
                        v-for="(item, index) in myHandCards" @click="getNowCard(item, index)">
                        {{qingshuBase.role.find(v => v.id == item)?.name}}
                    </div>
                </div>
                <div>我的弃牌：</div>
                <div>{{myDisCards.map(e => qingshuBase.role.find(v => v.id == e)?.name).join("、")}}</div>
                <div class="myBtn">
                    <a-button style="margin-right: 10px;" type="primary" @click="getNewCard()"
                        :disabled="myHandCards.length > 1 || round % 2 == myId - 1">摸牌</a-button>
                    <a-button type="primary" @click="panduan()" :disabled="myHandCards.length < 2">出牌</a-button>
                </div>

            </div>
            <div class="container_right">
                <div>对手状态： <a-tag :color="statusList[yourStatus].color">{{ statusList[yourStatus].name }}</a-tag>
                </div>
                <div>对手手牌：</div>
                <div style="display: flex;justify-content: flex-start;align-items: center;height: 40px;">
                    <div class="cardBox" v-for="(item, index) in yourHandCards" @click="getNowCard(item, index)">
                        <span v-if="!gameStatus">{{qingshuBase.role.find(v => v.id == item)?.name}}</span>
                        <span v-else>?</span>
                    </div>
                </div>
                <div>对手弃牌：</div>
                <div>{{yourDisCards.map(e => qingshuBase.role.find(v => v.id == e)?.name).join("、")}}</div>
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
        <a-modal v-model:open="visible" destroyOnClose :maskClosable="false" centered>
            <div>
                <div>我猜测的牌是：</div>
                <div style="display: flex;justify-content: flex-start;align-items: center;height: 40px;">
                    <div class="cardBox" :class="yourPai == 2 ? 'borderRed' : ''" @click="yourPai = 2">牧师</div>
                    <div class="cardBox" :class="yourPai == 3 ? 'borderRed' : ''" @click="yourPai = 3">男爵</div>
                    <div class="cardBox" :class="yourPai == 4 ? 'borderRed' : ''" @click="yourPai = 4">侍女</div>
                    <div class="cardBox" :class="yourPai == 5 ? 'borderRed' : ''" @click="yourPai = 5">王子</div>
                    <div class="cardBox" :class="yourPai == 6 ? 'borderRed' : ''" @click="yourPai = 6">国王</div>
                    <div class="cardBox" :class="yourPai == 7 ? 'borderRed' : ''" @click="yourPai = 7">女伯爵</div>
                    <div class="cardBox" :class="yourPai == 8 ? 'borderRed' : ''" @click="yourPai = 8">公主</div>
                </div>
            </div>
            <template #footer>
                <a-button key="back" @click="visible = false">取消</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="disNowCard">确定</a-button>
            </template>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useWebSocket } from "@/utils/useWebsocket";
import { qingshuBase } from "@/utils/global";
import { getGameMap } from "@/api/qingshu";
import { message } from "ant-design-vue";

const myId = ref(-1);
const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"));
if (userInfo.value && JSON.parse(userInfo.value).userId) {
    myId.value = JSON.parse(userInfo.value).userId;
} else {
    myId.value = -1;
}
const { sendMessage, closeWS } = useWebSocket(`ws://127.0.0.1:8002/ws?userId=${myId.value}`,
    {
        onmessage: (msg: any) => {
            if (msg) {
                const data = JSON.parse(msg);
                console.log("外部回调拿到消息:", msg);
                if (data.msg == "摸牌成功") {
                    getList();
                } else if (data.msg == "重置成功") {
                    getList();
                    gameStatus.value = true;
                    nowIndex.value = yourPai.value = -1;
                    nowPai.value = 0;
                } else if (data.msg == "出牌成功") {
                    getList();
                    nowIndex.value = -1;
                    nowPai.value = 0;
                    visible.value = loading.value = false;
                } else {
                    if (data.code == 202) {
                        message.info("你对手的手牌是：" + qingshuBase.role[parseInt(data.msg) - 1].name)
                    }
                }
            }
        },
    }
);
const nowIndex = ref(-1);
const nowPai = ref(0);

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
const loading = ref(false);
const visible = ref(false);
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
const yourPai = ref(-1);
const round = ref(1);

async function getList() {
    const res = await getGameMap();
    if (res.status == 200) {
        cardPile.value = res.data.rows.cardPile;
        disPile.value = res.data.rows.disPile;
        round.value = res.data.rows.round;
        myHandCards.value = res.data.rows.userData[myId.value == 1 ? 0 : 1].handCards;
        myDisCards.value = res.data.rows.userData[myId.value == 1 ? 0 : 1].disCards;
        myStatus.value = res.data.rows.userData[myId.value == 1 ? 0 : 1].status;
        yourHandCards.value = res.data.rows.userData[myId.value == 1 ? 1 : 0].handCards;
        yourDisCards.value = res.data.rows.userData[myId.value == 1 ? 1 : 0].disCards;
        yourStatus.value = res.data.rows.userData[myId.value == 1 ? 1 : 0].status;
        if (res.data.rows.msg && res.data.rows.status == 2) {
            gameStatus.value = false;
            message.error(res.data.rows.msg)
        }
        /* else {
            if (!isNaN(parseInt(res.data.rows.msg))) {
                const msg = "他的手牌是：" + qingshuBase.role[parseInt(res.data.rows.msg) - 1].name;
                message.info(msg);
            }
        } */
    }
}

async function reset() {
    // const res = await resetGame();
    // if (res.status == 200) {
    //     getList();
    //     gameStatus.value = true;
    //     nowIndex.value = yourPai.value = -1;
    //     nowPai.value = 0;
    // }
    const command = {
        type: 9, // 重置
        userId: myId.value
    }
    sendMessage(command)
}

async function getNewCard() { // 摸牌
    if (!gameStatus.value) {
        message.error("游戏结束！")
        return
    }
    const command = {
        type: 1,
        userId: myId.value
    }
    sendMessage(command)
}

let nowUserId = - 1
function panduan() {
    nowUserId = myId.value;
    yourPai.value = -1;
    if (nowIndex.value == -1) {
        message.error("请选择牌");
        return
    }
    if (nowPai.value == 8) {
        message.error("公主不能被打出");
        return
    }
    if (myHandCards.value[nowIndex.value == 0 ? 1 : 0] == 7) {
        if (nowPai.value == 5 || nowPai.value == 6) {
            message.error("你必须打出女伯爵");
            return
        }
    }
    if (nowPai.value == 1) {
        visible.value = true;
        return
    }
    disNowCard()
}

async function disNowCard() { // 出牌
    loading.value = true;
    const command = {
        type: 2,
        userId: myId.value,
        pai: nowPai.value,
        yourPai: yourPai.value,
        index: nowIndex.value
    }
    sendMessage(command)
}

function getNowCard(pai: number, index: number) {
    if (myHandCards.value.length == 2 || yourHandCards.value.length == 2) {
        nowIndex.value = index;
        nowPai.value = pai;
    }
}

onMounted(() => {
    getList();
})

onBeforeUnmount(() => {
    closeWS();
});

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

.cardBox {
    border: 1px solid #ccc;
    margin-right: 10px;
    cursor: pointer;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 30px
}

.borderRed {
    border: 1px solid red;
}
</style>