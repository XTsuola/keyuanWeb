<template>
    <div class="wonderful-video">
        <header class="page-header">
            <div>
                <h1 class="page-title">精彩锦集</h1>
                <p class="page-sub">共 {{ total }} 条</p>
            </div>
            <a-button type="primary" size="small" @click="openAdd">添加锦集</a-button>
        </header>
        <section class="table-wrap">
            <MyTabel :columnsData="columns" :dataSource="tableData" :loading="listLoading"
                :pagination="{ pageSize, currentPage, total }" @showVideo="openPreview" @delete="onDelete"
                @change-page="onPageChange" />
        </section>
        <a-modal v-model:open="addVisible" title="添加锦集" destroy-on-close :mask-closable="false" @cancel="closeAdd">
            <a-form ref="formRef" :model="form" :label-col="{ span: 5 }" autocomplete="off">
                <a-form-item label="上传文件" required>
                    <input type="file" accept="video/*,image/*,audio/*" :disabled="uploading" @change="onFileChange">
                    <div v-if="uploading" class="upload-tip">上传中…</div>
                </a-form-item>
                <a-form-item label="锦集名称" name="name" :rules="[{ required: true, message: '请输入锦集名称' }]">
                    <a-input v-model:value="form.name" placeholder="请输入名称" allow-clear />
                </a-form-item>
                <a-form-item label="文件地址" name="url" :rules="[{ required: true, message: '请上传文件' }]">
                    <a-input v-model:value="form.url" disabled />
                </a-form-item>
                <a-form-item label="上传作者" name="author" :rules="[{ required: true, message: '请输入作者' }]">
                    <a-input v-model:value="form.author" placeholder="请输入作者" allow-clear />
                </a-form-item>
                <a-form-item label="上传时间">
                    <a-input v-model:value="form.time" disabled />
                </a-form-item>
                <a-form-item label="备注">
                    <a-textarea v-model:value="form.remark" :rows="3" placeholder="可选备注" />
                </a-form-item>
            </a-form>
            <template #footer>
                <a-button @click="closeAdd">取消</a-button>
                <a-button type="primary" :loading="submitLoading" :disabled="uploading" @click="submitAdd">
                    确定
                </a-button>
            </template>
        </a-modal>
        <a-modal v-model:open="previewVisible" title="查看锦集" width="720px" destroy-on-close :mask-closable="false"
            :footer="null">
            <video v-if="previewKind === 'video'" class="preview-media" :src="previewUrl" controls autoplay />
            <img v-else-if="previewKind === 'image'" class="preview-media" :src="previewUrl" alt="preview">
            <a-empty v-else description="暂不支持预览该类型" />
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import type { FormInstance } from "ant-design-vue";
import { getNowTime } from "@/utils/global";
import { addWrc, deleteWrc, getWrcList, type AddWrcParams } from "@/api/team";
import COS from "cos-js-sdk-v5";
import MyTabel from "@/components/table.vue";

type PreviewKind = "video" | "image" | "unknown";

interface WrcRow extends AddWrcParams {
    id?: number;
}

