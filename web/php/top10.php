<?php 

$start=$_POST['start'];
$length=$_POST['limit'];

require_once('dbconfig.php');

mysql_query("set names utf8");
$query = sprintf('select title,post_url,collect_time,reply_num'.
	'    from %sposts_topten order by collect_time desc;',DB_TBL_PREFIX);
	$result = mysql_query($query,$GLOBALS['DB']);
	if($result)
	{ 
	
	$arr=array();
    $total=mysql_num_rows($result);
	mysql_data_seek($result,$start);
	 	for ($i=0;$i<$length;$i++)
			{
				if ($temp=mysql_fetch_object($result))//·ÀÖ¹Ô½½ç
				{
				    $temp->collect_time=date('Y-m-d  G:i:s',$temp->collect_time);
					$arr[$i]=$temp;
				}
				else
					break;
			}
		mysql_free_result($result);	
	}
   Echo '{success:true, total:'.$total.',
		top10Data:'.json_encode($arr).'}';
	
	
 ?>