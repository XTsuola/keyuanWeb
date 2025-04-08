<template>
    <div class="main">
        <div class="page">
            <div class="tips">
                <div class="title">星塔智能AI</div>
                <div class="desc">
                    本网站采用本地缓存模式运行，不会留存任何涉及您个人的信息数据，请放心使用。
                </div>
            </div>
            <div class="grid-space-between" :class="!isMobile ? 'grid-box' : ''">
                <div class="left-container" v-if="!isMobile">
                    <a-button class="add-btn" size="large" @click="handleAddSession">
                        <template #icon>
                            <plus-outlined />
                        </template>
                        新建对话
                    </a-button>
                    <div class="session-area">
                        <div class="session-item" :class="activeIndex == index ? 'session-item-active' : ''"
                            v-for="(item, index) in sessionList" :key="index" @click="handleChangeSessionIndex(index)">
                            <span :class="activeIndex == index ? 'active-node' : 'normal-node'"
                                v-if="editIndex != index">{{ item.title
                                }}</span>
                            <a-input :ref="`renameRef_${index}`" autofocus v-model:value="item.title" v-else
                                size="small" style="width: 120px" @blur="editIndex = -1" />
                            <div class="icon-box">
                                <clear-outlined class="icon" @click.stop="handleClearSession(index)" />
                                <edit-outlined class="icon" @click.stop="handleFocusInput(index)" />
                                <delete-outlined class="icon" @click.stop="handleDeleteSession(index)" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="message-area">
                        <MessageComp ref="messageRef" :message="queryInfos.messages" :loading="loading"></MessageComp>
                    </div>
                    <div class="user-tokens" :class="isMobile ? 'left-space' : ''">
                        <span v-if="queryInfos.model == 'deepseek-chat'">
                            当前余额为：￥{{ totalAmt || 0 }}
                        </span>
                        <span v-else>免费</span>
                    </div>
                    <div class="input-area" :class="isMobile ? 'left-space' : ''">
                        <a-input v-model:value="queryKeys" id="keyInput" placeholder="请输入内容" show-word-limit
                            @keydown.enter.native="(e) => {
                                if (e.isComposing || loading) return;
                                handleRequest();
                            }" autoComplete="off" />
                        <a-button class="send_btn" type="primary" @click="handleRequest" :disabled="!queryKeys"
                            :loading="loading" :class="queryKeys ? 'classA' : ''">
                            <send-outlined />
                        </a-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick, createVNode, watch, onMounted } from "vue";
import { PlusOutlined, DeleteOutlined, EditOutlined, ClearOutlined, ExclamationCircleOutlined, SendOutlined } from '@ant-design/icons-vue';
import OpenAI from "openai";
import { API_CONFIG as DEEPSEEK_CONFIG, MODEL_CONFIG, STORAGE_KEYS } from '@/api/deepseek';
import { message, Modal } from "ant-design-vue";
import { getTokens } from "@/api/deepseek.js";
import MessageComp from "./modal/messageComp.vue";

const queryInfos = ref<any>({
    messages: [],
    model: 'deepseek-chat',
    ...MODEL_CONFIG
});
const sessionList = ref<any>([]);
const activeIndex = ref(-1);
const editIndex = ref(-1);
const totalAmt = ref(0);
const queryKeys = ref<any>("");
const openai = ref<any>(null);
const loading = ref(false);
const messageRef = ref<any>(null);

const currentConfig = ref<any>(DEEPSEEK_CONFIG);


function handleAddSession() {
    if (loading.value) {
        message.warning("请当前问题查询完成后重试！")
        return;
    }
    sessionList.value.push({
        title: `对话${sessionList.value.length + 1}`,
        crtTime: new Date(),
        messages: [],
    });
    queryInfos.value.messages = [];
    activeIndex.value = sessionList.value.length - 1;
};


async function handleChangeSessionIndex(index: number) {
    if (loading.value) {
        message.warning("请当前问题查询完成后重试！")
        return;
    }
    activeIndex.value = index;
    queryInfos.value.messages = sessionList.value[activeIndex.value]?.messages || [];
    await nextTick()
    messageRef.value.scrollBottom();
};

