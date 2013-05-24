<?php 
	require_once('dbconfig.php');
	require_once('user_.php');
	/*
	define('DB_HOST','127.0.0.1');
	define('DB_USER','root');
	define('DB_PASSWORD','123');
	define('DB_DB','test');
	
	//establish  connection to the database
	if(!$GLOBALS['DB'] = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD)){
	   die('Error: Unable to connect to database');
	}
	if(!mysql_select_db(DB_DB,$GLOBALS['DB'])){
	   mysql_close($GLOBALS['DB']);
	   die('Error: Unable to select database');
	}
	mysql_query("set names utf8"); 
	*/
	
	session_start();
	
	$query = sprintf(
		'SELECT a.staff_id, a.name, a.sex, a.age, a.system_name, a.phone, ' . 
		'a.depart_id,  b.name as mname, a.aut_exp, a.aut_fin, a.aut_cli ' .
		'FROM staff a inner join ( ' .
		'select depart_id, name from staff where staff_id=%d) b ' .
		'on a.depart_id=b.depart_id; ', $_SESSION['userId']);
	$result = mysql_query($query, $GLOBALS['DB']);
	//$result = mysql_query('select system_name from staff where staff_id=1;');
	
	$json=array('total'=>mysql_num_rows($result));
	if(!empty($result)) {  
		$arr = array();
		for($i = 0; $i < $json['total']; $i++){
			$temp=mysql_fetch_object($result);
			//echo 'test====' . json_encode($temp);  //@test 能正常打印结果
			$arr[$i] = array(
				'staff_id'=>$temp['staff_id'], 'name'=>$temp['name'],
				'sex'=>$temp['sex'], 'age'=>$temp['age'],
				'system_name'=>$temp['system_name'], 'phone'=>$temp['phone'],
				'department'=>User::depart_map($temp['depart_id']), 
				'manager'=>$temp['mname'], 
				'desc_exp'=>$temp['aut_exp'], 'desc_fin'=>$temp['aut_fin'], 
				'desc_cli'=>$temp['aut_cli']
			);
		}
		$json['data']=$arr;  // 添加各数据列
		
		mysql_free_result($result);	
	} 
			
	$string=json_encode($json);
	//echo $query . '||' . $string . '||' . json_encode($result);  //@test
	echo $string;
 ?>