import { ref, onBeforeUnmount } from 'vue'

export function useWebSocket(url: string, options: {
    onmessage?: (msg: any) => void
} = {}) {
    const ws = ref<any>(null)
    const messages = ref<any>([])
    const status = ref('disconnected')
    let reconnectTimer: any = null

    const connect = () => {
        ws.value = new WebSocket(url)
        ws.value.onopen = () => {
            status.value = 'connected'
            console.log('WebSocket 已连接')
        }
        ws.value.onmessage = (event: any) => {
            messages.value.push(event.data)
            if (options.onmessage) {
                options.onmessage(event.data);
            }
        }

        ws.value.onclose = () => {
            status.value = 'disconnected'
            console.log('WebSocket 已关闭，准备重连…')
            reconnectTimer = setTimeout(connect, 3000)
        }

        ws.value.onerror = (err: any) => {
            console.error('WebSocket 出错:', err)
            ws.value.close()
        }
    }

    const sendMessage = (command: any) => {
        if (ws.value && command.type) {
            ws.value.send(JSON.stringify(command));
        }
    }

    const closeWS = () => {
        ws.value.close();
    }

    connect()

    onBeforeUnmount(() => {
        clearTimeout(reconnectTimer)
        ws.value?.close()
    })

    return { ws, messages, status, sendMessage, closeWS }
}