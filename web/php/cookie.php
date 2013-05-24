<?php
	session_start();
	$user='';
	$psw='';
	$save='';
	$auto='';
	
	//session存在，则以原权限的登录
	if (isset($_SESSION['access']) && $_SESSION['access']==true)
	{
		$json=array('success'=>true,'access'=>true,
			//'authority'=>$_SESSION['authority']);
			'aut_exp'=>$_SESSION['aut_exp'], 
			'aut_fin'=>$_SESSION['aut_fin'],
			'aut_cli'=>$_SESSION['aut_cli']);
		if (isset($_SESSION['history']))
		{
			$json['history']=array();
			foreach ($_SESSION['history'] as $h=>$k)
			{
				if ($k==1)
					$json['history'][$h]=1;
			}
		}
		if (isset($_SESSION['currentTab']))
			$json['currentTab']=$_SESSION['currentTab'];
		echo json_encode($json);
		exit;
	}
	
	if (isset($_COOKIE['auto']))
	{
		$auto=$_COOKIE['auto'];	
	}
	else
	{
		$auto=false;
	}
	if (isset($_COOKIE['save']))
	{
		$save=$_COOKIE['save'];
	}
	else
	{
		$save=false;
	}
	if ($auto || $save)
	{
		$user=$_COOKIE['user'];
		$psw=$_COOKIE['password'];
		$json=array('success'=>true,'access'=>false,'auto'=>$auto,'save'=>$save,'user'=>$user,'psw'=>$psw);
		echo json_encode($json);
		exit;
	}
	else
	{
		$json=array('success'=>true,'access'=>false,'auto'=>$auto,'save'=>$save);
		echo json_encode($json);
	}
?>