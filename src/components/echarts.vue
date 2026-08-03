<template>
    <div class="pieChart" ref="chartRef"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onBeforeUnmount, onMounted, shallowRef } from "vue";

interface Prop {
    pie_data: any
}

const prop = defineProps<Prop>();
const chartRef = ref<HTMLElement | null>(null);
const chartInstance = shallowRef<echarts.ECharts | null>(null);

function handleResize() {
    chartInstance.value?.resize();
}

function drawPie() {
    if (!chartRef.value) return;
    const charts = echarts.init(chartRef.value);
    chartInstance.value = charts;
    charts.setOption({
        tooltip: {
            trigger: "item"
        },
        legend: {
            orient: "vertical",
            left: "left",
            padding: 20
        },
        series: [
            {
                type: "pie",
                radius: "50%",
                center: ["50%", "50%"],
                data: prop.pie_data.values,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                }
            }
        ]
    });
    window.addEventListener("resize", handleResize);
}

onMounted(() => {
    drawPie();
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
    chartInstance.value?.dispose();
    chartInstance.value = null;
});
</script>
<style scoped>
.pieChart {
    height: 275px;
    background-color: #fff;
}
</style>
