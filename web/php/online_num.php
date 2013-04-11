<?php

//连接到数据库
   /* define('MYSQL_HOST','59.64.138.184');
	define('MYSQL_USER','root');
	define('MYSQL_PSW','123');
	define('MYSQL_DB','buptyq');*/
	include_once('lib.php');
	$start=$_POST['start'];
	$length=$_POST['limit'];
	$dbUse=new buptYQDatabase(MYSQL_HOST,MYSQL_USER,MYSQL_PSW,MYSQL_DB);
	$dbUse->createDbLink();
	//有关中文数据显示，注意是utf8，没有-
	 mysql_query("SET NAMES 'utf8'");
	 
	 
    if (isset($_POST['filters']))
		$filter="where '".$_POST['filters']['0']['data']['value']."'=date(from_unixtime(date)) ORDER BY time";
	else
		$filter='WHERE date=(SELECT MAX(date) FROM pris_users_personnum_online) ORDER BY time';
	 //从数据库中选取划分好时段对应的pid数
     $query="SELECT time ,date(from_unixtime(date)) AS publish_time,user_num FROM pris_users_personnum_online ".$filter;
	//echo $query;
	$arr=array();
	$total=$dbUse->getArray($query,$start,$length,$arr);
	//echo $total;
	//exit;
	$a=0;
	$newArr=array();
	for($b=0;$b<24;$b++){
	if ($a>=$total)
	{
		$newArr[$b]=new stdClass;
		$newArr[$b]->time=$b;
		$arr[$b]->user_num=0;
	}
	else if($arr[$a]->time<=$b){
		$newArr[$b]=$arr[$a];
		$a++;
	}
	else{
		$newArr[$b]=new stdClass;
		$newArr[$b]->time=$b;
		$newarr[$b]->user_num=0;
	}
	}//柱状图横坐标
	
	$dbUse->destroyDbLink();
	$dbUse->returnGridJson($newArr,$total);
	



?>