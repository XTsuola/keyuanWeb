<template>
    <div class="mySearch">
        <a-form class="searchHead" autocomplete="off" layout="inline">
            <a-form-item v-permission="'isAdmin'" v-if="$slots.add" class="search-item">
                <a-button type="primary" @click="emits('add', 1)">
                    <slot name="add"></slot>
                </a-button>
            </a-form-item>
            <a-form-item
                v-for="(slotName, index) in prop.slotsList"
                :key="index"
                :label="resolveSlot(slotName).title || undefined"
                class="search-item"
            >
                <slot :name="resolveSlot(slotName).id"></slot>
            </a-form-item>
            <a-form-item class="search-item search-actions">
                <a-button type="primary" @click="emits('search')">搜索</a-button>
                <a-button @click="emits('reset')">清空</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
interface SlotsListType {
    id: string
    title: string
}

interface Prop {
    slotsList: string[] | SlotsListType[]
}

const prop = defineProps<Prop>();
const emits = defineEmits(["search", "add", "reset"]);

function resolveSlot(slotName: string | SlotsListType) {
    if (typeof slotName === "string") {
        return { id: slotName, title: "" };
    }
    return slotName;
}
</script>

<style lang="less" scoped>
.mySearch {
    --line: #e8e8e8;
    --panel: #fafafa;

    margin-bottom: 16px;
    padding: 14px 16px 6px;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 8px;
}

.searchHead {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 4px 8px;
    row-gap: 8px;
}

.search-item {
    margin-inline-end: 0 !important;
    margin-bottom: 8px !important;
}

.search-actions {
    :deep(.ant-form-item-control-input-content) {
        display: flex;
        gap: 8px;
    }
}

:deep(.ant-form-item-label > label) {
    color: #595959;
}
</style>
