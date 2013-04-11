<?php 
require_once('dbconfig.php');
$query = sprintf('select * from %sconfig where id between 3 and 9;',DB_TBL_PREFIX);
	$result = mysql_query($query,$GLOBALS['DB']);
	if($result)
	{  
	$arr=array();
    $total=mysql_num_rows($result);
	 	for ($i=0;$i<$total;$i++)
			{
				if ($temp=mysql_fetch_array($result))//·ÀÖ¹Ô½½ç
					$arr[$i]=$temp;
				else
					break;
			}
		mysql_free_result($result);	
	}
	
	$json=array('total'=>$total);
    $json['clusterData']=$arr;
	$string=json_encode($json);
	echo $string;
 ?>