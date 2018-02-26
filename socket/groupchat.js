module.exports = function(io,Users){

    const users = new Users();

    io.on('connection',(socket) => {
        console.log('服务端：用户已连接');

        socket.on('join',(params,callback)=>{
            socket.join(params.room);

            users.AddUserData(socket.id,params.name,params.room);
            // console.log(users);
            io.to(params.room).emit('usersList',users.GetUsersList(params.room));

            callback();
        })

        socket.on('createMessage',(message,callback) => {
            // console.log(message);
            io.to(message.room).emit('newMessage',{
                text: message.text,
                room: message.room,
                from: message.sender
            });
            callback();
        });

        socket.on('disconnect',()=>{
            var user = users.RemoveUser(socket.id);
            if(user){
                io.to(user.room).emit('usersList',users.GetUsersList(user.room));
            }
        })
    });
}