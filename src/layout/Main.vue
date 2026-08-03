<template>
    <a-layout class="main-layout">
        <div class="header-bar">
            <div class="settingIcon" @click="showMenu">
                <setting-filled />
            </div>
            <div class="flex breadCrumb">
                <div class="breadCrumbItem" v-for="item in breadCrumbs" :key="item.path">
                    <span v-if="item?.meta" @click="tabBreadCrumb(item)"
                        :class="{ breadCrumbItemLink: item.meta.menuType === 'menu' }">{{ item.meta.label }}</span>
                    <span class="breadCrumbItem_delimiter">></span>
                </div>
                <div class="breadCrumbItem" v-for="item in extraBreadCrumbs" :key="item.url || item.label">
                    <span @click="tabBreadCrumb(item)" :class="{ breadCrumbItemLink: item.type === 'menu' }">{{
                        item.label
                    }}</span>
                    <span class="breadCrumbItem_delimiter">></span>
                </div>
            </div>
            <div class="touxiang" v-if="userInfo.userName">
                <a-dropdown>
                    <div class="user-name">{{ userInfo.userName }}</div>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <a href="javascript:;" @click="logout">退出登录</a>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
                <div class="avatar-wrap">
                    <img :src="imgValue" />
                    <input class="avatar-input" type="file" accept="image/png,image/jpg,image/jpeg,image/bmp"
                        @input="getImg" />
                </div>
            </div>
            <div class="touxiang" v-else @click="logout">
                <a-button type="primary" danger ghost>重新登录</a-button>
            </div>
        </div>
        <a-layout-content class="main-content">
            <RouterView />
        </a-layout-content>
    </a-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import { SettingFilled } from "@ant-design/icons-vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import type { Breadcrumb as GlobeBreadcrumbType } from "@/utils/global";
import { getUserInfo, updateImg, type UpdateImgParams } from "@/api/team";
import router from "@/router";
import imgBase from "@/assets/images/lanlingwang.jpg";

interface UserInfo {
    id: number
    userName: string
    img: string
    remark: string
}

const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpg", "image/bmp", "image/jpeg"];
const MAX_IMAGE_SIZE = 1024 * 1024 * 2;
const emits = defineEmits(["showMenu"]);
const userInfo = ref<UserInfo>({
    id: 0,
    userName: "",
    img: "",
    remark: ""
});
const localInfo = (() => {
    try {
        return JSON.parse(sessionStorage.getItem("userInfo") || "null");
    } catch {
        return null;
    }
})();
const route = useRoute();
const imgValue = ref("");
const breadCrumbs = ref<any[]>([]);
const extraBreadCrumbs = ref<GlobeBreadcrumbType[]>([]);

router.push({
    path: route.fullPath
});

function showMenu() {
    emits("showMenu");
}

function logout() {
    sessionStorage.clear();
    router.replace({
        path: "/login"
    });
}

async function getUserList() {
    if (!localInfo?.userId) return;
    const res = await getUserInfo(localInfo.userId);
    if (res.data.code != 200) return;

    const row = res.data.rows;
    userInfo.value = {
        id: row.id,
        userName: row.userName,
        img: row.img,
        remark: row.remark
    };
    sessionStorage.setItem("nowTouxiang", row.img);
    imgValue.value = row.img
        ? import.meta.env.VITE_APP_BASE_URL + "headImg/" + row.img
        : imgBase;
}

function getImg(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;
    if (file.size > MAX_IMAGE_SIZE) {
        message.error("图片大小不能超过2MB！");
        return;
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        message.error("仅支持上传图片！");
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", async (event) => {
        const result = event.target?.result;
        if (typeof result !== "string") return;

        imgValue.value = result;
        const data: UpdateImgParams = {
            id: localInfo?.userId,
            img: imgValue.value
        };
        await updateImg(data);
        location.reload();
    });
}

function getBreadcrumbCore(to: any) {
    const routes = router.getRoutes();
    let routesData: string[] = [];
    if (typeof to === "string") {
        const seachroutesData = routes.find(e => e.meta.key === to)?.path.split("/").filter(Boolean);
        if (seachroutesData) routesData = seachroutesData;
    } else {
        routesData = to.path.split("/").filter(Boolean);
    }
    breadCrumbs.value = routesData
        .map((_, index) => routes.find(item => item.path === `/${routesData.slice(0, index + 1).join("/")}`))
        .filter(Boolean);
}

function setBreadcrumb(to?: any) {
    if (!to) return;
    if (!to.meta.hidden) {
        getBreadcrumbCore(to);
        extraBreadCrumbs.value = [];
    } else if (to.meta.extendsRoute) {
        getBreadcrumbCore(to.meta.extendsRoute);
        extraBreadCrumbs.value = Array.isArray(to.meta.breadcrumbs) ? to.meta.breadcrumbs : [];
    }
}

onBeforeRouteUpdate(setBreadcrumb);
setBreadcrumb(route);

function tabBreadCrumb(e?: any) {
    if (e?.path !== route.path && e?.meta?.menuType === "menu") {
        router.push({
            path: e.path
        });
    }
}

onMounted(() => {
    getUserList();
});
</script>

<style lang="less" scoped>
.main-layout {
    padding: 8px 24px 24px;
    flex: 1;
}

.header-bar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.main-content {
    background: #fff;
    margin: 0;
    min-height: 280px;
    height: 100%;
}

.settingIcon {
    margin-right: 15px;
    cursor: pointer;
    display: none;
}

.user-name {
    cursor: pointer;
}

.avatar-wrap {
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
}

.avatar-input {
    opacity: 0;
    position: absolute;
    width: 36px;
    height: 36px;
    right: 0;
    top: 0;
    cursor: pointer;
}

.touxiang {
    margin-left: auto;
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 15px;

    img {
        cursor: pointer;
        width: 36px;
        height: 36px;
        border-radius: 50%;
    }
}

.breadCrumb {
    font-size: 16px;
    display: flex;
    justify-content: left;

    .breadCrumbItem:last-child {
        .breadCrumbItem_delimiter {
            margin: 0;
            padding: 0;
            display: none;
        }
    }

    .breadCrumbItem {
        font-size: 18px;
        color: #212121;
        margin: 20px 0;

        .breadCrumbItemLink {
            cursor: pointer;
            color: #3860f4;
        }

        .breadCrumbItem_delimiter {
            margin: 0 5px;
        }
    }
}

@media screen and (max-width: 768px) {
    .settingIcon {
        display: block !important;
    }
}
</style>
