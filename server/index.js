const express =require('express')
const http = require('http')
const socket = require('socket.io')
const router = require('./router')

/**
 * todo
 * import users.js
 * import  rooms.js
 */

const app = express()
const PORT = process.env.PORT || 8080
const httpServer = http.createServer(app)
const io = socket(httpServer)
io.on('connection', socket => {

    socket.on('join', ({ name, room, colors }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room, colors });
        if (error) return callback(error);

        socket.emit('message', { user: { name: 'admin' }, text: `Hi ${user.name}! Welcome to your new room! You can invite your friends to watch with you by sending them the link to this page.` });
        // socket.emit('message', { user: { name: 'admin' }, text: `${process.env.CLIENT}/room/${user.room}` });

        socket.broadcast.to(user.room).emit('message', { user: { name: 'admin' }, text: `${user.name} has joined` });

        if (getUsersInRoom(user.room).length > 1) {
            const otherUser = getOtherUserInRoom(room, user);
            if (otherUser) socket.to(otherUser.id).emit('getSync', { id: user.id });
        }

        socket.join(user.room);
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        callback({ id: socket.id });
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            socket.broadcast.to(user.room).emit('message', { user: { name: 'admin' }, text: `${user.name} has left` });
            socket.broadcast.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    });

    socket.on('leaveRoom', ({ room }) => {
        const user = removeUser(socket.id);
        if (user) {
            socket.broadcast.to(user.room).emit('message', { user: { name: 'admin' }, text: `${user.name} has left` });
            socket.broadcast.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
        socket.leave(room);
    });

    socket.on('checkRoomExists', ({ room }, callback) => {
        let rooms = getActiveRooms(io);
        return callback(rooms.includes(room));
    });
})

app.use(router);

httpServer.listen(PORT, () => {
    console.log('server is stated http://localhost:8080')
})