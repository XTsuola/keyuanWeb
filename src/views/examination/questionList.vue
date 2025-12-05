<template>
    <div class="questionList">
        <div class="title">
            题库列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')"
                v-if="levelId === 1">添加试题</a-button>
        </div>
        <a-table :columns="columns" :data-source="tableData" :pagination="false" bordered>
            <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'index'">
                    {{ index + 1 }}
                </template>
                <template v-if="column.key === 'stem'">
                    <a v-if="record.type === 3">{{ record.stem.replaceAll('/', '_____') }}</a>
                    <a v-else>{{ record.stem }}</a>
                </template>
                <template v-if="column.key === 'type'">{{ typeArr[record.type - 1] }}</template>
                <template v-if="column.key === 'selectArr'">
                    <span v-if="record.type == '1'">A.{{ record.a }}. B.{{ record.b }}. C.{{ record.c }}. D.{{ record.d
                    }}</span>
                    <span v-else>/</span>
                </template>
                <template v-if="column.key === 'answer'">
                    <div v-if="record.type === 1">{{ abcd[record.answer - 1] }}.{{ getAnswer(record) }}
                    </div>
                    <div v-else-if="record.type === 2">{{ record.answer === '1' ? '错误' : '正确' }}</div>
                    <div v-else>{{ record.answer }}</div>
                </template>
                <template v-if="column.key === 'remark'">
                    <span>{{ record.remark ? record.remark : "/" }}</span>
                </template>
                <template v-else-if="column.key === 'action' && levelId === 1">
                    <div style="display: flex;justify-content: center;align-items: center;">
                        <a-button size="small" @click="showModal('edit', record)">修改</a-button>
                        <a-divider type="vertical" />
                        <a-popconfirm title="确定删除该试题吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record.id)">
                            <a-button size="small">删除</a-button>
                        </a-popconfirm>
                    </div>
                </template>
            </template>
        </a-table>
        <a-pagination class="pagination" v-model:current="currentPage" v-model:page-size="pageSize"
            :pageSizeOptions="['10', '15', '20', '50', '100']" :total="total"
            :show-total="(total: any) => `共 ${total} 条`" @change="changePage" />
        <a-modal v-model:open="visible" destroyOnClose :title="title + typeArr[type - 1]" :maskClosable="false">
            <div style="display: flex;justify-content: center;">
                <a-radio-group v-model:value="value" @change="updatePage(value)" v-if="flag !== 'edit'">
                    <a-radio-button value="1">选择题</a-radio-button>
                    <a-radio-button value="2">判断题</a-radio-button>
                    <a-radio-button value="3">填空题</a-radio-button>
                    <a-radio-button value="4">问答题</a-radio-button>
                    <a-radio-button value="5">操作题</a-radio-button>
                </a-radio-group>
            </div>
            <questionAddPage v-if="pageFlag" :addParams="addData" :type="type" :flag="flag" ref="addPage">
            </questionAddPage>
            <template #footer>
                <a-button key="back" @click="visible = false">取消</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import { message } from "ant-design-vue";
import type { AxiosPromise } from "axios";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import type { AddType } from "@/utils/global";
import { addQuestion, updateQuestion, getQuestionList, deleteQuestion, type AddQuestionType, type GetQuestionListType } from '@/api/examination';
import questionAddPage from "./modal/questionAddPage.vue";

const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const value = ref("");
const abcd = ["A", "B", "C", "D"];
const pageFlag = ref(true);
const flag = ref<AddType>("add");
const columns = ref<ColumnsType>([
    {
        title: "序号",
        key: "index",
        align: "center",
        width: 60,
    },
    {
        title: "题目",
        dataIndex: "stem",
        key: "stem",
        width: 160
    },
    {
        title: "题目类型",
        dataIndex: "type",
        key: "type",
        width: 80
    },
    {
        title: "选项",
        dataIndex: "selectArr",
        key: "selectArr",
        width: 160
    },
    {
        title: "答案",
        dataIndex: "answer",
        key: "answer",
        width: 140
    },
    {
        title: "注解",
        key: "remark",
        dataIndex: "remark",
        width: 160
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        width: 240
    },
]);
const typeArr = ["选择题", "判断题", "填空题", "问答题", "操作题"];
const loading = ref(false);
const tableData = ref<any>([]);
const userInfo = ref<string | null>(sessionStorage.getItem("userInfo"));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const visible = ref(false);
const title = ref("");
const addData = reactive<AddQuestionType>({
    stem: "",
    type: 1,
    a: "",
    b: "",
    c: "",
    d: "",
    answer: "",
    remark: ""
});
const addPage = ref<any>();
const type = ref(1);

