<?php 

include  'dbconfig.php';
include  'user.php'; 

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
}
else 
{
	if(isset($_POST['user'])&&isset($_POST['password']))
	{
		$user = User::getByUsername($_POST['user']);
		$test=$user->_get('userId');
		if (!empty($test))
		{
			$name = $user->user;
			$pwd = $user->password;
			if ($_POST['user']!==$user->user||sha1($_POST['password'])!==$user->password)
			{
				$arr=array('success'=>false,'msg'=>'错误的用户名或密码');
			}
			if($user->activate==0)
			{
				$arr=array('success'=>false,'msg'=>'用户未激活');
			}
			else
			{ 				
				$_SESSION['access'] = true;
				$_SESSION['userId'] = $user->_get('userId');
				$_SESSION['user'] = $user->user;
				$_SESSION['authority'] = $user->authority;
				$arr=array('success'=>true,'msg'=>'ok','authority'=>$_SESSION['authority']);//设置成功信息
			}
		}
		else
		{
			$arr=array('success'=>false,'msg'=>"用户名或密码错误");
		}
	}
}

//跳过验证
$arr=array('success'=>true,'msg'=>'ok');

$j=json_encode($arr); 
 echo $j ;
 ?>
 
 
 
 
 
 
 
 
 
 
