class Column {
	constructor(id = null, title = 'В плане'){
		const instance = this
		this.notes = []
		
		const element = this.element = document.createElement("div")
		element.classList.add('column')
		element.setAttribute("draggable","true")
		if (id){
			element.setAttribute('data-column-id', id)
		}
		else{
			element.setAttribute('data-column-id', Column.idCounter)
			Column.idCounter++
		}
		
		element.innerHTML=
			'<div class="delet" >x</div> <p class="column-header">В плане</p>					<div data-notes></div><p class="column-footer">	<span data-action-addNote class="action">+ Добавить карточку</span>			</p>'
		
		element
			.querySelectorAll('.delet')
			.forEach(x => x.addEventListener('click', function(event){
				element.remove()
				})
			)	
		element
			.querySelector('.column-header')
			.innerHTML = title;
		
		const spanAction_addNote= element.querySelector('[data-action-addNote]')
	
		spanAction_addNote.addEventListener('click', function (event){
			const note = new Note;			
			instance.add(note)
			
			note.element.setAttribute('contenteditable', true )
			note.element.focus()
		})
		
		const titleElement = element.querySelector('.column-header')
		
		titleElement.addEventListener('dblclick', function (event){
			titleElement.setAttribute('contenteditable', true)
			instance.element.removeAttribute('draggable')
			titleElement.focus()
		})
		
		titleElement.addEventListener('blur', function(event){
			titleElement.removeAttribute('contenteditable')
			instance.element.setAttribute('draggable', true)
			Application.save();
		})
			
		const note = new Note;
		
		element.addEventListener('dragstart', note.dragstart.bind(this))		
		element.addEventListener('dragend', note.dragend.bind(this))
		element.addEventListener('dragenter', note.dragenter.bind(this))
		//element.addEventListener('dragover', note.dragover.bind(this))
		element.addEventListener('dragleave', note.dragleave.bind(this))
		element.addEventListener('drop', note.drop.bind(this))	
	}
	
	
	add (...notes){
		for (const note of notes){			
			if (!this.notes.includes(note)){
				this.notes.push(note)
				
				this.element.querySelector('[data-notes]').append(note.element)

			}
		}
	}
}
Column.idCounter=3;
