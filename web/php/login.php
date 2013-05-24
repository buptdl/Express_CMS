<?php 
//include  'dbconfig.php';
//include  'user.php'; 
require_once('dbconfig.php');
require_once('user_.php');  //@test

$user1 = $_POST['user'];
$pwd1 = $_POST['password'];

session_start();

setCookie('save',false,time()+31536000);
//setCookie('auto',false,time()+$cookieTime);
if (isset($_POST['save']))
{
	setCookie('save',true,time()+31536000);
	setCookie('user',$user1,time()+31536000);
	setCookie('password',$pwd1,time()+31536000);
}
if (isset($_POST['auto']))//提交自动登陆
{
	$cookieTime=$_POST['cookieTime'];
	setCookie('auto',true,time()+$cookieTime);
	setCookie('user',$user1,time()+$cookieTime);
	setCookie('password',$pwd1,time()+$cookieTime);
}

header('Cache-control:private');

if (!isset($_POST['super_auto'])/*以自动登陆状态登陆*/ && strtolower($_SESSION['validater'])!==strtolower($_POST['validater']))
{
  $arr=array('success'=>false,'msg'=>"验证码错误");
} else {
///*跳过验证
	if(isset($_POST['user']) && isset($_POST['password']))
	{
		$user = User::getByUsername($_POST['user']);
		//$user = User::getById(1);  // @UnitTest
		//$user->save();  // @UT
		//$user->remove();  // @UT
		//$user->authority('aut_exp', 6);  //@UT
		
		$test=$user->_get('userId');
		//echo $_POST['user'] . '|' . $_POST['password'] . '|' . $test; //@test
		if (!empty($test)) {
			$name = $user->system_name;
			$pwd = $user->password;
			if ($_POST['user']!==$name || sha1($_POST['password'])!==$user->password)
			{
				$arr=array('success'=>false,'msg'=>'错误的密码');
			}
//			if($user->activate==0) {  // @mod no use.
//				$arr=array('success'=>false,'msg'=>'用户未激活');
//			} else { 				
				$_SESSION['access'] = true;
				$_SESSION['userId'] = $test;
				$_SESSION['user'] = $name;
//				$_SESSION['authority'] = $user->authority;  // @mod
				$_SESSION['aut_exp'] = $user->aut_exp;
				$_SESSION['aut_fin'] = $user->aut_fin;
				$_SESSION['aut_cli'] = $user->aut_cli;
				$arr=array('success'=>true,'msg'=>'ok',
//					'authority'=>$_SESSION['authority']  // @mod
					'aut_exp'=>$_SESSION['aut_exp'],'aut_fin'=>$_SESSION['aut_fin'],'aut_cli'=>$_SESSION['aut_cli']
					);//设置成功信息
			
		} else {
			$arr=array('success'=>false,'msg'=>"用户名不存在");
		}
	}


}

//跳过验证
//$arr=array('success'=>true,'msg'=>'ok');

$j=json_encode($arr); 
 echo $j ;
 ?>
 
 
 
 
 
 
 
 
 
 
