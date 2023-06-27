// window.versions.onLog((event, value) => {
//     console.log("main logg ==>", value);
// })

function mysqlActionEnable(enabled) {
    if (enabled) {
        $("#mysql_start").removeClass("disabled");
        $("#mysql_stop").removeClass("disabled");
    } else {
        $("#mysql_start").addClass("disabled");
        $("#mysql_stop").addClass("disabled");
    }
}
function isMysqlActionEnabled() {
    return !$("#mysql_start").hasClass("disabled");
}
function mysqlStartShow(flag) {
    if (flag) {
        $("#mysql_start").removeClass("d-none");
        $("#mysql_stop").addClass("d-none");
    } else {
        $("#mysql_start").addClass("d-none");
        $("#mysql_stop").removeClass("d-none");
    }
}

function webserverActionEnable(enabled) {
    if (enabled) {
        $("#webserver_start").removeClass("disabled");
        $("#webserver_stop").removeClass("disabled");
    } else {
        $("#webserver_start").addClass("disabled");
        $("#webserver_stop").addClass("disabled");
    }
    $("#webserver_port").prop("readonly", !enabled || $("#webserver_start").hasClass("d-none"));
}
function isWebserverActionEnabled() {
    return !$("#webserver_start").hasClass("disabled");
}
function webserverStartShow(flag) {
    if (flag) {
        $("#webserver_start").removeClass("d-none");
        $("#webserver_stop").addClass("d-none");
    } else {
        $("#webserver_start").addClass("d-none");
        $("#webserver_stop").removeClass("d-none");
    }
    $("#webserver_port").prop("readonly", !isWebserverActionEnabled() || !flag);
}

$(document).ready(function () {
    $("#mysql_start").click(() => {
        $("#mysql_status").html("Mysql starting...");
        mysqlActionEnable(false);
        window.versions.sendEvent({ type: 'mysqlStart' });
    });
    $("#mysql_stop").click(() => {
        $("#mysql_status").html("Mysql stopping...");
        mysqlActionEnable(false);
        window.versions.sendEvent({ type: 'mysqlStop' });
    })

    $("#webserver_start").click(() => {
        $("#webserver_status").html("Web server starting...");
        webserverActionEnable(false);
        window.versions.sendEvent({ type: 'webserverStart', data: {port: Number($("#webserver_port").val())}});
    })
    $("#webserver_stop").click(() => {
        $("#webserver_status").html("Web server stopping...");
        webserverActionEnable(false);
        window.versions.sendEvent({ type: "webserverStop" });
    })
    $("#hkcu_checkbox").change(function() {
        window.versions.sendEvent({ type: "hkcu_status", data: this.checked});
    });
});

const winEventHandler = {
    mysql_started: (data) => {
        $("#mysql_status").html("Mysql is running");
        mysqlActionEnable(true);
        mysqlStartShow(false);
    },
    mysql_stopped: (data) => {
        $("#mysql_status").html("Mysql stopped");
        mysqlActionEnable(true);
        mysqlStartShow(true);
    },
    mysql_status: (data) => {
        if (isMysqlActionEnabled()) {
            if (!data) {
                $("#mysql_status").html("Mysql stopped");
                mysqlStartShow(true);
            } else {
                $("#mysql_status").html("Mysql is running");
                mysqlStartShow(false);
            }
        }
    },
    webserver_started: (data) => {
        $("#webserver_status").html("Web server is running");
        webserverActionEnable(true);
        webserverStartShow(false);
    },
    webserver_stopped: (data) => {
        $("#webserver_status").html("Web server stopped");
        webserverActionEnable(true);
        webserverStartShow(true);
    },
    webserver_error: (data) => {
        $("#webserver_status").html(data);
        webserverActionEnable(true);
        webserverStartShow(true);
    },
    hkcu_status: (data) => {
        $("#hkcu_checkbox").prop('checked', data);
    }
}

window.versions.onEvent((e, event) => {
    if (winEventHandler[event.type]) {
        winEventHandler[event.type](event.data);
    }
});