const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const mysql_helper = require('./mysql_helper');
const webserver_helper = require('./webserver_helper');

let win = null;

global.sendLog = (log) => {
    try {
        win.webContents.send('log', log);
    } catch(err) {
        
    }
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
        mysql_helper.startServer().then(() => {
            webserver_helper.startServer().then(() => {
                console.log("http server is listening");
            }).catch(err => {
                console.log("http server start error:", err);
            });
        });
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
        await mysql_helper.killServer();
        console.log('quiting...');
        app.quit();
    }
})