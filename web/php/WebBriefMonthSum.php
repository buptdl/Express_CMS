<?php
//连接到数据库
    define('MYSQL_HOST','59.64.138.184');	
	define('MYSQL_USER','root');
	define('MYSQL_PSW','123');
	define('MYSQL_DB','buptyq');
	include_once('lib.php');
	$start=$_POST['start'];
	$length=$_POST['limit'];
	$dbUse=new buptYQDatabase(MYSQL_HOST,MYSQL_USER,MYSQL_PSW,MYSQL_DB);
	$dbUse->createDbLink();
	//有关中文数据显示，注意是utf8，没有-
	 mysql_query("SET NAMES 'utf8'");
	//有过滤条件则按日期查询
	
	
	 //从数据库中选取划分好时段对应的pid数
    $query="SELECT
	Sum(pris_web_daily.sensitive_posts_num) AS m_sen_Num,
	sum( pris_web_daily.illegal_posts_num ) as m_ill_Num,
	sum( pris_web_daily.negative_posts_num) as m_neg_Num
	FROM
	pris_web_daily
	WHERE
	date (from_unixtime( pris_web_daily.`date` ) ) >=  date_add( now(), interval -30  day )";
	
	$arr=array();
	$total=$dbUse->getArray($query,$start,$length,$arr);
	$dbUse->destroyDbLink();
	$dbUse->returnGridJson($arr,$total);

?>

