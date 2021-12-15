<?php
declare(strict_types=1);
session_start(); //Стартуем session and add cookes [PHPSESSID]
include "logs.php";
$usWrite = $_POST;
foreach ($usWrite as $key => $value){
	echo $key;
	$str_j = str_replace("_",".",$key);
	echo $str_j;
	if (isset($E["${str_j}"])){
		echo "yes";
	}
	else if(!isset($E["${str_j}"])){
		echo "no";
	}
}