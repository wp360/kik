$(document).ready(function(){
    var socket = io();

    var room = $('#groupName').val();
    var sender = $('#sender').val();

    socket.on('connect',function(){
        var params = {
            sender: sender
        }

        socket.emit('joinRequest',params,function(){
            console.log('已加');
        })
    })
});