<?php
declare(strict_types=1);
session_start(); //Стартуем session and add cookes [PHPSESSID]
if($_SERVER['REQUEST_METHOD'] === 'POST'){
	if (($_POST['login'] == $_SESSION['login'])&&($_POST['password'] == $_SESSION['password'])){
		header("Location: trello-clone.html");
	}else {
		
		echo "Не верный логин или пароль!";
	}
	
}
if (isset($_COOKIE['trello-clone'])&&(isset($_SESSION['login']))&&(isset($_SESSION['password']))){
		echo "<head><link rel='icon' type='image/png' href='icon.png'/></head>
		<body style='background:purple; text-align:center; height:100vh; font-weight:bold; color:white;'>
				<h1>Приветствую вас, ${_COOKIE['trello-clone']}</h1>
				<form action='index.php' method='POST'>
						<input type='email' name='login' placeholder='Введите логин' required>
						<input id='password' type='password' name='password' placeholder='Введите пароль' required>
						<button type='submit' >Войти</button>
					</form>
			</body>";
			
	}else{		
		readfile('form.html');
		
	}


	
	

