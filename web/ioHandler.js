global.connections = [];
let connections = [];
const onConnect = (socket) => {
    console.log("socket connected");
    global.connections.push(socket);

    socket.on('userInfo', (data) => {
        console.log('userInfo', data);
        socket.userInfo = data;
        socket.userId = data.id;
    })

    socket.on("disconnect", () => {
        console.log("socket disconnected");
        const index = global.connections.findIndex(connection => connection == socket);
        if (index >= 0) global.connections.splice(index, 1);
    })
};

const newMessage = (message) => {
    global.connections.forEach(connection => {
        if (connection.userId == message.from_user || connection.userId == message.to_user) {
            connection.emit("newMessage", message);
        }
    })
}

// const jobMessage = (message) => {
//     console.log("=============jobMessage:", message);
//     console.log("===========connections", global.connections);
//     global.connections.forEach(connection => {
//         connection.emit("jobMessage", message);
//     })
//     global.connections.forEach(connection => {
//         if (connection.userId == message.from_user || connection.userId == message.to_user) {
//             connection.emit("jobMessage", message);
//         }
//     })
// }

const sendConnectionState = () => {
    const connectedUsers = [];
    try {
        global.connections.forEach(connection => {
            if (connection.userId) {
                if (connectedUsers.findIndex(item => item == connection.userId) < 0)
                    connectedUsers.push(connection.userId);
            }
        })
    } catch(err) {
    }
    try {
        global.connections.forEach(connection => {
            connection.emit('connectionState', connectedUsers);
        })
    } catch(err) {

    }
}

const sendEventsToUsers = (userIds, {event, data}) => {
    userIds.forEach(userId => {
        global.connections.forEach(connection => {
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
    global.connections.forEach(connection => {
        connection.emit('newUser', user);
    })
}

setInterval(sendConnectionState, 5000);

connections = global.connections;

module.exports = {
    connections,
    onConnect,
    newMessage,
    // jobMessage,
    sendNotification,
    sendNewUserEvent,
    sendEventsToUsers
}