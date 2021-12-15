<?php
declare(strict_types=1);
session_start(); 

$array = $_GET;
foreach($array as $key => $value){
	if($key === "get"){
		if (include "./json-lib/{$_SESSION['login']}.json"){
		$str_j = file_get_contents("./json-lib/{$_SESSION['login']}.json");
		echo $str_j;
		}
		else{
			echo "no";
		}
		
	}
	else{
		print_r($key);
		$str_j = str_replace("_"," ",$key);
		$str_j = str_replace("%grid;","#",$str_j);
		$str_j = str_replace("%bracket;","[",$str_j);
		$str_j = str_replace("%point;",".",$str_j);
		$str_j = str_replace("%underline;","_",$str_j);
		$str_j = str_replace("%ampersand;","&",$str_j);
		print_r($str_j);
		file_put_contents("./json-lib/{$_SESSION['login']}.json" ,"{$str_j}");	
	}
}
