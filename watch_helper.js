const si = require('systeminformation');
const interval = 2000;

const start = () => {
    Promise.all([
        si.networkStats("Ethernet"),
        si.currentLoad(),
        si.mem()
    ]).then(([[network], cpu, memory]) => {
        global.sendEvent({
            type: 'system_info',
            data: {
                cpu: cpu,
                memory: memory,
                network: network
            }
        });
        // console.log("cpu: ", cpu.currentLoad);
        // console.log("memory: ", memory.active);
        // console.log("network-send: ", network.tx_sec);
        // console.log("network-receive: ", network.rx_sec);
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        setTimeout(start, interval);
    })
}

module.exports = { start };