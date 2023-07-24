<template>
    <div class="title">
        题库列表
        <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">添加试题</a-button>
    </div>
    <a-table :columns="columns" :data-source="data" :scroll="scrollObj">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'stem'">
                <a v-if="record.type === 3">{{ record.stem.replaceAll('/', '_____') }}</a>
                <a v-else>{{ record.stem }}</a>
            </template>
            <template v-if="column.key === 'type'">{{ typeArr[record.type - 1] }}</template>
            <template v-if="column.key === 'selectArr'">
                <span v-if="record.type == '1'">A.{{ record.selectArr[0] }}. B.{{ record.selectArr[1] }}. C.{{
                    record.selectArr[2]
                }}. D.{{ record.selectArr[3] }}</span>
                <span v-else>/</span>
            </template>
            <template v-if="column.key === 'anwser'">
                <div v-if="record.type === 1">{{ abcd[record.anwser - 1] }}.{{ record.selectArr[record.anwser - 1] }}</div>
                <div v-else-if="record.type === 2">{{ record.anwser === '1' ? '错误' : '正确' }}</div>
                <div v-else>{{ record.anwser }}</div>
            </template>
            <template v-if="column.key === 'url'">
                <span>{{ record.url ? record.url : "/" }}</span>
            </template>
            <template v-if="column.key === 'remark'">
                <span>{{ record.remark ? record.remark : "/" }}</span>
            </template>
            <template v-else-if="column.key === 'action' && levelId === 1">
                <span style="display: flex;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                    <a-button size="small" @click="showModal('edit', record)">修改</a-button>
                    <a-divider type="vertical" />
                    <a-popconfirm title="确定删除该试题吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record)"
                        @cancel="cancel">
                        <a-button size="small">删除</a-button>
                    </a-popconfirm>
                </span>
            </template>
        </template>
    </a-table>
    <a-modal v-model:visible="visible" destroyOnClose :title="title + typeArr[type - 1]" :maskClosable="false">
        <div style="display: flex;justify-content: center;">
            <a-radio-group v-model:value="value" @change="updatePage(value)" v-if="flag !== 'edit'">
                <a-radio-button value="1">选择题</a-radio-button>
                <a-radio-button value="2">判断题</a-radio-button>
                <a-radio-button value="3">填空题</a-radio-button>
                <a-radio-button value="4">问答题</a-radio-button>
                <a-radio-button value="5">操作题</a-radio-button>
            </a-radio-group>
        </div>
        <questionAddPage v-if="pageFlag" :obj="addData" :type="type" :flag="flag" ref="addPage"></questionAddPage>
        <template #footer>
            <a-button key="back" @click="visible = false">取消</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
        </template>
    </a-modal>
</template>

<script lang="ts" setup>
import { addQuestion, updateQuestion, getQuestionList, deleteQuestion, type EditQuestionType, type DeleteParams } from '@/api/examination'
import questionAddPage, { type API as AddPageAPI } from "./modal/questionAddPage.vue"
import { message, Table as aTable } from "ant-design-vue"
import { nextTick, onMounted, reactive, ref } from "vue"
import type { AxiosPromise } from "axios"
import type { ColumnsType } from "ant-design-vue/es/table/interface"

export type TypeFlag = "add" | "edit"

interface scrollType {
    x: number
    y: number | undefined
}

