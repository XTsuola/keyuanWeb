<template>
    <div class="mySearch">
        <a-form class="searchHead" autocomplete="off">
            <a-form-item class="margin_right" v-permission="'isAdmin'" v-if="$slots.add">
                <a-button type="primary" @click="emits('add', 1)">
                    <slot name="add"></slot>
                </a-button>
            </a-form-item>
            <span v-for="(slotName, index) in prop.slotsList" :key="index">
                <a-form-item :label="(typeof slotName === 'string' ? '' : slotName.title )" class="margin_right">
                    <slot :name="(typeof slotName === 'string' ? slotName : slotName.id )"></slot>
                </a-form-item>
            </span>
            <a-form-item>
                <div class="search_btn">
                    <a-button class="margin_left" type="primary" @click="emits('search')">搜索</a-button>
                    <a-button class="margin_left" @click="emits('reset')">清空</a-button>
                </div>
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

const slots = defineSlots();

</script>
<style lang="less" scoped>
.mySearch {
    .searchHead {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .search_btn {
            display: flex;
            justify-content: flex-start;
        }
    }

    .margin_left {
        margin-left: 12px;
    }

    .margin_right {
        margin-right: 12px;
    }
}
</style>