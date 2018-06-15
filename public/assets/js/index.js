const socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

socket.on('newMessage', function(msg){
    console.log('Got new message', msg)
    $('#messages').append(
        `<li class="chat-room_chat--user-chat-1">
            <div class="d-flex chat-room__chat--user-chat-1__user">
                <span data-toggle="tooltip" data-placement="top" title="${msg.from}">
                    <img src="./assets/img/profile-default.jpg" class="m-2" alt="">
                </span>
                <div class="chat-text d-flex align-items-center align-self-center">
                        <p>${msg.text}</p>   
                </div>
            </div>
        </li>`
    )
});

socket.on('newLocationMessage', function(msg){
    $('#messages').append(
        `<li class="chat-room_chat--user-chat-1">
            <div class="d-flex chat-room__chat--user-chat-1__user">
                <span data-toggle="tooltip" data-placement="top" title="${msg.from}">
                    <img src="./assets/img/profile-default.jpg" class="m-2" alt="">
                </span>
                <div class="chat-text d-flex align-items-center align-self-center">
                    <a target="_blank" href="${msg.url}">
                        <p>my current location</p>
                    </a>   
                </div>
            </div>
        </li>`
    )
})

socket.emit('createMessage',{
    from:"vanske",
    text:"hey bro"
}, function (data){
    console.log('Got it', data);
});

$('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: "User",
        text: $('[name=message]').val()
    }, function(){

    })
})

const locationButton =  $('#send-location')
locationButton.on('click', function(){
    if (!navigator.geolocation) {
        return alert('Geolocation not suported by your browser')
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
        alert('Unable to fetch location')
    })
})




