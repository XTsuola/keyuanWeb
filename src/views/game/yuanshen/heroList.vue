<template>
    <div class="heroList">
        <div class="title">
            角色列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增角色
            </a-button>
        </div>
        <a-form class="searchHead" :model="formState" name="basic" :wrapperCol="{ span: 16 }" autocomplete="off">
            <a-form-item label="名称" style="width: 200px">
                <a-input v-model:value="formState.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item label="性别" style="width: 200px">
                <a-select v-model:value="formState.gender" @change="selectList" placeholder="请选择性别">
                    <a-select-option v-for="item in genderList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="国家" style="width: 200px">
                <a-select v-model:value="formState.country" @change="selectList" placeholder="请选择国家">
                    <a-select-option v-for="item in countryList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="武器" style="width: 200px">
                <a-select v-model:value="formState.arms" @change="selectList" placeholder="请选择武器">
                    <a-select-option v-for="item in armsList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="属性" style="width: 200px">
                <a-select v-model:value="formState.shuxing" @change="selectList" placeholder="请选择属性">
                    <a-select-option v-for="item in shuxingList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="星级" style="width: 200px">
                <a-select v-model:value="formState.star" @change="selectList" placeholder="请选择星级">
                    <a-select-option v-for="item in starList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="星座" style="width: 200px">
                <a-select v-model:value="formState.starSign" @change="selectList" placeholder="请选择星星座">
                    <a-select-option v-for="item in starSignList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
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
import type { AxiosPromise } from "axios";
import type { AddType, Type } from "@/utils/global";
import { getHeroList, addHero, updateHero, deleteHero, type GetHeroListParams, type AddHeroParams } from "@/api/yuanshen";
import AddPage from "./modal/heroAddPage.vue";
import MyTabel from "@/components/table.vue";

