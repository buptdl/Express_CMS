<?php
	session_start();
	foreach($_COOKIE as $c=>$k)
	{
		setcookie($c,'');
	}
	session_destroy();
?>