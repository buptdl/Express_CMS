<?php

//���ӵ����ݿ�
   /* define('MYSQL_HOST','59.64.138.184');
	define('MYSQL_USER','root');
	define('MYSQL_PSW','123');
	define('MYSQL_DB','buptyq');*/
	include_once('lib.php');
	$start=$_POST['start'];
	$length=$_POST['limit'];
	$dbUse=new buptYQDatabase(MYSQL_HOST,MYSQL_USER,MYSQL_PSW,MYSQL_DB);
	$dbUse->createDbLink();
	//�й�����������ʾ��ע����utf8��û��-
	 mysql_query("SET NAMES 'utf8'");
	 
	 
    if (isset($_POST['filters']))
		$filter="where '".$_POST['filters']['0']['data']['value']."'=date(FROM_UNIXTIME(date)) AND '".$_POST['filters']['1']['data']['value']."'=user ";
	else
		$filter='';
	 //�����ݿ���ѡȡ���ֺ�ʱ�ζ�Ӧ��pid��
     //$query="SELECT count(pid) AS num,hour(from_unixtime(publish_time)) AS separate_time FROM `pris_posts_main` ".$filter." group by hour(from_unixtime(publish_time)) ";
	 $query="SELECT time,publish_num,reply_num FROM `pris_users_habit` ".$filter.' ORDER BY time';
	
	$arr=array();
	$total=$dbUse->getArray($query,$start,$length,$arr);
	
	$a=0;
	$newArr=array();
	for($b=0;$b<24;$b++){
	if ($a>=$total)
	{
		$newArr[$b]=new stdClass;
		$newArr[$b]->time=$b;
		$newArr[$b]->reply_num=0;
		$newArr[$b]->publish_num=0;
	}
	else if($arr[$a]->time<=$b){
		$newArr[$b]=$arr[$a];
		$a++;
	}
	else{
		$newArr[$b]=new stdClass;
		$newArr[$b]->time=$b;
		$newArr[$b]->reply_num=0;
		$newArr[$b]->publish_num=0;
	}
	}//��״ͼ������
	
	$dbUse->destroyDbLink();
	$dbUse->returnGridJson($newArr,$total);
	



?>