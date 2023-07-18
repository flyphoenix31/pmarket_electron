const { app, BrowserWindow, ipcMain, Tray, Menu, Notification } = require('electron');
const path = require('path');
const schedule = require('node-schedule');
const mysql_helper = require('./mysql_helper');
const webserver_helper = require('./webserver_helper');
const hkcu_helper = require('./hkcu_helper');
const watch_helper = require('./watch_helper');

let win = null;
let tray = null;
let isAppQuiting = false;

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

const isAutoStart = () => {
    if (process.argv.findIndex((val, index) => val ==="auto") >= 0) {
        return true;
    }
    return false;
}

const createWindow = () => {
    win = new BrowserWindow({
        width: 530,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    if (isAutoStart()) win.hide();

    // win.hide();
    win.removeMenu();

    win.loadFile('win/index.html')
    // win.webContents.openDevTools();

    win.webContents.on('dom-ready', () => {
        hkcu_helper.isSet().then(isSet => {
            global.sendEvent({ type: 'hkcu_status', data: isSet });
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
    win.on('close', function (evt) {
        if (!isAppQuiting) {
            evt.preventDefault();
            win.hide();
        }
    });
}

const createTray = () => {
    tray = new Tray(path.join(__dirname, 'favicon.ico'));
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Open', type: 'normal', click: () => { win.show(); } },
        { type: 'separator' },
        { label: 'Exit', type: 'normal', click: async () => { console.log('quiting...'); await mysql_helper.killServer(); app.quit(); } }
    ])
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)
    tray.on('double-click', () => {
        if (!win.isVisible()) {
            win.show();
        } else {
            win.hide();
        }
    });
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (event, argv, workingDirectory) => {
        win.show();
    });

    app.whenReady().then(() => {
        if (isAutoStart()) {
            const NOTIFICATION_TITLE = 'PMARKET'
            const NOTIFICATION_BODY = 'Auto Started'

            new Notification({
                title: NOTIFICATION_TITLE,
                body: NOTIFICATION_BODY
            }).show();
        }
        createWindow();
        createTray();
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
                createTray();
            }
        })

        hkcu_helper.isSet().then(isSet => {
            console.log(isSet);
            if (isSet)
                hkcu_helper.set();
        }).catch(err => {
            console.log(err);
        })
        watch_helper.start();
    })

    app.on('window-all-closed', async () => {
        // if (process.platform !== 'darwin') {
        //     await mysql_helper.killServer();
        //     console.log('quiting...');
        //     app.quit();
        // }
    });
    app.on('before-quit', async function (evt) {
        isAppQuiting = true;
    });
}

schedule.scheduleJob("* */6 * * *", () => {
    mysql_helper.backup();
});

// mysql_helper.killServer();