<?php
//连接到数据库
   /*  define('MYSQL_HOST','59.64.138.184');	
	define('MYSQL_USER','root');
	define('MYSQL_PSW','123');
	define('MYSQL_DB','buptyq'); */
	require_once('dbconfig.php');
	include_once('lib.php');
	$start=$_POST['start'];
	$length=$_POST['limit'];
	$dbUse=new buptYQDatabase(MYSQL_HOST,MYSQL_USER,MYSQL_PSW,MYSQL_DB);
	$dbUse->createDbLink();
	//有关中文数据显示，注意是utf8，没有-
	 mysql_query("SET NAMES 'utf8'");
	//有过滤条件则按日期查询
	if (isset($_POST['filters']))
		$filter="FROM pris_web_illegal_relation,pris_web_illegal_posts where '".$_POST['filters']['0']['data']['value']."'=pris_web_illegal_relation.word_id and pris_web_illegal_posts.pid= pris_web_illegal_relation.pid";
	else
		$filter="FROM pris_web_illegal_posts";
		
	$query="SELECT pris_web_illegal_posts.title,pris_web_illegal_posts.author,from_unixtime(pris_web_illegal_posts.posting_time) AS posting_time,pris_web_illegal_posts.url,pris_web_illegal_posts.illegal_words,pris_web_illegal_posts.source ".$filter. " order by posting_time desc ";
	$arr=array();
	$total=$dbUse->getArray($query,$start,$length,$arr);
	$dbUse->destroyDbLink();
	$dbUse->returnGridJson($arr,$total);
?>