const IMAGE_EXT = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
const VIDEO_EXT = ["mp4", "webm", "mov", "m4a", "mp3"];
const columns = [
    { title: "序号", key: "index", align: "center", width: 60 },
    { title: "名称", dataIndex: "name", key: "name", width: 160 },
    { title: "链接", dataIndex: "url", key: "url", width: 180 },
    { title: "上传者", dataIndex: "author", key: "author", width: 120 },
    { title: "上传时间", dataIndex: "time", key: "time", width: 160 },
    { title: "备注", dataIndex: "remark", key: "remark", width: 160 },
    { title: "操作", key: "action", align: "center", list: ["delete"], width: 100 },
];
const listLoading = ref(false);
const submitLoading = ref(false);
const uploading = ref(false);
const tableData = ref<WrcRow[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const addVisible = ref(false);
const formRef = ref<FormInstance>();
const form = reactive<AddWrcParams>({
    name: "",
    url: "",
    author: "",
    time: "",
    remark: "",
});
const previewVisible = ref(false);
const previewUrl = ref("");
const previewKind = ref<PreviewKind>("unknown");

function resetForm() {
    form.name = form.url = form.author = form.time = form.remark = "";
}

function openAdd() {
    resetForm();
    addVisible.value = true;
}

function closeAdd() {
    addVisible.value = false;
    resetForm();
}

function getExt(url: string) {
    const clean = url.split("?")[0] || "";
    const idx = clean.lastIndexOf(".");
    return idx >= 0 ? clean.slice(idx + 1).toLowerCase() : "";
}

function resolvePreviewKind(url: string): PreviewKind {
    const ext = getExt(url);
    if (IMAGE_EXT.includes(ext)) return "image";
    if (VIDEO_EXT.includes(ext)) return "video";
    return "unknown";
}

function openPreview(url: string) {
    previewUrl.value = url.startsWith("http") ? url : `https://${url}`;
    previewKind.value = resolvePreviewKind(previewUrl.value);
    previewVisible.value = true;
}

async function fetchList() {
    listLoading.value = true;
    try {
        const res = await getWrcList({
            pageSize: pageSize.value,
            pageNo: currentPage.value,
        });
        if (res.data?.code === 200) {
            tableData.value = res.data.rows || [];
            total.value = res.data.total || 0;
        }
    } finally {
        listLoading.value = false;
    }
}

function onPageChange(page: number, size: number) {
    currentPage.value = page;
    pageSize.value = size;
    fetchList();
}

async function onDelete(id: number) {
    const res = await deleteWrc(id);
    if (res.data?.code !== 200) {
        message.error(res.data?.msg || "删除失败");
        return;
    }
    message.success(res.data.msg || "删除成功");
    if (tableData.value.length <= 1 && currentPage.value > 1) currentPage.value -= 1;
    await fetchList();
}

function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const secretId = import.meta.env.VITE_COS_SECRET_ID;
    const secretKey = import.meta.env.VITE_COS_SECRET_KEY;
    const bucket = import.meta.env.VITE_COS_BUCKET;
    const region = import.meta.env.VITE_COS_REGION;
    if (!secretId || !secretKey || !bucket || !region) {
        message.error("COS 配置缺失，请检查环境变量");
        input.value = "";
        return;
    }
    uploading.value = true;
    const cos = new COS({
        SecretId: secretId,
        SecretKey: secretKey,
    });
    const key = `${Date.now()}_${file.name}`;
    cos.putObject(
        {
            Bucket: bucket,
            Region: region,
            Key: key,
            Body: file,
        },
        (error: any, data: any) => {
            uploading.value = false;
            if (error || !data?.Location) {
                message.error("上传失败，请重试");
                return;
            }
            form.url = data.Location;
            form.time = getNowTime();
            if (!form.name) form.name = file.name.replace(/\.[^.]+$/, "");
            message.success("上传成功");
        }
    );
}

async function submitAdd() {
    submitLoading.value = true;
    try {
        await formRef.value?.validate();
        const res = await addWrc({ ...form });
        if (res.data?.code !== 200) {
            message.error(res.data?.msg || "新增失败");
            return;
        }
        message.success(res.data.msg || "新增成功");
        closeAdd();
        await fetchList();
    } finally {
        submitLoading.value = false;
    }
}

onMounted(fetchList);
</script>

<style lang="less" scoped>
.wonderful-video {
    --line: #e8e8e8;
    --text: #1f1f1f;
    --muted: #8c8c8c;

    padding: 24px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    color: var(--text);
}

.page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
}

.page-title {
    margin: 0;
    font-size: 20px;
    font-weight: 650;
}

.page-sub {
    margin: 4px 0 0;
    color: var(--muted);
    font-size: 13px;
}

.table-wrap {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 12px;
}

.upload-tip {
    margin-top: 6px;
    color: var(--muted);
    font-size: 12px;
}

.preview-media {
    display: block;
    width: 100%;
    max-height: 70vh;
    object-fit: contain;
    border-radius: 6px;
    background: #000;
}
</style>
