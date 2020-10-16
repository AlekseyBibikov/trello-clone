class Note {
	constructor(id = null, content = ''){
		const instance = this
		
		const element = this.element = document.createElement('div')
		element.classList.add("note")
		element.setAttribute("draggable", "true")
		element.textContent = content
		if (id){
			element.setAttribute('data-note-id', id)			
		}
		else{
			element.setAttribute('data-note-id', Note.idCounter)			
			Note.idCounter++
		}
		element.addEventListener('dblclick', function(event){
			element.setAttribute('contenteditable', true)
			element.removeAttribute('draggable')
			instance.column.removeAttribute('draggable')
			element.focus()
		})
		element.addEventListener('blur', function(event){
			element.removeAttribute('contenteditable')
			element.setAttribute('draggable', true)
			instance.column.setAttribute('draggable', true)
			if ((!element.textContent.trim().length) && (element.className!==document.querySelector('.column-header').className )){
				element.remove()
			}
			Application.save();		
		})	
		
		element.addEventListener('dragstart', this.dragstart.bind(this))		
		element.addEventListener('dragend', this.dragend.bind(this))
		element.addEventListener('dragenter', this.dragenter.bind(this))
		document
			.querySelector('.columns')
			.addEventListener('dragover', this.dragover.bind(this))
		element.addEventListener('dragleave', this.dragleave.bind(this))
		element.addEventListener('drop', this.drop.bind(this))	
	
		
		
	}	
	// return element column up DOM
	get column (){
		return this.element.closest('.column')
	}
	
	
	dragstart (event) {
		//console.log('dragstart' ,event, this.element)
		Note.dragNote=this.element
		
		this.element.classList.add('dragged')
		event.stopPropagation()
	}
	dragend(event) {
		// console.log('dragend' ,event, this.element)
		Note.dragNote=null
		this.element.classList.remove('dragged')
		document
			.querySelectorAll('div')
			.forEach(x => x.classList.remove('under'))
		document
			.querySelectorAll('div')
			.forEach(x => x.classList.remove('dragged'))
		Application.save();
	}
	dragenter(event) {
		if (Note.dragNote===this.element){return}
		if (Note.dragNote.classList.contains('column')){
			Note.dragEnter = this.element
			this.element.classList.contains('column')?this.element.classList.add('under'):this.column.classList.add('under')		
			
		}
		else {
			this.element.classList.contains('note')?this.element.classList.add('under'):true;
		}
	}
	dragover(event) {		
		event.preventDefault() // что бы работал drop
		if (Note.dragNote===this.element){return}
		if (event.target.className === 'columns'){			
			document
			.querySelectorAll('div')
			.forEach(x => x.classList.remove('under'))
		//console.log(event.target.className === 'columns')
		}
		
		
					
	}
	dragleave(event) {
		
		if (Note.dragNote===this.element){return}
		// console.log('dragleave' ,event, this.element)
		if (this.element.classList.contains('note')){
			 this.element.classList.remove('under')
		}
			
	}
	drop(event) {
		event.stopPropagation()
		if (Note.dragNote===this.element){return }
		if (Note.dragNote.classList.contains('column')){
			let this_element = this.element
			let columnArray = Array.from(this_element.parentElement.querySelectorAll('.column'))
			let indexThis=columnArray.indexOf(this_element)
			let indexDrag=columnArray.indexOf(Note.dragNote)
			
			//console.log('column', columnArray, indexThis, indexDrag)
			if (indexThis == -1){
				this_element = this.column
				columnArray = Array.from(this_element.parentElement.querySelectorAll('.column'))
				indexThis=columnArray.indexOf(this_element)
				indexDrag=columnArray.indexOf(Note.dragNote)
			}		
			if (indexThis < indexDrag){
				this_element.parentElement.insertBefore(Note.dragNote , this_element)
			}
			else{
				this_element.parentElement.insertBefore(Note.dragNote , this_element.nextElementSibling)
			}
			
		}
		 //console.log(indexA, indexB, note, this.element, Note.dragNote)
		// console.log('drop' ,event, this.element.className, document.querySelector('.column-header').className )
		else {
			const note= Array.from(this.element.parentElement.querySelectorAll('.note'))
			const indexA=note.indexOf(this.element)
			const indexB=note.indexOf(Note.dragNote)
			if ((note.length === document.querySelectorAll('.note').length)&&
			(this.element.querySelector('[data-notes]') != null)){
				this.element.querySelector('[data-notes]').append(Note.dragNote)		
			}
			else if (indexB==-1){
				this.element.parentElement.insertBefore(Note.dragNote , this.element)			
			}
			else if (indexA < indexB){
				this.element.parentElement.insertBefore(Note.dragNote , this.element)
			}
			else{
				this.element.parentElement.insertBefore(Note.dragNote , this.element.nextElementSibling)
			}
		}
	}
}
Note.idCounter = 8;
Note.dragNote = null;
