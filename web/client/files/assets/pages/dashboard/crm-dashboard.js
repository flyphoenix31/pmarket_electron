'use strict';
$(document).ready(function() {
    var map;
    map = new GMaps({
        el: '#markers-map',
        lat: 21.2334329,
        lng: 72.866472,
        scrollwheel: false
    });

    map.addMarker({
        lat: 21.2334329,
        lng: 72.866472,
        title: 'Marker with InfoWindow',
        infoWindow: {
            content: '<p>codedthemes<br/> Buy Now at <a href="">Themeforest</a></p>'
        }
    });

    // pageview and prod sale end
    floatchart()
    $(window).on('resize', function() {
        floatchart();
    });
    $('#mobile-collapse').on('click', function() {
        setTimeout(function() {
            floatchart();
        }, 700);
    });

});

function floatchart() {
    //flot options
    var options = {
        legend: {
            show: false
        },
        series: {
            label: "",
            curvedLines: {
                active: true,
                nrSplinePoints: 20
            },
        },
        tooltip: {
            show: true,
            content: "x : %x | y : %y"
        },
        grid: {
            hoverable: true,
            borderWidth: 0,
            labelMargin: 0,
            axisMargin: 0,
            minBorderMargin: 0,
        },
        yaxis: {
            min: 0,
            max: 30,
            color: 'transparent',
            font: {
                size: 0,
            }
        },
        xaxis: {
            color: 'transparent',
            font: {
                size: 0,
            }
        }
    };
    // sale Income start
    $.plot($("#sal-income"), [{
        data: [
            [0, 25],
            [1, 15],
            [2, 20],
            [3, 27],
            [4, 10],
            [5, 20],
            [6, 10],
            [7, 26],
            [8, 20],
            [9, 10],
            [10, 25],
            [11, 27],
            [12, 12],
            [13, 26],
        ],
        color: "#42a5f5",
        lines: {
            show: true,
            fill: true,
            lineWidth: 3
        },
        points: {
            show: false,
        },
        curvedLines: {
            apply: true,
        }
    }], options);
    $.plot($("#rent-income"), [{
        data: [
            [0, 25],
            [1, 15],
            [2, 25],
            [3, 27],
            [4, 10],
            [5, 20],
            [6, 15],
            [7, 26],
            [8, 20],
            [9, 13],
            [10, 25],
            [11, 27],
            [12, 12],
            [13, 1],
        ],
        color: "#66bb6a",
        lines: {
            show: true,
            fill: true,
            lineWidth: 3
        },
        points: {
            show: false,
        },
        curvedLines: {
            apply: true,
        }
    }], options);
    $.plot($("#income-analysis"), [{
        data: [
            [0, 25],
            [1, 30],
            [2, 25],
            [3, 27],
            [4, 10],
            [5, 20],
            [6, 15],
            [7, 26],
            [8, 10],
            [9, 13],
            [10, 25],
            [11, 27],
            [12, 12],
            [13, 27],
        ],
        color: "#e53935",
        lines: {
            show: true,
            fill: true,
            lineWidth: 3
        },
        points: {
            show: false,
        },
        curvedLines: {
            apply: true,
        }
    }], options);
}
