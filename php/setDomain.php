<?php

$dbhost = 'remotemysql.com';
$dbuser = 't6cw1Mvl6j';
$dbpass = 'blglGrLYku';
$database = 't6cw1Mvl6j';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass,$database, 3306);


$domain_id = $_POST['domain_id'];
$vote_up = $_POST['vote_up'];
$vote_down = $_POST['vote_down'];

$sql = "UPDATE `domain_tbl` SET `vote_down` = ".$vote_down.", `vote_up` = ".$vote_up." WHERE `id`=".$domain_id.";";

mysqli_query( $conn, $sql );

echo "success";


?>