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
  //constructor
  public function _construct(){
    $this->uid = null;
	$this->fields = array('user'=>'',
	                      'real_name'=>'',
						  'department'=>'',
						  'email'=>'',
						  'cellphone'=>'',
						  'telephone'=>'',
	                      'password'=> '',
						  'activate'=>0,
						   'authority'=>1);
	}
  //retrieve properties
  public function _get($field){
    if($field == 'userId')
	  return $this->uid;
	else  $mm=$this->fields[$field];
	
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
	$query = sprintf('select user,password,authority,'.
	'real_name,department,email,cellphone,telephone,'.
	'activate from %suser where userid = %d;',DB_TBL_PREFIX,$userId);
	$result = mysql_query($query,$GLOBALS['DB']);
	if($result)
	{
	  if(mysql_num_rows($result))
	    {
	      $row = mysql_fetch_assoc($result);
	      $u->user = $row['user'];
	      $u->password = $row['password'];
	      $u->authority = $row['authority'];
		  $u->real_name = $row['real_name'];
		  $u->department=$row['department'];
		  $u->email=$row['email'];
		  $u->cellphone=$row['cellphone'];
		  $u->telephone=$row['telephone'];
		  $u->activate=$row['activate'];
	      $u->uid = $userId;
	  }
	   mysql_free_result($result);
	}
	 
	  return $u;
	  }
   //return user object by user
   public static function getByUsername($user){
    $u = new User();
	$query = sprintf('select userid,password,authority,activate,'.
	'real_name,department,email,cellphone,telephone'.
	'      from %suser where user = "%s";',DB_TBL_PREFIX,
	 mysql_real_escape_string($user,$GLOBALS['DB']));
	$result = mysql_query($query,$GLOBALS['DB']);
	if($result)
	{ 
	   $flag = mysql_num_rows($result);
	  if(mysql_num_rows($result))
	   {
	      $row = mysql_fetch_assoc($result);
	      $u->user = $user;
	      $u->password = $row['password'];
	      $u->authority = $row['authority'];
		  $u->real_name=$row['real_name'];
		  $u->department=$row['department'];
		  $u->email=$row['email'];
		  $u->cellphone=$row['cellphone'];
		  $u->telephone=$row['telephone'];
		  $u->activate = $row['activate'];
	      $u->uid = $row['userid'];
	   }
	    mysql_free_result($result);
	}
	  return $u;
	  }

    // save to database
   public function save(){
     if($this->uid)
	 {
	  $query = sprintf('UPDATE %sUSER SET USER = "%s",'.
	       'PASSWORD = "%s",authority = %d,real_name="%s",'.
		   'department= %d,email="%s",cellphone="%s",'.
		   'telephone="%s",ACTIVATE=%d WHERE USERID = %d;',DB_TBL_PREFIX,
	        mysql_real_escape_string($this->user,$GLOBALS['DB']),
	        mysql_real_escape_string($this->password,$GLOBALS['DB']),
	        $this->authority,
			mysql_real_escape_string($this->real_name,$GLOBALS['DB']),
			$this->department,
			mysql_real_escape_string($this->email,$GLOBALS['DB']),
			mysql_real_escape_string($this->cellphone,$GLOBALS['DB']),
			mysql_real_escape_string($this->telephone,$GLOBALS['DB']),
			$this->activate,$this->uid);
	  return mysql_query($query,$GLOBALS['DB']);
	  }else
	  {
	  $query = sprintf('INSERT INTO %sUSER (USER,PASSWORD,'.
	        'AUTHORITY,real_name,department,email,'.
			'cellphone,telephone,ACTIVATE) VALUES("%s","%s",%d,"%s",%d,"%s","%s","%s",%d);',
			  DB_TBL_PREFIX,
	          mysql_real_escape_string($this->user,$GLOBALS['DB']),
	          mysql_real_escape_string($this->password,$GLOBALS['DB']),
	        $this->authority,
			mysql_real_escape_string($this->real_name,$GLOBALS['DB']),
			$this->department,
			mysql_real_escape_string($this->email,$GLOBALS['DB']),
			mysql_real_escape_string($this->cellphone,$GLOBALS['DB']),
			mysql_real_escape_string($this->telephone,$GLOBALS['DB']),
			$this->activate);
	  if(mysql_query($query,$GLOBALS['DB'])){
	     $this->uid = mysql_insert_id($GLOBALS['DB']);
		 return true;
		 }
	   else return false;
	   }
	  }
	public function remove()
	{
	  $query = sprintf('DELETE FROM %sUSER WHERE USERID = %d ;',DB_TBL_PREFIX,$this->uid);
	    return mysql_query($query,$GLOBALS['DB']);
	}
	public function activate()
	{
	 $query = sprintf('update %sUSER set activate = %d WHERE USERID = %d ;',DB_TBL_PREFIX,1,$this->uid);
	    return mysql_query($query,$GLOBALS['DB']);
	  }
	public function inActivate()
	{
	 $query = sprintf('update %suser set activate = %d where userid = %d ;',
	 DB_TBL_PREFIX,0,$this->uid);
	 return  mysql_query($query,$GLOBALS['DB']);
	 }
	  
}


?>