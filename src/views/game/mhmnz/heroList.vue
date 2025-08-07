<template>
    <div class="heroList">
        <div class="title">
            英雄列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增英雄
            </a-button>
        </div>
        <a-form class="searchHead" :wrapperCol="{ span: 16 }" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="名称" style="width: 200px">
                <a-input v-model:value="formState.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item label="稀有度" style="width: 220px">
                <a-select v-model:value="formState.star" @change="selectList" placeholder="请选择稀有度">
                    <a-select-option v-for="item in starList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="性别" style="width: 200px">
                <a-select v-model:value="formState.gender" @change="selectList" placeholder="请选择性别">
                    <a-select-option v-for="item in genderList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="阵营" style="width: 200px">
                <a-select v-model:value="formState.camp" @change="selectList" placeholder="请选择阵营">
                    <a-select-option v-for="item in campList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="兵种" style="width: 220px">
                <a-input v-model:value="formState.arms" placeholder="请输入兵种名称" />
            </a-form-item>
            <a-form-item label="技能组" style="width: 220px">
                <a-input v-model:value="formState.skillGroup" placeholder="请输入技能组" />
            </a-form-item>
            <a-form-item label="皮肤" style="width: 220px">
                <a-input v-model:value="formState.skin" placeholder="请输入皮肤" />
            </a-form-item>
            <a-form-item>
                <div style="display: flex;justify-content: flex-start;">
                    <a-button size="small" style="margin: 0 12px 0 12px" @click="selectList">查询</a-button>
                    <a-button size="small" @click="reset">重置</a-button>
                </div>
            </a-form-item>
        </a-form>
        <MyTabel :columnsData="columns" :dataSource="tableData"
            :pagination="{ pageSize: pageSize, currentPage: currentPage, total: total }" @detail="showModal"
            @edit="showModal" @delete="deleteOk" @change-page="changePage"></MyTabel>
        <a-modal v-model:visible="visible" destroyOnClose :title="title" :maskClosable="false">
            <AddPage :addParams="addParams" :type="type" ref="addPage"></AddPage>
            <template #footer>
                <a-button key="back" @click="visible = false">{{ type === 'detail' ? "关闭" : "取消" }}</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="handleOk" v-if="type !== 'detail'">确定
                </a-button>
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import type { AxiosPromise } from "axios";
import type { AddType, Type } from "@/utils/global";
import { getHeroList, addHero, updateHero, deleteHero, type GetHeroListParams, type AddHeroParams } from "@/api/mhmnz";
import AddPage from "./modal/heroAddPage.vue";
import MyTabel from "@/components/table.vue";

let addParams = reactive<AddHeroParams>({
    id: undefined,
    name: "",
    gender: undefined,
    star: undefined,
    camp: [],
    exclusive: "",
    arms: "",
    superSkill: "",
    skillGroup: "",
    castGrainSkill: "",
    talent: "",
    skin: "",
    introduce: ""
});
const total = ref<number>(0);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const title = ref<string>("添加兵种");
const addPage = ref<any>();
const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const visible = ref<boolean>(false);
const formState = reactive<any>({
    name: undefined,
    star: undefined,
    gender: undefined,
    camp: undefined,
    arms: undefined,
    skillGroup: undefined,
    skin: undefined
});
const starList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "LLR",
    value: 5
}, {
    label: "SP",
    value: 4
}, {
    label: "SSR",
    value: 3
}, {
    label: "SR",
    value: 2
}, {
    label: "R",
    value: 1
}]);
const genderList = ref<Type[]>([{
    label: "全部",
    value: 0,
}, {
    label: "男",
    value: 1,
}, {
    label: "女",
    value: 2,
}]);
const campList = ref<Type[]>([{
    label: "全部",
    value: 0,
}, {
    label: "主角光环",
    value: 1,
}, {
    label: "光辉军团",
    value: 2,
}, {
    label: "光之起源",
    value: 3,
}, {
    label: "帝国之辉",
    value: 4,
}, {
    label: "黑暗轮回",
    value: 5,
}, {
    label: "公主联盟",
    value: 6,
}, {
    label: "战略大师",
    value: 7,
}, {
    label: "流星直击",
    value: 8,
}, {
    label: "传说彼端",
    value: 9,
}, {
    label: "时空枢纽",
    value: 10,
}, {
    label: "超凡领域",
    value: 11,
}, {
    label: "梦幻转生",
    value: 12,
}]);
const columns = ref<any>([
    {
        title: "序号",
        key: "index",
        align: "center",
        width: 60
    },
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 80
    },
    {
        title: "稀有度",
        dataIndex: "star",
        key: "star",
        width: 60,
        customRender: (opt: any) => {
            return starList.value.find(item => item.value == opt.value)?.label
        },
    },
    {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        width: 60,
        customRender: (opt: any) => {
            return genderList.value.find(item => item.value == opt.value)?.label
        },
    },
    {
        title: "阵营",
        dataIndex: "camp",
        key: "camp",
        width: 120,
        customRender: (opt: any) => {
            return getCamp(opt.value)
        },
    },
    {
        title: "专属",
        dataIndex: "exclusive",
        key: "exclusive",
        width: 80
    },
    {
        title: "兵种",
        dataIndex: "arms",
        key: "arms",
        width: 160
    },
    {
        title: "技能组",
        dataIndex: "skillGroup",
        key: "skillGroup",
        width: 140
    },
    {
        title: "铸纹技能",
        dataIndex: "castGrainSkill",
        key: "castGrainSkill",
        width: 140
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        list: ["detail", "edit", "delete"],
        width: 100
    },
]);
const loading = ref<boolean>(false);
const tableData = ref<any>([]);
const type = ref<AddType>("add");

