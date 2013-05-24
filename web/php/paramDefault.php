<?php 
require_once('dbconfig.php');
$id = $_POST['id'];
if($id)
   {
     $query = sprintf('select * FROM %sconfig WHERE id = %d ;',DB_TBL_PREFIX,$id);
	 $result = mysql_query($query,$GLOBALS['DB']);
	 if($result&&mysql_num_rows($result))
	   {
	    $row = mysql_fetch_assoc($result);
		$value = $row['default_value'];
	   }
	 $query1 = sprintf('update %sconfig set value = %f where id = %d',DB_TBL_PREFIX,$value,$id );
	 if(mysql_query($query1,$GLOBALS['DB']))
	   echo '{"success":true}';
       else  echo '{"failure":true}'; 
   }
?>