const express =require('express')
const http = require('http')
const socket = require('socket.io')
const router = require('./router')
const app = express()
const PORT = process.env.PORT || 8080
const httpServer = http.createServer(app)
const io = socket(httpServer)
let count = 0
io.on('connection', socket => {
    count++
    console.log(`a user ${count} connected`)
})

app.use(router);

httpServer.listen(PORT, () => {
    console.log('server is stated http://localhost:8080')
})