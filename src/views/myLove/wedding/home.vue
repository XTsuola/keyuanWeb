<template>
    <div class="wedding-home">
        <section class="row">
            <button type="button" class="card" @click="goPhotos('filmSpace')">
                <img src="@/assets/images/love/wedding/home/1.jpg" alt="电影空间" />
                <span>电影空间</span>
            </button>
            <div class="center mark">囍</div>
            <button type="button" class="card" @click="goPhotos('parkExterior')">
                <img src="@/assets/images/love/wedding/home/2.jpg" alt="公园外景" />
                <span>公园外景</span>
            </button>
        </section>
        <section class="row">
            <button type="button" class="card" @click="goPhotos('chineseStyle')">
                <img src="@/assets/images/love/wedding/home/3.jpg" alt="国风中式" />
                <span>国风中式</span>
            </button>
            <div class="center heart">❤</div>
            <button type="button" class="card" @click="goPhotos('hanayome')">
                <img src="@/assets/images/love/wedding/home/4.jpg" alt="欢喜花嫁" />
                <span>欢喜花嫁</span>
            </button>
        </section>
        <section class="letter">
            <button type="button" class="letter-btn" @click="goLetter">
                <img class="qingshu" src="@/assets/images/love/wedding/icon/qingshu.png" alt="" />
                <span>
                    一纸情书
                    <img class="click" src="@/assets/images/love/wedding/icon/click.png" alt="" />
                </span>
            </button>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

type AlbumKey = "filmSpace" | "parkExterior" | "chineseStyle" | "hanayome";

const router = useRouter();

function goPhotos(key: AlbumKey) {
    router.push(`/photos/${key}`);
}

function goLetter() {
    router.push("/shiyan");
}
</script>

<style lang="less" scoped>
.wedding-home {
    min-height: calc(100vh - 140px);
    overflow: auto;
    background: #fff7f9;
    padding-bottom: 24px;
}

.row {
    display: grid;
    grid-template-columns: 27.5% 1fr 27.5%;
    min-height: clamp(180px, 28vw, 360px);
    background: pink;
}

.card {
    position: relative;
    border: none;
    padding: 0;
    background: transparent;
    cursor: pointer;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    span {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 6px;
        text-align: center;
        font-size: clamp(18px, 3vw, 36px);
        text-shadow: 0 2px 0 #fff, 0 -2px 0 #9da181, 2px 0 0 #fff, -2px 0 0 #9da181;
        text-decoration: underline;
        color: #1f1f1f;
    }
}

.center {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(221, 70, 19);
}

.mark {
    font-size: clamp(72px, 14vw, 200px);
    text-shadow: 0 4px 0 #fff, 0 -4px 0 #9da181, 4px 0 0 #fff, -4px 0 0 #9da181;
}

.heart {
    font-size: clamp(64px, 12vw, 180px);
}

.letter {
    display: flex;
    justify-content: flex-end;
    padding: 40px 24px 0;
}

.letter-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: right;
    color: #1f1f1f;

    .qingshu {
        width: 120px;
        margin-right: 40px;
        display: block;
        margin-left: auto;
    }

    span {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 28px;
        margin-top: 8px;
    }

    .click {
        width: 48px;
    }
}

@media screen and (max-width: 768px) {
    .letter-btn {
        .qingshu {
            width: 84px;
            margin-right: 12px;
        }

        span {
            font-size: 20px;
        }
    }
}
</style>
