<template>
    <div class="title">
        我的试卷
    </div>
    <a-table :columns="columns" :data-source="data" :scroll="scrollObj">
        <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
                {{ index + 1 }}
            </template>
            <template v-if="column.key === 'action'">
                <a-button v-if="record.flag == 0" size="small" @click="goRoom(record)">开始考试</a-button>
                <div v-else>
                    <a-button style="margin-right: 15px;" size="small" @click="lookResult(record)">查看答卷</a-button>
                    <a-button size="small" @click="resetPaper(record.id)">重新考试</a-button>
                </div>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Table as aTable } from "ant-design-vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import { getMyPaperList, resetNowPaper } from "@/api/examination";
import router from "@/router";

interface scrollType {
    x: number
    y: number | undefined
}

interface dataType {
    answerArr: string[] | number[]
    flag: number
    paperId: number
    paperName: string
    remarkArr: string[]
    rightArr: string[] | number[]
    score: string
    userId: number
    _id: string
}

const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"));
const userId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).userId) {
    userId.value = JSON.parse(userInfo.value).userId;
} else {
    userId.value = null;
}
const columns = ref<ColumnsType>([
    {
        title: "序号",
        key: "index",
        width: 80
    },
    {
        title: "试卷名称",
        dataIndex: "paperName",
        key: "paperName"
    },
    {
        title: "试卷总分",
        dataIndex: "allScore",
        key: "allScore"
    },
    {
        title: "考试时长",
        dataIndex: "time",
        key: "time",
        customRender: (opt) => opt.value + "分钟"
    },
    {
        title: "我的分数",
        dataIndex: "score",
        key: "paperName",
        customRender: (opt) => {
            if (opt.record.flag == 0) {
                return "/"
            } else {
                return opt.value
            }
        },
    },
    {
        title: "操作",
        key: "action"
    }
]);
const scrollObj = reactive<scrollType>({ x: 400, y: undefined });
const data = ref<dataType[]>();

function goRoom(record: any) {
    const infoObj = {
        userId: record.userId,
        paperId: record.paperId,
    };
    localStorage.setItem("infoObj", JSON.stringify(infoObj));
    router.push({ path: "/room" });
}

function lookResult(record: any) {
    const resultObj = {
        id: record.id,
        paperName: record.paperName,
        score: record.score
    };
    localStorage.setItem("resultObj", JSON.stringify(resultObj));
    router.push({ path: "/result" });
}

async function resetPaper(id: number) {
    const res = await resetNowPaper(id);
    if (res.data.code == 200) {
        getList();
    }
}

async function getList() {
    if (userId.value) {
        const res = await getMyPaperList(userId.value);
        data.value = res.data.rows;
    }
}
getList();

</script>

<style lang="less" scoped>
.title {
    font-size: 18px;
    font-weight: 600;
    margin: 15px;
}
</style>