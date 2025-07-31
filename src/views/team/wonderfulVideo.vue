<template>
    <div class="wonderfulVideo">
        <div class="title">
            精彩锦集列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal()">添加锦集</a-button>
        </div>
        <MyTabel :columnsData="columns" :dataSource="tableData"
            :pagination="{ pageSize: pageSize, currentPage: currentPage, total: total }" @showVideo="showVideo"
            @delete="deleteOk" @change-page="changePage"></MyTabel>
        <a-modal v-model:visible="visible" destroyOnClose title="添加锦集" :maskClosable="false">
            <input type="file" @input="getWrc" />
            <a-form ref="wonderfulAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
                autocomplete="off">
                <a-form-item label="锦集名称" name="name" :rules="[{ required: true, message: '请输入锦集名称!' }]">
                    <a-input v-model:value="addData.name" type="text" clearable></a-input>
                </a-form-item>
                <a-form-item label="锦集地址" name="url" :rules="[{ required: true, message: '请上传锦集!' }]">
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
            <video style="width: 100%;height: 100%;" v-if="videoFlag" class="video" :src="wrcUrl" controls
                autoplay></video>
            <img v-if="imgFlag" :src="wrcUrl" style="width: 100%;height:100%;" />
            <template #footer></template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { getNowTime } from "@/utils/some";
import type { ScrollType } from "@/utils/global";
import { getWrcList, deleteWrc, type AddWrcPasrams, addWrc } from "@/api/team";
import COS from "cos-js-sdk-v5";
import MyTabel from "@/components/table.vue";
import type { PaginationType } from "@/api/common";

const columns = ref<any[]>([
    {
        title: "序号",
        key: "index",
        align: "center",
        width: 60
    },
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 160
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
        align: "center",
        list: ["delete"],
        width: 140
    },
]);
const tableData = ref<AddWrcPasrams[]>([]);
const scrollObj = reactive<ScrollType>({ x: 400, y: undefined });
const mql = window.matchMedia("(max-width: 768px)");
const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const visible = ref<boolean>(false);
const visible2 = ref<boolean>(false);
const loading = ref<boolean>(false);
const videoFlag = ref<boolean>(false);
const imgFlag = ref<boolean>(false);
const wrcUrl = ref<string>("");
const addData = reactive<AddWrcPasrams>({
    name: "",
    url: "",
    author: "",
    time: "",
    remark: ""
});
const wonderfulAdd = ref();

function mediaMatchs() {
    if (mql.matches) {
        scrollObj.y = 550;
    } else {
        scrollObj.y = undefined;
    }
}
mediaMatchs();
mql.addEventListener("change", mediaMatchs);

async function getList() {
    const params: PaginationType = {
        pageSize: pageSize.value,
        pageNo: currentPage.value
    };
    const res = await getWrcList(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
    }
}

function showModal() {
    visible.value = true;
    addData.author = addData.name = addData.url = addData.time = addData.remark = "";
}

function showVideo(url: string) {
    visible2.value = true;
    const suffix = url.slice(url.lastIndexOf(".") + 1);
    const imgType = ["jpg", "png", "gif", "jpeg", "bmp", "JPG"];
    const videoType = ["mp4", "mp3", "m4a"];
    imgFlag.value = imgType.includes(suffix);
    videoFlag.value = videoType.includes(suffix);
    wrcUrl.value = "https://" + url;
}

async function handleOk() {
    try {
        await wonderfulAdd.value?.validate();
        loading.value = true;
        const params: AddWrcPasrams = {
            name: addData.name,
            url: addData.url,
            author: addData.author,
            time: addData.time,
            remark: addData.remark
        };
        const res = await addWrc(params);
        if (res.data.code === 200) {
            visible.value = false;
            loading.value = false;
            getList();
            message.success(res.data.msg);
        }
    } catch (_) { }
}

async function deleteOk(id: number) {
    const res = await deleteWrc(id);
    if (res.data.code === 200) {
        message.success(res.data.msg);
    } else {
        message.error("删除失败");
    }
    if (tableData.value.length == 1) {
        currentPage.value--;
    }
    getList();
}

function changePage(page: number) {
    currentPage.value = page;
    getList();
}

async function getWrc(e: any) {
    const target = e.target as any;
    const cos = new COS({
        SecretId: "AKID73j9JCo9D0WljRs2waw1pOghRv83h5D3",
        SecretKey: "auxjESQ6WfY9TWItDG2YnlRr0sTr0tVq"
    });
    const tengxunCos = {
        Bucket: "suola-1300285550",
        Region: "ap-nanjing"
    };
    const fileName = new Date() + target.files[0].name;
    const params = {
        Bucket: tengxunCos.Bucket,
        Region: tengxunCos.Region,
        Key: fileName,
        Body: target.files[0]
    };
    cos.putObject(params, async (error, data) => {
        if (!error) {
            addData.url = data.Location;
            addData.time = getNowTime();
        }
    });
}

onMounted(() => {
    getList();
})

</script>

<style lang="less" scoped>
.wonderfulVideo {
    padding: 20px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;

    .title {
        font-size: 18px;
        font-weight: 600;
        margin: 15px;
    }
}
</style>