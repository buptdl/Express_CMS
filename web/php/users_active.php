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


      // $query="SELECT count(pid),hour(from_unixtime(date)) AS separate_time FROM `pris_posts_main` group by hour(from_unixtime(date))"


	/*require_once('getLogFunc.php');
	$con=mysql_connect("localhost","root","");
	if (!$con) {
		die('Could not connect: ' . mysql_error());}
	mysql_select_db("emma",$con);
	
	//分页显示
	$start = ($_REQUEST['start'] != '') ? $_REQUEST['start'] : 0;
	$limit = ($_REQUEST['limit'] != '') ? $_REQUEST['limit'] : 100;
	//Limit start:起始向量，limit:选择数量
	$count_sql = "SELECT * FROM pris_posts_main";
	$sql = $count_sql . " LIMIT ".$start.", ".$limit;*/
	
	//有过滤条件则按日期查询
	if (isset($_POST['filters']))
		$filter="where '".$_POST['filters']['0']['data']['value']."'=date(FROM_UNIXTIME(date))";
	else
		$filter='';
	$query="SELECT active_user AS author,activeness,publish_num,reply_num,date(FROM_UNIXTIME(date)) AS publish_date FROM pris_users_active ".$filter.'  ORDER BY date DESC,activeness desc limit 0,10';
	
	
	$arr=array();
	$total=$dbUse->getArray($query,$start,$length,$arr);
	$dbUse->destroyDbLink();
	$dbUse->returnGridJson($arr,$total);
	

	
	/*$rs = mysql_query($sql);
	if(!$rs){
		Echo '{success:false}';
	}else{
		$rs_count = mysql_query($count_sql);
		$results = mysql_num_rows($rs_count);	//results是数据总数
		while($obj = mysql_fetch_object($rs)){
		    $obj -> date=date('Y-m-d  G:i:s',$obj -> date);
			$arr[] = $obj;
	}

	Echo '{success:true, results:'.$results.',
		rows:'.json_encode($arr).'}';	//json输出数据*/


?>

