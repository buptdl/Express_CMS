<?php
	class YQConfig
	{
		//full path of the config file
		var $filename;
		//resource of the config file
		var $handle;
		//config
		var $config;
		//constructor
		function YQConfig($filename)
		{
			$this->filename=$filename;
		}
		//open the config file
		function open()
		{
			//if the config file does not exist, create one then open
			@$this->handle=fopen($this->filename,'r') or $this->create() and $this->open();
		}
		function close()
		{
			fclose($this->handle);
		}
		//read the config from the file into $config
		function read()
		{
			$this->open();
			$this->config=new stdclass;
			while(!feof($this->handle))
			{
				$this->loadOneLine(fgets($this->handle));
			}
			$this->close();
			//print_r($this->config);
		}
		function get($key)
		{
			return $this->config->$key;
		}
		//interprete one line
		function loadOneLine($buff)
		{
			//don't know why but always one more space in the tail of a line...
			$buff=trim($buff);
			//exclude
			if (0==strlen($buff) or "#"==substr($buff,0,1))
				return;
			//split $buff into two pieces with the splitter \t, the first part is key while another is value
			$pair=explode("\t",$buff);
			$this->config->$pair[0]=$pair[1];
		}
		//create a new config file
		function create()
		{
			//windows style
			$n="\r\n";
			$this->handle=fopen($this->filename,'w');
			$this->config=$this->defaultConfig();
			//write head of the config file
			fwrite($this->handle,"#MYSQL config file".$n);
			//write each pair of key and value per line
			foreach($this->config as $key=>$value)
			{
				fwrite($this->handle,$key."\t".$value.$n);
			}
			fclose($this->handle);
			return 1;
		}
		//return an std object, which content is the config
		function defaultConfig()
		{
			$default='{
				"MYSQL_HOST":"59.64.138.184",
				"MYSQL_USER":"root",
				"MYSQL_PSW":"123",
				"MYSQL_DB":"buptyq"
			}';
			return json_decode($default);
		}
	}
?>
