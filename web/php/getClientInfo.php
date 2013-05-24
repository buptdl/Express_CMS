<?php
	session_start();
	$obj=new stdClass;
	$obj->user=$_SESSION['user'];
	$obj->userId=$_SESSION['userId'];
	//$obj->authority=$_SESSION['authority'];  //@Mod
	$obj->aut_exp=$_SESSION['aut_exp']; 
	$obj->aut_fin=$_SESSION['aut_fin'];
	$obj->aut_cli=$_SESSION['aut_cli'];
	
	echo json_encode($obj);
?>