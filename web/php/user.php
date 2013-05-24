<?php 
class User {

//  authority levels
//  const PARAM_CONFIG = 2;
//  const ADD_USER = 4;
//  const DELETE_USER = 8;
  //user id
  private $uid;
  //other record fields
  private $fields;
  //constructor
  public function _construct(){
    $this->uid = null;
    // 系统用户名在php中为user字段， 在DB-sql中为system_name    
	$this->fields = array('name'=>'', 'age'=>'', 'phone'=>'', 
						'sex'=>'', 'depart_id'=>'', 'email'=>'',
						'user'=>''/*system_name*/, 'password'=>'', 'aut_exp'=>0,
						'aut_fin'=>0, 'aut_cli'=>0
	      				);
	}
  //retrieve properties
  public function _get($field){
    if($field == 'userId')  // userId为外部php文件请求用户ID的字段名
	  return $this->uid;
//	else  $mm=$this->fields[$field];  // @mod
	
	return $this->fields[$field];
	}
  //set properties
  public function _set($field,$value){  // 不能设置uid的值
    if(array_key_exists($field,$this->fields))
      $this->fields[$field] = $value;
    }
  //return user object by user id
  public static function getById($userId){
    $u = new User();
	$query = sprintf('select name, age, phone, sex, depart_id, email, '.
	'user, password, aut_exp, aut_fin, aut_cli '.
	'from staff where staff_id = %d;',$userId);
	$result = mysql_query($query,$GLOBALS['DB']);
	if($result) {
	  if(mysql_num_rows($result)) {
	      $row = mysql_fetch_assoc($result);
	      $u->uid = $userId; // @add
	      $u->name = $row['name'];
	      $u->age = $row['age']; 
	      $u->phone = $row['phone'];
	      $u->sex = $row['sex'];
	      $u->depart_id = $row['depart_id'];
	      $u->email = $row['email'];
	      $u->user = $row['system_name'];
	      $u->password = $row['password'];
	      $u->aut_exp = $row['aut_exp'];
	      $u->aut_fin = $row['aut_fin'];
	      $u->aut_cli = $row['aut_cli'];
	  }
	  mysql_free_result($result);
	}
	 
	return $u;
  }
   //return user object by user
   public static function getByUsername($user) {
    $u = new User();
	$query = sprintf('select staff_id, name, age, phone, '.
	'sex, depart_id, email, password, aut_exp, aut_fin, aut_cli '.
	'from staff where system_name = "%s";',mysql_real_escape_string($user,$GLOBALS['DB']));
	$result = mysql_query($query,$GLOBALS['DB']);
	if($result) { 
	   $flag = mysql_num_rows($result);
	  if(mysql_num_rows($result)) {
	      $row = mysql_fetch_assoc($result);
	      $u->name = $user;  // @mod
	      $u->uid = $row['staff_id'];
	      $u->age = $row['age']; 
	      $u->phone = $row['phone'];
	      $u->sex = $row['sex'];
	      $u->depart_id = $row['depart_id'];
	      $u->email = $row['email'];
	      $u->user = $row['system_name'];
	      $u->password = $row['password'];
	      $u->aut_exp = $row['aut_exp'];
	      $u->aut_fin = $row['aut_fin'];
	      $u->aut_cli = $row['aut_cli'];
	   }
	    mysql_free_result($result);
	}
	return $u;
  }

    // save to database
   public function save() {
     if($this->uid) {
	  $query = sprintf('UPDATE staff SET ' .
	  		'name="%s", age = %d, phone = %d, ' .
	  		'sex = "%s", depart_id = %d, email = "%s", '.
			'system_name = "%s", password = "%s", ' .
			'aut_exp = %d, aut_fin = %d, aut_cli = %d' .
		    'WHERE staff_id = %d;',
	        mysql_real_escape_string($this->name,$GLOBALS['DB']),
	        $this->age, $this->phone, 
	        mysql_real_escape_string($this->sex,$GLOBALS['DB']),
	        $this->depart_id, 
			mysql_real_escape_string($this->email,$GLOBALS['DB']),
			mysql_real_escape_string($this->user,$GLOBALS['DB']),
			mysql_real_escape_string($this->password,$GLOBALS['DB']),			
			$this->aut_exp, $this->aut_fin, $this->aut_cli,$this->uid
			);
	  return mysql_query($query,$GLOBALS['DB']);
	} else {
	  	$query = sprintf('INSERT INTO staff ' .
	  			'(name, age, phone, sex, depart_id, email, '.
				'system_name, password, aut_exp, aut_fin, aut_cli)' .
				'values("%s", %d, %d, "%s", %d, "%s", "%s", "%s", %d, %d, %d);',
	        mysql_real_escape_string($this->name,$GLOBALS['DB']),
	        $this->age, $this->phone, 
	        mysql_real_escape_string($this->sex,$GLOBALS['DB']),
	        $this->depart_id, 
			mysql_real_escape_string($this->email,$GLOBALS['DB']),
			mysql_real_escape_string($this->user,$GLOBALS['DB']),
			mysql_real_escape_string($this->password,$GLOBALS['DB']),
			$this->aut_exp, $this->aut_fin, $this->aut_cli);
		  if(mysql_query($query,$GLOBALS['DB'])){
		     $this->uid = mysql_insert_id($GLOBALS['DB']);
			 return true;
		  } else {
		  	return false;
		  }
	  }
  }
	public function remove() {
	  $query = sprintf('DELETE FROM staff WHERE staff_id = %d ;',DB_TBL_PREFIX,$this->uid);
	    return mysql_query($query,$GLOBALS['DB']);
	}
	
	public function activate()
	{
//	 $query = sprintf('update staff set activate = %d WHERE USERID = %d ;',DB_TBL_PREFIX,1,$this->uid);
	    return true;  //  mysql_query($query,$GLOBALS['DB']);  // @mod
	  }
	public function inActivate()
	{
//	 $query = sprintf('update %suser set activate = %d where userid = %d ;',
//	 DB_TBL_PREFIX,0,$this->uid);
	 return true;  //   mysql_query($query,$GLOBALS['DB']);  // @mod
	 }
	  
}


?>