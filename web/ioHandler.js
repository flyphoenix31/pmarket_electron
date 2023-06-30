let connections = [];

const onConnect = (socket) => {
    console.log("socket connected");
    connections.push(socket);

    socket.on('id', ({id}) => {
        console.log('id', id);
        socket.userId = id;
    })

    socket.on("disconnect", () => {
        console.log("socket disconnected");
        const index = connections.findIndex(connection => connection == socket);
        if (index >= 0) connections.splice(index, 1);
    })
};

const newMessage = (message) => {
    connections.forEach(connection => {
        if (connection.userId == message.from_user || connection.userId == message.to_user) {
            connection.emit("newMessage", message);
        }
    })
}

const sendConnectionState = () => {
    const connectedUsers = [];
    try {
        connections.forEach(connection => {
            if (connection.userId)
                connectedUsers.push(connection.userId);
        })
    } catch(err) {
    }
    try {
        connections.forEach(connection => {
            connection.emit('connectionState', connectedUsers);
        })
    } catch(err) {

    }
}

setInterval(sendConnectionState, 5000);

module.exports = {
    connections,
    onConnect,
    newMessage
}