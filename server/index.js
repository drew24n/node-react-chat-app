const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
app.use(cors())
app.use(router)

const server = http.createServer(app)
const io = socketio(server)

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')

io.on('connection', socket => {
    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room})
        if (error) return callback(error)

        socket.join(user.room)

        socket.emit('message', {user: 'system message', message: `${user.name}, welcome to room ${user.room}`})
        socket.broadcast.to(user.room).emit('message', {
            user: 'system message',
            message: `user ${user.name} has joined the room`
        })

        io.to(user.room).emit('roomInfo', {room: user.room, users: getUsersInRoom(user.room)})

        console.log(`${user.name} has joined room ${user.room}`)
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        if (user) io.to(user.room).emit('message', {user: user.name, message: message})

        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', {user: 'system message', message: `${user.name} has left the room`})
            io.to(user.room).emit('roomInfo', {room: user.room, users: getUsersInRoom(user.room)})
            console.log(`${user.name} has left room ${user.room}`)
        }
    })
})

server.listen(PORT, () => console.log(`server is running on port ${PORT}`))
