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
	//sql数据提取，有条件查询数据
	//有过滤条件则按选择日期查询，默认显示当日信息
	//还可进一步选择当天小时段查看
	if (isset($_POST['filters']))//选择日期提取
		$filter=$_POST['filters']['0']['data']['value'];
	else
		$filter=date("Y-m-d");//默认为当天
	if (isset($_POST['filters']['1']['data']['value'])){//选择小时段提取
		$temp=$_POST['filters']['1']['data']['value'];
		$filterEx="AND '$temp'=hour(time)";
	}
	else
		$filterEx="";//默认为空，输出整天
	$count_sql = "SELECT pris_topic_hours.id, pris_topic_hours.topic_id, pris_topic_hours.key_words, pris_topic_hours.document_number,pris_topic_hours.reply_number, pris_topic_hours.hour_attention, pris_topic_hours.time, pris_posts_main.title 
				FROM pris_topic_hours, pris_topic_cluster_result, pris_posts_main 
				WHERE date(time)='$filter' $filterEx and pris_topic_hours.topic_id=pris_topic_cluster_result.topic_id and pris_posts_main.pid=pris_topic_cluster_result.pid 
				GROUP by pris_topic_hours.id
				ORDER BY pris_topic_hours.time DESC, pris_topic_hours.hour_attention DESC"; //总数据
	$sql = $count_sql . " LIMIT ".$start.", ".$limit;//分页显示数据
	$arr = array();
	$rs = mysql_query($sql);
	if(!$rs){
		Echo '{success:false}';
	}else{
		$rs_count = mysql_query($count_sql);
		$results = mysql_num_rows($rs_count);	//results是数据总数
		while($obj = mysql_fetch_object($rs)){
			//$obj -> publish_time=date('Y-m-d',$obj -> publish_time);//无需绝对秒转换
			$arr[] = $obj;
		}
		Echo '{success:true, results:'.$results.',
			rows:'.json_encode($arr).'}';	//json输出数据
	}
?>