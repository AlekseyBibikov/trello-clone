<?php
declare(strict_types=1);
session_start(); 

$array = $_GET;
foreach($array as $key => $value){
	// print_r($key);
	if($key = "get"){
		// echo "block2";
		$str_j = file_get_contents("./json-lib/{$_SESSION['login']}.json");
		echo $str_j;
	}
	else{
		echo "block1";
		$str_j = str_replace("/","[",$key);
		print_r($str_j);
		file_put_contents("./json-lib/{$_SESSION['login']}.json" ,"{$str_j}");	
	}
}
