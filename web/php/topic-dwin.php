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
	$tid = $_REQUEST['tid'];//������ʾ��id����ѡ������id
	//mysql ������ȡ:��ȡĳ������
	$count_sql = "SELECT tablea.pid, tablea.post_url, tablea.title, tablea.author, tablea.board_cname, tablea.site_name, tablea.publish_time, tablea.reply_time, tablea.reply_num, tablea.post_content
				FROM pris_posts_main tablea, pris_topic_cluster_result tableb WHERE tableb.topic_id = $tid AND tablea.pid = tableb.pid";//��ҳ��ʾ
	$sql = $count_sql . " LIMIT ".$start.", ".$limit;//��ҳ��ʾ
	date_default_timezone_set("Asia/Shanghai");//php��sqlʱ��ͳһ
	$arr = array();
	$rs = mysql_query($sql);
	if(!$rs){
		Echo '{success:false}';
	}else{
		$rs_count = mysql_query($count_sql);
		$results = mysql_num_rows($rs_count);	//results����������
		while($obj = mysql_fetch_object($rs)){
			$obj -> publish_time=date('Y-m-d  G:i:s',$obj -> publish_time);//������ת��
			//������������ȡժҪ
			$str = $obj -> post_content;//��ȡ��������
			$str_len = 200;//�趨ժҪ����
			$obj -> post_content = mystr($str,$str_len);//����ժҪ��ȡ����
			$arr[] = $obj;
		}
		Echo '{success:true, results:'.$results.',
			rows:'.json_encode($arr).'}';	//json�������
	}
	//�ַ�����ȡ��ժҪ���ɣ�����
	function mystr($str,$str_len) {//��ʽ����
		if (strlen($str)<=$str_len) {
			return $str;
		}else return mysubstr($str,0,$str_len)."...";
	}
	function mysubstr($str, $start, $len) {//��ȡ����
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