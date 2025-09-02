import { ref, onBeforeUnmount } from 'vue'

export function useWebSocket(url: string, options: any = {}) {
    const { reconnectInterval = 3000 } = options
    const ws = ref<any>(null)
    const messages = ref<any>([])
    const status = ref('disconnected')
    let reconnectTimer: any = null

    const connect = () => {
        ws.value = new WebSocket(url)

        console.log(ws.value, "opp")

        ws.value.onopen = () => {
            status.value = 'connected'
            console.log('WebSocket 已连接')
        }
        ws.value.onmessage = (event: any) => {
            messages.value.push(event.data)
        }

        ws.value.onclose = () => {
            status.value = 'disconnected'
            console.log('WebSocket 已关闭，准备重连…')
            reconnectTimer = setTimeout(connect, reconnectInterval)
        }

        ws.value.onerror = (err: any) => {
            console.error('WebSocket 出错:', err)
            ws.value.close()
        }
    }

    const sendMessage = (msg: any) => {
        if (ws.value && ws.value.readyState === WebSocket.OPEN) {
            ws.value.send(msg)
        }
    }

    connect()

    onBeforeUnmount(() => {
        clearTimeout(reconnectTimer)
        ws.value?.close()
    })

    return { ws, messages, status, sendMessage }
}