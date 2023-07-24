<template>
    <div class="main">
        <div class="title">
            精彩锦集列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal()">添加锦集</a-button>
        </div>
        <a-table :columns="columns" :data-source="data" :scroll="scrollObj">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                    <a>{{ record.name }}</a>
                </template>
                <template v-else-if="column.key === 'url'">
                    <a @click="showVideo(record.url)">{{ record.name + record.url.slice(record.url.lastIndexOf("."))
                    }}</a>
                </template>
                <template v-else-if="column.key === 'action' && levelId === 1">
                    <span style="display: flex;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                        <a-popconfirm title="确定删除该成员吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record)"
                            @cancel="cancel">
                            <a-button size="small">删除</a-button>
                        </a-popconfirm>
                    </span>
                </template>
            </template>
        </a-table>
        <a-modal v-model:visible="visible" destroyOnClose title="添加锦集" :maskClosable="false">
            <input type="file" @input="getWrc" />
            <a-form ref="wonderfulAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
                autocomplete="off">
                <a-form-item label="锦集名称" name="name" :rules="[{ required: true, message: '请输入锦集名称!' }]">
                    <a-input v-model:value="addData.name" type="text" clearable></a-input>
                </a-form-item>
                <a-form-item label="锦集地址">
                    <a-input v-model:value="addData.url" :readonly="true" :disabled="true" type="text" clearable>
                    </a-input>
                </a-form-item>
                <a-form-item label="上传作者" name="author" :rules="[{ required: true, message: '请输入作者!' }]">
                    <a-input v-model:value="addData.author" type="text" clearable></a-input>
                </a-form-item>
                <a-form-item label="上传时间">
                    <a-input v-model:value="addData.time" :readonly="true" :disabled="true" type="text" clearable>
                    </a-input>
                </a-form-item>
                <a-form-item label="备注">
                    <a-textarea v-model:value="addData.remark" type="text" clearable></a-textarea>
                </a-form-item>
            </a-form>
            <template #footer>
                <a-button key="back" @click="visible = false">取消</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
            </template>
        </a-modal>
        <a-modal v-model:visible="visible2" destroyOnClose title="查看锦集" :maskClosable="false">
            <video style="width: 100%;height: 100%;" v-if="videoFlag" class="video" :src="wrcUrl" controls autoplay></video>
            <img v-if="imgFlag" :src="wrcUrl" style="width: 100%;height:100%;" />
            <template #footer></template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import COS from "cos-js-sdk-v5"
import { getWrcList, deleteWrc, type DeleteParams, type AddWrcPasrams, addWrc } from "@/api/team"
import { Table as aTable, message } from "ant-design-vue"
import { onMounted, reactive, ref } from "vue"
import { getNowTime } from "@/utils/some"

interface ColumnType {
    title: string
    dataIndex?: string
    key: string
    width: number
}

interface scrollType {
    x: number
    y: number | undefined
}

interface DataType {
    key: number
    name: string
    url: string
    author: string
    time: string
    remark: string
}

interface WrcDeleteType extends DataType {
    _id: string
}

interface addDataType {
    name: string
    url: string
    author: string
    time: string
    remark: string
}

const columns = ref<ColumnType[]>([
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 120
    },
    {
        title: "链接",
        dataIndex: "url",
        key: "url",
        width: 160
    },
    {
        title: "上传者",
        dataIndex: "author",
        key: "author",
        width: 160
    },
    {
        title: "上传时间",
        dataIndex: "time",
        key: "time",
        width: 160
    },
    {
        title: "备注",
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

const data = ref<DataType[]>([])
const scrollObj = reactive<scrollType>({ x: 400, y: undefined })
const mql = window.matchMedia("(max-width: 768px)")
const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"))
const levelId = ref<number | null>(null)
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level
} else {
    levelId.value = null
}
const visible = ref<boolean>(false)
const visible2 = ref<boolean>(false)
const loading = ref<boolean>(false)
const videoFlag = ref<boolean>(false)
const imgFlag = ref<boolean>(false)
const wrcUrl = ref<string>("")
const addType = ref<string>("")
const addData = reactive<addDataType>({
    name: "",
    url: "",
    author: "",
    time: "",
    remark: ""
})
const wonderfulAdd = ref()

function mediaMatchs() {
    if (mql.matches) {
        scrollObj.y = 550
    } else {
        scrollObj.y = undefined
    }
}
mediaMatchs()
mql.addEventListener("change", mediaMatchs)

async function getList() {
    const res = await getWrcList()
    if (res.data.code === 200) {
        data.value = res.data.rows
    }
}

function showModal() {
    visible.value = true
    addType.value = ""
    addData.author = addData.name = addData.url = addData.time = addData.remark = ""
}

function showVideo(url: string) {
    visible2.value = true
    const suffix = url.slice(url.lastIndexOf(".") + 1)
    const imgType = ["jpg", "png", "gif", "jpeg", "bmp", "JPG"]
    const videoType = ["mp4", "mp3", "m4a"]
    imgFlag.value = imgType.includes(suffix)
    videoFlag.value = videoType.includes(suffix)
    wrcUrl.value = "https://" + url
}

async function handleOk(e: MouseEvent) {
    try {
        await wonderfulAdd.value?.validate()
        loading.value = true
        const params: AddWrcPasrams = {
            name: addData.name,
            url: addData.url,
            author: addData.author,
            time: addData.time,
            remark: addData.remark
        }
        const res = await addWrc(params)
        if (res.data.code === 200) {
            visible.value = false
            loading.value = false
            getList()
            message.success(res.data.msg)
        }
    } catch (_) {
        return false
    }

}

async function deleteOk(e: WrcDeleteType) {
    const params: DeleteParams = {
        _id: e._id
    }
    const res = await deleteWrc(params)
    if (res.data.code === 200) {
        getList()
        message.success(res.data.msg)
    } else {
        getList()
        message.error("删除失败")
    }
}

function cancel() {
    message.error("取消删除")
}

async function getWrc(e: any) {
    const target = e.target as any
    const cos = new COS({
        SecretId: "AKID73j9JCo9D0WljRs2waw1pOghRv83h5D3",
        SecretKey: "auxjESQ6WfY9TWItDG2YnlRr0sTr0tVq"
    })
    const tengxunCos = {
        Bucket: "suola-1300285550",
        Region: "ap-nanjing"
    }
    const fileName = new Date() + target.files[0].name
    const params = {
        Bucket: tengxunCos.Bucket,
        Region: tengxunCos.Region,
        Key: fileName,
        Body: target.files[0]
    }
    cos.putObject(params, async (error, data) => {
        if (!error) {
            addData.url = data.Location
            addData.time = getNowTime()
        }
    })
}

onMounted(() => {
    getList()
})

</script>

<style lang="less" scoped>
.main {
    max-height: calc(100vh - 100px);
    overflow-y: auto;

    .title {
        font-size: 18px;
        font-weight: 600;
        margin: 15px;
    }
}
</style>