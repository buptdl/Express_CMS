<?php 
require_once('dbconfig.php');
include 'user.php';
 mysql_query("set names utf8");
$user = User::getById($_POST['userId']);
if(isset($_POST['password'])&&$_POST['password']=='******')
    { 
	   $user->user=$_POST['user'];
       $user->authority=$_POST['authority'];
	   //$name1=urldecode($_POST['real_name']);
	  // $name1==iconv("UTF-8","GBK",$name1);
	   $user->real_name = $_POST['real_name'];
	   $user->department=$_POST['department'];
	   $user->email=$_POST['email'];
	   $user->cellphone=$_POST['cellphone'];
	   $user->telephone=$_POST['telephone'];
	   $user->activate=$_POST['activate'];
	    if($user->save())
              echo '{"success":true}';
        else  echo '{"failure":true}';
	 }

else if(isset($_POST['password'])&&$_POST['password']!='******')
    {
	 $password1=sha1($_POST['password']);
	 $password2=sha1($_POST['confirmPassword']);
	 $password = ($password1 == $password2)?$password1:'';
	  if($password)
          {
           $user->password=$password;
           $user->user=$_POST['user'];
           $user->authority=$_POST['authority'];
		   $user->real_name=$_POST['real_name'];
	       $user->department=$_POST['department'];
	       $user->email=$_POST['email'];
	       $user->cellphone=$_POST['cellphone'];
	       $user->telephone=$_POST['telephone'];
	       $user->activate=$_POST['activate'];
           if($user->save())
                 echo '{"success":true}';
           else  echo '{"failure":true}';
          }
	 }
else   echo '{"failure":true}';

 ?>