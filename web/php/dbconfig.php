<?php 
	//database connection
	
	//load config
	include_once('config.php');
	$config=new YQConfig('config.ini');
	$config->read();
	$array=array("MYSQL_HOST","MYSQL_USER","MYSQL_PSW","MYSQL_DB");
	foreach($array as $key)
	{
		define($key,$config->get($key));
	}	
	
	//print(MYSQL_HOST ."|" .MYSQL_USER ."|" .MYSQL_PSW);//print_r($array); die('TEST:' . '|');  //@test

	//define('DB_HOST','59.64.138.184');
	//define('DB_USER','root');
	//define('DB_PASSWORD','123');
	define('DB_TBL_PREFIX','PRIS_');
	//define('DB_DB','buptyq');
	
	//establish  connection to the database
	
	if(!$GLOBALS['DB'] = mysql_connect(MYSQL_HOST,MYSQL_USER,MYSQL_PSW)){
	   die('Error: Unable to connect to database');
	}
	if(!mysql_select_db(MYSQL_DB,$GLOBALS['DB'])){
	   mysql_close($GLOBALS['DB']);
	   die('Error: Unable to select database');
	 }
	 mysql_query("set names utf8");  
?>