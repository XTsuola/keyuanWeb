<template>
    <div class="welfare-list">
        <header class="page-header">
            <div>
                <h1 class="page-title">战队福利</h1>
                <p class="page-sub">客缘战队群号：630350845 · 共 {{ list.length }} 条</p>
            </div>
            <a-button v-if="isAdmin" type="primary" size="small" @click="openModal('add')">
                添加福利
            </a-button>
        </header>
        <a-spin :spinning="listLoading">
            <div v-if="list.length" class="card-list">
                <article v-for="item in list" :key="item.id" class="welfare-card">
                    <p class="welfare-content">{{ item.remark }}</p>
                    <div v-if="isAdmin" class="card-actions">
                        <a-button size="small" @click="openModal('edit', item)">修改</a-button>
                        <a-popconfirm title="确定删除该福利吗？" ok-text="确定" cancel-text="取消" @confirm="onDelete(item.id)">
                            <a-button size="small" danger>删除</a-button>
                        </a-popconfirm>
                    </div>
                </article>
            </div>
            <a-empty v-else description="暂无福利信息" />
        </a-spin>
        <a-modal v-model:open="visible" :title="modalType === 'edit' ? '修改福利' : '添加福利'" destroy-on-close
            :mask-closable="false" @cancel="closeModal">
            <a-form ref="formRef" :model="form" :label-col="{ span: 5 }" autocomplete="off">
                <a-form-item label="福利内容" name="remark" :rules="[{ required: true, message: '请输入福利内容' }]">
                    <a-textarea v-model:value="form.remark" :rows="4" placeholder="请输入福利内容" />
                </a-form-item>
            </a-form>
            <template #footer>
                <a-button @click="closeModal">取消</a-button>
                <a-button type="primary" :loading="submitLoading" @click="submit">确定</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";
import { message } from "ant-design-vue";
import type { FormInstance } from "ant-design-vue";
import type { AddType } from "@/utils/global";
import { addWelfare, deleteWelfare, getWelfareList, updateWelfare, type AddWelfareParams } from "@/api/team";

interface WelfareItem extends AddWelfareParams {
    id: number;
}

function getLevelId() {
    try {
        const raw = sessionStorage.getItem("userInfo");
        if (!raw) return null;
        return JSON.parse(raw).level ?? null;
    } catch {
        return null;
    }
}

const levelId = ref<number | null>(getLevelId());
const isAdmin = computed(() => levelId.value === 1);
const listLoading = ref(false);
const submitLoading = ref(false);
const list = ref<WelfareItem[]>([]);
const visible = ref(false);
const modalType = ref<AddType>("add");
const formRef = ref<FormInstance>();
const form = reactive<AddWelfareParams>({
    id: undefined,
    remark: "",
});

function resetForm() {
    form.id = undefined;
    form.remark = "";
}

function openModal(type: AddType, item?: WelfareItem) {
    modalType.value = type;
    if (type === "edit" && item) {
        form.id = item.id;
        form.remark = item.remark;
    } else {
        resetForm();
    }
    visible.value = true;
}

function closeModal() {
    visible.value = false;
    resetForm();
}

async function fetchList() {
    listLoading.value = true;
    try {
        const res = await getWelfareList();
        if (res.data?.code === 200) {
            list.value = res.data.rows || [];
        }
    } finally {
        listLoading.value = false;
    }
}

async function submit() {
    submitLoading.value = true;
    try {
        await formRef.value?.validate();
        const request = modalType.value === "edit" ? updateWelfare : addWelfare;
        const res = await request({ ...form });
        if (res.data?.code !== 200) {
            message.error(res.data?.msg || "操作失败");
            return;
        }
        message.success(res.data.msg || "操作成功");
        closeModal();
        await fetchList();
    } finally {
        submitLoading.value = false;
    }
}

async function onDelete(id: number) {
    const res = await deleteWelfare(id);
    if (res.data?.code !== 200) {
        message.error(res.data?.msg || "删除失败");
        return;
    }
    message.success(res.data.msg || "删除成功");
    await fetchList();
}

onMounted(fetchList);
</script>

<style lang="less" scoped>
.welfare-list {
    --line: #e8e8e8;
    --text: #1f1f1f;
    --muted: #8c8c8c;
    --panel: #f7f8fa;

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

.card-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.welfare-card {
    padding: 16px 18px;
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 8px;
}

.welfare-content {
    margin: 0;
    font-size: 14px;
    line-height: 1.7;
    white-space: pre-wrap;
    word-break: break-word;
}

.card-actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--line);
}
</style>
