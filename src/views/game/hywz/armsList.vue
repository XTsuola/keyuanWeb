<template>
    <div class="armsList">
        <div class="title">
            兵种列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增兵种
            </a-button>
        </div>
        <a-form class="searchHead" :wrapperCol="{ span: 16 }" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="名称" style="width: 200px">
                <a-input v-model:value="formState.name" placeholder="请输入名称" />
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
        <a-modal v-model:open="visible" destroyOnClose :title="title" :maskClosable="false">
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
import { ref, reactive, onMounted } from "vue";
import { message } from "ant-design-vue";
import { getArmsList, addArms, updateArms, deleteArms, type GetArmsListParams, type AddArmsParams } from "@/api/hywz";
import AddPage from "./modal/armsAddPage.vue";
import type { AxiosPromise } from "axios";
import type { AddType } from "@/utils/global";
import MyTabel from "@/components/table.vue";

let addParams = reactive<AddArmsParams>({
    id: undefined,
    name: "",
    type: "",
    life: "",
    att: "",
    magic: "",
    skill: "",
    speed: "",
    xingyun: "",
    def: "",
    mof: "",
    tige: "",
    talent: "",
    remark: ""
});
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
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
    name: ""
});
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
        width: 100
    },
    {
        title: "类型",
        dataIndex: "type",
        key: "type",
        width: 80
    },
    {
        title: "生命",
        dataIndex: "life",
        key: "life",
        width: 60,
        sorter: (a: AddArmsParams, b: AddArmsParams) => {
            return parseInt(a.life) - parseInt(b.life)
        }
    },
    {
        title: "攻击",
        dataIndex: "att",
        key: "att",
        width: 60,
        sorter: (a: AddArmsParams, b: AddArmsParams) => {
            return parseInt(a.att) - parseInt(b.att)
        }
    },
    {
        title: "魔力",
        dataIndex: "magic",
        key: "magic",
        width: 60,
        sorter: (a: AddArmsParams, b: AddArmsParams) => {
            return parseInt(a.magic) - parseInt(b.magic)
        }
    },
    {
        title: "技巧",
        dataIndex: "skill",
        key: "skill",
        width: 60,
        sorter: (a: AddArmsParams, b: AddArmsParams) => {
            return parseInt(a.skill) - parseInt(b.skill)
        }
    },
    {
        title: "速度",
        dataIndex: "speed",
        key: "speed",
        width: 60,
        sorter: (a: AddArmsParams, b: AddArmsParams) => {
            return parseInt(a.speed) - parseInt(b.speed)
        }
    },
    {
        title: "幸运",
        dataIndex: "xingyun",
        key: "xingyun",
        width: 60,
        sorter: (a: AddArmsParams, b: AddArmsParams) => {
            return parseInt(a.xingyun) - parseInt(b.xingyun)
        }
    },
    {
        title: "防御",
        dataIndex: "def",
        key: "def",
        width: 60,
        sorter: (a: AddArmsParams, b: AddArmsParams) => {
            return parseInt(a.def) - parseInt(b.def)
        }
    },
    {
        title: "魔防",
        dataIndex: "mof",
        key: "mof",
        width: 60,
        sorter: (a: AddArmsParams, b: AddArmsParams) => {
            return parseInt(a.mof) - parseInt(b.mof)
        }
    },
    {
        title: "体格",
        dataIndex: "tige",
        key: "tige",
        width: 60,
        sorter: (a: AddArmsParams, b: AddArmsParams) => {
            return parseInt(a.tige) - parseInt(b.tige)
        }
    },
    {
        title: "技能",
        dataIndex: "talent",
        key: "talent",
        width: 280
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        list: ["detail", "edit", "delete"],
        width: 200
    },
]);
const loading = ref<boolean>(false);
const tableData = ref<any>([]);
const type = ref<AddType>("add");

async function getList() {
    const params: GetArmsListParams = {
        pageSize: pageSize.value,
        pageNo: currentPage.value,
        name: formState.name
    };
    const res = await getArmsList(params);
    if (res.data.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
    }
}

async function deleteOk(id: number) {
    const res = await deleteArms(id);
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
    formState.name = "";
    selectList();
}

function showModal(showType: AddType, item?: AddArmsParams) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改兵种";
        if (item) {
            addParams.name = item.name;
            addParams.type = item.type;
            addParams.life = item.life;
            addParams.att = item.att;
            addParams.magic = item.magic;
            addParams.skill = item.skill;
            addParams.speed = item.speed;
            addParams.xingyun = item.xingyun;
            addParams.def = item.def;
            addParams.mof = item.mof;
            addParams.tige = item.tige;
            addParams.talent = item.talent;
            addParams.remark = item.remark;
            addParams.id = item.id;
        }
    } else if (showType === "add") {
        title.value = "添加兵种";
        addParams.id = undefined;
        addParams.type = addParams.name = addParams.life = addParams.att = addParams.magic = addParams.skill = addParams.speed = addParams.xingyun = addParams.def = addParams.mof = addParams.tige = addParams.talent = addParams.remark = "";
    } else if (showType == "detail") {
        title.value = "查看详情";
        if (item) {
            addParams.name = item.name;
            addParams.type = item.type;
            addParams.life = item.life;
            addParams.att = item.att;
            addParams.magic = item.magic;
            addParams.skill = item.skill;
            addParams.speed = item.speed;
            addParams.xingyun = item.xingyun;
            addParams.def = item.def;
            addParams.mof = item.mof;
            addParams.tige = item.tige;
            addParams.talent = item.talent;
            addParams.remark = item.remark;
        }
    }
    visible.value = true;
}

async function handleOk() {
    loading.value = true;
    interface AType {
        axios: ((data: AddArmsParams) => AxiosPromise<any>)
    }
    let a: AType = {
        axios: addArms
    };
    if (type.value === "edit") {
        a.axios = updateArms;
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
.armsList {
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