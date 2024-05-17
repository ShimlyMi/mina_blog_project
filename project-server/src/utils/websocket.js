const Websocket = require('ws');

// 生成一个 ws 服务器实例
const wss = new Websocket.WebSocketServer({
    // 端口
    port: 9898
});
// 定义 保存所有跟 socket链接的用户
const sockets = [];
// 定义一个事件，用来链接前端
wss.on('connection', (socket) => {
    // socket 用户  记录谁连接了这个服务

    // 把接入的用户记录起来
    sockets.push(socket);

    // 定义一个事件 message 前端连接后发送的消息 事件会触发
    socket.on("message", (msg) => { // 前端发送过来的消息 (ws.send)
        sockets.forEach(item => {
            if (item.readyState === 1) {
                if (item !== socket) {
                    item.send(msg)
                }
            }
        })

    })
})