const value = ref("")
const abcd = ["A", "B", "C", "D"]
const pageFlag = ref(true)
const flag = ref<TypeFlag>("add")
const columns = ref<ColumnsType>([
    {
        title: "序号",
        dataIndex: "id",
        key: "id",
        width: 80
    },
    {
        title: "题目",
        dataIndex: "stem",
        key: "stem",
        width: 200
    },
    {
        title: "题目类型",
        dataIndex: "type",
        key: "type",
        width: 100
    },
    {
        title: "选项",
        dataIndex: "selectArr",
        key: "selectArr",
        width: 160
    },
    {
        title: "答案",
        dataIndex: "anwser",
        key: "anwser",
        width: 160
    },
    {
        title: "媒体",
        key: "url",
        dataIndex: "url",
        width: 160
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
        width: 280
    },
])
const typeArr = ["选择题", "判断题", "填空题", "问答题", "操作题"]
const loading = ref(false)
const data = ref<EditQuestionType[]>([])
const scrollObj = reactive<scrollType>({ x: 400, y: undefined })
const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"))
const levelId = ref<number | null>(null)
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level
} else {
    levelId.value = null
}
const visible = ref(false)
const title = ref("")
const addData = reactive<EditQuestionType>({
    _id: "",
    id: 0,
    stem: "",
    type: 1,
    selectArr: [],
    anwser: "",
    url: "",
    remark: ""
})
const addPage = ref<AddPageAPI>()
const type = ref(1)

async function getList() {
    const res = await getQuestionList()
    if (res.data.code === 200) {
        data.value = res.data.rows
    }
}

function updatePage(value: string) {
    pageFlag.value = false
    type.value = parseInt(value)
    nextTick(() => {
        pageFlag.value = true
    })
}

function showModal(typeFlag: TypeFlag, record?: EditQuestionType) {
    visible.value = true
    flag.value = typeFlag
    if (typeFlag === "add") {
        title.value = "添加试题-"
        value.value = "1"
        type.value = 1
        addData.id = 0
        addData.type = 1
        addData.selectArr = []
        addData.stem = addData.anwser = addData.url = addData.remark = ""
    } else {
        if (record) {
            title.value = "修改试题-"
            value.value = record.type + ""
            type.value = record.type
            addData.id = record.id
            addData.stem = record.stem
            addData.type = record.type
            addData.selectArr = record.selectArr
            if (addData.type == 1) {
                const arrList = ["A", "B", "C", "D"]
                addData.anwser = arrList[parseInt(record.anwser as string) - 1]
            } else {
                addData.anwser = record.anwser
            }
            addData.url = record.url
            addData.remark = record.remark
        }
    }
}

async function handleOk(e: MouseEvent) {
    loading.value = true
    interface AType {
        axios: (data: EditQuestionType) => AxiosPromise<any>
        msg: string
    }
    let a: AType = {
        msg: "新增失败",
        axios: addQuestion
    }
    if (flag.value === "edit") {
        a.axios = updateQuestion
        a.msg = "修改失败"
    }
    const result = await addPage.value?.getAddData()
    if (result && a.axios) {
        if (result.type === 1) {
            if (result.anwser === "a" || result.anwser === "A" || result.anwser === "1") {
                result.anwser = "1"
            } else if (result.anwser === "b" || result.anwser === "B" || result.anwser === "2") {
                result.anwser = "2"
            } else if (result.anwser === "c" || result.anwser === "C" || result.anwser === "3") {
                result.anwser = "3"
            } else {
                result.anwser = "4"
            }
        } else if (result.type === 2) {
            if (result.anwser === "对" || result.anwser === "正确" || result.anwser === "0") {
                result.anwser = "0"
            } else {
                result.anwser = "1"
            }
        }
        const res = await a.axios(result)
        if (res.data.code === 200) {
            getList()
            visible.value = false
            message.success(res.data.msg)
        } else {
            message.error(a.msg)
        }
    }
    loading.value = false
}

async function deleteOk(e: EditQuestionType) {
    const params: DeleteParams = {
        _id: e._id,
        id: e.id
    }
    const res = await deleteQuestion(params)
    if (res.data.code === 200) {
        message.success(res.data.msg)
    } else {
        message.error(res.data.msg)
    }
    getList()
}

function cancel() {
    message.error("取消删除");
}

onMounted(() => {
    getList()
})

</script>

<style lang="less" scoped>
.title {
    font-size: 18px;
    font-weight: 600;
    margin: 15px;
}

.box {
    display: flex;
    justify-content: flex-start;
    margin-top: 15px;
    margin-bottom: 15px;

    .box_title {
        width: 80px;
        white-space: nowrap;
    }
}

.img {
    width: 100%;
    height: 100%;
}
</style>