import { io } from 'socket.io-client'

export function initSocket() {
  const socket = io({
    path: '/socket.io',
    transports: ['websocket', 'polling'],
  })

  socket.on('connect', () => {
    console.log('Socket connected')
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected')
  })

  return socket
}
