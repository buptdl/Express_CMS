<?php 

$start=$_POST['start'];
$length=$_POST['limit'];

require_once('dbconfig.php');

mysql_query("set names utf8");
$query = sprintf('select title,post_url,post_content,author,publish_time'.
	'    from %sposts_main where post_source = %d order by publish_time desc;',DB_TBL_PREFIX,7);
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
				    $temp->publish_time=date('Y-m-d  G:i:s',$temp->publish_time);
					$arr[$i]=$temp;
				}
				else
					break;
			}
		mysql_free_result($result);	
	}
   Echo '{success:true, total:'.$total.',
		microBlogData:'.json_encode($arr).'}';
	
	
 ?>