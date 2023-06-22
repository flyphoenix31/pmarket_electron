const { app, BrowserWindow, ipcMain } = require('electron');
const express = require('express');
const http = require('http');
const express_app = express();
const httpServer = http.createServer(express_app);
const io = require('socket.io')(httpServer);
const path = require('path');

const router = require('./web/routes');
const ioHandler = require('./web/ioHandler');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadFile('index.html')
  }

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong');
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', async () => {
    if (process.platform !== 'darwin') {
        new Promise(resolve => {
            child_process.exec(`\"${__dirname}\\mysql\\server\\bin\\mysqladmin.exe\" -u root -p --password=\"123456789\" shutdown`, () => {
                resolve();
            })
        });
        app.quit();
    }
})

var child_process = require('child_process');
var mysql_process = child_process.exec(`\"${__dirname}\\mysql\\server\\bin\\mysqld.exe\" --defaults-file=\"${__dirname}\\mysql\\data\\my.ini\"`, (error, stdout, stderr) => {
    console.log("error:", error);
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
});

// mysql_process.on("spawn", () => console.log("spawn"));
// mysql_process.on("close", (number, signal) => console.log("close:", number, signal));
// mysql_process.on("disconnect", () => console.log("disconnect"));
// mysql_process.on("error", (err) => console.log("error:", err));
// mysql_process.on("exit", (number, signal) => console.log("exit:", number, signal));
// mysql_process.on("message", (message) => console.log("message:", message));

express_app.use(express.static('web/client'));
express_app.use('/', router);
// express_app.get('/', (req, res) => res.send('asdfasdf'));
io.on('connection', ioHandler);

httpServer.listen(9000, () => {
    console.log('server is listening on port 9000');
})