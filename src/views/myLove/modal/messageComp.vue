<template>
  <div class="container-message" id="messageCompBox">
    <template v-if="message.length">
      <div class="box-item" v-for="(item, index) in message" :key="`message_${index}`">
        <div :class="['message-item', item.role === 'assistant' ? 'message-item--assistant' : 'message-item--user']"
          v-if="item.role === 'assistant' || item.content">
          <div class="message-item__avatar" v-if="item.role === 'assistant'">
            <img style="width: 100%;height:100%;" src="@/assets/images/love/deepseek/ai.png" />
          </div>
          <div v-else></div>
          <div
            :class="['message-item__content', item.role === 'assistant' ? 'message-item__content--left' : 'message-item__content--right']">
            <div class="message-item__text">
              <Markdown v-loading :source="item.content || '思考中...'" />
            </div>
          </div>
          <div class="message-item__avatar" v-if="item.role !== 'assistant'">
            <img style="width: 100%;height:100%;" src="@/assets/images/love/deepseek/user.png" />
          </div>
          <div v-else></div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="empty-box">
        <el-empty description="暂无对话信息"></el-empty>
      </div>
    </template>
  </div>
</template>

<script setup>
import { nextTick } from 'vue';
import Markdown from "vue3-markdown-it";

const props = defineProps({
  message: {
    type: Array,
    default: () => [],
  },
});

const scrollBottom = () => {
  nextTick(() => {
    const div = document.getElementById("messageCompBox");
    div.scrollTop = div.scrollHeight - div.clientHeight;
  });
};

defineExpose({
  scrollBottom
});
</script>

<style scoped lang="less">
.container-message {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.empty-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-item {
  margin-bottom: 12px;
  margin-right: 12px;
}

.message-item {
  display: grid;
  column-gap: 8px;

  &--user {
    grid-template-columns: 0% auto 40px;
    justify-content: end;
  }

  &--assistant {
    grid-template-columns: 40px auto 1%;
    justify-content: start;
  }

  &__avatar {
    width: 36px;
    height: 36px;
    background-color: #121212;
    border: 2px solid #fe2c55;
    padding: 4px;
  }

  &__content {
    background-color: #2f2f2f;
    position: relative;
    border-radius: 8px;

    &--left::before,
    &--right::before {
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      border: 5px solid transparent;
      top: 15px;
    }

    &--left::before {
      border-right-color: #2f2f2f;
      left: -9px;
    }

    &--right::before {
      border-left-color: #2f2f2f;
      right: -9px;
    }
  }

  &__text {
    padding: 0rem 12px;
    color: #fff;
    position: relative;
    font-size: 0.875rem;
    line-height: 1.4;

    :deep(h1) {
      color: #fff;
    }

    :deep(h2) {
      color: #fff;
    }

    :deep(h3) {
      color: #fff;
    }

    :deep(h4) {
      color: #fff;
    }

    :deep(h5) {
      color: #fff;
    }

    :deep(ul) {
      margin-left: 24px;
    }

    :deep(ol) {
      margin-left: 24px;
    }

    :deep(p) {
      margin: 0.5rem 0;
    }

    :deep(pre) {
      margin: 0.5rem 0;
      font-size: 0.8125rem;
      max-width: 100%;
      overflow-x: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    :deep(code) {
      font-size: 0.8125rem;
      max-width: 100%;
      overflow-x: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
}

.message-item__avatar {
  border-radius: 50%;
}
</style>
