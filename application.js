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
		
	},
	
	load() {
		if (!localStorage.getItem("trello")){
			Application.save();
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