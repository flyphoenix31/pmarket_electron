let connections = [];

const onConnect = (socket) => {
    console.log("socket connected");
    connections.push(socket);

    socket.on('id', ({id}) => {
        console.log('id', id);
        socket.id = id;
    })

    socket.on("disconnect", () => {
        console.log("socket disconnected");
        const index = connections.findIndex(connection => connection == socket);
        if (index >= 0) connections.splice(index, 1);
    })
};

const newMessage = (message) => {
    connections.forEach(connection => {
        if (connection.id == message.from_user || connection.id == message.to_user) {
            connection.emit("newMessage", message);
        }
    })
}

const sendConnectionState = () => {
    const connectedUsers = [];
    try {
        connections.forEach(connection => {
            if (connection.id)
                connectedUsers.push(connection.id);
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