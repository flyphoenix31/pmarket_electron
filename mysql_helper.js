const si = require('systeminformation');
var child_process = require('child_process');
const ps = require('ps-node');
const fs = require('fs');

const initIniFile = (/*{ port = 33061 }*/) => {
    const port = 33061
    const initContent =
        `[client]
port=${port}
[mysql]
no-beep
[mysqld]
explicit_defaults_for_timestamp = 1
port=${port}
datadir="${__dirname}\\mysql\\data\\Data"
default-storage-engine=INNODB
sql-mode="ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"
log-output=FILE
general-log=0
general_log_file="DESKTOP-7QD7IA6.log"
slow-query-log=1
slow_query_log_file="DESKTOP-7QD7IA6-slow.log"
long_query_time=10
log-error="DESKTOP-7QD7IA6.err"
server-id=1
lower_case_table_names=1
secure-file-priv="${__dirname}\\mysql\\data\\Uploads"
max_connections=151
table_open_cache=2000
tmp_table_size=141M
myisam_max_sort_file_size=2146435072
myisam_sort_buffer_size=271M
key_buffer_size=8M
read_buffer_size=128K
read_rnd_buffer_size=256K
innodb_flush_log_at_trx_commit=1
innodb_log_buffer_size=16M
innodb_buffer_pool_size=128M
innodb_log_file_size=48M
innodb_thread_concurrency=17
innodb_autoextend_increment=64
innodb_buffer_pool_instances=8
innodb_concurrency_tickets=5000
innodb_old_blocks_time=1000
innodb_stats_on_metadata=0
innodb_file_per_table=1
innodb_checksum_algorithm=0
flush_time=0
join_buffer_size=256K
max_allowed_packet=4M
max_connect_errors=100
open_files_limit=4161
sort_buffer_size=256K
binlog_row_event_max_size=8K
sync_master_info=10000
sync_relay_log=10000
sync_relay_log_info=10000`;
    return new Promise(resolve => {
        fs.writeFile(`${__dirname}/mysql/data/pmarket.ini`, initContent, (err) => {
            console.log(err);
            resolve({ err });
        })
    })
}

const killServer = () => {
    return new Promise(resolve => {
        si.processes().then(data => {
            const index = data.list.findIndex(item => item.name == 'pmarket_mysqld.exe');
            if (index < 1) {
                throw('process not found');
            }
            console.log("index: ", index, "pid: ", data.list[index].pid)
            // ps.kill(data.list[index].pid, {
            //     signal: 'SIGKILL',
            //     timeout: 3,  // will set up a ten seconds timeout if the killing is not successful
            // }, function (err) {
            //     if (err) {
            //         console.log(err);
            //     }
            //     else {
            //         console.log('Process %s has been killed!', pid);
            //     }
            //     resolve();
            // });
            child_process.exec(`taskkill /f /pid ${data.list[index].pid}`, (error, stdout, stderr) => {
                console.log('mysql killed');
                resolve();
            });
        }).catch(err => {
            console.log(err);
            resolve();
        })
    });
}

const startServer = () => {
    return new Promise(resolve => {
        killServer().then(() => {
            initIniFile().then(() => {
                let isResolved = false;
                const cmd = `\"${__dirname}\\mysql\\server\\bin\\pmarket_mysqld.exe\" --defaults-file=\"${__dirname}\\mysql\\data\\pmarket.ini\"`;
                global.sendLog(`starting server: ${cmd}`);
                const process = child_process.exec(cmd, (error, stdout, stderr) => {
                    console.log("error:", error);
                    console.log("stdout:", stdout);
                    console.log("stderr:", stderr);
                    if (!isResolved) {
                        isResolved = true;
                        resolve();
                    }
                });

                process.on("spawn", () => {
                    console.log('spawn');
                    if (!isResolved) {
                        isResolved = true;
                        resolve();
                    }
                });
                // mysql_process.on("close", (number, signal) => console.log("close:", number, signal));
                // mysql_process.on("disconnect", () => console.log("disconnect"));
                // mysql_process.on("error", (err) => console.log("error:", err));
                // mysql_process.on("exit", (number, signal) => console.log("exit:", number, signal));
                // mysql_process.on("message", (message) => console.log("message:", message));
            })
        })
    })
}

module.exports = {
    initIniFile,
    startServer,
    killServer
};