<?php 
	require_once('dbconfig.php');
	require_once('user_.php');
	
	$id1 = $_POST['id'];
	
	$query = sprintf('delete FROM staff WHERE staff_id = %d ;', $id1);
	if(mysql_query($query, $GLOBALS['DB']) {
		echo '{"success":true}';
	} 
	echo '{"success":false}';
??	