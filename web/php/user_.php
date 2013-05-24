<?php 
class User {

  //authority levels
  const PARAM_CONFIG = 2;
  const ADD_USER = 4;
  const DELETE_USER = 8;
  
  //user id
  private $uid;
  //other record fields
  private $fields;
  // department's id:name values
  public static $arr_dep = array(0=>"", 1=>"总经理", 2=>"财务部", 3=>"客服部", 4=>"操作部");
  
  //constructor
  public function _construct(){
    $this->uid = null;
    // 用户ID在php中为uid, 在 DB-sql中为staff_id
	$this->fields = array(
		'name'=>'', 'age'=>'', 'hometown'=>'',
		'phone'=>'', 'email'=>'', 'entry_time'=>'',
		'IDnumber'=>'', 'sex'=>'', 'department'=>'', 
		'system_name'=>'', 'password'=>'', 
		'aut_exp'=>'', 'aut_fin'=>'', 'aut_cli'=>''
		);
	}
	
  // get depart_id's map.
  public static function depart_map($did){
    if($did < 5 && 0 < $did){
      return self::$arr_dep[$did]; // 返回Index.
    }
    return array_search($did, self::$arr_dep); // 无匹配时返回FALSE
  }
  
  //retrieve properties
  public function _get($field){
    if($field == 'userId')
	  return $this->uid;
	// else  $mm=$this->fields[$field];  // @test
	
	return $this->fields[$field];
  }
  
  //set properties
  public function _set($field,$value){
   if(array_key_exists($field,$this->fields))
     $this->fields[$field] = $value;     
  }
  
  //return user object by user id
  public static function getById($userId){
    $u = new User();
	$query = sprintf(
		'select s.name, s.age, s.hometown, s.phone, s.email, s.entry_time, ' .
		's.IDnumber, s.sex, s.depart_id, s.system_name, s.password, ' .
		's.aut_exp, s.aut_fin, s.aut_cli ' .
		'from staff s ' .
		'where s.staff_id=%d;', $userId);
	$result = mysql_query($query,$GLOBALS['DB']);
	//die('[user_.php::getById] ' . $query); // @test
	
	if($result)	{
	  if(mysql_num_rows($result)) {
	      $row = mysql_fetch_assoc($result);
	      $u->name = $row['name'];
	      $u->age = $row['age'];
	      $u->hometown = $row['hometown'];
	      $u->phone = $row['phone'];
	      $u->email = $row['email'];
	      $u->entry_time = $row['entry_time'];
	      $u->IDnumber = $row['IDnumber'];
	      $u->sex = $row['sex'];
	      // 内部映射
	      $u->department = self::depart_map($row['depart_id']);
	      $u->system_name = $row['system_name'];
	      $u->password = $row['password'];
	      $u->aut_exp = $row['aut_exp'];
	      $u->aut_fin = $row['aut_fin'];
	      $u->aut_cli = $row['aut_cli'];

	      $u->uid = $userId;
	  }
	  mysql_free_result($result);
	}
	 
	return $u;
  }
  
  //return user object by user's system_name
  public static function getByUsername($user){
    $u = new User();
	$query = sprintf(
		'select staff_id, name, age, hometown, phone, email, entry_time, ' .
		'IDnumber, sex, depart_id, password, aut_exp, aut_fin, aut_cli ' .
		'from staff where system_name="%s";', mysql_real_escape_string($user,$GLOBALS['DB']));
	$result = mysql_query($query,$GLOBALS['DB']);
	//die('[user_.php::getByUsername] ' . $query); // @test
	
	if($result)	{ 
	  $flag = mysql_num_rows($result);
	  if(mysql_num_rows($result)) {
	  	  $row = mysql_fetch_assoc($result);
	      $u->uid = $row['staff_id'];
	      $u->name = $row['name'];
	      $u->age = $row['age'];
	      $u->hometown = $row['hometown'];
	      $u->phone = $row['phone'];
	      $u->email = $row['email'];
	      $u->entry_time = $row['entry_time'];
	      $u->IDnumber = $row['IDnumber'];
	      $u->sex = $row['sex'];
	      // 内部映射
	      $u->department = self::depart_map($row['depart_id']);
	      $u->password = $row['password'];
	      $u->aut_exp = $row['aut_exp'];
	      $u->aut_fin = $row['aut_fin'];
	      $u->aut_cli = $row['aut_cli'];

	      $u->system_name = $user;
	   }
	   mysql_free_result($result);
	}
	return $u;
  }

  // save to database
  public function save(){
  	if(empty($this->uid)){  // new-user, INC id first.
  	  $this->uid = 1 + mysql_query('select max(staff_id) from staff', $GLOBALS['DB']);
  	}
     //if($this->uid) {
	   $query = sprintf(
	   	   'replace into staff values( 
	   	       %d, "%s", %d, "%s", null, %d, 
	   	       "%s", null, %d, "%s", %d, "%s", 
	   	       "%s", "%s", %d, %d, %d, null 
	   	   )', 
	   	   $this->uid, mysql_real_escape_string($this->name,$GLOBALS['DB']),
	   	   $this->age, mysql_real_escape_string($this->hometown,$GLOBALS['DB']),
	   	   /*no salary*/ $this->phone, 
	   	   $this->entry_time, /*no leave_time*/
	   	   //mysql_real_escape_string(date("Y-m-d",$this->leave_time),$GLOBALS['DB']),
	   	   $this->IDnumber, $this->sex=='m'? 'm':'f', self::depart_map($this->department),
	   	   mysql_real_escape_string($this->email,$GLOBALS['DB']),
	   	   mysql_real_escape_string($this->system_name,$GLOBALS['DB']),
	   	   mysql_real_escape_string($this->password,$GLOBALS['DB']),
	   	   $this->aut_exp, $this->aut_fin, $this->aut_cli
	   );
	// die($query);  //@test
	return mysql_query($query,$GLOBALS['DB']); // haven't check the DB.
  }
	  
  public function remove() {
	  $query = sprintf(
	  	'DELETE FROM staff WHERE staff_id = %d ;',$this->uid
	  );
	  //die($query); //@test
	  return mysql_query($query,$GLOBALS['DB']);
  }
	
  // set the authority of {aut_exp, aut_fin, aut_cli}.
  public function authority($type, $val) {
  	if( ($type!='aut_exp' && $type!='aut_fin' && $type!='aut_cli') ||
  		($val < 0 && 10 < $val) ){
  		return false;	
  	}
	 $query = sprintf(
	 	'update staff set %s = %d WHERE staff_id = %d ;', $type, $val, $this->uid
	 );
	 //die($query); //@test
	 return mysql_query($query,$GLOBALS['DB']);
  }
	  
}

?>