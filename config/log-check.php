<?php
declare(strict_types=1);
session_start(); //Стартуем session and add cookes [PHPSESSID]
include "logs.php";
try {
if (!isset($E["${_POST['email']}"])){
	throw new Exception ('Неверный логин или пароль.');
} 
else if ($E["${_POST['email']}"][0] === $_POST['password']){
	$_SESSION['name'] = $E["${_POST['email']}"][1]; 
	$_SESSION['login'] = $_POST['email']; // сохраняем логин и пароль
	$_SESSION['password'] = $_POST['password']; 
	setcookie("trello-clone", $E["${_POST['email']}"][1], ['path'=>"/"]);

echo "
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset='utf-8'>
			<meta name='viewport' content='width=device-width'>
			<title>Trello clone</title>
			<link href='../css/style.css' rel='stylesheet' type='text/css' />
			<link href='../css/form.css' rel='stylesheet' type='text/css' />
			<link href='https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap&subset=cyrillic-ext' rel='stylesheet'>
			<link rel='icon' type='image/png' href='../icon.png'/>
		</head>
		<body>
			<div class='container'>
				<div style='text-align:center; color:white; font-weight:bold'>
					<h1>Приветствую вас, ".$E["${_POST['email']}"][1]."</h1>
					<span>Для продолжения нажмите START</span>
					<a href='../trello-clone.html' style='width:60px; background-color:#0af15f; display:block; margin:10px auto; padding:5px; font-family:auto;'>START</a>
				</div>
			</div>
		</body>
	</html>";
}
else{
		echo "
	<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width'>
		<title>Trello clone</title>
		<link href='../css/style.css' rel='stylesheet' type='text/css' />
		<link href='../css/form.css' rel='stylesheet' type='text/css' />
		<link href='https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap&subset=cyrillic-ext' rel='stylesheet'>
		<link rel='icon' type='image/png' href='../icon.png'/>
	</head>
	<body>
		<div class='container'>
			<div class='container_form'>
			<span class='hfont'>ВХОД</span>
<span style='display:block; color:red; font-size:13px;'>Пароль неверный!</span>
				<form action='./log-check.php' method='POST'>
					<input type='email' name='email' placeholder='Введите электронную почту' required>
					<input id='password' type='password' name='password' placeholder='Введите пароль' required>
					<button type='submit' >Войти</button>
				</form>
			</div>
		</div>
	</body>
</html>";
} 
}

catch (Exception $er){	
	echo "
	<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width'>
		<title>Trello clone</title>
		<link href='../css/style.css' rel='stylesheet' type='text/css' />
		<link href='../css/form.css' rel='stylesheet' type='text/css' />
		<link href='https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap&subset=cyrillic-ext' rel='stylesheet'>
		<link rel='icon' type='image/png' href='../icon.png'/>
	</head>
	<body>
		<div class='container'>
			<div class='container_form'>
			<span class='hfont'>ВХОД</span>
<span style='display:block; color:red; font-size:13px;'> {$er->getMessage()} </span>
				<form action='./log-check.php' method='POST'>
					<input type='email' name='email' placeholder='Введите электронную почту' required>
					<input id='password' type='password' name='password' placeholder='Введите пароль' required>
					<button type='submit' >Войти</button>
				</form>
			</div>
		</div>
	</body>
</html>";
}