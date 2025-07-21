<template>
    <div class="myTable">
        <a-table :columns="prop.columnsData" :loading="prop.loading" :data-source="prop.dataSource" :pagination="flag"
            bordered>
            <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'index'">
                    <span v-if="prop.pagination">{{ (prop.pagination.currentPage - 1) * prop.pagination.pageSize + index
                        + 1 }}</span>
                    <span v-else>{{ record.id }}</span>
                </template>
                <template v-if="column.key === 'name'">
                    <a>{{ record.name }}</a>
                </template>
                <template v-if="column.key === 'url'">
                    <a @click="emits('showVideo', record.url)">{{ record.name +
                        record.url.slice(record.url.lastIndexOf(".")) }}</a>
                </template>
                <template v-if="column.key === 'action'">
                    <span class="action">
                        <span v-for="(item, index) in column.list" class="action" :key=index>
                            <span v-if="item == 'look'">
                                <span class="pointer" @click="emits('look', record)">
                                    <a-button size="small">查看</a-button>
                                </span>
                            </span>
                            <span v-if="item == 'detail'">
                                <span class="pointer" @click="emits('detail', 'detail', record)">
                                    <a-button size="small">查看详情</a-button>
                                </span>
                            </span>
                            <span v-if="item == 'edit'">
                                <span class="pointer" @click="emits('edit', 'edit', record)">
                                    <a-button size="small">修改</a-button>
                                </span>
                            </span>
                            <!-- <span v-if="item == 'editRoles'">
                                <span class="pointer" @click="emits('edit', record)">
                                    <a-button size="small">修改角色</a-button>
                                </span>
                            </span> -->
                            <!-- <span v-if="item == 'download'">
                                <span class="pointer" @click="emits('download', record)">
                                    <download-outlined />
                                    <a-button size="small">下载</a-button>
                                </span>
                            </span> -->
                            <!-- <span v-if="item == 'resetPassword' && prop.isAdmin == 'true'">
                                <a-button :disabled="record.is_admin" type="primary" size="small"
                                    @click="emits('resetPassword', record)">重置密码</a-button>
                            </span> -->
                            <span v-if="item == 'delete'">
                                <a-popconfirm title="确定删除该数据吗?" ok-text="确定" cancel-text="取消"
                                    @confirm=" emits('delete', record.id)">
                                    <a-button size="small">删除</a-button>
                                </a-popconfirm>
                            </span>
                            <a-divider v-if="index != column.list.length - 1" type="vertical" />
                        </span>
                    </span>
                </template>
            </template>
        </a-table>
        <a-pagination v-if="prop.pagination" class="pagination" v-model:current="prop.pagination.currentPage"
            v-model:page-size="prop.pagination.pageSize" :pageSizeOptions="['10', '15', '20', '50', '100']"
            :total="prop.pagination.total" :show-total="(total: any) => `共 ${total} 条`"
            @change="emits('changePage', prop.pagination.currentPage)" />
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Table as aTable } from "ant-design-vue";
// import { EditOutlined, CloseOutlined, UserOutlined, SearchOutlined, DownloadOutlined } from '@ant-design/icons-vue';

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
    isAdmin?: string | null
}

const flag = ref<any>(false);
const prop = defineProps<Prop>();
const emits = defineEmits(["detail", "edit", "delete", "changePage", "download", "resetPassword", "changeAdmin", "look", "showVideo"]);
if (prop.pagination) {
    flag.value = false
} else {
    flag.value = true
}

</script>
<style lang="less" scoped>
.action {
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    align-items: center;
}

.pointer {
    cursor: pointer;
}

.pagination {
    text-align: right;
    margin-top: 20px;
}
</style>