<?php 
require_once('dbconfig.php');
$id = $_POST['id'];
$word = $_POST['word'];
$type = $_POST['type'];
 if($id)
	 {
	  $query = sprintf('UPDATE %sweb_dic SET word = "%s",'.
	       'type = %d;',DB_TBL_PREFIX,
	        mysql_real_escape_string($word,$GLOBALS['DB']),
			$value,$default_value,$id);
	  if(mysql_query($query,$GLOBALS['DB']))
	        echo '{"success":true}';
      else  echo '{"failure":true}'; 
	  }
else
	  {
	  $query = sprintf('INSERT INTO %sweb_dic (word,type) VALUES("%s",%d);',
			  DB_TBL_PREFIX,
	          mysql_real_escape_string($word,$GLOBALS['DB']),$type);
	  if(mysql_query($query,$GLOBALS['DB']))
	  {
		    echo '{"success":true}';
		 }
	    else  echo '{"failure":true}'; 
	   }
?>