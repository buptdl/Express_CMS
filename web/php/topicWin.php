<?php
    //���ӵ����ݿ�
	include_once('lib.php');
	$con=mysql_connect(MYSQL_HOST,MYSQL_USER,MYSQL_PSW);
	if (!$con) {
		die('Could not connect: ' . mysql_error());}
	mysql_select_db(MYSQL_DB,$con);
	//�й�����������ʾ��ע����utf8��û��-
	mysql_query("set names 'utf8'");
	//��ҳ��ʾ
	$start = ($_REQUEST['start'] != '') ? $_REQUEST['start'] : 0;
	$limit = ($_REQUEST['limit'] != '') ? $_REQUEST['limit'] : 25;
	//Limit start:��ʼ������limit:ѡ������
	//ѡ�����ڲ�ѯ��Ĭ����ʾ������Ϣ
	$filter=date("Y-m-d");
	$count_sql = "SELECT pris_topic_daily.id, pris_topic_daily.key_words, pris_topic_daily.day_attention, pris_topic_daily.time 
				FROM pris_topic_daily WHERE time='$filter' ORDER by pris_topic_daily.day_attention DESC";	// pris_posts_main.reply_num
	$sql = $count_sql . " LIMIT ".$start.", ".$limit;
	$arr = array();
	$rs = mysql_query($sql);
	if(!$rs){
		Echo '{success:false}';
	}else{
		$rs_count = mysql_query($count_sql);
		$results = mysql_num_rows($rs_count);	//results����������
		while($obj = mysql_fetch_object($rs)){
			//$obj -> publish_time=date('Y-m-d',$obj -> publish_time);//'Y-m-d  G:i:s'
			$arr[] = $obj;
		}
		Echo '{success:true, results:'.$results.',
			rows:'.json_encode($arr).'}';	//json�������
	}
?>