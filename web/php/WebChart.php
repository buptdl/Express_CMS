<?php
//连接到数据库
	include_once('lib.php');
	$start=$_POST['start'];
	$length=$_POST['limit'];
	$kind= $_POST['filters']['2']['data']['value'];	//存放数据库表名筛选项
	$time= $_POST['filters']['1']['data']['value'];
	$dbUse=new buptYQDatabase(MYSQL_HOST,MYSQL_USER,MYSQL_PSW,MYSQL_DB);
	$dbUse->createDbLink();
	//有关中文数据显示，注意是utf8，没有-
	 mysql_query("SET NAMES 'utf8'");

    if (isset($_POST['filters']))	//SQL语句中的from_unixtime(date)把年月日的值从绝对值转换为Y-M-D格式
	{	//$filter="where '".$_POST['filters']['0']['data']['value']."'=date(from_unixtime(date))";
		//$filter="where '".$_POST['filters']['0']['data']['value']."'=date(from_unixtime(date))";
		$filter="where '".$_POST['filters']['0']['data']['value']."'= word_id";
		if($time!="") $filter= $filter." and'".$time."'=date(from_unixtime(create_date)) " ;
	}	
	else
		$filter='';
	 //从数据库中选取划分好时段对应的pid数
    $query="SELECT create_time,doc_count FROM pris_web_".$kind."_statistic ".$filter." order by create_time ASC";;
	//$query="SELECT create_time,doc_count FROM pris_web_sensitive_statistic ".$filter;
	$arr=array();						
	$total=$dbUse->getArray($query,$start,$length,$arr);//得到行数
	$a=0;
	$newArr=array();	//实际返回结果
	for($b=0; $b<24; $b++){
		if ($a>=$total)	//表中没有读到数据时
		{
			$newArr[$b]=new stdClass;
			$newArr[$b]->create_time=$b;
			$newArr[$b]->doc_count=0;
		}
		else if($arr[$a]->create_time<=$b){	//找到一个小时的数据
			$newArr[$b]=$arr[$a];
			$a++;
		}
		else{	//插入一个小时点的空数据
			$newArr[$b]=new stdClass;
			$newArr[$b]->create_time=$b;
			$newArr[$b]->doc_count=0;
		}
	}//柱状图横坐标
	$dbUse->destroyDbLink();
	$dbUse->returnGridJson($newArr,$total);
?>