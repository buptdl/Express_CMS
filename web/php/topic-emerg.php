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
	//�й���������ѡ�����ڲ�ѯ��Ĭ���������10��ͻ���¼�
	if (isset($_POST['filters'])){//��ȡ������������ʾ��������ͻ���¼�
		$filter=$_POST['filters']['0']['data']['value'];
		$count_sql = "SELECT pris_topic_emergency.id, pris_topic_emergency.topic_id, pris_topic_emergency.key_words,pris_topic_emergency.topic_start_time, pris_topic_emergency.document_number,pris_topic_emergency.reply_number, pris_topic_emergency.attention, pris_topic_emergency.time, pris_posts_main.title 
			FROM pris_topic_emergency, pris_topic_cluster_result, pris_posts_main 
			WHERE date(time)='$filter' and pris_topic_emergency.topic_id=pris_topic_cluster_result.topic_id and pris_posts_main.pid=pris_topic_cluster_result.pid 
			GROUP by pris_topic_emergency.id";
		$sql = $count_sql . " LIMIT ".$start.", ".$limit;}
	else//Ĭ��ѡ�����ݿ�����10��ͻ���¼���ʾ
		$count_sql = $sql = "SELECT pris_topic_emergency.id, pris_topic_emergency.topic_id, pris_topic_emergency.key_words,pris_topic_emergency.topic_start_time, pris_topic_emergency.document_number,pris_topic_emergency.reply_number, pris_topic_emergency.attention, pris_topic_emergency.time, pris_posts_main.title
			FROM pris_topic_emergency, pris_topic_cluster_result, pris_posts_main
			WHERE pris_topic_emergency.topic_id =  pris_topic_cluster_result.topic_id AND pris_posts_main.pid =  pris_topic_cluster_result.pid
			GROUP by pris_topic_emergency.id
			ORDER BY pris_topic_emergency.time  DESC
			LIMIT 0, 10";
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