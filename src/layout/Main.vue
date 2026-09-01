<template>
    <a-layout class="main-layout">
        <header class="header-bar">
            <button type="button" class="menu-btn" aria-label="打开菜单" @click="showMenu">
                <setting-filled />
            </button>
            <nav class="breadcrumb" aria-label="面包屑">
                <template v-for="(item, index) in breadCrumbs" :key="item.path">
                    <span v-if="item?.meta" class="crumb" :class="{ 'is-link': item.meta.menuType === 'menu' }"
                        @click="tabBreadCrumb(item)">
                        {{ item.meta.label }}
                    </span>
                    <span v-if="index < breadCrumbs.length - 1 || extraBreadCrumbs.length" class="sep">/</span>
                </template>
                <template v-for="(item, index) in extraBreadCrumbs" :key="item.url || item.label">
                    <span class="crumb" :class="{ 'is-link': item.type === 'menu' }" @click="tabBreadCrumb(item)">
                        {{ item.label }}
                    </span>
                    <span v-if="index < extraBreadCrumbs.length - 1" class="sep">/</span>
                </template>
            </nav>
            <div v-if="userInfo.userName" class="user-area">
                <a-dropdown>
                    <button type="button" class="user-name">{{ userInfo.userName }}</button>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item @click="logout">退出登录</a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
                <label class="avatar" title="更换头像">
                    <img :src="imgValue" alt="头像" />
                    <input type="file" accept="image/png,image/jpg,image/jpeg,image/bmp" @change="getImg" />
                </label>
            </div>
            <div v-else class="user-area">
                <a-button type="primary" danger ghost size="small" @click="logout">重新登录</a-button>
            </div>
        </header>
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
    id: number;
    userName: string;
    img: string;
    remark: string;
}

const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpg", "image/bmp", "image/jpeg"];
const MAX_IMAGE_SIZE = 1024 * 1024 * 2;
const emits = defineEmits(["showMenu"]);
const userInfo = ref<UserInfo>({
    id: 0,
    userName: "",
    img: "",
    remark: "",
});
const localInfo = (() => {
    try {
        return JSON.parse(sessionStorage.getItem("userInfo") || "null");
    } catch {
        return null;
    }
})();
const route = useRoute();
const imgValue = ref(imgBase);
const breadCrumbs = ref<any[]>([]);
const extraBreadCrumbs = ref<GlobeBreadcrumbType[]>([]);

router.push({ path: route.fullPath });

function showMenu() {
    emits("showMenu");
}

function logout() {
    sessionStorage.clear();
    router.replace({ path: "/login" });
}

async function getUserList() {
    if (!localInfo?.userId) return;
    try {
        const res = await getUserInfo(localInfo.userId);
        if (!res?.data || Number(res.data.code) !== 200) return;
        const row = res.data.rows;
        userInfo.value = {
            id: row.id,
            userName: row.userName,
            img: row.img,
            remark: row.remark,
        };
        sessionStorage.setItem("nowTouxiang", row.img);
        imgValue.value = row.img
            ? import.meta.env.VITE_APP_BASE_URL + "headImg/" + row.img
            : imgBase;
    } catch { }
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
            img: imgValue.value,
        };
        await updateImg(data);
        location.reload();
    });
}

function getBreadcrumbCore(to: any) {
    const routes = router.getRoutes();
    let routesData: string[] = [];
    if (typeof to === "string") {
        const found = routes.find((e) => e.meta.key === to)?.path.split("/").filter(Boolean);
        if (found) routesData = found;
    } else {
        routesData = to.path.split("/").filter(Boolean);
    }
    breadCrumbs.value = routesData
        .map((_, index) => routes.find((item) => item.path === `/${routesData.slice(0, index + 1).join("/")}`))
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
        router.push({ path: e.path });
    }
}

onMounted(() => {
    getUserList();
});
</script>

<style lang="less" scoped>
.main-layout {
    --text: #1f1f1f;
    --muted: #8c8c8c;
    --line: #f0f0f0;
    --brand: #3860f4;

    flex: 1;
    min-width: 0;
    min-height: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 20px 16px;
    background: #f5f6f8;
}

.header-bar {
    flex: none;
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 56px;
    padding: 8px 0;
}

.menu-btn {
    display: none;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--text);
    font-size: 18px;
    cursor: pointer;

    &:hover {
        background: #e8e8e8;
    }
}

.breadcrumb {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px 0;
    font-size: 14px;
    line-height: 1.4;
    color: var(--muted);
}

.crumb {
    color: var(--text);
    font-weight: 500;

    &.is-link {
        color: var(--brand);
        cursor: pointer;

        &:hover {
            opacity: 0.85;
        }
    }
}

.sep {
    margin: 0 8px;
    color: #bfbfbf;
}

.user-area {
    flex: none;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;
}

.user-name {
    border: none;
    background: transparent;
    padding: 0;
    font-size: 14px;
    color: var(--text);
    cursor: pointer;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
        color: var(--brand);
    }
}

.avatar {
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid var(--line);
    background: #fff;
    flex: none;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    input {
        position: absolute;
        inset: 0;
        opacity: 0;
        cursor: pointer;
    }
}

.main-content {
    flex: 1;
    min-height: 0;
    margin: 0;
    padding: 0;
    background: #fff;
    border-radius: 12px;
    overflow: auto;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

@media screen and (max-width: 768px) {
    .main-layout {
        padding: 0 12px 12px;
    }

    .menu-btn {
        display: inline-flex;
    }

    .header-bar {
        min-height: 48px;
        gap: 8px;
    }

    .breadcrumb {
        font-size: 13px;
    }

    .user-name {
        max-width: 72px;
    }
}
</style>
