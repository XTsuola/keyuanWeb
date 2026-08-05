<template>
    <div class="login-page">
        <div class="login-card">
            <h1 class="login-title">综合管理系统</h1>
            <LoginForm />
        </div>
        <a class="beian" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
            备案号：苏ICP备2022024858号-1
        </a>
    </div>
</template>

<script lang="ts" setup>
import LoginForm from "./loginForm.vue";
</script>

<style lang="less" scoped>
.login-page {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    padding: 24px 16px 56px;
    box-sizing: border-box;
    background: #f7f8fa;
}

.login-card {
    width: 100%;
    max-width: 420px;
    padding: 36px 32px 28px;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
}

.login-title {
    margin: 0 0 28px;
    font-size: 28px;
    font-weight: 800;
    line-height: 1.3;
    text-align: center;
    color: #1f1f1f;
}

.beian {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    color: #8c8c8c;
    font-size: 12px;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
        color: #595959;
    }
}

@media screen and (max-width: 480px) {
    .login-card {
        padding: 28px 20px 22px;
        border: none;
        box-shadow: none;
        background: transparent;
    }

    .login-title {
        font-size: 24px;
    }
}
</style>
