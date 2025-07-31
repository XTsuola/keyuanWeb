<template>
    <div class="home">
        <div class="header">
            <div class="h_left">
                <img src="@/assets/images/love/wedding/home/1.jpg" />
                <div @click="goPhotos(1)">电影空间</div>
            </div>
            <div class="h_center">
                囍
            </div>
            <div class="h_right">
                <img src="@/assets/images/love/wedding/home/2.jpg" />
                <div @click="goPhotos(2)">公园外景</div>
            </div>
        </div>
        <div class="flooter">
            <div class="f_left">
                <img src="@/assets/images/love/wedding/home/3.jpg" />
                <div @click="goPhotos(3)">国风中式</div>
            </div>
            <div class="f_center">
                ❤
            </div>
            <div class="f_right">
                <img src="@/assets/images/love/wedding/home/4.jpg" />
                <div @click="goPhotos(4)">欢喜花嫁</div>
            </div>
        </div>
        <div>
            <div style="font-size: 40px;text-align: right;margin-top: 60px;margin-right: 20px;">
                <img style="width: 120px;margin-right: 50px;" src="@/assets/images/love/wedding/icon/qingshu.png"
                    @click="go()" />
                <div @click="go()"><a>一纸情书</a><img style="width: 60px;" src="@/assets/images/love/wedding/icon/click.png" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import router from "@/router";

function goPhotos(ind: number) {
    if (ind == 1) {
        router.push("/photos/filmSpace");
    } else if (ind == 2) {
        router.push("/photos/parkExterior");
    } else if (ind == 3) {
        router.push("/photos/chineseStyle");
    } else if (ind == 4) {
        router.push("/photos/hanayome");
    }
}

function go() {
    router.push("/shiyan");
}

</script>
<style lang="less" scoped>
.home {
    height: 100%;
    overflow: auto;

    .header,
    .flooter {
        background-color: pink;
        width: 100%;
        height: calc(41.25vw - 99px);
        display: flex;

        .h_left,
        .h_center,
        .h_right,
        .f_left,
        .f_center,
        .f_right {
            height: 100%;
            justify-content: center;
        }

        .h_left,
        .h_right,
        .f_left,
        .f_right {
            width: 27.5%;
            position: relative;

            img {
                width: 100%;
                height: 100%;
            }

            div {
                position: absolute;
                font-size: 42px;
                bottom: 3px;
                left: 0;
                text-align: center;
                width: 100%;
                text-shadow: 0px 2px 0px #fff, 0px -2px 0px #9da181, 2px 0px 0px #fff, -2px 0px 0px #9da181;
                text-decoration: underline;
            }
        }

        .h_center,
        .f_center {
            width: 45%;
            font-size: 240px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: rgb(221, 70, 19);
        }

        .h_center {
            text-shadow: 0px 4px 0px #fff, 0px -4px 0px #9da181, 4px 0px 0px #fff, -4px 0px 0px #9da181;
        }
    }
}
</style>