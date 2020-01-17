
		var section = document.createElement('div'); 
		section.classList = 'section__field-list';

		var filePath;
		
		//Структура полей формы
        var fieldsForm = {
				'1': {
					'title': 'Производственная практика',
					'type': 'main',
					'fields': {
						'className': 'section__field'
					},
					'inElement':{
						'1': {
							'title': 'Информация о месте прохождении практики',
							'type': 'group',
							'fields': {
								'className': 'section__field'
							},
							'inElement':{
								'0':{
									'default': 0,
									'title': 'Наименование организации',
									'type': 'InputText',
									'fields': {
										'placeholder': '',
										'name': 'Obj_CompanyInfo_Name'
									},
								},
								'1':{
									'default': 0,
									'title': 'Тип хозяйствующего субъекта',
									'type': 'InputText',
									'fields': {
										'placeholder': 'Например: АО, ООО, ФБОУ, ВО...',
										'name': 'Obj_CompanyInfo_Type'
									},
								},
								'2':{
									'default': 0,
									'title': 'Юридический адрес',
									'type': 'InputText',
									'fields': {
										'innerText': '',
										'name': 'Obj_CompanyInfo_Address'
									},
								},
								'3':{
									'default': 0,
									'title': 'Банковские реквизиты',
									'type': 'InputText',
									'fields': {
										'placeholder': 'Например: БИК 00000, ОГРН 000000, Р/с 0000000000',
										'name': 'Obj_CompanyInfo_BankInfo'
									},
								},
							}
						},
					"2": {
						'title': 'Информация о руководителе практики со стороны организации',
						'type': 'group',
						'fields': {
							'className': 'section__field'
						},
						'inElement':{

							'0':{
								'default': 0,
								'title': 'Ф И О',
								'type': 'InputText',
								'fields': {
									'innerText': '',
									'name': 'Obj_CompanyInfo_Responsable_FIO'
								},
							},
							'1':{
								'default': 0,
								'title': 'Должность',
								'type': 'InputText',
								'fields': {
									'innerText': '',
									'name': 'Obj_Responsable_Post'
								},
							},
							'2':{
								'default': 0,
								'title': 'Email',
								'type': 'InputText',
								'fields': {
									'innerText': '',
									'name': 'Obj_Responsable_Email'
								},
							},
							'3':{
								'default': 0,
								'title': 'Контактный телефон',
								'type': 'InputText',
								'fields': {
									'innerText': '',
									'name': 'Obj_Responsable_Phone'
								},
							}
							
						}
					},
				 "3":{
					'title': 'Информация о работе',
						'type': 'group',
						'fields': {
							'className': 'section__field'
						},
						'inElement':{

							'0':{
								'default': 0,
								'title': 'Отдел, в котором проходит стажировка',
								'type': 'InputText',
								'fields': {
									'innerText': '',
									'name': 'Department'
								},
							},
							'1':{
								'default': 0,
								'title': 'Должность обучающегося',
								'type': 'InputText',
								'fields': {
									'innerText': '',
									'name': 'StudentPost'
								},
							},
							'2':{
								'default': 0,
								'title': 'Цели и задачи прохождения практики',
								'type': 'Textarea',
								'fields': {
									'innerText': '',
									'name': 'Goal'
								},
							},
							'3':{
								'default': 0,
								'title': 'Выполняемые обязанности и/или индивидуальное задание',
								'type': 'Textarea',
								'fields': {
									'innerText': '',
									'name': 'Tasks'
								},
							},
							'4':{
								'default': 0,
								'title': 'Отзыв руководителя практики',
								'type': 'Textarea',
								'fields': {
									'innerText': '',
									'name': 'Feedback'
								},
							},
							'5':{
								'default': 0,
								'title': 'Прикрепить файл',
								'type': 'ModalFileAPI',
								'fields': {
									'value': filePath,
									'name': 'RepoFiles'
								},
							}
							
						}
					 },
					'4':{
						'title': '',
						'type': 'group',
						'fields': {
							'className': 'section__field'
						},
						'inElement':{
							'0':{
								'default': 0,
								'title': 'Сохранить',
								'type': 'Button',
								'fields': {
									'className': 'send__btn'
								},
							},
							'1':{
								'default': 0,
								'title': '',
								'type': 'hidden',
								'fields': {
									'name': 'UID_Stage',
									'value': document.forms.practice.dataset.uid
								},
							},
						}	 	
					}	
				}	
			}	
		}
		
        
        //Генератор группы формы
        var createGroup = function(name){
			var fld = MadForms.Fields.create('Group','myfield');
			return fld.setTitle(name).render();
		}
		
		
		//генератор базовых элементов (ДОРАБОТАТЬ С РЕКУРСИЕЙ)
		var createBaseElem = function(fieldsForm , element , inElement , elem) {

			var el = document.createElement(fieldsForm[element].inElement[inElement].type)
			Object.keys(fieldsForm[element].inElement[inElement].fields).forEach(function(inElementField, inElementIndexField) {
				el[inElementField] = fieldsForm[element].inElement[inElement].fields[inElementField];
				 if(fieldsForm[element].inElement[inElement].inElement != undefined){
					 
					 Object.keys(fieldsForm[element].inElement[inElement].inElement).forEach(function(inElementFieldin, inElementIndexFieldin){

						 var elemInner = document.createElement(fieldsForm[element].inElement[inElement].inElement[inElementFieldin].type);
						 Object.keys(fieldsForm[element].inElement[inElement].inElement[inElementFieldin].fields).forEach(function(el, index){
								 elemInner[el] = fieldsForm[element].inElement[inElement].inElement[inElementFieldin].fields[el];												
						 })
						 el.appendChild(elemInner);
					 });
				 }
				 elem.appendChild(el);
			}); 

		}

		//Генератор формачекатора
		var createMadElem =  function(title , type , name='' , placeholder='' , value='' ) {
			var inpText;
			
			if(type != 'group')
				if(type != 'Button' && type != 'Textarea' && type != 'ModalFileAPI' && type != 'hidden')
					inpText = MadForms.Fields.create( type , name ).setTitle(title).setPlaceholder(placeholder);
				else if(type == 'hidden')
					inpText = MadForms.Fields.create('InputText', name ).setValue(value).hide();
				else if(type == 'Button')
					inpText = MadForms.Fields.create( type ,'myfield').setTitle(title).setType('submit');
				else
					inpText = MadForms.Fields.create( type , name ).setTitle(title);
				
				

			return inpText;
		}
		

		var objForm = {};

		var parser =  function(fieldsForm , group = '' , mainElemForm=''  ) {

			
			
			Object.keys(fieldsForm).forEach(function(element) {

				switch( fieldsForm[element].type ){
					case 'main':

						var main = createGroup(fieldsForm[element].title);
						parser(fieldsForm[element].inElement , '' , main);

					break;	

					case 'group':
						
						group = createGroup(fieldsForm[element].title);

							if(fieldsForm[element].fields)
								Object.keys(fieldsForm[element].fields).forEach(function(fieldsItem, index) {
									group[fieldsItem] = fieldsForm[element].fields[fieldsItem];
								});

							if(fieldsForm[element].inElement)
								parser(fieldsForm[element].inElement , group , mainElemForm ) ;
						   

					break;

					default:
	
						var field = createMadElem(
										fieldsForm[element].title , 
										fieldsForm[element].type , 
										fieldsForm[element].fields.name , 
										fieldsForm[element].fields.placeholder,
										fieldsForm[element].fields.value
									);
									

					    if(field != undefined)			
							group.getElementsByClassName('madforms-main_element')[0].appendChild(
								field.render()
							);
						
						 
					break;	
				}
			})

			if(mainElemForm){
				mainElemForm.appendChild(
					group
				)
				objForm = mainElemForm;
			}
			
		}
		

		parser(fieldsForm , section , '');
		document.getElementById('practice').appendChild(objForm);
		

		/** Перехватчик событий: 
		 * 1) Передает идентификатор файла из файлового охранилища в массив, который передается в КАС.
		*/
		var EventListener = function(){
			document.getElementById('profile_menu-praktika').addEventListener('click' , function(){
				Object.keys(document.getElementsByClassName('madforms-field-ModalFileAPI')).forEach(function(fileIndex) {

					filePath = document.getElementsByClassName('madforms-field-ModalFileAPI')[fileIndex].querySelectorAll('.madforms-main_element input')[4].value;

				})
			})
		}();
	
