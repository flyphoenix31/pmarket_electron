const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const cors = require('cors');
const passport = require('./web/utils/passport');

const router = require('./web/routes');
const ioHandler = require('./web/ioHandler');

const express_app = express();
const httpServer = http.createServer(express_app);
const io = require('socket.io')(httpServer, {
    transports: ["websocket"]
});

express_app.use(fileUpload());
express_app.use(bodyParser.json());
express_app.use(bodyParser.urlencoded({ extended: true }));
express_app.use(cors());
express_app.use(express.static(path.resolve(__dirname, 'web/client')));
express_app.use('/', router);
io.on('connection', ioHandler.onConnect);

httpServer.on("error", (err) => {
    httpServer.error = err;
    global.sendEvent({type: 'webserver_error', data: '' + err});
})

exports.startServer = (port = 80) => {
    console.log(port);
    return new Promise((resolve, reject) => {
        httpServer.error = null;
        httpServer.listen(port);
        const checkConnection = (() => {
            if (httpServer.listening) {
                resolve();
                return;
            }
            if (httpServer.error) {
                reject(httpServer.error);
                return;
            }
            setTimeout(checkConnection, 1000);
        })
        checkConnection();
    })
}

exports.killServer = () => {
    return new Promise((resolve, reject) => {
        httpServer.close();
        const checkConnection = (() => {
            if (!httpServer.listening) {
                resolve();
                return;
            }
            setTimeout(checkConnection, 1000);
        })
        checkConnection();
    })
}