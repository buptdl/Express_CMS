<?php

//连接到数据库
   /*  define('MYSQL_HOST','59.64.138.184');	
	define('MYSQL_USER','root');
	define('MYSQL_PSW','123');
	define('MYSQL_DB','buptyq'); */
	include_once('lib.php');
	$start=$_POST['start'];
	$length=$_POST['limit'];
	$dbUse=new buptYQDatabase(MYSQL_HOST,MYSQL_USER,MYSQL_PSW,MYSQL_DB);
	$dbUse->createDbLink();
	//有关中文数据显示，注意是utf8，没有-
	 mysql_query("SET NAMES 'utf8'");
	//有过滤条件则按日期查询
	
	$query="SELECT id,word FROM pris_web_dict where type=2 and ifmain=1 ";
	
	$arr=array();
	$total=$dbUse->getArray($query,$start,$length,$arr);
	$dbUse->destroyDbLink();
	$dbUse->returnGridJson($arr,$total);

?>