function handleClearSession(index: number) {
    sessionList.value[index].messages = [];
    queryInfos.value.messages = sessionList.value[index].messages;
    activeIndex.value = index;
};

function handleFocusInput(index: number) {
    editIndex.value = index;
};

function handleDeleteSession(index = 0) {
    Modal.confirm({
        title: '确认删除当前对话？',
        centered: true,
        onOk() {
            sessionList.value.splice(index, 1);
            if (index == activeIndex.value) {
                activeIndex.value = sessionList.value[index] ? index : --index;
            } else if (index < activeIndex.value) {
                activeIndex.value = --activeIndex.value;
            }
            queryInfos.value.messages = activeIndex.value > -1 ? sessionList.value[activeIndex.value].messages : [];
            handleChangeSessionIndex(activeIndex.value);
        },
        onCancel() { }
    });
};

async function initToken() {
    const res = await getTokens({
        deepseek: "Y",
        gptToken: DEEPSEEK_CONFIG.apiKey,
    });
    const { balance_infos = [] }: any = res.data;
    balance_infos.forEach((o: any) => {
        totalAmt.value += Number(o.total_balance);
    });
};

function initOpenAI() {
    openai.value = new OpenAI({
        ...currentConfig.value
    });
};

async function handleRequest() {
    if (!queryKeys.value) return;
    if (!openai.value) initOpenAI();
    if (!sessionList.value.length) {
        await handleAddSession();
    }

    queryInfos.value.messages.push({
        role: "user",
        content: queryKeys.value,
        name: '小智'
    });
    queryKeys.value = null;
    messageRef.value.scrollBottom();

    try {
        loading.value = true;
        queryInfos.value.messages.push({ role: "assistant", content: "" });
        const requestConfig = {
            ...queryInfos.value,
            stream: true
        };
        const response = await openai.value.chat.completions.create(requestConfig);
        for await (const part of response) {
            queryInfos.value.messages[queryInfos.value.messages.length - 1].content += part.choices[0].delta.content;
        }
        messageRef.value.scrollBottom();
        sessionList.value[activeIndex.value].messages = queryInfos.value.messages;
        loading.value = false;
    } catch (error: any) {
        loading.value = false;
        queryInfos.value.messages[queryInfos.value.messages.length - 1].content = error.message;
    }
};

function initIndex() {
    const listLen = JSON.parse(localStorage.getItem(STORAGE_KEYS.sessionList) || "[]").length;
    const lastIndex = JSON.parse(localStorage.getItem(STORAGE_KEYS.activeIndex) || "-1");
    if (listLen) {
        activeIndex.value = lastIndex || 0;
    } else {
        activeIndex.value = -1;
    }
    if (activeIndex.value != -1) {
        queryInfos.value.messages = sessionList.value[activeIndex.value].messages || [];
    }
};

function initSessionList() {
    sessionList.value = JSON.parse(localStorage.getItem(STORAGE_KEYS.sessionList) || "[]");
};


// 监听数据变化
watch(sessionList, (val) => {
    const list = val.map((o: any, i: any) => ({
        ...o,
        messages: i === activeIndex.value ? queryInfos.value.messages : o.messages
    }));
    localStorage.setItem(STORAGE_KEYS.sessionList, JSON.stringify(list));
}, { deep: true });

watch(activeIndex, (val) => {
    localStorage.setItem(STORAGE_KEYS.activeIndex, JSON.stringify(val));
}, { deep: true });

onMounted(async () => {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);

    initSessionList();
    initIndex();
    initToken();
    initOpenAI();
    await nextTick()
    messageRef.value.scrollBottom();
});

</script>

