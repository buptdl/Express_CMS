<?php
class briefReport
{
	function briefReport(){
		define('MYSQL_HOST','59.64.138.184');
		define('MYSQL_USER','root');
		define('MYSQL_PSW','123');
		define('MYSQL_DB','buptyq');
		include_once('lib.php');
	}
	function getMySQLQuery(){}
	function getReport(){
		$start=$_POST['start'];
		$length=$_POST['limit'];
		$dbUse=new buptYQDatabase(MYSQL_HOST,MYSQL_USER,MYSQL_PSW,MYSQL_DB);
		$dbUse->createDbLink();
		mysql_query('set names "utf8"');
		$arr=array();
		$query=$this->getMySQLQuery();
		$total=$dbUse->getArray($query,$start,$length,$arr);
		$dbUse->destroyDbLink();
		$dbUse->returnGridJson($arr,$total);
	}
}

class dayBriefReport extends briefReport
{
	
	function getMySQLQuery(){
		if (isset($_POST['filter']))
			return 'SELECT * FROM pris_briefs WHERE type=1 AND '.filterParser().' ORDER BY date DESC';
		else
			return 'SELECT * FROM pris_briefs WHERE type=1 ORDER BY date DESC';
	}
}

class weekBriefReport extends briefReport
{
	
	function getMySQLQuery(){
		if (isset($_POST['filter']))
			return 'SELECT * FROM pris_briefs WHERE type=2 AND '.filterParser().' ORDER BY date DESC';
		else
			return 'SELECT * FROM pris_briefs WHERE type=2 ORDER BY date DESC';
	}
}

class monthBriefReport extends briefReport
{
	
	function getMySQLQuery(){
		if (isset($_POST['filter']))
			return 'SELECT * FROM pris_briefs WHERE type=3 AND '.filterParser().' ORDER BY date DESC';
		else
			return 'SELECT * FROM pris_briefs WHERE type=3 ORDER BY date DESC';
	}
}
?>
