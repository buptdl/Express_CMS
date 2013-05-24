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
    $query="
	select * from (  select
	sum(a.sensitive_posts_num) w_sen_Num,
	sum(a.illegal_posts_num ) w_ill_Num,
	sum( a.negative_posts_num) w_neg_Num
 from pris_web_daily as a
 where date (from_unixtime( a.`date` ) ) >=  date_add( now(), interval -30  day ) ) as table1,
 ( select sum(b.sensitive_posts_num) m_sen_Num,
	sum(b.illegal_posts_num ) m_ill_Num,
	sum( b.negative_posts_num) m_neg_Num
 from pris_web_daily as b
where date (from_unixtime( b.`date` ) ) >=  date_add( now(), interval -120  day ) ) as table2 ";

	$arr=array();
	$total=$dbUse->getArray($query,$start,$length,$arr);
	
	$dbUse->destroyDbLink();
	$dbUse->returnGridJson($arr,$total);

?>