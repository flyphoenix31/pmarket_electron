const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const mysql_helper = require('./mysql_helper');
const webserver_helper = require('./webserver_helper');
const hkcu_helper = require('./hkcu_helper');

let win = null;

ipcMain.handle('ping', () => __dirname);
ipcMain.handle('event', (e, event) => {
    console.log(event);
    if (global.winEventHandler[event.type]) {
        return global.winEventHandler[event.type](event.data);
    }
    return null;
});

global.winEventHandler = {
    mysqlStart: () => {
        mysql_helper.startServer().then(() => {
            global.sendEvent({
                type: 'mysql_started'
            })
        });
    },
    mysqlStop: () => {
        mysql_helper.killServer().then(() => {
            global.sendEvent({
                type: 'mysql_stopped'
            })
        });
    },
    webserverStart: (data) => {
        webserver_helper.startServer(data.port).then(() => {
            console.log("webserver started");
            global.sendEvent({
                type: 'webserver_started'
            })
        }).catch(err => {
            console.log("webserver error:", err);
            global.sendEvent({
                type: 'webserver_error',
                data: '' + err
            })
        });
    },
    webserverStop: () => {
        webserver_helper.killServer().then(() => {
            global.sendEvent({
                type: 'webserver_stopped'
            })
        })
    },
    hkcu_status: (data) => {
        if (data) {
            hkcu_helper.set();
        } else {
            hkcu_helper.remove();
        }
    }
};

global.sendEvent = (event) => {
    try {
        win.webContents.send('event', event);
    } catch (err) {
        console.log(err);
    }
}

global.sendLog = (log) => {
    try {
        win.webContents.send('log', log);
    } catch (err) {

    }
}

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.removeMenu();

    win.loadFile('win/index.html')
    win.webContents.openDevTools();

    win.webContents.on('dom-ready', () => {
        hkcu_helper.isSet().then(isSet => {
            global.sendEvent({type: 'hkcu_status', data: isSet});
        }).catch(err => {
            console.log(err);
        })
    })

    win.webContents.on('did-finish-load', () => {
        // mysql_helper.startServer().then(() => {
        //     webserver_helper.startServer().then(() => {
        //         console.log("http server is listening");
        //     }).catch(err => {
        //         console.log("http server start error:", err);
        //     });
        // });
    });
}

app.whenReady().then(() => {
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

hkcu_helper.isSet().then(isSet => {
    console.log(isSet);
    if (isSet) {
        hkcu_helper.set();
    }
}).catch(err => {
    console.log(err);
})

// mysql_helper.killServer();