let addParams = reactive<AddHeroParams>({
    id: undefined,
    name: "",
    gender: undefined,
    country: undefined,
    arms: undefined,
    shuxing: undefined,
    star: undefined,
    lifeSeat: "",
    breach: "",
    firstLook: "",
    birthday: "",
    remark: ""
});
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const title = ref<string>("添加角色");
const addPage = ref<any>();
const userInfo = ref<string | null>(sessionStorage.getItem("userInfo"));
const levelId = ref<number | null>(null);
if (userInfo.value && JSON.parse(userInfo.value).level) {
    levelId.value = JSON.parse(userInfo.value).level;
} else {
    levelId.value = null;
}
const visible = ref<boolean>(false);
const formState = reactive<any>({
    name: "",
    gender: undefined,
    country: undefined,
    arms: undefined,
    shuxing: undefined,
    star: undefined,
    starSign: undefined
});
const genderList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "男",
    value: 1
}, {
    label: "女",
    value: 2
}]);
const countryList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "蒙德",
    value: 1
}, {
    label: "璃月",
    value: 2
}, {
    label: "稻妻",
    value: 3
}, {
    label: "须弥",
    value: 4
}, {
    label: "枫丹",
    value: 5
}, {
    label: "纳塔",
    value: 6
}, {
    label: "至冬",
    value: 7
}, {
    label: "挪德卡莱",
    value: 8
}, {
    label: "坎瑞亚",
    value: 9
}, {
    label: "异世界",
    value: 10
}]);
const armsList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "单手剑",
    value: 1
}, {
    label: "双手剑",
    value: 2
}, {
    label: "弓",
    value: 3
}, {
    label: "长柄武器",
    value: 4
}, {
    label: "法器",
    value: 5
}]);
const shuxingList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "风",
    value: 1
}, {
    label: "岩",
    value: 2
}, {
    label: "雷",
    value: 3
}, {
    label: "草",
    value: 4
}, {
    label: "水",
    value: 5
}, {
    label: "火",
    value: 6
}, {
    label: "冰",
    value: 7
}]);
const starList = ref<Type[]>([{
    label: "全部",
    value: 0
}, {
    label: "五星",
    value: 1
}, {
    label: "四星",
    value: 2
}]);
const starSignList = ref<Type[]>([{
    label: "全部",
    value: ""
}, {
    label: "水瓶座",
    value: "水瓶座"
}, {
    label: "双鱼座",
    value: "双鱼座"
}, {
    label: "白羊座",
    value: "白羊座"
}, {
    label: "双子座",
    value: "双子座"
}, {
    label: "金牛座",
    value: "金牛座"
}, {
    label: "巨蟹座",
    value: "巨蟹座"
}, {
    label: "狮子座",
    value: "狮子座"
}, {
    label: "处女座",
    value: "处女座"
}, {
    label: "天秤座",
    value: "天秤座"
}, {
    label: "天蝎座",
    value: "天蝎座"
}, {
    label: "射手座",
    value: "射手座"
}, {
    label: "摩羯座",
    value: "摩羯座"
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
        width: 100
    },
    {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        width: 80,
        customRender: (opt: any) => {
            return genderList.value.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "国家",
        dataIndex: "country",
        key: "country",
        width: 80,
        customRender: (opt: any) => {
            return countryList.value.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "武器类型",
        dataIndex: "arms",
        key: "arms",
        width: 80,
        customRender: (opt: any) => {
            return armsList.value.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "属性",
        dataIndex: "shuxing",
        key: "shuxing",
        width: 80,
        customRender: (opt: any) => {
            return shuxingList.value.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "星级",
        dataIndex: "star",
        key: "star",
        width: 80,
        customRender: (opt: any) => {
            return starList.value.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "突破加成",
        dataIndex: "breach",
        key: "breach",
        width: 140,
    },
    {
        title: "备注",
        key: "remark",
        dataIndex: "remark",
        width: 200
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        list: ["detail", "edit", "delete"],
        width: 160
    },
]);
const loading = ref<boolean>(false);
const tableData = ref<any>([]);
const type = ref<AddType>("add");

async function getList() {
    const params: GetHeroListParams = {
        pageSize: pageSize.value,
        pageNo: currentPage.value,
        name: formState.name,
        gender: formState.gender,
        country: formState.country,
        arms: formState.arms,
        shuxing: formState.shuxing,
        star: formState.star,
        starSign: formState.starSign
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
    formState.name = "";
    formState.gender = formState.country = formState.arms = formState.shuxing = formState.star = formState.starSign = undefined;
    selectList();
}

function showModal(showType: AddType, item?: AddHeroParams) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改角色";
        if (item) {
            addParams.id = item.id;
            addParams.name = item.name;
            addParams.gender = item.gender;
            addParams.country = item.country;
            addParams.arms = item.arms;
            addParams.shuxing = item.shuxing;
            addParams.star = item.star;
            addParams.lifeSeat = item.lifeSeat;
            addParams.breach = item.breach;
            addParams.firstLook = item.firstLook;
            addParams.birthday = item.birthday;
            addParams.remark = item.remark;
            addParams.img = item.img;
        }
    } else if (showType === "add") {
        title.value = "添加角色";
        addParams.id = addParams.gender = addParams.country = addParams.arms = addParams.shuxing = addParams.star = undefined;
        addParams.name = addParams.firstLook = addParams.birthday = addParams.remark = "";
    } else if (showType === "detail") {
        title.value = "查看详情";
        if (item) {
            addParams.name = item.name;
            addParams.gender = item.gender;
            addParams.country = item.country;
            addParams.arms = item.arms;
            addParams.shuxing = item.shuxing;
            addParams.star = item.star;
            addParams.lifeSeat = item.lifeSeat;
            addParams.breach = item.breach;
            addParams.firstLook = item.firstLook;
            addParams.birthday = item.birthday;
            addParams.remark = item.remark;
            addParams.img = item.img;
        }
    }
    visible.value = true;
}

async function handleOk() {
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
    try {
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
    } catch (_) { }
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