<template>
    <div class="main">
        <div style="background: #ececec;padding: 20px 15px 20px 15px;">
            <a-card style="width: 100%;">
                <div style="display: flex;justify-content: space-between;">
                    <p class="title">客缘战队群号：630350845</p>
                    <a-button size="small" @click="showModal('add')" v-if="levelId === 1">添加福利</a-button>
                </div>
            </a-card>
        </div>
        <div style="background: #ececec;padding: 0 15px 20px 15px;" v-for="item in data" :key="item.id">
            <a-card style="width: 100%">
                <p>{{ item.remark }}</p>
                <a-button v-if="levelId === 1" size="small" style="margin-right: 15px;"
                    @click="showModal('edit', item)">修改</a-button>
                <a-popconfirm v-if="levelId === 1" title="确定删除该数据吗?" ok-text="Yes" cancel-text="No"
                    @confirm="deleteOk(item)" @cancel="cancel">
                    <a-button size="small">删除</a-button>
                </a-popconfirm>
            </a-card>
        </div>
        <a-modal v-model:visible="visible" destroyOnClose title="添加福利" :maskClosable="false">
            <a-form ref="welfareAdd" style="width: 100%;" :model="welfareParams" name="basic" :label-col="{ span: 4 }"
                autocomplete="off">
                <a-form-item label="福利内容" name="remark" :rules="[{ required: true, message: '请输入福利内容!' }]">
                    <a-textarea v-model:value="welfareParams.remark" />
                </a-form-item>
            </a-form>
            <template #footer>
                <a-button key="back" @click="visible = false">取消</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确定</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import type { AxiosPromise } from "axios";
import { getWelfareList, addWelfare, updateWelfare, deleteWelfare, type AddWelfareParams, type UpdateWelfareParams } from "@/api/team";

interface WelfareType {
    id: number
    remark: string
}

type AddType = "add" | "edit"

const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const data = ref<WelfareType[]>([]);
const visible = ref<boolean>(false);
const loading = ref<boolean>(false);
const type = ref<AddType>("add");
const welfareParams = reactive<WelfareType>({
    id: 0,
    remark: ""
});
const welfareAdd = ref();

async function getList() {
    const res = await getWelfareList();
    if (res.data.code === 200) {
        data.value = res.data.rows;
    }
}

function showModal(showType: AddType, item?: UpdateWelfareParams) {
    type.value = showType;
    if (showType === "edit") {
        if (item) {
            welfareParams.id = item.id;
            welfareParams.remark = item.remark;
        }
    } else {
        welfareParams.remark = "";
    }
    visible.value = true;
}

async function handleOk(e: MouseEvent) {
    try {
        await welfareAdd.value?.validate();
        loading.value = true;
        interface AType {
            axios: ((data: AddWelfareParams) => AxiosPromise<any>) | ((data: UpdateWelfareParams) => AxiosPromise<any>)
            msg: string
        }
        let a: AType = {
            msg: "新增失败",
            axios: addWelfare
        };
        if (type.value === "edit") {
            a.axios = updateWelfare;
            a.msg = "修改失败";
        }
        if (welfareParams.remark && a.axios) {
            const res = await a.axios(welfareParams);
            if (res.data.code === 200) {
                getList();
                message.success(res.data.msg);
                visible.value = false;
            } else {
                message.error(a.msg);
            }
        }
        loading.value = false;
    } catch (_) {
        return false;
    }
}

async function deleteOk(e: WelfareType) {
    const res = await deleteWelfare(e.id);
    if (res.data.code === 200) {
        getList();
        message.success(res.data.msg);
    } else {
        getList();
        message.error("删除失败");
    }
}

function cancel() {
    message.error("取消删除");
}

onMounted(() => {
    getList();
})

</script>

<style lang="less" scoped>
.main {
    max-height: calc(100vh - 100px);
    overflow-y: auto;

    .title {
        font-weight: 600;
    }

    p {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 18px;
        padding-left: 5px;
        padding-right: 5px;
    }
}
</style>