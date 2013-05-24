<?php 
require_once('dbconfig.php');
include 'user.php';

$user = new User();
$password1= (isset($_POST['password'])&&$_POST['password'])?sha1($_POST['password']):$user->password;
$password2= (isset($_POST['confirmPassword'])&&$_POST['confirmPassword'])?sha1($_POST['confirmPassword']):$user->password;
$password = ($password1 == $password2)?$password1:'';
if($password)
 {
   $user->password=$password;
   $user->user=$_POST['user'];
   $user->activate = 0;
   $user->authority=$_POST['authority'];
   if($user->save())
     echo '{"success":true}';
   else  echo '{"failure":true}';
 }

 ?>