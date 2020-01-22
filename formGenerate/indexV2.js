
		var events = function(){
			document.getElementsByClassName('add__btn')[0].addEventListener('click' , function(e){
				e.preventDefault();
				redux.switch(document.forms.add_achievs);
			})
		}()

		var redux = {
			'switch': function(form){
				if($(form.parentElement).css('display') == 'none'){
					$(form.parentElement).slideDown(1000);
				  }else{
					$(form.parentElement).slideUp(1000);
				  }
			},
			'formAddRender': function(form){
			  console.log(form);
			  document.getElementsByClassName('achievements-add')[0].appendChild(
				form
			  )
			  redux.switch(form);

		   }
		}
        
		var fieldsFormAdd = {
			'1': {
				'default': 3,
				'title': '',
				'type': 'form',
				'fields': {
					'id': 'new-achievs-form',
					'name': 'add_achievs'
				},
				'inElement':{
					'1': {
						'default': 3,
						'title': 'Новое индивидуальное достижение',
						'type': 'group',
						'fields': {
							'className': 'section__title'
						},
						'inElement':{
							'0':{
								'default': 0,
								'title': 'Достижение',
								'type': 'InputText',
								'fields': {
									'placeholder': 'Не выбрано',
									'name': 'achievs-type'
								},
							},
							'1':{
								'default': 0,
								'title': 'Орган выдавший документ',
								'type': 'InputText',
								'fields': {
									'placeholder': 'Орган выдавший документ',
									'name': 'achievs-org-name'
								},
							},
							'2':{
								'default': 0,
								'title': 'Серия документа',
								'type': 'InputText',
								'madFields':{
									'setMaxValue': 16,
									'setPlaceholder': '__ __',
									'setMask': '{0,2}[ ]{0,2}'
								},
								'fields': {
									'placeholder': 'Серия документа',
									'name': 'achievs-doc-ser'
								},
							},
							'3':{
								'default': 0,
								'title': 'Номер документа',
								'type': 'InputText',
								'madFields':{
									'setMaxValue': 16,
									'setPlaceholder': '______',
									'setMask': '{0,3}[-]{0,3}[-]{0,3}[-]{0,2}'
								},
								'fields': {
									'placeholder': 'Номер документа',
									'name': 'achievs-doc-name'
								}
							},
							'4':{
								'default': 0,
								'title': 'Дата выдачи документа',
								'type': 'DateSelect',
								'fields': {
									'placeholder': 'Дата выдачи документа',
									'name': 'achievs-doc-date'
								}
							},
							'5':{
								'default': 0,
								'title': 'Подтверждающий документ',
								'type': 'ModalFileAPI',
								'fields': {
									'placeholder': 'Подтверждающий документ',
									'name': 'new-achievs-file-show'
								}
							},
							'6':{
								'default': 0,
								'title': 'Ссылка на скачивание',
								'type': 'InputText',
								'fields': {
									'id': 'link',
									'name': 'new-achievs-file-show'
								}
							},
							'7':{
								'default': 0,
								'title': 'Добавить',
								'type': 'Button',
								'madFields':{
									'setType': 'submit'
								},
								'fields': {
									'className': 'send__btn'
								},
							},
						}
					}
				}
			}
		}

        
		
		var parser = function(fields , group = ''){
		
			if(fields)
				Object.keys(fields).forEach(function(element) {
                   
					if(fields[element].default == 1){
						 createElem(fields[element]);
					}else if(fields[element].default == 0){
							 createMadElem(fields[element])
						 group.appendChild(
							createMadElem(fields[element])
						 )

					}else if(fields[element].default == 3){
						var gr = createGroup(fields[element]);
						
							
						if(fields[element].inElement){
							parser(fields[element].inElement , gr );
						}

						if(group != ''){
							group.appendChild(
								gr
							)
							redux.formAddRender(group);
						}
							
					}
						
					
					
			})
    
		};	


		var createElem  = function(elem){
		   console.log('Создаю Простой элемент');
		   var el = document.createElement(elem.type);

		   Object.keys(elem.fields).forEach(function(elementField) {
				el[elementField] = elem.fields[elementField]
		   })
		   return el;
		}


		var createGroup = function(el){
			console.log('Создаю Группу');
			if(el.type == "form"){
				var fld = createElem(el);
			}else{
				var fld = MadForms.Fields.create('Group','myfield').render();
				var h1 = fld.getElementsByTagName('h1')[0];
				h1.innerText = el.title;
				h1.className = el.fields.className;
			}	
				

			Object.keys(el.fields).forEach(function(elementField) {
				fld[elementField] = el.fields[elementField]
		   })
		  
		   return fld;
		}

        var madField = function(elem , field){

			Object.keys(field).forEach(function(elementField) {
				elem[elementField](field[elementField]);
			})

			return elem;
		}

		var createMadElem  = function(elem){
			console.log('Создаю Формачекатор');

			var madElem = MadForms.Fields.create(elem.type, elem.fields.name ).setTitle(elem.title);
			if(elem.madFields)
				var el = madField(madElem , elem.madFields).render();
			else	
				var el = madElem.render();
			
			
			Object.keys(elem.fields).forEach(function(elementField) {
				 el[elementField] = elem.fields[elementField]
			})

			return el;
			
			
		}

	
		parser(fieldsFormAdd);


	}

