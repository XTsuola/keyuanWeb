<template>
    <div class="childMain">
        <a-select ref="select" v-model:value="lang" style="width: 120px" @change="handleChange">
            <a-select-option value="en">English</a-select-option>
            <a-select-option value="zh">中文</a-select-option>
        </a-select>
        <a-form ref="memberAdd" style="width: 100%;" :model="addData" name="basic" :label-col="{ span: 4 }"
            autocomplete="off">
            <a-form-item label="成员名称" name="name" :rules="[{ required: true, message: $t('email'), trigger: 'blur' }]">
                <a-input v-model:value="addData.name" />
            </a-form-item>
            <a-form-item label="QQ账号">
                <a-input v-model:value="addData.qq" />
            </a-form-item>
            <a-form-item label="所属分组">
                <a-select v-model:value="addData.group" placeholder="请选择分组">
                    <a-select-option v-for="item in groupList" :key="item.groupId" :value="item.groupValue">{{
                        item.groupName
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="擅长位置">
                <a-input v-model:value="addData.position" />
            </a-form-item>
            <a-form-item label="备注">
                <a-textarea v-model:value="addData.remark" />
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { getGroupInfo, type AddMemberParams, type UpdateMemberParams } from "@/api/team"
import { onMounted, ref, nextTick } from "vue"
import type { AddParamsType, GroupListType } from "../memberList.vue"
import { useI18n } from "vue-i18n"
export interface API {
    getAddData: () => Promise<false | AddMemberParams | UpdateMemberParams>
}

export type AddType = "add" | "edit"

const { locale, messages } = useI18n();

const prop = defineProps<{
    type: AddType
    addParams: AddParamsType
}>()
const addData = ref<AddParamsType>({
    name: "",
    qq: "",
    group: "",
    position: "",
    remark: ""
})
if (prop.type === "edit") {
    addData.value = JSON.parse(JSON.stringify(prop.addParams))
}
const groupList = ref<GroupListType[]>([])

const memberAdd = ref()


const lang = ref("en")

async function handleChange(e: any) {
    locale.value = e
    nextTick(() => {
        memberAdd.value?.validate()
    })
}

async function getGroup() {
    const res = await getGroupInfo()
    if (res.data.code === 200) {
        groupList.value = res.data.rows
    }
}

async function getAddData(): Promise<false | AddMemberParams | UpdateMemberParams> {
    try {
        await memberAdd.value?.validate()
        const returnData: AddMemberParams | UpdateMemberParams = {
            _id: addData.value._id,
            id: addData.value.id,
            name: addData.value.name,
            qq: addData.value.qq,
            group: addData.value.group,
            position: addData.value.position,
            remark: addData.value.remark,
        }
        return returnData
    } catch (_) {
        return false
    }
}

defineExpose({
    getAddData
})

onMounted(() => {
    getGroup()
})

</script>

<style lang="less" scoped>
.childMain {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    row-gap: 15px;
}
</style>