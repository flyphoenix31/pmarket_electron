'use strict';
$(document).ready(function() {

    $(window).on('resize', function() {
        dashboardEcharts();
    });

    $(window).on('load', function() {
        dashboardEcharts();
    });


    $("a[data-toggle=\"tab\"]").on("shown.bs.tab", function(e) {
        dashboardEcharts();
    });

    //line chart
    function dashboardEcharts() {
        /*line chart*/
        var myChart = echarts.init(document.getElementById('main'));
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    var date = new Date(params.value[0]);
                    var data = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
                    return data + '<br/>' + params.value[1] + ', ' + params.value[2];
                },
                responsive: true
            },
            dataZoom: {
                show: true,
                start: 70
            },
            legend: {
                data: ['Profit']
            },
            grid: {
                y2: 80
            },
            xAxis: [{
                type: 'time',
                splitNumber: 10
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: 'Profit',
                type: 'line',
                showAllSymbol: true,
                symbolSize: function(value) {
                    return Math.round(value[2] / 10) + 2;
                },
                data: (function() {
                    var d = [];
                    var len = 0;
                    var now = new Date();
                    var value;
                    while (len++ < 200) {
                        d.push([
                            new Date(2014, 9, 1, 0, len * 10000),
                            (Math.random() * 30).toFixed(2) - 0,
                            (Math.random() * 100).toFixed(2) - 0
                        ]);
                    }
                    return d;
                })()
            }]
        };
        myChart.setOption(option);
    }


    //for responsive all datatable
    $(".theme-loader").animate({
        opacity: "0"
    },1000);
    setTimeout(function() {
        $(".theme-loader").remove();
    }, 1000);
    $('#simpletable').DataTable({
        "paging": true,
        "ordering": true,
        "bLengthChange": true,
        "info": true,
        "searching": true
    });
    //
    // $("a[data-toggle=\"tab\"]").on("shown.bs.tab", function(e) {
    //     $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    // });

    //    Edit information of user-profile
    $('#edit-cancel').on('click', function() {

        var c = $('#edit-btn').find("i");
        c.removeClass('icofont-close');
        c.addClass('icofont-edit');
        $('.view-info').show();
        $('.edit-info').hide();

    });

    $('.edit-info').hide();


    $('#edit-btn').on('click', function() {
        var b = $(this).find("i");
        var edit_class = b.attr('class');
        if (edit_class == 'icofont icofont-edit') {
            b.removeClass('icofont-edit');
            b.addClass('icofont-close');
            $('.view-info').hide();
            $('.edit-info').show();
        } else {
            b.removeClass('icofont-close');
            b.addClass('icofont-edit');
            $('.view-info').show();
            $('.edit-info').hide();
        }
    });

    //check editor js
    CKEDITOR.replace('description', {
        // Define the toolbar: http://docs.ckeditor.com/#!/guide/dev_toolbar
        // The standard preset from CDN which we used as a base provides more features than we need.
        // Also by default it comes with a 2-line toolbar. Here we put all buttons in a single row.
        toolbar: [{
            name: 'clipboard',
            items: ['Undo', 'Redo']
        }, {
            name: 'styles',
            items: ['Styles', 'Format']
        }, {
            name: 'basicstyles',
            items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat']
        }, {
            name: 'paragraph',
            items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']
        }, {
            name: 'links',
            items: ['Link', 'Unlink']
        }, {
            name: 'insert',
            items: ['Image', 'EmbedSemantic', 'Table']
        }, {
            name: 'tools',
            items: ['Maximize']
        }, {
            name: 'editing',
            items: ['Scayt']
        }],

        // Since we define all configuration options here, let's instruct CKEditor to not load config.js which it does by default.
        // One HTTP request less will result in a faster startup time.
        // For more information check http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-customConfig
        customConfig: '',

        // Enabling extra plugins, available in the standard-all preset: http://ckeditor.com/presets-all
        extraPlugins: 'autoembed,embedsemantic,image2,uploadimage,uploadfile',
        imageUploadUrl: '/uploader/upload.php?type=Images',
        uploadUrl: '/uploader/upload.php',
        /*********************** File management support ***********************/
        // In order to turn on support for file uploads, CKEditor has to be configured to use some server side
        // solution with file upload/management capabilities, like for example CKFinder.
        // For more information see http://docs.ckeditor.com/#!/guide/dev_ckfinder_integration

        // Uncomment and correct these lines after you setup your local CKFinder instance.
        // filebrowserBrowseUrl: 'http://example.com/ckfinder/ckfinder.html',
        // filebrowserUploadUrl: 'http://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
        /*********************** File management support ***********************/

        // Remove the default image plugin because image2, which offers captions for images, was enabled above.
        removePlugins: 'image',

        // Make the editing area bigger than default.
        height: 400,


        // This is optional, but will let us define multiple different styles for multiple editors using the same CSS file.
        bodyClass: 'article-editor',

        // Reduce the list of block elements listed in the Format dropdown to the most commonly used.
        format_tags: 'p;h1;h2;h3;pre',

        // Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
        removeDialogTabs: 'image:advanced;link:advanced',

        // Define the list of styles which should be available in the Styles dropdown list.
        // If the "class" attribute is used to style an element, make sure to define the style for the class in "mystyles.css"
        // (and on your website so that it rendered in the same way).
        // Note: by default CKEditor looks for styles.js file. Defining stylesSet inline (as below) stops CKEditor from loading
        // that file, which means one HTTP request less (and a faster startup).
        // For more information see http://docs.ckeditor.com/#!/guide/dev_styles
        stylesSet: [
            /* Inline Styles */
            {
                name: 'Marker',
                element: 'span',
                attributes: {
                    'class': 'marker'
                }
            }, {
                name: 'Cited Work',
                element: 'cite'
            }, {
                name: 'Inline Quotation',
                element: 'q'
            },

            /* Object Styles */
            {
                name: 'Special Container',
                element: 'div',
                styles: {
                    padding: '5px 10px',
                    background: '#eee',
                    border: '1px solid #ccc'
                }
            }, {
                name: 'Compact table',
                element: 'table',
                attributes: {
                    cellpadding: '5',
                    cellspacing: '0',
                    border: '1',
                    bordercolor: '#ccc'
                },
                styles: {
                    'border-collapse': 'collapse'
                }
            }, {
                name: 'Borderless Table',
                element: 'table',
                styles: {
                    'border-style': 'hidden',
                    'background-color': '#E6E6FA'
                }
            }, {
                name: 'Square Bulleted List',
                element: 'ul',
                styles: {
                    'list-style-type': 'square'
                }
            },
            // Media embed
            {
                name: '240p',
                type: 'widget',
                widget: 'embedSemantic',
                attributes: {
                    'class': 'embed-240p'
                }
            }, {
                name: '360p',
                type: 'widget',
                widget: 'embedSemantic',
                attributes: {
                    'class': 'embed-360p'
                }
            }, {
                name: '480p',
                type: 'widget',
                widget: 'embedSemantic',
                attributes: {
                    'class': 'embed-480p'
                }
            }, {
                name: '720p',
                type: 'widget',
                widget: 'embedSemantic',
                attributes: {
                    'class': 'embed-720p'
                }
            }, {
                name: '1080p',
                type: 'widget',
                widget: 'embedSemantic',
                attributes: {
                    'class': 'embed-1080p'
                }
            }
        ]
    });

    //edit user description
    $('#edit-cancel-btn').on('click', function() {

        var c = $('#edit-info-btn').find("i");
        c.removeClass('icofont-close');
        c.addClass('icofont-edit');
        $('.view-desc').show();
        $('.edit-desc').hide();

    });

    $('.edit-desc').hide();


    $('#edit-info-btn').on('click', function() {
        var b = $(this).find("i");
        var edit_class = b.attr('class');
        if (edit_class == 'icofont icofont-edit') {
            b.removeClass('icofont-edit');
            b.addClass('icofont-close');
            $('.view-desc').hide();
            $('.edit-desc').show();
        } else {
            b.removeClass('icofont-close');
            b.addClass('icofont-edit');
            $('.view-desc').show();
            $('.edit-desc').hide();
        }
    });

    // Mini-color js start
    $('.demo').each(function() {
        $(this).minicolors({
            control: $(this).attr('data-control') || 'hue',
            defaultValue: $(this).attr('data-defaultValue') || '',
            format: $(this).attr('data-format') || 'hex',
            keywords: $(this).attr('data-keywords') || '',
            inline: $(this).attr('data-inline') === 'true',
            letterCase: $(this).attr('data-letterCase') || 'lowercase',
            opacity: $(this).attr('data-opacity'),
            position: $(this).attr('data-position') || 'bottom left',
            swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
            change: function(value, opacity) {
                if (!value) return;
                if (opacity) value += ', ' + opacity;
                if (typeof console === 'object') {
                    console.log(value);
                }
            },
            theme: 'bootstrap'
        });

    });
    // Mini-color js ends
});
