<template>
    <div class="main">
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
        <a-table :columns="columns" :data-source="data" :scroll="scrollObj" :pagination="false">
            <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'index'">
                    {{ index + 1 }}
                </template>
                <template v-if="column.key === 'name'">
                    <a>{{ record.name }}</a>
                </template>
                <template v-else-if="column.key === 'action' && levelId === 1">
                    <span style="display: flex;flex-wrap: nowrap;white-space: nowrap;align-items: center;">
                        <a-button size="small" @click="showModal('detail', record)">查看详情</a-button>
                        <span v-if="levelId === 1">
                            <a-divider type="vertical" />
                            <a-button size="small" @click="showModal('edit', record)">修改</a-button>
                            <a-divider type="vertical" />
                            <a-popconfirm title="确定删除该兵种吗?" ok-text="Yes" cancel-text="No" @confirm="deleteOk(record)"
                                @cancel="cancel">
                                <a-button size="small">删除</a-button>
                            </a-popconfirm>
                        </span>
                    </span>
                </template>
            </template>
        </a-table>
        <a-pagination class="pagination" v-model:current="current" v-model:page-size="pageSize" :total="total"
            :show-total="total => `共 ${total} 条`" @change="getList" showSizeChanger />
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
import { Table as aTable, message } from "ant-design-vue";
import { getArmsList, addArms, updateArms, deleteArms, type GetArmsListParams, type AddArmsParams, type UpdateArmsParams, type DeleteParams } from "@/api/hywz";
import AddPage from "./modal/armsAddPage.vue";
import type { AddType, API as AddPageAPI } from "./modal/armsAddPage.vue";
import type { AxiosPromise } from "axios";

export interface AddParamsType extends AddArmsParams {
    _id?: string
    id?: number
}

interface ColumnType {
    title: string
    dataIndex?: string
    key: string
    width?: number
    sorter?: any
}

interface scrollType {
    x: number
    y: number | undefined
}

interface DataType {
    _id: string
    id: number
    name: string
    qq: string
    group: string
    position: string
    remark: string
}

interface FormStateType {
    name: string
}

let addParams = reactive<AddParamsType>({
    _id: "",
    id: 0,
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
const current = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const title = ref<string>("添加兵种");
const addPage = ref<AddPageAPI>();
const userInfo = ref<string | null>(window.sessionStorage.getItem("userInfo"));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const visible = ref<boolean>(false);
const formState = reactive<FormStateType>({
    name: ""
});
const columns = ref<ColumnType[]>([
    {
        title: "序号",
        key: "index",
        width: 80
    },
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 120
    },
    {
        title: "类型",
        dataIndex: "type",
        key: "type",
        width: 100
    },
    {
        title: "生命",
        dataIndex: "life",
        key: "life",
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.life) - parseInt(b.life)
        }
    },
    {
        title: "攻击",
        dataIndex: "att",
        key: "att",
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.att) - parseInt(b.att)
        }
    },
    {
        title: "魔力",
        dataIndex: "magic",
        key: "magic",
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.magic) - parseInt(b.magic)
        }
    },
    {
        title: "技巧",
        dataIndex: "skill",
        key: "skill",
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.skill) - parseInt(b.skill)
        }
    },
    {
        title: "速度",
        dataIndex: "speed",
        key: "speed",
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.speed) - parseInt(b.speed)
        }
    },
    {
        title: "幸运",
        dataIndex: "xingyun",
        key: "xingyun",
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.xingyun) - parseInt(b.xingyun)
        }
    },
    {
        title: "防御",
        dataIndex: "def",
        key: "def",
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.def) - parseInt(b.def)
        }
    },
    {
        title: "魔防",
        dataIndex: "mof",
        key: "mof",
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.mof) - parseInt(b.mof)
        }
    },
    {
        title: "体格",
        dataIndex: "tige",
        key: "tige",
        width: 80,
        sorter: (a: AddParamsType, b: AddParamsType) => {
            return parseInt(a.tige) - parseInt(b.tige)
        }
    },
    {
        title: "技能",
        dataIndex: "talent",
        key: "talent",
        width: 240
    },
    {
        title: "操作",
        key: "action",
        width: 200
    },
]);
const loading = ref<boolean>(false);
const data = ref<DataType[]>([]);
const scrollObj = reactive<scrollType>({ x: 400, y: undefined });
const mql = window.matchMedia("(max-width: 768px)");
const type = ref<AddType>("add");

function mediaMatchs() {
    if (mql.matches) {
        scrollObj.y = 550;
    } else {
        scrollObj.y = undefined;
    }
}
mediaMatchs();
mql.addEventListener("change", mediaMatchs);

async function getList() {
    const params: GetArmsListParams = {
        pageSize: pageSize.value,
        pageNo: current.value,
        name: formState.name
    };
    const res = await getArmsList(params);
    if (res.data.code === 200) {
        data.value = res.data.rows;
        total.value = res.data.total;
    }
}

async function deleteOk(e: DataType) {
    const params: DeleteParams = {
        _id: e._id
    };
    const res = await deleteArms(params);
    if (res.data.code === 200) {
        message.success(res.data.msg);
    } else {
        message.error("删除失败");
    }
    if (data.value.length == 1) {
        current.value--;
    }
    getList();
}

function cancel() {
    message.error("取消删除");
}

function selectList() {
    current.value = 1;
    getList();
}

function reset() {
    formState.name = "";
    selectList();
}

function showModal(showType: AddType, item?: AddParamsType) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改兵种";
        if (item) {
            addParams._id = item._id;
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
        title.value = "添加兵种"
        addParams._id = addParams.type = addParams.name = addParams.life = addParams.att = addParams.magic = addParams.skill = addParams.speed = addParams.xingyun = addParams.def = addParams.mof = addParams.tige = addParams.talent = addParams.remark = "";
        addParams.id = 0;
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

async function handleOk(e: MouseEvent) {
    loading.value = true;
    interface AType {
        axios: ((data: AddArmsParams) => AxiosPromise<any>) | ((data: UpdateArmsParams) => AxiosPromise<any>)
        msg: string
    }
    let a: AType = {
        msg: "新增失败",
        axios: addArms
    };
    if (type.value === "edit") {
        a.axios = updateArms;
        a.msg = "修改失败";
    }
    const result = await addPage.value?.getAddData();
    if (result && a.axios) {
        const res = await a.axios(result);
        if (res.data.code === 200) {
            getList();
            message.success(res.data.msg);
            visible.value = false;
        } else {
            message.error(a.msg);
        }
    }
    loading.value = false;
}

onMounted(() => {
    getList();
})

</script>

<style lang="less" scoped>
.main {
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

    .pagination {
        margin: 20px 0 20px 20px;
    }
}
</style>