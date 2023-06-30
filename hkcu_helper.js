const regedit = require('regedit');
const path = require('path');
const hkcu_path = 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run';
const hkcu_key = 'pmarket_electron';
// const command = `start ${path.join(__dirname, '..\\..\\pmarket-electron.exe')}`;
const command = `"${path.join(__dirname, '..\\..\\pmarket-electron.exe')}" auto`;

exports.set = () => {
    return new Promise((resolve, reject) => {
        regedit.putValue({
            [hkcu_path]: {
                [hkcu_key]: {
                    value: command,
                    type: 'REG_SZ'
                }
            }
        }, err => {
            if (err) {
                console.log(err)
            } else {
                console.log("hkcu set");
            }
            resolve();
        })
    })
}

exports.remove = () => {
    return new Promise((resolve, reject) => {
        regedit.deleteValue(`${hkcu_path}\\${hkcu_key}`, (err) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve();
        })
        // regedit.putValue({
        //     [hkcu_path]: {
        //         [hkcu_key]: {
        //             value: null,
        //             type: "REG_SZ"
        //         }
        //     }
        // }, err => {
        //     if (err) {
        //         console.log("asdfasdfasdf", err);
        //     } else {
        //         console.log("hkcu removed");
        //     }
        //     resolve();
        // });
        // regedit.deleteKey([`${hkcu_path}\\${hkcu_key}`], (err) => {
        //     if (err) {
        //         console.log("asdfasdfasdf", err);
        //     } else {
        //         console.log("hkcu removed");
        //     }
        //     resolve();
        // })
    })
}

exports.isSet = () => {
    return new Promise((resolve, reject) => {
        regedit.list([hkcu_path], (err, result) => {
            if (err) {
                console.log("error: ", err);
                return reject(err);
            }
            if (result[hkcu_path].exists) {
                if (Object.keys(result[hkcu_path].values).findIndex(key => key == hkcu_key) >= 0) {
                    return resolve(true);
                }
            }
            return resolve(false);
        })
    })
}