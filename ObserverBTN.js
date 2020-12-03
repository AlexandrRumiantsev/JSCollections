var target = document.querySelector('body #application');
var scripts = document.querySelectorAll('script');

document.addEventListener("DOMContentLoaded", () => {

    var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
	  	var shareBox = target.querySelector('.b-meta.row .social-share')
	  	if(shareBox){

	  		var cloneFB = shareBox.querySelector('a.social-share__button--fb').cloneNode(true);
	  		shareBox.querySelector('a.social-share__button--fb').remove();
	  		cloneFB.onclick = function(e){
	  			e.preventDefault();
	  			window.open(this.href, "Popup", "width=600,height=400")
	  		}
	  		shareBox.appendChild(cloneFB);


	  		var cloneTW = shareBox.querySelector('a.social-share__button--tw').cloneNode(true);
	  		shareBox.querySelector('a.social-share__button--tw').remove();
	  		cloneTW.onclick = function(e){
	  			e.preventDefault();
	  			window.open(this.href, "Popup", "width=600,height=400")
	  		}
	  		shareBox.appendChild(cloneTW);

	  		var cloneTG = shareBox.querySelector('a.social-share__button--tg').cloneNode(true);
	  		shareBox.querySelector('a.social-share__button--tg').remove();
	  		cloneTG.onclick = function(e){
	  			e.preventDefault();
	  			window.open(this.href, "Popup", "width=600,height=400")
	  		}
	  		shareBox.appendChild(cloneTG);

			var cloneVK= shareBox.querySelector('a.social-share__button--vk').cloneNode(true);
			shareBox.querySelector('a.social-share__button--vk').remove();
	  		cloneVK.onclick = function(e){
	  			e.preventDefault();
	  			window.open(this.href, "Popup", "width=600,height=400")
	  		}
	  		shareBox.appendChild(cloneVK);
	  	}
	  });    
	});
	 
	// создаем конфигурации для наблюдателя
	var config = { attributes: true, childList: true, characterData: true };
	 
	// запускаем механизм наблюдения
	observer.observe(target,  config);

});
