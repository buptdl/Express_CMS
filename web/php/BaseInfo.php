<?php 
	require_once('dbconfig.php');
	require_once('user_.php');
	
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
	 
	
	session_start();
	$query = sprintf(
		'SELECT system_name, age, hometown, phone, email, entry_time,  ' .
		'IDnumber,  sex, depart_id, password  ' .
		'FROM staff where staff_id=%d; ', $_SESSION['userId']);
	$result = mysql_query($query, $GLOBALS['DB']);
	//$result = mysql_query('select system_name from staff where staff_id=1;');
	
	$json=array('total'=>1);
	if(!empty($result)) {  
		$json['data'] = array('name'=>$result['system_name'],
			'age'=>$result['age'], 'hometown'=>$result['hometown'],
			'phone'=>$result['phone'], 'email'=>$result['email'],
			'entry_time'=>$result['entry_time'],
			'IDnumber'=>$result['IDnumber'], 
			'sex'=>$result['sex'], 
			'department'=>User::depart_map($result['depart_id']), 
			'password'=>$result['password']
		);
		
		mysql_free_result($result);	
	} 
	
	$string=json_encode($json);
	echo $query . '||' . $string . '||' . json_encode($result);
 ?>