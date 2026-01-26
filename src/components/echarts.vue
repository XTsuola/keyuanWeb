<template>
    <div class="pieChart" :id="prop.pie_data.id"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { nextTick, onMounted } from "vue";

declare var window: any;

interface Prop {
    pie_data: any
}
const prop = defineProps<Prop>()

function draw_pie() {
    let charts = echarts.init(document.getElementById(prop.pie_data.id) as any);
    charts.setOption({
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            padding: 20
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                center: ['50%', '50%'],
                data: prop.pie_data.values,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });
    window.addEventListener("resize", function () {
        charts.resize();
    });
}

onMounted(() => {
    nextTick(() => {
        draw_pie()
    })
})
</script>
<style scoped>
.pieChart {
    height: 275px;
    background-color: #fff;
}
</style>