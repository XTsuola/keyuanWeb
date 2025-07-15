<template>
    <div class="main">
        <div class="title">
            卡牌列表
            <a-button @click="capture">导出为图片</a-button>
        </div>
        <a-form class="searchHead" :wrapperCol="{ span: 16 }" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="名称" style="width: 200px">
                <a-input v-model:value="formState.name" style="width: 120px;" placeholder="输入名称" />
            </a-form-item>
            <a-form-item label="阵营" style="width: 200px">
                <a-select v-model:value="formState.zhenyin" mode="multiple" style="width: 120px;" placeholder="请选择阵营">
                    <a-select-option v-for="item in zhenyinList" :key="item.value" :value="item.value">{{
                        item.label
                    }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="品质" style="width: 200px">
                <a-select v-model:value="formState.quality" style="width: 120px;" placeholder="请选择品质">
                    <a-select-option v-for="item in qualityList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="费用" style="width: 200px">
                <a-select v-model:value="formState.cost" style="width: 120px;" placeholder="请选择费用">
                    <a-select-option v-for="item in costList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="类型" style="width: 200px">
                <a-select v-model:value="formState.type" style="width: 120px;" placeholder="请选择类型">
                    <a-select-option v-for="item in typeList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item>
            <!-- <a-form-item label="等级" style="width: 200px">
                <a-select v-model:value="formState.level" style="width: 120px;" placeholder="请选择等级">
                    <a-select-option v-for="item in levelList" :key="item.value" :value="item.value">{{
                        item.label
                        }}</a-select-option>
                </a-select>
            </a-form-item> -->
            <a-form-item>
                <div style="display: flex;justify-content: flex-start;">
                    <a-button size="small" style="margin: 0 12px 0 12px" @click="getList">查询</a-button>
                    <a-button size="small" @click="reset">重置</a-button>
                </div>
            </a-form-item>
        </a-form>
        <MyTabel :columnsData="columns" :dataSource="tableData" :pagination="false"></MyTabel>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import simangdiguo from "./cardInfo_20/simangdiguo.json";
import chanyigu from "./cardInfo_20/chanyigu.json";
import tiantanggang from "./cardInfo_20/tiantanggang.json";
import manshikuangye from "./cardInfo_20/manshikuangye.json";
import dongshenshitu from "./cardInfo_20/dongshenshitu.json";
import lianyushenyuan from "./cardInfo_20/lianyushenyuan.json";
import yinmizhe from "./cardInfo_20/yinmizhe.json";
import { recommendCardList } from "./recommendCard";
import html2canvas from 'html2canvas';
import MyTabel from "@/components/table.vue";

export interface Type {
    label: string
    value: number | undefined
}

interface scrollType {
    x: number
    y: number | undefined
}

const tableRef = ref<any>(null)
/* const pagination = {
  showSizeChanger: true, // 显示页大小切换器
  pageSizeOptions: ['10', '20', '50', '100', '500', '1000'], // 添加更多选项
  defaultPageSize: 10, // 默认每页50条
} */
const total = ref<number>(0);
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
        title: "阵营",
        dataIndex: "zhenyin",
        key: "zhenyin",
        width: 80,
        customRender: (opt: any) => {
            return zhenyinList.find(item => item.value == opt.value)?.label
        }
    },
    {
        title: "品质",
        dataIndex: "quality",
        key: "quality",
        width: 80
    },
    // {
    //     title: "等级",
    //     dataIndex: "level",
    //     key: "level",
    //     width: 100
    // },
    {
        title: "费用",
        dataIndex: "cost",
        key: "cost",
        width: 80
    },
    {
        title: "类型",
        dataIndex: "type",
        key: "type",
        width: 80,
        customRender: (opt: any) => opt.value == 1 ? "战士" : "法术"
    },
    {
        title: "攻击",
        dataIndex: "attack",
        key: "attck",
        width: 80,
        sorter: (a: any, b: any) => {
            return parseInt(a.attack) - parseInt(b.attack)
        }
    },
    {
        title: "生命",
        dataIndex: "life",
        key: "life",
        width: 80,
        sorter: (a: any, b: any) => {
            return parseInt(a.life) - parseInt(b.life)
        }
    },
    {
        title: "总计",
        key: "remark",
        dataIndex: "remark",
        width: 80,
        customRender: (opt: any) => {
            return parseInt(opt.record.attack) + parseInt(opt.record.life)
        },
        sorter: (a: any, b: any) => {
            return (parseInt(a.life) + parseInt(a.attack)) - (parseInt(b.life) + parseInt(b.attack))
        }
    },
    /* {
        title: "推荐数",
        dataIndex: "count",
        key: "count",
        width: 100,
        sorter: (a: any, b: any) => {
            return a.count - b.count
        }
    },
    {
        title: "推荐值",
        dataIndex: "rarity",
        key: "rarity",
        width: 100,
        customRender: (opt: any) => (opt.value + 1).toFixed(2),    
        sorter: (a: any, b: any) => {
            return a.rarity - b.rarity
        }
    }, */
    {
        title: "效果",
        key: "effect",
        dataIndex: "effect",
        width: 280
    },
]);

