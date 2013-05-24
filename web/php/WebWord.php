<?php

//连接到数据库
  
	include_once('lib.php');
	$start=$_POST['start'];
	$length=$_POST['limit'];
	$dbUse=new buptYQDatabase(MYSQL_HOST,MYSQL_USER,MYSQL_PSW,MYSQL_DB);
	$dbUse->createDbLink();
	//有关中文数据显示，注意是utf8，没有-
	 mysql_query("SET NAMES 'utf8'");
	//有过滤条件则按日期查询
	$kind= $_POST['filters']['0']['data']['value'];	//存放数据库表名筛选项
	if($kind=="sensitive")
		$filter="where type=1 and ifmain=1 ";
	elseif($kind=="illegal")
		$filter="where type=2 and ifmain=1 ";
	else 
		$filter="where type=3 and ifmain=1 ";
	
	 //从数据库中选取划分好时段对应的pid数
    $query="SELECT id,word FROM pris_web_dict ".$filter;
	
	$arr=array();
	$total=$dbUse->getArray($query,$start,$length,$arr);
	$dbUse->destroyDbLink();
	$dbUse->returnGridJson($arr,$total);

?>

