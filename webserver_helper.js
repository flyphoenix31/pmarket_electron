const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const cors = require('cors');
const passport = require('./web/utils/passport');

const router = require('./web/routes');
const ioHandler = require('./web/ioHandler');

const express_app = express();
const httpServer = http.createServer(express_app);
const io = require('socket.io')(httpServer);

express_app.use(bodyParser.json());
express_app.use(bodyParser.urlencoded({ extended: true }));
express_app.use(cors());
express_app.use(express.static(path.resolve(__dirname, 'web/client')));
express_app.use('/', router);
io.on('connection', ioHandler);

httpServer.on("error", (err) => {
    httpServer.error = err;
})

exports.startServer = () => {
    return new Promise((resolve, reject) => {
        httpServer.error = null;
        httpServer.listen(80);
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