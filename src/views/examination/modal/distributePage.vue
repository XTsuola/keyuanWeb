<template>
    <div style="margin-bottom: 10px;">
        <div>
            试卷名称：<a-select style="width: 160px;" v-model:value="paperId" placeholder="请选择试卷">
                <a-select-option v-for="item in paperSelect" :value="item.id" :key="item.id">{{ item.paperName }}
                </a-select-option>
            </a-select>
            <a-button style="margin-left: 20px;" @click="addPaper()">新增考卷</a-button>
        </div>
    </div>
    <a-table :columns="columns" :data-source="data" :scroll="scrollObj">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action' && levelId === 1">
                <a-popconfirm title="确定删除该考卷吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record)"
                    @cancel="cancel">
                    <a-button size="small">删除</a-button>
                </a-popconfirm>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Table as aTable, message } from "ant-design-vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import { getUserPaperList, getOthersPaperSelectList, addReport, deleteReport, type DeleteReportType, type PaperDataType } from "@/api/examination";

interface scrollType {
    x: number
    y: number | undefined
}

interface dataType {
    answerArr: string[] | number[]
    flag: boolean
    paperId: number
    paperName: string
    remarkArr: string[]
    rightArr: string[] | number[]
    score: string
    userId: number
    id: number
}

interface PaperSelectType {
    id: number
    paperName: string
    remark: string
    stemArr: number[]
    _id: string
}

interface RecordType {
    id: number
    paperList: number[]
    userName: string
}

const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const columns = ref<ColumnsType>([
    {
        title: "试卷ID",
        dataIndex: "paperId",
        key: "paperId"
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
    },
]);
const prop = defineProps<{
    obj: RecordType | undefined
}>();
const scrollObj = reactive<scrollType>({ x: 400, y: undefined });
const data = ref<dataType[]>();
const parperIdList = ref<number[]>([]);
parperIdList.value = prop.obj?.paperList ? prop.obj?.paperList : [];
const emit = defineEmits<{
    (event: "upDateList"): void
}>();
const paperSelect = ref<PaperSelectType[]>();
const paperId = ref<number | undefined>(undefined);

async function addPaper() {
    if (paperId.value && prop.obj) {
        const data = {
            userId: prop.obj.id,
            paperId: paperId.value
        };
        const res = await addReport(data);
        parperIdList.value = [...parperIdList.value, paperId.value];
        if (res) {
            paperId.value = undefined;
            getSelect();
            getList();
            emit("upDateList");
        }
    } else {
        message.error("请选择试卷！");
    }
}

async function deleteOk(e: dataType) {
    const params: DeleteReportType = {
        id: e.id,
        paperId: e.paperId,
        userId: prop.obj ? prop.obj.id : 0
    };
    const res = await deleteReport(params);
    if (res.data.code === 200) {
        message.success(res.data.msg);
        parperIdList.value = parperIdList.value.filter(item => {
            return item !== e.paperId as number;
        })
    } else {
        message.error("删除失败");
    }
    getSelect();
    getList();
    emit("upDateList");
}

function cancel() {
    message.error("取消删除");
}

async function getSelect() {
    if (prop.obj) {
        const res = await getOthersPaperSelectList(parperIdList.value);
        paperSelect.value = res.data.rows;
    }
}
getSelect();

async function getList() {
    if (prop.obj) {
        const params: PaperDataType = {
            userId: prop.obj.id,
            paperList: parperIdList.value
        };
        const res = await getUserPaperList(params);
        data.value = res.data.rows;
    }
}
getList();

</script>

<style lang="less" scoped></style>