const tableData = ref<any>([]);
const scrollObj = reactive<scrollType>({ x: 400, y: undefined });
const mql = window.matchMedia('(max-width: 768px)');
const qualityList = [{
    label: "全部",
    value: ""
}, {
    label: "橙",
    value: "橙"
}, {
    label: "紫",
    value: "紫"
}, {
    label: "蓝",
    value: "蓝"
}, {
    label: "白",
    value: "白"
}];
const costList = [{
    label: "全部",
    value: "",
}, {
    label: "9费",
    value: 9
}, {
    label: "8费",
    value: 8
}, {
    label: "7费",
    value: 7
}, {
    label: "6费",
    value: 6
}, {
    label: "5费",
    value: 5
}, {
    label: "4费",
    value: 4
}, {
    label: "3费",
    value: 3
}, {
    label: "2费",
    value: 2
}, {
    label: "1费",
    value: 1
}, {
    label: "0费",
    value: 0
}];
const typeList = [{
    label: "全部",
    value: ""
}, {
    label: "战士",
    value: 1
}, {
    label: "法术",
    value: 2
}, {
    label: "传记",
    value: 3
}];
const zhenyinList = [{
    label: "四芒帝国",
    value: 1
}, {
    label: "禅意谷",
    value: 2
}, {
    label: "天堂港",
    value: 3
}, {
    label: "蛮石旷野",
    value: 4
}, {
    label: "冬神使徒",
    value: 5
}, {
    label: "炼狱深渊",
    value: 6
}, {
    label: "隐秘者",
    value: 7
}];
const levelList = [{
    label: "全部",
    value: ""
}, {
    label: "10级",
    value: 10
}, {
    label: "12级",
    value: 12
}, {
    label: "15级",
    value: 15
}, {
    label: "16级",
    value: 16
}, {
    label: "18级",
    value: 18
}];
const formState = reactive({
    name: undefined,
    zhenyin: [],
    quality: undefined,
    level: undefined,
    cost: undefined,
    type: undefined
});

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
    simangdiguo.forEach((item: any) => {
        item.zhenyin = 1;
        item.count = 0;
        item.rarity = 0;
    });
    chanyigu.forEach((item: any) => {
        item.zhenyin = 2;
        item.count = 0;
        item.rarity = 0;
    })
    tiantanggang.forEach((item: any) => {
        item.zhenyin = 3;
        item.count = 0;
        item.rarity = 0;
    })
    manshikuangye.forEach((item: any) => {
        item.zhenyin = 4;
        item.count = 0;
        item.rarity = 0;
    })
    dongshenshitu.forEach((item: any) => {
        item.zhenyin = 5;
        item.count = 0;
        item.rarity = 0;
    })
    lianyushenyuan.forEach((item: any) => {
        item.zhenyin = 6;
        item.count = 0;
        item.rarity = 0;
    })
    yinmizhe.forEach((item: any) => {
        item.zhenyin = 7;
        item.count = 0;
        item.rarity = 0;
    })
    let allData: any = [...simangdiguo, ...chanyigu, ...tiantanggang, ...manshikuangye, ...dongshenshitu, ...lianyushenyuan, ...yinmizhe];
    for (let key in recommendCardList) {
        const data: any = recommendCardList[key].data
        for (let i = 0; i < data.length; i++) {
            const index = allData.findIndex((e: any) => e.name == data[i])
            allData[index].count += 1;
            let rat = 0;
            if (allData[index].quality == "蓝") {
                rat = 0.5;
            } else if (allData[index].quality == "紫") {
                rat = 0.4;
            } else if (allData[index].quality == "橙") {
                rat = 0.1;
            }
            if (allData[index].zhenyin == data[i].zhu) {
                allData[index].rarity += (0.7 * rat)
            } else {
                allData[index].rarity += (0.3 * rat)
            }
        }
    }
    if (formState.name) {
        allData = allData.filter((item: any) => item.name.includes(formState.name));
    }
    if (formState.zhenyin.length > 0) {
        allData = allData.filter((item: any) => formState.zhenyin.findIndex((e: any) => e == item.zhenyin) != -1)
    }
    if (formState.quality) {
        allData = allData.filter((item: any) => item.quality == formState.quality);
    }
    if (formState.cost != undefined && formState.cost != "") {
        allData = allData.filter((item: any) => item.cost == formState.cost);
    }
    if (formState.type) {
        allData = allData.filter((item: any) => item.type == formState.type);
    }
    if (formState.level) {
        allData = allData.filter((item: any) => item.level == formState.level);
    }
    // allData = allData.filter((item: any) => item.count == 0);
    total.value = allData.length;
    tableData.value = allData;
    for (let i = 0; i < tableData.value.length; i++) {
        tableData.value[i].id = i + 1;
    }
}

function reset() {
    formState.zhenyin = [];
    formState.name = formState.quality = formState.cost = formState.type = formState.level = undefined;
    getList();
}

function capture() {
    if (!tableRef.value) return
    html2canvas(tableRef.value.$el).then(canvas => {
        const link = document.createElement('a')
        link.download = 'table.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
    })
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