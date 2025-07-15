<template>
    <a-form :rules="rules" :model="formState" name="basic" :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }"
        autocomplete="off" @finish="onFinish">
        <a-form-item label name="username">
            <a-input :disabled="flag" v-model:value="formState.username" placeholder="账号" />
        </a-form-item>
        <a-form-item label name="password">
            <a-input-password :disabled="flag" v-model:value="formState.password" placeholder="密码" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 0, span: 24 }">
            <a-button :loading="flag" type="primary" size="large" html-type="submit" block>登录</a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { login, type LoginParams } from "@/api/login";
import md5 from "js-md5";
import { useCounterStore } from "@/stores/counter";

interface FormState {
    username: string;
    password: string;
}

const counterStore = useCounterStore();
const flag = ref(false);
const formState = reactive<FormState>({
    username: "admin",
    password: "123",
});
const rules = {
    username: [{ required: true, message: "请输入账号！" }],
    password: [{ required: true, message: "请输入密码！" }]
};
const router = useRouter();

async function onFinish(values: FormState) {
    flag.value = true;
    const data: LoginParams = {
        account: values.username,
        password: md5(values.password)
    };
    try {
        const res = await login(data);
        if (res.data && res.data.code == 200) {
            flag.value = false;
            const userInfo = {
                userId: res.data.rows.id,
                level: res.data.rows.level,
            };
            window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
            window.sessionStorage.setItem("token", res.data.rows.token);
            if (res.data.rows.img) {
                window.sessionStorage.setItem("nowTouxiang", res.data.rows.img);
            } else {
                window.sessionStorage.setItem("nowTouxiang", "xxx");
            }
            router.push({ path: "/" });
            message.success(res.data.msg);
            counterStore.updateFlag(true);
        } else {
            flag.value = false;
            message.error(res.data.msg);
        }
    } catch (_) {
        flag.value = false;
    }
}

</script>

<style lang="less" scoped></style>