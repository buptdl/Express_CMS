<?php
	//load config
	include_once('config.php');
	$config=new YQConfig('config.ini');
	$config->read();
	$array=array("MYSQL_HOST","MYSQL_USER","MYSQL_PSW","MYSQL_DB");
	foreach($array as $key)
	{
		define($key,$config->get($key));
	}	

	class buptYQDatabase
	{
		var $host;
		var $user;
		var $psw;
		var $db;
		var $link;
		function buptYQDatabase($host,$user,$psw,$db)
		{
			$this->host=$host;
			$this->user=$user;
			$this->psw=$psw;
			$this->db=$db;
		}
		function createDbLink()
		{
			$this->link=mysql_connect($this->host,$this->user,$this->psw) or die('wrong host, user or password');
			mysql_select_db($this->db) or die('wrong database');
		}
		function getArray($query,$start,$length,&$arr)
		{
			$result=mysql_query($query);
			$total=mysql_num_rows($result);
			if ($total===0)
				return 0;
			$arr=array();
			mysql_data_seek($result,$start);
			for ($i=0;$i<$length;$i++)
			{
				if ($temp=mysql_fetch_object($result))//防止越界
					$arr[$i]=$temp;
				else
					break;
			}
			mysql_free_result($result);
			return $total;
			//return $arr;引用
		}
		function getArrayLarge($query,$start,$length,&$arr,$inverse=false)
		{
			$count_query=substr_replace($query,'SELECT COUNT(*) as num',0,8);//if the query is like "SELECT * ..."
			$result=mysql_query($count_query);
			$count=mysql_fetch_array($result);
			mysql_free_result($result);
			$total=$count[0];
			if ($inverse==true)
			{
				$desc_start=$count[0]-$start-$length;
				if ($desc_start<0)
					$desc_start=0;
				$subQuery=$query." LIMIT $desc_start,$length";//缩小范围
				$query="SELECT * FROM ($subQuery) as temp_table ORDER BY id DESC";//if using auto increment id and subquery includes id 
			}
			else
			{
				$query=$query." LIMIT $start,$length";
			}
			$result=mysql_query($query);
			if ($total===0)
				return 0;
			$arr=array();
			for ($i=0;$i<$length;$i++)
			{
				if ($temp=mysql_fetch_object($result))//防止越界
					$arr[$i]=$temp;
				else
					break;
			}
			mysql_free_result($result);
			return $total;
			//return $arr;引用
		}
		function destroyDbLink()
		{
			mysql_close($this->link);
		}
		function returnGridJson(&$arr,$total)
		{
			$jArr=array('total'=>$total);
			$jArr['data']=$arr;
			$jString=json_encode($jArr);
			echo $jString;
		}
		function filterParse($table)
		{
			$query='SELECT * FROM '.$table.' WHERE ';
			foreach($_POST['filter'] as $i=>$filter)
			{
				$field=$filter['field'];
				$str=$field;
				switch ($filter['data']['type'])
				{
					case 'numeric':
					{
						switch ($filter['data']['comparison'])
						{
							case 'lt':
							{
								$str=$str.'<'.$filter['data']['value'];
								break;
							}
							case 'gt':
							{
								$str=$str.'>'.$filter['data']['value'];
								break;
							}
							case 'eq':
							{
								$str=$str.'='.$filter['data']['value'];
								break;
							}
							default:
								break;
						}
						break;
					}
					case 'date':
					{
						$date="STR_TO_DATE('".$filter['data']['value']."','%m/%d/%Y')";
						$str='date('.$str.')';
						//$date=date('Y-m-d',strtotime($filter['data']['value']));
						switch ($filter['data']['comparison'])
						{
							case 'lt':
							{
								$str=$str.'<'.$date;
								break;
							}
							case 'gt':
							{
								$str=$str.'>'.$date;
								break;
							}
							case 'eq':
							{
								$str=$str.'='.$date;
								break;
							}
							default:
								break;
						}
						break;
					}
					default:
						break;
				}
				$query=$query.$str.' AND ';
			}
			return substr($query,0,-5);
		}
	}
	function replaceItem(&$json,$startStr,$replacement)
	{
		//前提是$json是合法的json字符串
		$startPos=strpos($json,$startStr);
		$endPos=strpos($json,'}',$startPos);
		$pos=$startPos;
		//$count=0;
		while (1)
		{
			$pos=strpos($json,'{',$pos);
			if ($pos>$endPos)
				break;
			else
				$endPos=strpos($json,'}',$endPos);
		}
		substr_replace($json,$replacement,$startPos,$endPos-$startPos);
	}
	function filterParser()
	{
		if(!isset($_POST['filter']))
			return '';
		foreach($_POST['filter'] as $i=>$filter)
		{
			$field=$filter['field'];
			$str=$field;
			switch ($filter['data']['type'])
			{
				case 'numeric':
				{
					switch ($filter['data']['comparison'])
					{
						case 'lt':
						{
							$str=$str.'<'.$filter['data']['value'];
							break;
						}
						case 'gt':
						{
							$str=$str.'>'.$filter['data']['value'];
							break;
						}
						case 'eq':
						{
							$str=$str.'='.$filter['data']['value'];
							break;
						}
						default:
							break;
					}
					break;
				}
				case 'date':
				{
					$date="STR_TO_DATE('".$filter['data']['value']."','%m/%d/%Y')";
					$str='date('.$str.')';
					//$date=date('Y-m-d',strtotime($filter['data']['value']));
					switch ($filter['data']['comparison'])
					{
						case 'lt':
						{
							$str=$str.'<'.$date;
							break;
						}
						case 'gt':
						{
							$str=$str.'>'.$date;
							break;
						}
						case 'eq':
						{
							$str=$str.'='.$date;
							break;
						}
						default:
							break;
					}
					break;
				}
				default:
					break;
			}
			$query=$query.$str.' AND ';
		}
		return substr($query,0,-5);
	}
?>
