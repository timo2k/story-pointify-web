let webSocket: WebSocket | null = null;

export const setWebSocket = (newWebSocket: WebSocket) => {
  webSocket = newWebSocket
}

export const getWebSocket = () => {
  return webSocket
}