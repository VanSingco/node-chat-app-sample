const socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

socket.on('newMessage', function(msg){
    const formattedTime = moment(msg.createdAt).format('h:mm a');
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        from: msg.from,
        text: msg.text,
        createdAt: formattedTime
    });
    $('#messages').append(html);
});

socket.on('newLocationMessage', function(msg){
    const formattedTime = moment(msg.createdAt).format('h:mm a');
    const template = $('#messageLocation-template').html();
    const html = Mustache.render(template, {
        from: msg.from,
        url: msg.url,
        createdAt: formattedTime
    })
    $('#messages').append(html)
})

socket.emit('createMessage',{
    from:"vanske",
    text:"hey bro"
}, function (data){
    console.log('Got it', data);
});
const messageTextBox = $('[name=message]');

$('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: "User",
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val('');
    })
})

const locationButton =  $('#send-location')
locationButton.on('click', function(){
    if (!navigator.geolocation) {
        return alert('Geolocation not suported by your browser')
    }

    locationButton.attr('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
         locationButton.removeAttr('disabled');
        alert('Unable to fetch location')
    })
})




