<template>
    <div class="HeroList">
        <div class="title">
            英雄列表
            <a-button size="small" style="margin-left: 15px;" @click="showModal('add')" v-if="levelId === 1">新增英雄
            </a-button>
        </div>
        <a-form class="searchHead" :wrapperCol="{ span: 17 }" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="名称" style="width: 200px">
                <a-input v-model:value="formState.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item label="性别" style="width: 200px">
                <a-select v-model:value="formState.genter" placeholder="请选择性别">
                    <a-select-option :value="1">男</a-select-option>
                    <a-select-option :value="0">女</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="星级" style="width: 200px">
                <a-select v-model:value="formState.star" placeholder="请选择星级">
                    <a-select-option :value="5">五星</a-select-option>
                    <a-select-option :value="4">四星</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="元素" style="width: 200px">
                <a-select v-model:value="formState.element" placeholder="请选择元素">
                    <a-select-option value="风">风</a-select-option>
                    <a-select-option value="岩">岩</a-select-option>
                    <a-select-option value="雷">雷</a-select-option>
                    <a-select-option value="草">草</a-select-option>
                    <a-select-option value="水">水</a-select-option>
                    <a-select-option value="火">火</a-select-option>
                    <a-select-option value="冰">冰</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="武器" style="width: 200px">
                <a-select v-model:value="formState.weaponType" placeholder="请选择武器">
                    <a-select-option value="单手剑">单手剑</a-select-option>
                    <a-select-option value="双手剑">双手剑</a-select-option>
                    <a-select-option value="弓">弓</a-select-option>
                    <a-select-option value="长柄武器">长柄武器</a-select-option>
                    <a-select-option value="法器">法器</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="属地" style="width: 200px">
                <a-select v-model:value="formState.country" placeholder="请选择属地">
                    <a-select-option value="蒙德">蒙德</a-select-option>
                    <a-select-option value="璃月">璃月</a-select-option>
                    <a-select-option value="稻妻">稻妻</a-select-option>
                    <a-select-option value="须弥">须弥</a-select-option>
                    <a-select-option value="枫丹">枫丹</a-select-option>
                    <a-select-option value="纳塔">纳塔</a-select-option>
                    <a-select-option value="挪德卡莱">挪德卡莱</a-select-option>
                    <a-select-option value="至冬">至冬</a-select-option>
                    <a-select-option value="魔女会">魔女会</a-select-option>
                    <a-select-option value="异世界">异世界</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="体型" style="width: 200px">
                <a-select v-model:value="formState.figure" placeholder="请选择体型">
                    <a-select-option value="成女">成女</a-select-option>
                    <a-select-option value="少女">少女</a-select-option>
                    <a-select-option value="幼女">幼女</a-select-option>
                    <a-select-option value="成男">成男</a-select-option>
                    <a-select-option value="少年">少年</a-select-option>
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
import { getHeroList, addHero, updateHero, deleteHero, type GetHeroListParams, type AddHeroParams } from "@/api/yuanshen";
import AddPage from "./modal/heroAddPage.vue";
import type { AxiosPromise } from "axios";
import type { AddType } from "@/utils/global";
import MyTabel from "@/components/table.vue";