<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000;

    .add-btn {
        width: 100%;
        font-size: 15px;
        font-weight: bold;
        border-radius: 8px;
        background: #fe2c55;
        border-color: #fe2c55 !important;
        color: #fff;
        opacity: 0.9;

        &:hover,
        &:focus {
            background-color: #fe2c55 !important;
            border-color: #fe2c55 !important;
        }

        &:hover {
            opacity: 1;
        }
    }

    .page {
        width: 94%;
        height: 94%;
        background: #1f1f1f;
        box-shadow: 0 0 20px rgba(254, 44, 85, 0.15);
        box-sizing: border-box;
        border-radius: 12px;
        overflow: hidden;

        .tips {
            width: 100%;
            height: 40px;
            background: linear-gradient(90deg, #fe2c55, #ff4d4d);
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 16px;
            box-sizing: border-box;

            .title {
                font-size: 18px;
                font-weight: bold;
            }

            .desc {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.9);
            }
        }
    }

    .grid-box {
        display: grid;
        grid-template-columns: 280px auto;
        gap: 16px;
        padding: 16px;
    }

    .grid-space-between {
        width: 100%;
        height: calc(100% - 40px);
    }

    .left-container {
        background-color: #2f2f2f;
        padding: 16px;
        border-radius: 8px;
        height: calc(95vh - 180px);

        .session-area {
            margin-top: 16px;
            height: calc(100% - 56px);
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 4px;
            }

            &::-webkit-scrollbar-thumb {
                background: rgba(254, 44, 85, 0.3);
                border-radius: 2px;
            }

            .session-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 12px;
                margin-bottom: 8px;
                border-radius: 6px;
                background: rgba(31, 31, 31, 0.6);
                color: #fff;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover {
                    background: rgba(254, 44, 85, 0.1);

                    .icon-box {
                        opacity: 1;
                    }
                }

                &.session-item-active {
                    background: rgba(254, 44, 85, 0.2);
                    border: 1px solid rgba(254, 44, 85, 0.3);
                }

                .normal-node {
                    color: rgba(255, 255, 255, 0.8);
                }

                .active-node {
                    color: #fff;
                    font-weight: bold;
                }

                .icon-box {
                    display: flex;
                    gap: 8px;
                    opacity: 0;
                    transition: opacity 0.3s ease;

                    .icon {
                        font-size: 16px;
                        cursor: pointer;
                        transition: all 0.3s ease;

                        &:hover {
                            transform: scale(1.2);
                            color: #fe2c55 !important;
                        }
                    }
                }
            }
        }
    }

    .container {
        width: 100%;
        height: 100%;
        background: #1f1f1f;
        border-radius: 8px;
        padding: 16px;
        box-sizing: border-box;
        overflow: auto;

        .message-area {
            height: calc(100% - 45px - 36px);
            width: 100%;
            padding: 8px 8px 4px 8px;
            margin-bottom: 10px;

            ::-webkit-scrollbar {
                width: 4px;
            }

            ::-webkit-scrollbar-track {
                background-color: #1f1f1f;
            }

            ::-webkit-scrollbar-thumb {
                background: rgba(254, 44, 85, 0.3);
                border-radius: 2px;
            }
        }

        .user-tokens {
            height: 30px;
            line-height: 30px;
            padding: 0 8px 0 0;
            font-size: 14px;
            color: #c7c8ca;
            user-select: none;
        }

        .left-space {
            margin-left: 8px;
        }

        .input-area {
            height: 36px;
            display: grid;
            grid-template-columns: auto 120px 0px;
            grid-gap: 10px;
            box-sizing: border-box;
            padding: 0 8px 8px 0;

            .send_btn {
                width: 80px;
                height: 40px;
                border-radius: 8px;
                background: #fe2c55;
                border-color: #fe2c55 !important;
                color: #ffffff;
                opacity: 0.5;

                &:hover,
                &:focus {
                    background-color: #fe2c55 !important;
                    border-color: #fe2c55 !important;
                }
            }

            .classA {
                opacity: 1;
            }
        }
    }

    // 输入框样式
    :deep(.ant-input) {
        height: 40px;
        line-height: 40px;
        background-color: #1f1f1f;
        border: 1px solid #fe2c55;
        box-shadow: 0 0 8px rgba(254, 44, 85, 0.3);
        border-radius: 8px;
        padding: 0 12px;
        transition: all 0.3s ease;
        color: #ffffff;

        &:hover,
        &.is-focus {
            border-color: #fe2c55;
            box-shadow: 0 0 12px rgba(254, 44, 85, 0.5);
        }

        .ant-input__inner {
            height: 40px;
            line-height: 40px;
            color: #fff;
            font-size: 14px;

            &::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }
        }
    }
}
</style>