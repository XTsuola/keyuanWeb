<template>
    <div class="photo-page">
        <header class="page-header">
            <div>
                <h1 class="page-title">时光回忆</h1>
                <p class="page-sub">共 {{ photoList.length }} 张</p>
            </div>
            <a-button type="primary" @click="showAdd">添加回忆</a-button>
        </header>
        <ul class="photo-grid">
            <li v-for="item in photoList" :key="item.id">
                <button type="button" class="thumb" @click="showDetail(item)">
                    <img :src="baseUrl + 'photoImg/' + item.url" :alt="item.name" loading="lazy" />
                </button>
            </li>
        </ul>
        <a-modal v-model:open="visible" destroy-on-close title="添加回忆" :mask-closable="false">
            <input class="file-input" type="file" accept="image/png,image/jpeg,image/bmp,image/jpg"
                @change="getPhoto" />
            <a-form ref="photoAdd" :model="addData" name="photo-add" :label-col="{ span: 4 }" autocomplete="off">
                <a-form-item label="图片名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                    <a-input v-model:value="addData.name" allow-clear />
                </a-form-item>
                <a-form-item label="图片地址" name="url" :rules="[{ required: true, message: '请选择图片!' }]">
                    <a-textarea v-model:value="addData.url" :rows="2" readonly disabled />
                </a-form-item>
                <a-form-item label="上传时间">
                    <a-input v-model:value="addData.createTime" readonly disabled />
                </a-form-item>
                <a-form-item label="备注">
                    <a-textarea v-model:value="addData.remark" allow-clear />
                </a-form-item>
            </a-form>
            <template #footer>
                <a-button @click="visible = false">取消</a-button>
                <a-button type="primary" :loading="loading" @click="handleOk">确定</a-button>
            </template>
        </a-modal>
        <a-modal v-model:open="visible2" width="50%" destroy-on-close :title="'图片名称：' + detailTitle"
            :mask-closable="false">
            <img class="detail-img" :src="detailUrl" :alt="detailTitle" />
            <template #footer>
                <a-popconfirm title="确定删除该图片吗?" ok-text="确定" cancel-text="取消" @confirm="deleteImg">
                    <a-button danger>删除</a-button>
                </a-popconfirm>
                <a-button @click="closeDetail">关闭</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import { getNowTime } from "@/utils/global";
import { addPhoto, deletePhoto, getPhotoList, type AddPhotoParams, type DeletePhotoParams } from "@/api/myLove";

interface PhotoItem {
    id: number;
    name: string;
    url: string;
    remark?: string;
}

const ALLOWED_TYPES = ["image/png", "image/jpg", "image/bmp", "image/jpeg"];
const MAX_SIZE = 1024 * 1024 * 5;
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const photoAdd = ref();
const photoList = ref<PhotoItem[]>([]);
const visible = ref(false);
const loading = ref(false);
const addData = reactive<AddPhotoParams>({
    name: "",
    url: "",
    createTime: "",
    remark: "",
    imgType: "",
});
const visible2 = ref(false);
const detailTitle = ref("");
const detailUrl = ref("");
const nowImgId = ref(0);
const nowUrl = ref("");

function showAdd() {
    visible.value = true;
    addData.name = addData.url = addData.createTime = addData.remark = addData.imgType = "";
}

async function handleOk() {
    loading.value = true;
    try {
        await photoAdd.value?.validate();
        const res = await addPhoto(addData);
        if (Number(res.data.code) === 200) {
            visible.value = false;
            message.success("新增成功");
            await getList();
        }
    } finally {
        loading.value = false;
    }
}

function getPhoto(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;
    if (file.size > MAX_SIZE) {
        message.error("图片大小不能超过5MB！");
        return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
        message.error("仅支持上传图片！");
        return;
    }
    addData.imgType = file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (event) => {
        const result = event.target?.result;
        if (typeof result !== "string") return;
        addData.url = result;
        addData.createTime = getNowTime();
    });
}

function showDetail(item: PhotoItem) {
    visible2.value = true;
    nowImgId.value = item.id;
    detailTitle.value = item.name;
    nowUrl.value = item.url;
    detailUrl.value = baseUrl + "photoImg/" + item.url;
}

function closeDetail() {
    visible2.value = false;
}

async function deleteImg() {
    if (!nowImgId.value) return;
    const params: DeletePhotoParams = {
        id: nowImgId.value,
        url: nowUrl.value,
    };
    const res = await deletePhoto(params);
    if (Number(res.data.code) === 200) {
        visible2.value = false;
        message.success("删除成功");
        await getList();
    }
}

async function getList() {
    const res = await getPhotoList();
    if (Number(res.data.code) === 200) photoList.value = res.data.rows || [];
}

onMounted(() => {
    getList();
});
</script>

<style lang="less" scoped>
.photo-page {
    box-sizing: border-box;
    min-height: calc(100vh - 140px);
    padding: 12px 16px 16px;
    background: #fff7f9;
}

.page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
}

.page-title {
    margin: 0;
    font-size: 18px;
    font-weight: 650;
}

.page-sub {
    margin: 2px 0 0;
    color: #8c8c8c;
    font-size: 12px;
}

.photo-grid {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
    list-style: none;
}

.thumb {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    border: none;
    padding: 0;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    background: #fff;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
}

.file-input {
    margin-bottom: 12px;
}

.detail-img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
}
</style>
