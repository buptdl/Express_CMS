<?php
	//定义全局常量
	define('MYSQL_HOST','59.64.138.184');
	define('MYSQL_USER','root');
	define('MYSQL_PSW','123');
	define('MYSQL_DB','buptyq');
	
	include_once('lib.php');
	
	$_POST['log']=mb_convert_encoding($_POST['log'],'GBK','UTF-8');
	$dbUse=new buptYQDatabase(MYSQL_HOST,MYSQL_USER,MYSQL_PSW,MYSQL_DB);
	$dbUse->createDbLink();
	mysql_query('set names "GBK"');
	$query='INSERT INTO pris_log VALUES(0,"'.$_POST['log'].'",now(),"bb")';
	$result=mysql_query($query);
	$dbUse->destroyDbLink();
	if ($result)
	{
		echo '{"success":true}';
	}
	else
	{
		echo '{"success":false}';
	}
?>