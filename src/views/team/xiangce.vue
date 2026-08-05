<template>
    <div class="xiangce">
        <header class="page-header">
            <div>
                <h1 class="page-title">战队相册</h1>
                <p class="page-sub">共 {{ photoList.length }} 张</p>
            </div>
            <a-button type="primary" size="small" @click="openAdd">添加图片</a-button>
        </header>
        <a-spin :spinning="listLoading">
            <div v-if="photoList.length" class="photo-grid">
                <button v-for="item in photoList" :key="item.id" type="button" class="photo-card"
                    @click="openDetail(item)">
                    <img class="photo-img" :src="getImgUrl(item.url)" :alt="item.name" loading="lazy">
                    <div class="photo-meta">
                        <span class="photo-name">{{ item.name }}</span>
                        <span class="photo-time">{{ item.createTime }}</span>
                    </div>
                </button>
            </div>
            <a-empty v-else description="暂无相册图片" />
        </a-spin>
        <a-modal v-model:open="addVisible" title="添加图片" destroy-on-close :mask-closable="false" @cancel="closeAdd">
            <a-form ref="formRef" :model="addData" :label-col="{ span: 5 }" autocomplete="off">
                <a-form-item label="选择图片" required>
                    <input type="file" accept="image/png,image/jpeg,image/jpg,image/bmp" @change="onFileChange">
                </a-form-item>
                <a-form-item label="图片名称" name="name" :rules="[{ required: true, message: '请输入名称' }]">
                    <a-input v-model:value="addData.name" placeholder="请输入名称" allow-clear />
                </a-form-item>
                <a-form-item label="预览" v-if="addData.url">
                    <img class="preview-img" :src="addData.url" alt="preview">
                </a-form-item>
                <a-form-item label="上传时间">
                    <a-input v-model:value="addData.createTime" disabled />
                </a-form-item>
                <a-form-item label="备注">
                    <a-textarea v-model:value="addData.remark" :rows="3" placeholder="可选备注" />
                </a-form-item>
            </a-form>
            <template #footer>
                <a-button @click="closeAdd">取消</a-button>
                <a-button type="primary" :loading="submitLoading" @click="submitAdd">确定</a-button>
            </template>
        </a-modal>
        <a-modal v-model:open="detailVisible" :title="detailItem?.name || '图片详情'" width="640px" destroy-on-close
            :mask-closable="false">
            <img v-if="detailItem" class="detail-img" :src="getImgUrl(detailItem.url)" :alt="detailItem.name">
            <p v-if="detailItem?.remark" class="detail-remark">{{ detailItem.remark }}</p>
            <template #footer>
                <a-popconfirm title="确定删除该图片吗？" ok-text="确定" cancel-text="取消" @confirm="removePhoto">
                    <a-button danger>删除</a-button>
                </a-popconfirm>
                <a-button @click="detailVisible = false">关闭</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import type { FormInstance } from "ant-design-vue";
import { getNowTime } from "@/utils/global";
import { addPhoto, deletePhoto, getPhotoList, type AddPhotoParams } from "@/api/myLove";

interface PhotoItem {
    id: number;
    name: string;
    url: string;
    createTime?: string;
    remark?: string;
}

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/bmp"];
const listLoading = ref(false);
const submitLoading = ref(false);
const photoList = ref<PhotoItem[]>([]);
const addVisible = ref(false);
const formRef = ref<FormInstance>();
const addData = reactive<AddPhotoParams>({
    name: "",
    url: "",
    createTime: "",
    remark: "",
    imgType: "",
});
const detailVisible = ref(false);
const detailItem = ref<PhotoItem | null>(null);

function getImgUrl(url: string) {
    if (!url) return "";
    if (url.startsWith("data:") || url.startsWith("http")) return url;
    return `${baseUrl}photoImg/${url}`;
}

function resetAddForm() {
    addData.name = addData.url = addData.createTime = addData.remark = addData.imgType = "";
}

function openAdd() {
    resetAddForm();
    addVisible.value = true;
}

function closeAdd() {
    addVisible.value = false;
    resetAddForm();
}

function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
        message.error("仅支持上传 png / jpg / jpeg / bmp 图片");
        input.value = "";
        return;
    }
    addData.imgType = file.type.split("/")[1] || "";
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        if (typeof reader.result === "string") {
            addData.url = reader.result;
            addData.createTime = getNowTime();
            if (!addData.name) {
                addData.name = file.name.replace(/\.[^.]+$/, "");
            }
        }
    });
    reader.readAsDataURL(file);
}

async function submitAdd() {
    submitLoading.value = true;
    try {
        await formRef.value?.validate();
        if (!addData.url) {
            message.error("请选择图片");
            return;
        }
        const res = await addPhoto({ ...addData });
        if (res.data?.code !== 200) {
            message.error(res.data?.msg || "新增失败");
            return;
        }
        message.success("新增成功");
        closeAdd();
        await fetchList();
    } finally {
        submitLoading.value = false;
    }
}

function openDetail(item: PhotoItem) {
    detailItem.value = item;
    detailVisible.value = true;
}

async function removePhoto() {
    if (!detailItem.value) return;
    const res = await deletePhoto({
        id: detailItem.value.id,
        url: detailItem.value.url,
    });
    if (res.data?.code !== 200) {
        message.error(res.data?.msg || "删除失败");
        return;
    }
    message.success("删除成功");
    detailVisible.value = false;
    detailItem.value = null;
    await fetchList();
}

async function fetchList() {
    listLoading.value = true;
    try {
        const res = await getPhotoList();
        if (res.data?.code === 200) {
            photoList.value = res.data.rows || [];
        }
    } finally {
        listLoading.value = false;
    }
}

onMounted(fetchList);
</script>

<style lang="less" scoped>
.xiangce {
    --line: #e8e8e8;
    --text: #1f1f1f;
    --muted: #8c8c8c;
    --panel: #fafafa;

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

.photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
}

.photo-card {
    display: flex;
    flex-direction: column;
    padding: 0;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: #fff;
    overflow: hidden;
    cursor: pointer;
    text-align: left;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:hover {
        border-color: #91caff;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    }
}

.photo-img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    background: var(--panel);
    display: block;
}

.photo-meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px 10px;
}

.photo-name {
    font-size: 13px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.photo-time {
    font-size: 12px;
    color: var(--muted);
}

.preview-img,
.detail-img {
    display: block;
    max-width: 100%;
    border-radius: 6px;
}

.detail-remark {
    margin: 12px 0 0;
    color: #595959;
    font-size: 13px;
    line-height: 1.5;
}
</style>
