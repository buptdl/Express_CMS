<?php 
require_once('dbconfig.php');
$query = sprintf('SELECT * FROM %sUSER;',DB_TBL_PREFIX);
	$result = mysql_query($query,$GLOBALS['DB']);
	if($result)
	{  
	$arr=array();
    $total=mysql_num_rows($result);
	 	for ($i=0;$i<$total;$i++)
			{
				if ($temp=mysql_fetch_array($result))//��ֹԽ��
					{
					  $arr[$i]=$temp;
					  $arr[$i]['password']='******';
					  $arr[$i]['confirmPassword']='******';
					}
				else
					break;
			}
		mysql_free_result($result);	
	}
	
	$json=array('total'=>$total);
    $json['userData']=$arr;
	$string=json_encode($json);
	echo $string;
 ?>