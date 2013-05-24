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
	$tid = $_REQUEST['tid'];//窗口显示类id传递选择帖子id
	//mysql 数据提取:提取某类帖子
	$count_sql = "SELECT tablea.pid, tablea.post_url, tablea.title, tablea.author, tablea.board_cname, tablea.site_name, tablea.publish_time, tablea.reply_time, tablea.reply_num, tablea.post_content
				FROM pris_posts_main tablea, pris_topic_cluster_result tableb WHERE tableb.topic_id = $tid AND tablea.pid = tableb.pid";//总页显示
	$sql = $count_sql . " LIMIT ".$start.", ".$limit;//分页显示
	date_default_timezone_set("Asia/Shanghai");//php和sql时间统一
	$arr = array();
	$rs = mysql_query($sql);
	if(!$rs){
		Echo '{success:false}';
	}else{
		$rs_count = mysql_query($count_sql);
		$results = mysql_num_rows($rs_count);	//results是数据总数
		while($obj = mysql_fetch_object($rs)){
			$obj -> publish_time=date('Y-m-d  G:i:s',$obj -> publish_time);//绝对秒转化
			//用帖子内容提取摘要
			$str = $obj -> post_content;//提取帖子内容
			$str_len = 200;//设定摘要长度
			$obj -> post_content = mystr($str,$str_len);//调用摘要提取函数
			$arr[] = $obj;
		}
		Echo '{success:true, results:'.$results.',
			rows:'.json_encode($arr).'}';	//json输出数据
	}
	//字符串截取（摘要生成）函数
	function mystr($str,$str_len) {//格式函数
		if (strlen($str)<=$str_len) {
			return $str;
		}else return mysubstr($str,0,$str_len)."...";
	}
	function mysubstr($str, $start, $len) {//剪取函数
		$tmpstr = "";
		$strlen = $start + $len;
		for($i = 0; $i < $strlen; $i++) {
			if(ord(substr($str, $i, 1)) > 0xa0) {
				$tmpstr .= substr($str, $i, 2);
				$i++;
			} else
			$tmpstr .= substr($str, $i, 1);
		}
		return $tmpstr;
	}
?>