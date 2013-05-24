<?php 
	// copy from Department.php&addDic.php (with some modify).
	require_once('dbconfig.php');
	require_once('user_.php');
	
	$staff_id = $_POST['staff_id'];
	$name = urldecode($_POST['name']);  // decode Chinese-characters.
	$system_name = $_POST['system_name'];				
	$aut_express = $_POST['aut_express'];			
	$aut_finance = $_POST['aut_finance'];
	$aut_client = $_POST['aut_client'];
	$depart_id = $_POST['department'];
	
	// TODO 取得当前用户的权限，更新设置的权限为不超过该权限范围。
				
	$query = sprintf(
		'replace into staff values( ' .
			%d, "%s", null, null, null, null, 
	   	    null, null, null, %d, null, null,
	   	    "%s", null, %d, %d, %d, null
	   	)',
	   	$staff_id, mysql_real_escape_string($name,$GLOBALS['DB']),
	   	$depart_id, $system_name, 
	   	$aut_express, $aut_finance, $aut_client
	);

	if(mysql_query($query, $GLOBALS['DB'])) {
		echo '{"success":true}';
	}
	echo '{"success":false}';
	
 ?>