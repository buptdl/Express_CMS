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
	//sql������ȡ����������ѯ����
	//�й���������ѡ�����ڲ�ѯ��Ĭ����ʾ������Ϣ
	//���ɽ�һ��ѡ����Сʱ�β鿴
	if (isset($_POST['filters']))//ѡ��������ȡ
		$filter=$_POST['filters']['0']['data']['value'];
	else
		$filter=date("Y-m-d");//Ĭ��Ϊ����
	if (isset($_POST['filters']['1']['data']['value'])){//ѡ��Сʱ����ȡ
		$temp=$_POST['filters']['1']['data']['value'];
		$filterEx="AND '$temp'=hour(time)";
	}
	else
		$filterEx="";//Ĭ��Ϊ�գ��������
	$count_sql = "SELECT pris_topic_hours.id, pris_topic_hours.topic_id, pris_topic_hours.key_words, pris_topic_hours.document_number,pris_topic_hours.reply_number, pris_topic_hours.hour_attention, pris_topic_hours.time, pris_posts_main.title 
				FROM pris_topic_hours, pris_topic_cluster_result, pris_posts_main 
				WHERE date(time)='$filter' $filterEx and pris_topic_hours.topic_id=pris_topic_cluster_result.topic_id and pris_posts_main.pid=pris_topic_cluster_result.pid 
				GROUP by pris_topic_hours.id
				ORDER BY pris_topic_hours.time DESC, pris_topic_hours.hour_attention DESC"; //������
	$sql = $count_sql . " LIMIT ".$start.", ".$limit;//��ҳ��ʾ����
	$arr = array();
	$rs = mysql_query($sql);
	if(!$rs){
		Echo '{success:false}';
	}else{
		$rs_count = mysql_query($count_sql);
		$results = mysql_num_rows($rs_count);	//results����������
		while($obj = mysql_fetch_object($rs)){
			//$obj -> publish_time=date('Y-m-d',$obj -> publish_time);//���������ת��
			$arr[] = $obj;
		}
		Echo '{success:true, results:'.$results.',
			rows:'.json_encode($arr).'}';	//json�������
	}
?>