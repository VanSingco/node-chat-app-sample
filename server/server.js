const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage',generateMessage('Admin', 'Welcome to chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user join'));

    socket.on('createMessage', (msg, callback) => {
        console.log('Create Message', msg);
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback('this is from server.');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude))
    })

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

