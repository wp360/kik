module.exports = function(io){
    io.on('connection',(socket) => {
        socket.on('joinRequest',(myRequest,callback) => {
            socket.join(myRequest.sender);
            callback();
        })
    });
}