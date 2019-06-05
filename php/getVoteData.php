<?php

$dbhost = 'remotemysql.com';
$dbuser = 't6cw1Mvl6j';
$dbpass = 'blglGrLYku';
$database = 't6cw1Mvl6j';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass,$database, 3306);

$domain_id = $_POST['domain'];
$user_id = $_POST['user'];



$sql = "SELECT * FROM `vote_tbl` WHERE `domain_id`=".$domain_id." and `user_id`=".$user_id.";";
$row = mysqli_query( $conn, $sql );

if(mysqli_num_rows($row) == 0){
	$sql_tmp = "INSERT INTO `vote_tbl` (`id`, `domain_id`, `user_id`, `vote`) VALUES (NULL,".$domain_id.", ".$user_id.", 0);";
	mysqli_query($conn, $sql_tmp);
	$sql_tmp = "SELECT * FROM `vote_tbl` WHERE `domain_id`=".$domain_id." and `user_id`=".$user_id.";";
	$row = mysqli_query($conn, $sql_tmp);
}

echo json_encode(mysqli_fetch_array($row,MYSQLI_ASSOC));

?>