async function getList() {
    const params: GetQuestionListType = {
        pageSize: pageSize.value,
        pageNo: currentPage.value
    };
    const res = await getQuestionList(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
    }
}

function updatePage(value: string) {
    pageFlag.value = false;
    type.value = parseInt(value);
    nextTick(() => {
        pageFlag.value = true;
    })
}

function showModal(typeFlag: AddType, record?: AddQuestionType) {
    visible.value = true;
    flag.value = typeFlag;
    if (typeFlag === "add") {
        title.value = "添加试题-";
        value.value = "1";
        type.value = 1;
        addData.id = 0;
        addData.type = 1;
        addData.stem = addData.answer = addData.remark = "";
    } else {
        if (record) {
            title.value = "修改试题-";
            value.value = record.type + "";
            type.value = record.type;
            addData.id = record.id;
            addData.stem = record.stem;
            addData.type = record.type;
            addData.a = record.a;
            addData.b = record.b;
            addData.c = record.c;
            addData.d = record.d;
            if (addData.type == 1) {
                const arrList = ["A", "B", "C", "D"];
                addData.answer = arrList[parseInt(record.answer as string) - 1];
            } else if (addData.type == 2) {
                addData.answer = record.answer == "1" ? "错误" : "正确";
            } else {
                addData.answer = record.answer;
            }
            addData.remark = record.remark;
        }
    }
}

async function handleOk() {
    loading.value = true;
    interface AType {
        axios: (data: AddQuestionType) => AxiosPromise<any>
    }
    let a: AType = {
        axios: addQuestion
    };
    if (flag.value === "edit") {
        a.axios = updateQuestion;
    }
    try {
        const result = await addPage.value?.getAddData()
        if (result && a.axios) {
            if (result.type === 1) {
                if (result.answer === "a" || result.answer === "A" || result.answer === "1") {
                    result.answer = "1";
                } else if (result.answer === "b" || result.answer === "B" || result.answer === "2") {
                    result.answer = "2";
                } else if (result.answer === "c" || result.answer === "C" || result.answer === "3") {
                    result.answer = "3";
                } else {
                    result.answer = "4";
                }
            } else if (result.type === 2) {
                if (result.answer === "对" || result.answer === "正确" || result.answer === "0") {
                    result.answer = "0";
                } else {
                    result.answer = "1";
                }
            }
            const res = await a.axios(result);
            if (res.data.code === 200) {
                getList();
                visible.value = false;
                message.success(res.data.msg);
            } else {
                message.error(res.data.msg);
            }
        }
    } catch (_) { }
    loading.value = false;
}

function getAnswer(record: any) {
    let answer = "", ind = parseInt(record.answer);
    switch (ind) {
        case 1:
            answer = record.a
            break;
        case 2:
            answer = record.b
            break;
        case 3:
            answer = record.c
            break;
        case 4:
            answer = record.d
            break;
        default:
            break;
    }
    return answer;
}

async function deleteOk(id: number) {
    const res = await deleteQuestion(id);
    if (res.data.code === 200) {
        message.success(res.data.msg);
    } else {
        message.error(res.data.msg);
    }
    if (tableData.value.length == 1) {
        currentPage.value--;
    }
    getList();
}


function changePage(page: number, size: number) {
    pageSize.value = size;
    currentPage.value = page;
    getList();
}

onMounted(() => {
    getList();
})

</script>

<style lang="less" scoped>
.questionList {
    padding: 20px;

    .title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 15px 15px 0;
    }

    .pagination {
        text-align: right;
        margin-top: 20px;
    }
}
</style>