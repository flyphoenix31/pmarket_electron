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

const jobMessage = (message) => {
    console.log("=============jobMessage:", message);
    console.log("===========connections", connections);
    connections.forEach(connection => {
        connection.emit("jobMessage", message);
    })
    // connections.forEach(connection => {
    //     if (connection.userId == message.from_user || connection.userId == message.to_user) {
    //         connection.emit("jobMessage", message);
    //     }
    // })
}

const sendConnectionState = () => {
    const connectedUsers = [];
    try {
        connections.forEach(connection => {
            if (connection.userId) {
                if (connectedUsers.findIndex(item => item == connection.userId) < 0)
                    connectedUsers.push(connection.userId);
            }
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

const sendEventsToUsers = (userIds, {event, data}) => {
    userIds.forEach(userId => {
        connections.forEach(connection => {
            if (connection.userId == userId) {
                connection.emit(event, data);
            }
        })
    })
}

const sendNotification = (userIds, notification) => {
    sendEventsToUsers(userIds, {event: 'notification', data: notification})
}

const sendNewUserEvent = (user) => {
    connections.forEach(connection => {
        connection.emit('newUser', user);
    })
}

setInterval(sendConnectionState, 5000);

module.exports = {
    connections,
    onConnect,
    newMessage,
    jobMessage,
    sendNotification,
    sendNewUserEvent,
    sendEventsToUsers
}