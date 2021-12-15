<?php
declare(strict_types=1);
session_start(); //Стартуем session and add cookes [PHPSESSID]
include "logs.php";
$usWrite = $_GET;
foreach ($usWrite as $key => $value){
		$str_j = str_replace("_"," ",$key);
		$str_j = str_replace("%grid;","#",$str_j);
		$str_j = str_replace("%bracket;","[",$str_j);
		$str_j = str_replace("%point;",".",$str_j);
		$str_j = str_replace("%underline;","_",$str_j);
		$str_j = str_replace("%ampersand;","&",$str_j);
	echo isset($E["{$str_j}"]);
	
}