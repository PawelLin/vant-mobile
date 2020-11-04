const server = require('http').createServer()
const io = require('socket.io')(server)
io.on('connection', client => {
    client.on('setData', data => {
        io.sockets.emit('sendData', data)
    })
})
server.listen(3000, '192.168.191.7')
