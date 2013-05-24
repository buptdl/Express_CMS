<?php
	//连接到数据库
	include_once('lib.php');
	$con=mysql_connect(MYSQL_HOST,MYSQL_USER,MYSQL_PSW);
	if (!$con) {
		die('Could not connect: ' . mysql_error());}
	mysql_select_db(MYSQL_DB,$con);
	//有关中文数据显示，注意是utf8，没有-
	mysql_query("set names 'utf8'");
	//分页显示
	$start = ($_REQUEST['start'] != '') ? $_REQUEST['start'] : 0;
	$limit = ($_REQUEST['limit'] != '') ? $_REQUEST['limit'] : 25;
	//Limit start:起始向量，limit:选择数量
	//有条件查询数据
	//按日期选择十大，默认为当天，按时间倒排序
	//还可进一步选择当天时间段
	if (isset($_POST['filters']))
		$filter=$_POST['filters']['0']['data']['value'];//提交日期选择情况
	else
		$filter=date("Y-m-d");//默认当天时间
	//提交时间段选择情况
	if (isset($_POST['filters']['1']['data']['value'])){
		$temp=$_POST['filters']['1']['data']['value'];
		$filterEx="AND '$temp'=hour(FROM_UNIXTIME(collect_time))";
	}
	else
		$filterEx="";
	//sql数据提取
	$count_sql = "SELECT pris_posts_topten.pid, pris_posts_topten.post_url, pris_posts_topten.title, pris_posts_topten.collect_time, pris_posts_topten.reply_num
				FROM pris_posts_topten WHERE date(FROM_UNIXTIME(collect_time))='$filter' $filterEx ORDER BY pris_posts_topten.collect_time DESC";	
	$sql = $count_sql . " LIMIT ".$start.", ".$limit;
	date_default_timezone_set("Asia/Shanghai");//php和sql时间统一
	$arr = array();
	$rs = mysql_query($sql);
	if(!$rs){
		Echo '{success:false}';
	}else{
		$rs_count = mysql_query($count_sql);
		$results = mysql_num_rows($rs_count);	//results是数据总数
		while($obj = mysql_fetch_object($rs)){
			//爬虫爬取的是手机版URL，改写前缀，得网页版地址
			$urlchange = array('m.byr.cn'=>'forum.byr.edu.cn');
			$obj -> post_url = strtr($obj -> post_url, $urlchange);
			$obj -> collect_time=date('Y-m-d G:i:s',$obj -> collect_time);//绝对秒转化
			$arr[] = $obj;
		}
		Echo '{success:true, results:'.$results.',
			rows:'.json_encode($arr).'}';	//json输出数据
	}
?>