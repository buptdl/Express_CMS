<?php
	//定义全局常量
	define('MYSQL_HOST','59.64.138.184');
	define('MYSQL_USER','root');
	define('MYSQL_PSW','123');
	define('MYSQL_DB','buptyq');
	/*define('MYSQL_HOST','localhost');
	define('MYSQL_USER','datauser');
	define('MYSQL_PSW','12345');
	define('MYSQL_DB','test');*/
	
	include_once('lib.php');
	
	//$link=mysql_connect($this->host,$this->user,$this->psw)
	
	$start=$_POST['start'];
	$length=$_POST['limit'];
	$dbUse=new buptYQDatabase(MYSQL_HOST,MYSQL_USER,MYSQL_PSW,MYSQL_DB);
	$dbUse->createDbLink();
	mysql_query('set names "utf8"');
	
	if (isset($_POST['filter']))
	{
		$query=$dbUse->filterParse('pris_log');
	}
	else
	{
		$query="SELECT * FROM pris_log";
	}
	$arr=array();
	$total=$dbUse->getArrayLarge($query,$start,$length,$arr,true);
	$dbUse->destroyDbLink();
	$dbUse->returnGridJson($arr,$total);
?>