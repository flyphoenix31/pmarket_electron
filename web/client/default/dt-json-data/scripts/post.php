<?php

/*
 * DataTables example server-side processing script.
 *
 * Please note that this script is intentionally extremely simply to show how
 * server-side processing can be implemented, and probably shouldn't be used as
 * the basis for a large complex system. It is suitable for simple use cases as
 * for learning.
 *
 * See http://datatables.net/usage/server-side for full details on the server-
 * side processing requirements of DataTables.
 *
 * @license MIT - http://datatables.net/license_mit
 */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Easy set variables
 */

// DB table to use
$table = 'main_table';

// Table's primary key
$primaryKey = 'id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array( 'db' => 'first_name', 'dt' => 'first_name' ),
    array( 'db' => 'last_name',  'dt' => 'last_name' ),
    array( 'db' => 'position',   'dt' => 'position' ),
    array( 'db' => 'office',     'dt' => 'office' ),
    array(
        'db'        => 'start_date',
        'dt'        => 'start_date',
        'formatter' => function( $d, $row ) {
            return date( 'jS M y', strtotime($d));
        }
    ),
    array(
        'db'        => 'salary',
        'dt'        => 'salary',
        'formatter' => function( $d, $row ) {
            return '$'.number_format($d);
        }
    )
);

$sql_details = array(
    'user' => 'phoenixc_admindb',
    'pass' => 'admin123',
    'db'   => 'phoenixc_admin-demo-data',
    'host' => '103.232.125.45'
);


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */
require( 'ssp.class.php' );

// Validate the JSONP to make use it is an okay Javascript function to execute
// $jsonp = preg_match('/^[$A-Z_][0-9A-Z_$]*$/i', $_GET['callback']) ?
//     $_GET['callback'] :
//     false;

// if ( $jsonp ) {
//     echo $jsonp.'('.json_encode(
//         SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
//     ).');';
// }

echo json_encode(
           SSP::simple( $_POST, $sql_details, $table, $primaryKey, $columns)
       );

