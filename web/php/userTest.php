<?php 
require_once('dbconfig.php');
$user = $_POST['user'];
$query = sprintf('select * from %suser where user ="%s";',DB_TBL_PREFIX,mysql_real_escape_string($user));
	$result = mysql_query($query,$GLOBALS['DB']);
if(mysql_num_rows($result)) 
     echo '{"success":false}';
   else  echo '{"success":true}';
?>