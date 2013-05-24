<?php 
//include  'dbconfig.php';
//include  'user.php'; 
require_once('dbconfig.php');
require_once('user_.php');  //@test

$pwd_org = $_POST['word1'];
$pwd_new = $_POST['type1'];

$arr = array('success'=>false, 'msg'=>'原始密码错误');

	if(isset($pwd_org) && isset($pwd_new))
	{
		session_start();
		
		$user = User::getById($_SESSION['userId']);
		
		if(!empty($user) && sha1($pwd_org)==$user->password) {
			$query = sprintf('update staff set password="%s" where staff_id=%d',
				$pwd_new, $_SESSION['userId']);
			mysql_query($query, $GLOBALS['DB']); // @test 无成功率验证
			$arr = array('success'=>true, 'msg'=>"密码更新成功");
		}
	} 

 echo json_encode($arr); 
 ?>
 
 
 
 
 
 
 
 
 
 
