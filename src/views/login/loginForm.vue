<template>
    <a-form class="login-form" :rules="rules" :model="formState" name="login" layout="vertical" autocomplete="off"
        @finish="onFinish">
        <a-form-item name="username">
            <a-input v-model:value="formState.username" size="large" placeholder="账号" :disabled="loading" allow-clear />
        </a-form-item>
        <a-form-item name="password">
            <a-input-password v-model:value="formState.password" size="large" placeholder="密码" :disabled="loading" />
        </a-form-item>
        <a-form-item class="submit-item">
            <a-button type="primary" size="large" html-type="submit" block :loading="loading">
                登录
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { login } from "@/api/login";
import { useLoginTransitionStore } from "@/stores/loginTransition";
import MD5 from "crypto-js/md5";

interface FormState {
    username: string;
    password: string;
}

interface LoginUser {
    id: number;
    img?: string;
    level: number;
    paperList?: number[];
    userName?: string;
    remark?: string;
    token: string;
}

const router = useRouter();
const loginTransition = useLoginTransitionStore();
const loading = ref(false);
const formState = reactive<FormState>({
    username: "admin",
    password: "123",
});
const rules = {
    username: [{ required: true, message: "请输入账号！" }],
    password: [{ required: true, message: "请输入密码！" }],
};

function pickUser(payload: any): LoginUser | null {
    const candidates = [payload?.rows, payload?.data, payload];
    for (const user of candidates) {
        if (user && typeof user === "object" && user.id != null && typeof user.token === "string" && user.token) {
            return user as LoginUser;
        }
    }
    return null;
}

function saveSession(user: LoginUser) {
    sessionStorage.setItem(
        "userInfo",
        JSON.stringify({
            userId: user.id,
            level: user.level,
            userName: user.userName ?? "",
            remark: user.remark ?? "",
            paperList: user.paperList ?? [],
        })
    );
    sessionStorage.setItem("token", user.token);
    sessionStorage.setItem("nowTouxiang", user.img || "xxx");
}

async function onFinish(values: FormState) {
    loading.value = true;
    try {
        const res = await login({
            account: values.username,
            password: MD5(values.password).toString(),
        });
        const payload = res?.data;
        if (payload?.code != null && Number(payload.code) !== 200) {
            message.error(payload.msg || "登录失败");
            return;
        }
        const user = pickUser(payload);
        if (!user) {
            message.error("登录失败：未返回用户信息或 token");
            return;
        }
        saveSession(user);
        loginTransition.show();
        message.success(payload?.msg || "登录成功");
        await router.push("/");
    } finally {
        loading.value = false;
    }
}
</script>

<style lang="less" scoped>
.login-form {
    :deep(.ant-form-item) {
        margin-bottom: 18px;
    }

    .submit-item {
        margin-bottom: 0;
        margin-top: 8px;
    }
}
</style>