const addParams = reactive<AddHeroParams>({
    id: undefined,
    name: "",
    genter: undefined,
    figure: undefined,
    star: undefined,
    country: undefined,
    element: undefined,
    weaponType: undefined,
    constellation: "",
    birthday: "",
    remark: ""
});
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const title = ref<string>("添加英雄");
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
    name: undefined,
    genter: undefined,
    star: undefined,
    element: undefined,
    weaponType: undefined,
    country: undefined,
    figure: undefined,
});
const columns = ref<any>([
    {
        title: "序号",
        key: "index",
        align: "center",
        width: 60
    },
    {
        title: "头像",
        dataIndex: "headImg",
        key: "headImg",
        width: 50,
        scopedSlots: { customRender: "pic" }
    },
    {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 100
    },
    {
        title: "性别",
        dataIndex: "genter",
        key: "genter",
        width: 60,
        customRender: (opt: any) => opt.value == 1 ? "男" : "女",
    },
    {
        title: "星级",
        dataIndex: "star",
        key: "element",
        width: 60,
        customRender: (opt: any) => opt.value == "5" ? "五星" : "四星",
    },
    {
        title: "元素",
        dataIndex: "element",
        key: "element",
        width: 60
    },
    {
        title: "武器",
        dataIndex: "weaponType",
        key: "weaponType",
        width: 80
    },
    {
        title: "属地",
        dataIndex: "country",
        key: "country",
        width: 80
    },
    {
        title: "命座",
        dataIndex: "constellation",
        key: "constellation",
        width: 80
    },
    {
        title: "体型",
        dataIndex: "figure",
        key: "figure",
        width: 60
    },
    {
        title: "生日",
        dataIndex: "birthdayName",
        key: "birthdayName",
        width: 80
    },
    {
        title: "星座",
        dataIndex: "starConstellation",
        key: "starConstellation",
        width: 80
    },
    /* {
        title: "备注",
        dataIndex: "remark",
        key: "remark",
        width: 80
    }, */
    {
        title: "操作",
        key: "action",
        align: "center",
        list: ["detail", "edit", "delete"],
        width: 180
    },
]);
const loading = ref<boolean>(false);
const tableData = ref<any>([]);
const type = ref<AddType>("add");
function getBirthday(birthday: string) {
    const [left, right] = birthday.split('-')
    const month = parseInt(left);
    const day = parseInt(right);
    let starConstellation = ""
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) starConstellation = "水瓶座";
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) starConstellation = "双鱼座";
    else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) starConstellation = "白羊座";
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) starConstellation = "金牛座";
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) starConstellation = "双子座";
    else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) starConstellation = "巨蟹座";
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) starConstellation = "狮子座";
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) starConstellation = "处女座";
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) starConstellation = "天秤座";
    else if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) starConstellation = "天蝎座";
    else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) starConstellation = "射手座";
    else starConstellation = "摩羯座";
    return {
        name: month + "月" + day + "日",
        star: starConstellation
    }
}

async function getList() {
    const params: GetHeroListParams = {
        pageSize: pageSize.value,
        pageNo: currentPage.value,
        ...formState
    };
    const res = await getHeroList(params);
    if (res.data.code === 200) {
        const data = res.data.rows;
        for (let i = 0; i < data.length; i++) {
            const birthday = getBirthday(data[i].birthday);
            data[i].birthdayName = birthday.name;
            data[i].starConstellation = birthday.star;
            data[i].headImg = import.meta.env.VITE_APP_BASE_URL + "yuanshen/touxiang/" + data[i].name + ".png";
        }
        tableData.value = data;
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
    formState.name = formState.genter = formState.star = formState.element = formState.weaponType = formState.country = formState.figure = undefined;
    selectList();
}

function showModal(showType: AddType, item?: AddHeroParams) {
    type.value = showType;
    if (showType === "edit") {
        title.value = "修改英雄";
        if (item) {
            addParams.name = item.name;
            addParams.genter = item.genter;
            addParams.figure = item.figure;
            addParams.star = item.star;
            addParams.country = item.country;
            addParams.element = item.element;
            addParams.weaponType = item.weaponType;
            addParams.constellation = item.constellation;
            addParams.birthday = item.birthday;
            addParams.remark = item.remark;
            addParams.id = item.id;
        }
    } else if (showType === "add") {
        title.value = "添加英雄";
        addParams.id = addParams.genter = addParams.figure = addParams.star = addParams.country = addParams.element = addParams.weaponType = undefined;
        addParams.name = addParams.constellation = addParams.birthday = addParams.remark = "";
    } else if (showType == "detail") {
        title.value = "查看详情";
        if (item) {
            addParams.name = item.name;
            addParams.genter = item.genter;
            addParams.figure = item.figure;
            addParams.star = item.star;
            addParams.country = item.country;
            addParams.element = item.element;
            addParams.weaponType = item.weaponType;
            addParams.constellation = item.constellation;
            addParams.birthday = item.birthday;
            addParams.remark = item.remark;
            addParams.remark = item.remark;
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
.HeroList {
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