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
	//��������ѯ����
	//������ѡ��ʮ��Ĭ��Ϊ���죬��ʱ�䵹����
	//���ɽ�һ��ѡ����ʱ���
	if (isset($_POST['filters']))
		$filter=$_POST['filters']['0']['data']['value'];//�ύ����ѡ�����
	else
		$filter=date("Y-m-d");//Ĭ�ϵ���ʱ��
	//�ύʱ���ѡ�����
	if (isset($_POST['filters']['1']['data']['value'])){
		$temp=$_POST['filters']['1']['data']['value'];
		$filterEx="AND '$temp'=hour(FROM_UNIXTIME(collect_time))";
	}
	else
		$filterEx="";
	//sql������ȡ
	$count_sql = "SELECT pris_posts_topten.pid, pris_posts_topten.post_url, pris_posts_topten.title, pris_posts_topten.collect_time, pris_posts_topten.reply_num
				FROM pris_posts_topten WHERE date(FROM_UNIXTIME(collect_time))='$filter' $filterEx ORDER BY pris_posts_topten.collect_time DESC";	
	$sql = $count_sql . " LIMIT ".$start.", ".$limit;
	date_default_timezone_set("Asia/Shanghai");//php��sqlʱ��ͳһ
	$arr = array();
	$rs = mysql_query($sql);
	if(!$rs){
		Echo '{success:false}';
	}else{
		$rs_count = mysql_query($count_sql);
		$results = mysql_num_rows($rs_count);	//results����������
		while($obj = mysql_fetch_object($rs)){
			//������ȡ�����ֻ���URL����дǰ׺������ҳ���ַ
			$urlchange = array('m.byr.cn'=>'forum.byr.edu.cn');
			$obj -> post_url = strtr($obj -> post_url, $urlchange);
			$obj -> collect_time=date('Y-m-d G:i:s',$obj -> collect_time);//������ת��
			$arr[] = $obj;
		}
		Echo '{success:true, results:'.$results.',
			rows:'.json_encode($arr).'}';	//json�������
	}
?>