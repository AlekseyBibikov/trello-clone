const Application = {
	save(){
		const object= {
			columns: {
				idCounter: Column.idCounter,
				items:[]
			},
			notes: {
				idCounter: Note.idCounter,
				items:[]
			}
		}
		
		document
			.querySelectorAll('.column')
			.forEach(columnElement=>{
				const column={
					id: parseInt(columnElement.getAttribute('data-column-id')),
					title: columnElement.querySelector('.column-header').textContent,
					noteIds: []
				}
				columnElement.querySelectorAll('.note')
					.forEach(noteElement=>
						column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')))
					)
				object.columns.items.push(column)
			})
		document
			.querySelectorAll('.note')
			.forEach(noteElement=>{
				const note={
					id: parseInt(noteElement.getAttribute('data-note-id')),
					content: noteElement.textContent
				}
				object.notes.items.push(note)
			})
		const json= JSON.stringify(object)
		
		localStorage.setItem("trello", json)
		
let i = 5;
let str_j = json;
		while (i){			
			str_j = str_j.replace("#", "%grid;");
			str_j = str_j.replace("[", "%bracket;");
			str_j = str_j.replace(".", "%point;");
			str_j = str_j.replace("_", "%underline;");
			str_j = str_j.replace("&", "%ampersand;");
		i--;
		}
		const request = new XMLHttpRequest();
		request.open("GET", "../config/json-check.php?"+str_j, true);
		request.setRequestHeader("Content-type", "application/x-www-form-url");
		request.addEventListener("readystatechange", () => {
			if (request.readyState === 4 && request.status === 200){
			console.log(request.responseText);
			}
		});
		request.send();
		
		// const request = new XMLHttpRequest();
		// request.responseType = "json";
		// request.open("POST", "../config/json-lib.php", true);
		// request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		// request.addEventListener("readystatechange", () =>{
			// if (request.readyState === 4 && request.status === 200){
				// console.log (request.response);
			// }
		// });
		// request.send(json);
		// console.log(json);
	},
	
	load() {
		if (!localStorage.getItem("trello")){
			const request = new XMLHttpRequest();
			request.open("GET", "../config/json-check.php?get", true);
			request.setRequestHeader("Content-type", "application/x-www-form-url");
			request.addEventListener("readystatechange", () => {
				if (request.readyState === 4 && request.status === 200){
					const str_j = request.responseText;
					console.log("Индекс строки ошибки file_get_contents(поиск по файлам json)" +str_j.search(/(\bWarning.*)(\bfile_get_content.*)(\/json-lib\/)/))
					console.log(str_j);
					if ((str_j.search(/(\bWarning.*)(\bfile_get_content.*)(\/json-lib\/)/) !== -1)){
						Application.save();
						Application.load();
					}else{
					console.log(str_j);
					const obj = JSON.parse(str_j);
					localStorage.setItem("trello", JSON.stringify(obj));
					Application.load();
					}
				}
			});
			request.send();

			return
		}
		const mountePoint = document.querySelector('.columns')
		mountePoint.innerHTML = '';
		
		const object = JSON.parse(localStorage.getItem("trello"))
		const getNoteById = id =>object.notes.items.find(note => note.id === id)
		
		for (const {id, noteIds, title} of object.columns.items){
			const column = new Column (id, title)
			mountePoint.append(column.element)
			//mountePoint.querySelector('.column-header').innerHTML = title;
			
			for (const noteId of noteIds){
				const {id, content} = getNoteById(noteId)
				
				const note = new Note(id, content)
				column.add(note) //column.element.querySelector('[data-notes]').append(note.element)
			}
		}
		Column.idCounter=object.columns.idCounter
		Note.idCounter=object.notes.idCounter
		
	}

}