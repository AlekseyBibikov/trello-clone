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
			str_j = str_j.replace("[", "/");
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
					const obj = JSON.parse(str_j);
					console.log(str_j);
					localStorage.setItem("trello", JSON.stringify(obj));
				}
			});
			request.send();
		
			Application.load();
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