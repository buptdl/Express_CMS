<?php 
	// copy from Department.php with small modify.
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
		'select staff_id, name, system_name, depart_id, ' .
		'aut_exp, aut_fin, aut_cli ' .
		'from staff where depart_id=( ' .
		'select depart_id from staff where staff_id=%d); ', $_SESSION['userId']
	);

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
				'system_name'=>$temp['system_name'],
				'department'=>User::depart_map($temp['depart_id']), 
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