<?php
	session_start();
	if ($_POST['action']=='push')
	{
		$_SESSION['currentTab']=$_POST['id'];
		if (!isset($_SESSION['history']))
		{
			$_SESSION['history']=array($_POST['id']=>1);
		}
		else
		{
			if (!isset($_SESSION['history'][$_POST['id']]) ||$_SESSION['history'][$_POST['id']]==0)
				$_SESSION['history'][$_POST['id']]=1;
		}
	}
	else if ($_POST['action']=='pop' && isset($_SESSION['history']))
	{
		if (isset($_SESSION['history'][$_POST['id']]))
		{
			$_SESSION['history'][$_POST['id']]=0;
		}
	}
	
?>