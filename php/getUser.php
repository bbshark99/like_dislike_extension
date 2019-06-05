<?php

$dbhost = 'remotemysql.com';
$dbuser = 't6cw1Mvl6j';
$dbpass = 'blglGrLYku';
$database = 't6cw1Mvl6j';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass,$database, 3306);

/// get Post Data

$user = $_POST['user'];
//$user = "192.168.0.106";
//// find user from user table

$sql = "SELECT * FROM `user_tbl` WHERE `ip_address`='".$user."';";
$row = mysqli_query( $conn, $sql );

if(mysqli_num_rows($row) == 0){
	$sql_tmp = "INSERT INTO `user_tbl` (`id`, `ip_address`) VALUES (NULL,'".$user."');";
	mysqli_query($conn, $sql_tmp);
	$sql_tmp = "SELECT * FROM `user_tbl` WHERE `ip_address`='".$user."';";
	$row = mysqli_query($conn, $sql_tmp);
}

echo json_encode(mysqli_fetch_array($row, MYSQLI_ASSOC));


?>