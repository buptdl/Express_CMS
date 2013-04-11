<?php
	session_start();
	$obj=new stdClass;
	$obj->user=$_SESSION['user'];
	$obj->userId=$_SESSION['userId'];
	$obj->authority=$_SESSION['authority'];
	echo json_encode($obj);
?>