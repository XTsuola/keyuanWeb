<template>
    <div class="photo">
        <div style="padding: 10px;"><a-button @click="showAdd">添加回忆</a-button></div>
        <ul>
            <li v-for="(item, index) in photoList" :key="index" style="width: 9%;">
                <img @click="showDetail(item)" style="width: 100%;" :src="baseUrl + 'photoImg/' + item.url" />
            </li>
        </ul>
        <render-vnode :vNode="text"></render-vnode>
    </div>
    <a-modal v-model:visible="visible" destroyOnClose title="添加回忆" :maskClosable="false">
        <input type="file" @input="getPhoto" />
        <a-form ref="photoAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
            autocomplete="off">
            <a-form-item label="图片名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="addData.name" type="text" clearable></a-input>
            </a-form-item>
            <a-form-item label="图片地址" name="url" :rules="[{ required: true, message: '请选择图片!' }]">
                <a-textarea v-model:value="addData.url" :readonly="true" :disabled="true" type="text" clearable>
                </a-textarea>
            </a-form-item>
            <a-form-item label="上传时间">
                <a-input v-model:value="addData.createTime" :readonly="true" :disabled="true" type="text" clearable>
                </a-input>
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-model:value="addData.remark" type="text" clearable></a-textarea>
            </a-form-item>
        </a-form>
        <template #footer>
            <a-button key="back" @click="visible = false">取消</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定
            </a-button>
        </template>
    </a-modal>
    <a-modal width="50%" v-model:visible="visible2" destroyOnClose :title="'图片名称：' + detailTitle" :maskClosable="false">
        <img style="max-width: 100%;" :src="detailUrl" />
        <template #footer>
            <a-popconfirm title="确定删除该图片吗?" ok-text="Yes" cancel-text="No" @confirm="deleteImg()">
                <a-button size="small">删除</a-button>
            </a-popconfirm>
            <a-button @click="closeDetail()">关闭</a-button>
        </template>
    </a-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, h } from "vue";
import { message } from "ant-design-vue";
import { getNowTime } from "@/utils/some";
import { addPhoto, deletePhoto, getPhotoList, type AddPhotoParams, type DeletePhotoParams } from "@/api/myLove";
import RenderVnode from "./ceshi";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const str = "../../assets/images/game/box/caiwenji.jpg";
const text = h("img", {
    src: new URL(str, import.meta.url),
    style: "width:120px;height:120px;margin-left:16px",
});
const photoAdd = ref();
const photoList = ref<any>([]);
const visible = ref(false);
const loading = ref(false);
const addData = reactive<AddPhotoParams>({
    name: "",
    url: "",
    createTime: "",
    remark: "",
    imgType: ""
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
        if (res.data.code == 200) {
            loading.value = false;
            visible.value = false;
            message.success("新增成功");
            getList();
        }
    } catch (_) { }
    loading.value = false;
}

function getPhoto(e: any) {
    const target = e.target as any;
    const list = ["image/png", "image/jpg", "image/bmp", "image/jpeg"];
    if (target) {
        if (target.files[0]) {
            if (list.indexOf(target.files[0].type) == -1) {
                message.error("仅支持上传图片！");
                return false;
            } else {
                addData.imgType = list[list.indexOf(target.files[0].type)].split("/")[1];
            }
        } else {
            return false;
        }
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.addEventListener("load", async (e) => {
            if (e.target && typeof e.target.result === "string") {
                addData.url = e.target.result;
                addData.createTime = getNowTime();
            }
        })
    }
}

function showDetail(item: any) {
    visible2.value = true;
    nowImgId.value = item.id;
    detailTitle.value = item.name;
    nowUrl.value = item.url;
    detailUrl.value = import.meta.env.VITE_APP_BASE_URL + "photoImg/" + item.url;
}

function closeDetail() {
    visible2.value = false;
}

async function deleteImg() {
    if (nowImgId) {
        const params: DeletePhotoParams = {
            id: nowImgId.value,
            url: nowUrl.value
        };
        const res = await deletePhoto(params);
        if (res.data.code == 200) {
            visible2.value = false;
            message.success("删除成功");
            getList();
        }
    }
}

async function getList() {
    const res = await getPhotoList();
    if (res.data.code == 200) {
        photoList.value = res.data.rows;
    }
}

onMounted(() => {
    getList();
})

</script>

<style lang="less" scoped>
.photo {
    height: 100%;
    background-color: pink;

    ul {
        margin: 0;
        padding: 10px;
        display: flex;
        justify-content: flex-start;

        li {
            margin: 5px;
            width: 10%;
            list-style: none;
        }
    }
}
</style>