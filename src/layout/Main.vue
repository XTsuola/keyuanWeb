<template>
    <a-layout style="padding: 8px 24px 24px;flex: 1">
        <div style="display: flex;justify-content: flex-start;align-items: center;">
            <div class="settingIcon" @click="showMenu">
                <setting-filled />
            </div>
            <div class="flex breadCrumb">
                <div class="breadCrumbItem" v-for="(item, index) in breadCrumbs">
                    <span v-if="item && item.meta" @click="tabBreadCrumb(item)"
                        :class="{ breadCrumbItemLink: item.meta.menuType === 'menu' }">{{ item.meta.label }}</span>
                    <span class="breadCrumbItem_delimiter">></span>
                </div>
                <div class="breadCrumbItem" v-for="(item, index) in extraBreadCrumbs">
                    <span @click="tabBreadCrumb(item)" :class="{ breadCrumbItemLink: item.type === 'menu' }">{{
                        item.label
                    }}</span>
                    <span class="breadCrumbItem_delimiter">></span>
                </div>
            </div>

            <div class="touxiang">
                <a-dropdown>
                    <div style="cursor: pointer;">{{ userInfo.userName }}</div>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <a href="javascript:;" @click="logout">退出登录</a>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
                <div style="position: relative;width: 36px; height: 36px; border-radius: 50%; overflow: hidden;">
                    <img :src="imgValue" />
                    <input style="opacity: 0;position: absolute;width: 36px;height: 36px;right: 0;top: 0;" type="file"
                        @input="getImg" />
                </div>
            </div>
        </div>
        <a-layout-content :style="{ background: '#fff', margin: 0, minHeight: '280px', height: '100%' }">
            <RouterView />
        </a-layout-content>
    </a-layout>
</template>

<script lang="ts" setup>
import { SettingFilled } from "@ant-design/icons-vue"
import { onMounted, ref } from "vue"
import { onBeforeRouteUpdate, useRoute, type RouteLocationNormalized, type RouteRecordNormalized } from "vue-router"
import router from "@/router"
import imgBase from "@/assets/images/lanlingwang.jpg"
import { getUserInfo, updateImg } from "@/api/team"
import type { Breadcrumb as GlobeBreadcrumbType } from "@/utils/global"

interface UserInfo {
    id: number
    userName: string
    img: string
    remark: string
}

const emits = defineEmits(["showMenu"])
const userInfo = ref<UserInfo>({
    id: 0,
    userName: "",
    img: "",
    remark: ""
})
const localrInfo = JSON.parse(window.sessionStorage.getItem("userInfo") as string)
const route = useRoute()
const imgValue = ref<string>("")
const breadCrumbs = ref<(RouteRecordNormalized | undefined)[]>([]);
const extraBreadCrumbs = ref<GlobeBreadcrumbType[]>([])

router.push({
    path: route.fullPath
})

function showMenu() {
    emits("showMenu")
}

function logout() {
    sessionStorage.clear()
    router.replace({
        path: "/login"
    })
}

async function getUserList() {
    const data = {
        _id: localrInfo?._id
    }
    const res = await getUserInfo(data)
    if (res.data.code == 200) {
        const row = res.data.rows
        userInfo.value = {
            id: row.id,
            userName: row.userName,
            img: row.img,
            remark: row.remark
        }
        if (row.img) {
            imgValue.value = import.meta.env.VITE_APP_BASE_URL + "headImg/" + row.img
        } else {
            imgValue.value = imgBase
        }
    }
}

function getImg(e: Event) {
    const target = e.target as any
    if (target) {
        const reader = new FileReader()
        reader.readAsDataURL(target.files[0])
        reader.addEventListener("load", async (e) => {
            if (e.target && typeof e.target.result === "string") {
                imgValue.value = e.target.result
                let data = {
                    id: localrInfo?.userId,
                    img: imgValue.value
                }
                await updateImg(data)
            }
        })
    }
}

function setBreadcrumb(to?: RouteLocationNormalized, from?: RouteLocationNormalized) {
    const getBreadcrumbCore = (to: RouteLocationNormalized | string) => {
        const routes = router.getRoutes();
        let routesData: string[] = []
        if (typeof to === "string") {
            const seachroutesData = routes.find(e => e.meta.key === to)?.path.split("/").filter(e => e);
            if (seachroutesData) routesData = seachroutesData
        } else {
            routesData = to.path.split("/").filter(e => e);
        }
        breadCrumbs.value = routesData.map((_, index) => {
            return routes.find(item => item.path === `/${routesData.filter((_, i) => i <= index).join("/")}`)
        }).filter(e => e)
    }
    if (to && !to.meta.hidden) {
        getBreadcrumbCore(to)
        extraBreadCrumbs.value = []
    } else if (to && to.meta.hidden && to.meta.extendsRoute) {
        getBreadcrumbCore(to.meta.extendsRoute)
        if (Array.isArray(to.meta.breadcrumbs)) {
            extraBreadCrumbs.value = to.meta.breadcrumbs
        }
    }


}
onBeforeRouteUpdate(setBreadcrumb);
setBreadcrumb(route)

function tabBreadCrumb(e?: (RouteRecordNormalized | any)) {
    if (e.path !== route.path && e.meta.menuType === "menu") {
        router.push({
            path: e.path
        })
    }
}

onMounted(() => {
    getUserList()
})

</script>

<style lang="less" scoped>
.settingIcon {
    margin-right: 15px;
    cursor: pointer;
    display: none;
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
    /*     .sider {
        border: 1px solid #000;
        height: 100%;
        position: absolute;
        background: #000;
        z-index: 888;

        .closeMenu {
            width: 20px;
            height: 36px;
            border: 2px solid #000;
            border-radius: 2px;
            transform: translateX(50%);
            display: block !important;
            z-index: 888;
            background: #fff;
        }
    } */

    .settingIcon {
        display: block !important;
    }
}
</style>