function getCamp(arr: number[]) {
    let brr = [];
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            let str = campList.value.find(item => item.value == arr[i])?.label ? campList.value.find(item => item.value == arr[i])?.label : "";
            brr.push(str);
        }
    }
    let result = brr.join("、");
    return result;
}

async function getList() {
    const params: GetHeroListParams = {
        pageSize: pageSize.value,
        pageNo: currentPage.value,
        name: formState.name,
        star: formState.star,
        gender: formState.gender,
        camp: formState.camp,
        arms: formState.arms,
        skillGroup: formState.skillGroup,
        skin: formState.skin
    };
    const res = await getHeroList(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
    }
}

async function deleteOk(id: number) {
    const res = await deleteHero(id);
    if (res.data.code === 200) {
        message.success(res.data.msg);
    } else {
        message.error("删除失败");
    }
    if (tableData.value.length == 1) {
        currentPage.value--;
    }
    getList();
}

function selectList() {
    currentPage.value = 1;
    getList();
}

function changePage(page: number, size: number) {
    pageSize.value = size;
    currentPage.value = page;
    getList();
}

function reset() {
    formState.name = formState.star = formState.gender = formState.camp = formState.arms = formState.skillGroup = formState.skin = undefined;
    selectList();
}

function showModal(showType: AddType, item?: AddHeroParams) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改英雄";
        if (item) {
            addParams.id = item.id;
            addParams.name = item.name;
            addParams.gender = item.gender;
            addParams.star = item.star;
            addParams.introduce = item.introduce;
            addParams.exclusive = item.exclusive;
            addParams.arms = item.arms;
            addParams.superSkill = item.superSkill;
            addParams.skillGroup = item.skillGroup;
            addParams.castGrainSkill = item.castGrainSkill;
            addParams.talent = item.talent;
            addParams.skin = item.skin;
            addParams.camp = item.camp;
        }
    } else if (showType === "add") {
        title.value = "添加英雄";
        addParams.id = addParams.gender = addParams.star = undefined;
        addParams.camp = [];
        addParams.name = addParams.exclusive = addParams.superSkill = addParams.castGrainSkill = addParams.castGrainSkill = addParams.skin = addParams.introduce = "";
    } else if (showType === "detail") {
        title.value = "查看详情";
        if (item) {
            addParams.name = item.name;
            addParams.gender = item.gender;
            addParams.star = item.star;
            addParams.introduce = item.introduce;
            addParams.exclusive = item.exclusive;
            addParams.arms = item.arms;
            addParams.superSkill = item.superSkill;
            addParams.skillGroup = item.skillGroup;
            addParams.castGrainSkill = item.castGrainSkill;
            addParams.talent = item.talent;
            addParams.skin = item.skin;
            addParams.camp = item.camp;
        }
    }
    visible.value = true;
}

async function handleOk(e: MouseEvent) {
    loading.value = true;
    interface AType {
        axios: ((data: AddHeroParams) => AxiosPromise<any>)
    }
    let a: AType = {
        axios: addHero
    };
    if (type.value === "edit") {
        a.axios = updateHero;
    }
    const result = await addPage.value?.getAddData();
    if (result && a.axios) {
        const res = await a.axios(result);
        if (res.data.code === 200) {
            getList();
            message.success(res.data.msg);
            visible.value = false;
        } else {
            message.error(res.data.msg);
        }
    }
    loading.value = false;
}

onMounted(() => {
    getList();
})

</script>

<style lang="less" scoped>
.heroList {
    padding: 20px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;

    .title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 15px 15px 0;
    }

    .searchHead {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
}
</style>