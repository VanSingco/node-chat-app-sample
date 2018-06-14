const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('createMessage', (msg) => {
        console.log('Create Message', msg);
        io.emit('newMessage', {
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnect');
    });
});

app.get('/', (req, res) => {
    res.render('index.html')
})

server.listen(port, () => {
    console.log(`The app is running on port: ${port}`)
})

