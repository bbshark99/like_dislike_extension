<?php

$dbhost = 'remotemysql.com';
$dbuser = 't6cw1Mvl6j';
$dbpass = 'blglGrLYku';
$database = 't6cw1Mvl6j';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass,$database, 3306);

$vote_id = $_POST['vote_id'];
$vote = $_POST['vote'];

$sql = "UPDATE `vote_tbl` SET `vote`=".$vote." WHERE `id`=".$vote_id.";";
mysqli_query( $conn, $sql );
echo "success";

?>