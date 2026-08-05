<template>
    <div class="member-list">
        <header class="page-header">
            <div>
                <h1 class="page-title">成员列表</h1>
                <p class="page-sub">共 {{ total }} 人</p>
            </div>
            <a-button v-if="isAdmin" type="primary" size="small" @click="openModal('add')">
                新增成员
            </a-button>
        </header>
        <section class="search-panel">
            <a-form class="search-form" layout="inline" :model="filters" autocomplete="off">
                <a-form-item label="分组">
                    <a-select v-model:value="filters.groupName" class="group-select" placeholder="请选择分组" allow-clear
                        @change="onSearch">
                        <a-select-option v-for="item in groupList" :key="String(item.value)" :value="item.value">
                            {{ item.label }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item>
                    <a-space>
                        <a-button type="primary" size="small" @click="onSearch">查询</a-button>
                        <a-button size="small" @click="onReset">重置</a-button>
                    </a-space>
                </a-form-item>
            </a-form>
        </section>
        <section class="table-wrap">
            <MyTabel :columnsData="columns" :dataSource="tableData" :loading="listLoading"
                :pagination="{ pageSize, currentPage, total }" @edit="openModal" @delete="onDelete"
                @change-page="onPageChange" />
        </section>
        <a-modal v-model:open="visible" :title="modalType === 'edit' ? '修改成员' : '添加成员'" destroy-on-close
            :mask-closable="false" @cancel="closeModal">
            <AddPage ref="addPageRef" :addParams="editParams" :type="modalType" />
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
import { groupList, type AddType } from "@/utils/global";
import { addMember, deleteMember, getMemberList, updateMember, type AddMemberParams } from "@/api/team";
import MyTabel from "@/components/table.vue";
import AddPage from "./modal/memberAddPage.vue";

function getLevelId() {
    try {
        const raw = sessionStorage.getItem("userInfo");
        if (!raw) return null;
        return JSON.parse(raw).level ?? null;
    } catch {
        return null;
    }
}

const isAdmin = computed(() => getLevelId() === 1);
const columns = [
    { title: "序号", key: "index", align: "center", width: 60 },
    { title: "成员名称", dataIndex: "name", key: "name", width: 140 },
    { title: "QQ号", dataIndex: "qq", key: "qq", width: 140 },
    { title: "所属分队", dataIndex: "groupName", key: "groupName", width: 140 },
    { title: "擅长位置", dataIndex: "position", key: "position", width: 140 },
    { title: "备注", dataIndex: "remark", key: "remark", width: 200 },
    {
        title: "操作",
        key: "action",
        align: "center",
        list: isAdmin.value ? ["edit", "delete"] : [],
        width: 180,
    },
];
const listLoading = ref(false);
const submitLoading = ref(false);
const tableData = ref<AddMemberParams[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const filters = reactive<{ groupName?: string | number }>({
    groupName: undefined,
});
const visible = ref(false);
const modalType = ref<AddType>("add");
const addPageRef = ref<InstanceType<typeof AddPage>>();
const editParams = reactive<AddMemberParams>({
    id: undefined,
    name: "",
    qq: "",
    groupName: "",
    position: "",
    remark: "",
});

function resetEditParams() {
    editParams.id = undefined;
    editParams.name = editParams.qq = editParams.groupName = editParams.position = editParams.remark = "";
}

async function fetchList() {
    listLoading.value = true;
    try {
        const res = await getMemberList({
            pageSize: pageSize.value,
            pageNo: currentPage.value,
            groupName: filters.groupName,
        });
        if (res.data?.code === 200) {
            tableData.value = res.data.rows || [];
            total.value = res.data.total || 0;
        }
    } finally {
        listLoading.value = false;
    }
}

function onSearch() {
    currentPage.value = 1;
    fetchList();
}

function onReset() {
    filters.groupName = undefined;
    onSearch();
}

function onPageChange(page: number, size: number) {
    currentPage.value = page;
    pageSize.value = size;
    fetchList();
}

function openModal(type: AddType, item?: AddMemberParams) {
    modalType.value = type;
    if (type === "edit" && item) {
        Object.assign(editParams, item);
    } else {
        resetEditParams();
    }
    visible.value = true;
}

function closeModal() {
    visible.value = false;
    resetEditParams();
}

async function submit() {
    submitLoading.value = true;
    try {
        const result = await addPageRef.value?.getAddData();
        if (!result) return;

        const request = modalType.value === "edit" ? updateMember : addMember;
        const res = await request(result);
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
    const res = await deleteMember(id);
    if (res.data?.code !== 200) {
        message.error(res.data?.msg || "删除失败");
        return;
    }
    message.success(res.data.msg || "删除成功");
    if (tableData.value.length <= 1 && currentPage.value > 1) {
        currentPage.value -= 1;
    }
    await fetchList();
}

onMounted(fetchList);
</script>

<style lang="less" scoped>
.member-list {
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

.search-panel {
    margin-bottom: 16px;
    padding: 14px 16px 6px;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 8px;
}

.search-form {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 8px;
}

.group-select {
    width: 160px;
}

.table-wrap {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 12px;
}
</style>
