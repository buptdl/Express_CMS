<?php 
require_once('dbconfig.php');
$value = $_POST['value'];
$id = $_POST['id'];
 if($id)
	 {
	  $query = sprintf('UPDATE %sconfig SET value = %f WHERE id  = %d;',
	  DB_TBL_PREFIX,$value,$id);
	  if(mysql_query($query,$GLOBALS['DB']))
	        echo '{"success":true}';
      else  echo '{"failure":true}'; 
	  }
 else  echo '{"failure":true}'; 

?>