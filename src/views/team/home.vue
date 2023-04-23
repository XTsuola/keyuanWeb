<template>
    <div class="mainHome">
        <h3>战队介绍（群：暂无）</h3>
        <div style="margin-bottom:15px">客缘战队：区级战队，半养老，不摆烂</div>
        <h3>成员展示</h3>
        <div class="chengyuan">
            <a-carousel class="head_dv1" autoplay>
                <img src="@/assets/images/manage/jiangnan.jpg" />
                <img src="@/assets/images/manage/luming.jpg" />
                <img src="@/assets/images/manage/yutu.jpg" />
            </a-carousel>
        </div>
        <h3>宣传视频</h3>
        <div class="shiping">
            <video style="width: 100%;height: 100%;" class="video"
                src="https://suola-1300285550.cos.ap-nanjing.myqcloud.com/Thu%20May%2026%202022%2009%3A06%3A40%20GMT%2B0800%20%28%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4%29%E6%88%98%E9%98%9F%E9%9B%86%E9%94%A6.mp4"
                controls autoplay></video>
        </div>
        <h3>战队收人标准</h3>
        <div class="biaozhun">
            <div>男要求分路25段/巅峰分1400/三个英雄战力4500以上</div>

            <div>女要求分路15段/巅峰赛1200/两个英雄战力4000以上</div>

            <div>战队招收赞助，免打战队赛免审核</div>

            <div>战队赛每周至少两把（能打四把以上的可放低要求）</div>

            <div>战队禁止搞心态、禁止摆烂</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.mainHome {
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    max-height: calc(100vh - 100px);
    overflow-y: auto;

    .chengyuan {
        display: flex;
        justify-content: center;

        .head_dv1 {
            width: 82vw;
            height: 47vw;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .shiping {
        margin-bottom: 15px;
    }

    .biaozhun {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        row-gap: 15px;
        margin-bottom: 15px;
    }
}
</style>