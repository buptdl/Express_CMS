<?php 

require_once('dbconfig.php');
include 'user.php';

$id1 = $_POST['id'];

$user = User::getById($id1);
if($user->inActivate())
   echo '{"success":true}';
 else  echo '{"failure":true}';

?>