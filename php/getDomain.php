<?php

$dbhost = 'remotemysql.com';
$dbuser = 't6cw1Mvl6j';
$dbpass = 'blglGrLYku';
$database = 't6cw1Mvl6j';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass,$database, 3306);

/// get Post Data

$domain = $_POST['domain'];
//$domain = 'translate.google.com';

//// find domain from domain table

$sql = "SELECT * FROM `domain_tbl` WHERE `domain`='".$domain."';";
$row = mysqli_query( $conn, $sql );

if(mysqli_num_rows($row) == 0){
	$sql_tmp = "INSERT INTO `domain_tbl` (`id`, `domain`, `vote_up`, `vote_down`) VALUES (NULL,'".$domain."',0,0);";
	mysqli_query($conn, $sql_tmp);
	$sql_tmp = "SELECT * FROM `domain_tbl` WHERE `domain`='".$domain."';";
	$row = mysqli_query($conn, $sql_tmp);
}

echo json_encode(mysqli_fetch_array($row, MYSQLI_ASSOC));

?>