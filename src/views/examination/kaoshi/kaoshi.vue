<template>
    <div class="main ook">
        <div class="main_top">
            <div>考试时长：{{ paperInfo.time }}分钟</div>
            <div>试卷名称：{{ paperInfo.paperName }} (总分：{{ paperInfo.score }})</div>
            <div class="btn_submit">
                <a-popconfirm title="确定返回，并交卷吗?" ok-text="确定" cancel-text="取消" @confirm="submitMe()">
                    <a-button size="small">返回</a-button>
                </a-popconfirm>
                <a-popconfirm title="确定答题完毕，并交卷吗?" ok-text="确定" cancel-text="取消" @confirm="submitMe()">
                    <a-button style="margin-left: 8px;" size="small">交卷</a-button>
                </a-popconfirm>
            </div>
        </div>
        <div class="center main_center">
            <div class="main_center_left">
                <a-button size="small" @click="reduce">上一题</a-button>
            </div>
            <div v-if="flag" class="main_center_content">
                <component v-if="dataArr.length > 0" v-model:obj="dataArr[index]"
                    :is="getComponent(dataArr[index].type)"></component>
            </div>
            <div class="main_center_right">
                <a-button size="small" @click="add">下一题</a-button>
            </div>
        </div>

        <div class="main_bottom">
            <div>逢考必过：考的都会，蒙的都对</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, reactive, onMounted, onUnmounted } from "vue";
import Tixing1 from "./tixing/tixing1.vue";
import Tixing2 from "./tixing/tixing2.vue";
import Tixing3 from "./tixing/tixing3.vue";
import Tixing4 from "./tixing/tixing4.vue";
import Tixing5 from "./tixing/tixing5.vue";
import { autoUpdatePaper, getNowPaper, type AutoUpdatePaperParams, type UpdateDataList } from "@/api/examination";
import { message } from "ant-design-vue";

const prop = defineProps<{
    paperId: number
}>();

interface InfoType {
    paperName: string
    score: string
    time: number
}

const index = ref<number>(0);
const paperId = prop.paperId;
const dataArr = ref<any>([]);
const paperInfo = reactive<InfoType>({
    paperName: "",
    score: "",
    time: 0
});
const flag = ref<boolean>(true);
let timer: any = null;

async function getData(id: number) {
    const data = await getNowPaper(id);
    paperInfo.paperName = data.data.rows.paperName;
    paperInfo.score = data.data.rows.score;
    paperInfo.time = parseInt(data.data.rows.time);
    dataArr.value = data.data.rows.list.map((item: UpdateDataList, index: number) => {
        item.answer = "";
        item.index = index + 1;
        return item;
    })
    timer = setInterval(() => {
        if (paperInfo.time > 0) {
            paperInfo.time--;
        } else {
            if (timer) {
                clearInterval(timer);
                submitMe();
            }
        }
    }, 60000);
}

async function submitMe() {
    const userId = JSON.parse(sessionStorage.getItem("userInfo") as string).userId;
    const data: AutoUpdatePaperParams = { dataArr: JSON.stringify(dataArr.value), paperId: paperId, userId: userId };
    autoUpdatePaper(data);
    goBack();
}

function getComponent(type: number) {
    const arr = [Tixing1, Tixing2, Tixing3, Tixing4, Tixing5];
    return arr[type - 1];
}

function reduce() {
    if (index.value > 0) {
        flag.value = false;
        index.value--;
        nextTick(() => {
            flag.value = true;
        })
    }
}

function add() {
    if (index.value < dataArr.value.length - 1) {
        flag.value = false;
        index.value++;
        nextTick(() => {
            flag.value = true;
        })
    } else {
        message.info("已是最后一题！");
    }
}

function goBack() {
    history.back();
}

onMounted(() => {
    getData(paperId);
})

onUnmounted(() => {
    if (timer) {
        clearInterval(timer);
    }
})

</script>

<style scoped lang="less">
.main {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    row-gap: 20px;
    padding: 10px;

    .main_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .main_center {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .main_center_left,
        .main_center_right {
            display: flex;
            justify-content: center;
            width: 80px;
        }

        .main_center_content {
            margin: 0 10px;
        }
    }

    .main_bottom {
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: column;
        margin-top: 50px auto;
    }
}
</style>