<?php 

$start=$_POST['start'];
$length=$_POST['limit'];
require_once('dbconfig.php');
mysql_query("set names utf8");
$query = sprintf('select * from %sweb_dict;',DB_TBL_PREFIX);
	$result = mysql_query($query,$GLOBALS['DB']);
	if($result)
	{  
	$arr=array();
    $total=mysql_num_rows($result);
	mysql_data_seek($result,$start);
	 	for ($i=0;$i<$length;$i++)
			{
				if ($temp=mysql_fetch_array($result))//·ÀÖ¹Ô½½ç
					$arr[$i]=$temp;
				else
					break;
			}
		mysql_free_result($result);	
	}
	
	$json=array('total'=>$total);
    $json['dicData']=$arr;
	$string=json_encode($json);
	echo $string;
 ?>