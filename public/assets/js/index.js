const socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    socket.emit('createEmail', {
        to: "sheena@mail.com",
        text: "hi van"
    });

    socket.emit('createMessage', {
        from: "sheena",
        text: "hello van"
    })
});

socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

socket.on('newMessage', function(msg){
    console.log('Got new message', msg)
});


