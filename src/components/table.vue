<template>
    <div class="myTable">
        <a-table class="data-table" size="middle" :columns="prop.columnsData" :loading="prop.loading"
            :data-source="prop.dataSource" :pagination="tablePagination" :row-class-name="prop.rowClassName" bordered>
            <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'index'">
                    <span class="cell-index" v-if="hasCustomPagination">
                        {{ (prop.pagination.currentPage - 1) * prop.pagination.pageSize + index + 1 }}
                    </span>
                    <span class="cell-index" v-else>{{ record.id }}</span>
                </template>
                <span v-else-if="column.key === 'headImg'" class="head-img-wrap">
                    <img class="head-img" :src="record.headImg" alt="" />
                </span>
                <template v-else-if="column.key === 'name'">
                    <a class="cell-link">{{ record.name }}</a>
                </template>
                <template v-else-if="column.key === 'url'">
                    <a class="cell-link" @click="emits('showVideo', record.url)">
                        {{ record.name + record.url.slice(record.url.lastIndexOf(".")) }}
                    </a>
                </template>
                <template v-else-if="column.key === 'action'">
                    <div class="action">
                        <template v-for="(item, actionIndex) in column.list" :key="actionIndex">
                            <a-button v-if="item === 'look'" size="small" @click="emits('look', record)">查看</a-button>
                            <a-button v-else-if="item === 'detail'" size="small"
                                @click="emits('detail', 'detail', record)">查看详情</a-button>
                            <a-button v-else-if="item === 'edit'" size="small" type="primary" ghost
                                @click="emits('edit', 'edit', record)">修改</a-button>
                            <a-popconfirm v-else-if="item === 'delete'" title="确定删除该数据吗?" ok-text="确定" cancel-text="取消"
                                @confirm="emits('delete', record.id)">
                                <a-button size="small" danger ghost>删除</a-button>
                            </a-popconfirm>
                        </template>
                    </div>
                </template>
            </template>
        </a-table>
        <div v-if="hasCustomPagination" class="pagination-bar">
            <a-pagination v-model:current="prop.pagination.currentPage" v-model:page-size="prop.pagination.pageSize"
                :pageSizeOptions="pageSizeOptions" :total="prop.pagination.total" show-size-changer
                :show-total="(total: number) => `共 ${total} 条`"
                @change="emits('changePage', prop.pagination.currentPage, prop.pagination.pageSize)" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Pagination {
    currentPage: number
    pageSize: number
    total: number
}

interface Prop {
    dataSource: any
    columnsData: any
    loading?: boolean
    pagination: Pagination | boolean | any
    pageSizeOptions?: string[]
    isAdmin?: string | null
    rowClassName?: (record: any, index: number) => string
}

const prop = defineProps<Prop>();
const emits = defineEmits(["detail", "edit", "delete", "changePage", "download", "resetPassword", "changeAdmin", "look", "showVideo"]);

const pageSizeOptions = computed(
    () => prop.pageSizeOptions ?? ["10", "15", "20", "50", "100"]
);

const hasCustomPagination = computed(
    () => !!prop.pagination && typeof prop.pagination === "object"
);

const tablePagination = computed(() => {
    if (prop.pagination === false) return false;
    if (hasCustomPagination.value) return false;
    return true;
});
</script>

<style lang="less" scoped>
.myTable {
    --line: #e8e8e8;
    --muted: #8c8c8c;
    --accent: #3860f4;
}

.data-table {
    overflow: hidden;
    border-radius: 8px;

    :deep(.ant-table-thead > tr > th) {
        background: #fafafa;
        color: #595959;
        font-weight: 600;
    }

    :deep(.ant-table-tbody > tr > td) {
        vertical-align: middle;
    }

    :deep(.ant-table-tbody > tr:hover > td) {
        background: #f5f8ff;
    }

    :deep(.ant-table-tbody > tr.quality-row-0 > td) {
        background: #fafafa;
    }

    :deep(.ant-table-tbody > tr.quality-row-1 > td) {
        background: #f0f7ff;
    }

    :deep(.ant-table-tbody > tr.quality-row-2 > td) {
        background: #f8f0ff;
    }

    :deep(.ant-table-tbody > tr.quality-row-3 > td) {
        background: #fff8f0;
    }

    :deep(.ant-table-tbody > tr.quality-row-0:hover > td),
    :deep(.ant-table-tbody > tr.quality-row-1:hover > td),
    :deep(.ant-table-tbody > tr.quality-row-2:hover > td),
    :deep(.ant-table-tbody > tr.quality-row-3:hover > td) {
        filter: brightness(0.98);
    }
}

.cell-index {
    color: var(--muted);
    font-variant-numeric: tabular-nums;
}

.head-img-wrap {
    display: inline-flex;
    vertical-align: middle;
}

.head-img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid var(--line);
}

.cell-link {
    color: var(--accent);

    &:hover {
        color: #2f4fd1;
    }
}

.action {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 6px;
    white-space: nowrap;
}

.pagination-bar {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid var(--line);
}
</style>
