const si = require('systeminformation');
const { app, BrowserWindow, ipcMain } = require('electron');
const express = require('express');
const http = require('http');
const express_app = express();
const httpServer = http.createServer(express_app);
const io = require('socket.io')(httpServer);
const path = require('path');
const child_process = require('child_process');

const mysql_helper = require('./mysql_helper');

const router = require('./web/routes');
const ioHandler = require('./web/ioHandler');

let win = null;

global.sendLog = (log) => {
    win.webContents.send('log', log);
}

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
    win.webContents.openDevTools();
    win.webContents.on('did-finish-load', () => {
        console.log(123123123123123);
        // sendLog("Hello");
        mysql_helper.startServer();
    });
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => __dirname);
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', async () => {
    if (process.platform !== 'darwin') {
        // await new Promise(resolve => {
        //     child_process.exec(`\"${__dirname}\\mysql\\server\\bin\\mysqladmin.exe\" -u root -p --password=\"123456789\" shutdown`, () => {
        //         resolve();
        //     })
        // });
        await mysql_helper.killServer();
        console.log('quiting...');
        app.quit();
    }
})

express_app.use(express.static('web/client'));
express_app.use('/', router);
// express_app.get('/', (req, res) => res.send('asdfasdf'));
io.on('connection', ioHandler);

httpServer.listen(9000, () => {
    console.log('server is listening on port 9000');
})

// si.processes().then(data => {
//     // console.log(Object.keys(data));
//     // console.log(data.list[0]);
// })
// si.networkStats("pmarket_mysqld.exe").then(data => console.log("data:", data));

console.log(path.resolve(__dirname, '..\\client\\index.html'));