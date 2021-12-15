document.querySelectorAll('input')[1].addEventListener("blur", checkUserLogo);

function checkUserLogo(even){
	let usWrite = even.target.value;
let i = 5;
	while (i){			
			usWrite = usWrite.replace("#", "%grid;");
			usWrite = usWrite.replace("[", "%bracket;");
			usWrite = usWrite.replace(".", "%point;");
			usWrite = usWrite.replace("_", "%underline;");
			usWrite = usWrite.replace("&", "%ampersand;");
		i--;
	}
	const request = new XMLHttpRequest();
	request.open("GET", "./config/user-check.php?" + usWrite);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.addEventListener("readystatechange", () => {
		if (request.readyState === 4 && request.status === 200){
			const Boolean = request.responseText;
			if (Boolean){
				document.querySelectorAll('input')[1].value="";				
				alert("Пользователь с такой почтой уже существует!");
			}
		}
	});
	request.send();
	
}
				
document.querySelectorAll('input').forEach(x=>x.addEventListener(
				"input",
				checkFun
			));
			function checkFun(even){
				let pass = document.querySelector("#password").value;
				let passcheck = document.querySelector("#pasput").value;
				let check = document.querySelectorAll("input")[4];
				if ((pass === "")||(passcheck === "")){				
					<!-- document.querySelector('.checkon').style.display = "none"; -->
					<!-- document.querySelector('.checkoff').style.display = "none"; -->
					check.checked = false;
				}else if(pass === passcheck){
					<!-- document.querySelector('.checkon').style.display = "block"; -->
					<!-- document.querySelector('.checkoff').style.display = "none";			 -->
					check.checked = true;
				}else{
					<!-- document.querySelector('.checkon').style.display = "none"; -->
					<!-- document.querySelector('.checkoff').style.display = "block";			 -->
					check.checked = false;
				}
			}