var target = document.querySelector('body #application');
var scripts = document.querySelectorAll('script');

document.addEventListener("DOMContentLoaded", () => {

    var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
	  	var shareBox = target.querySelector('.b-meta.row .social-share')
	  	if(shareBox){
	  		shareBox.querySelector('a.social-share__button--fb').onclick = function(){
	  			window.open(this.href, "Popup", "width=600,height=400")
	  		}
	  		shareBox.querySelector('a.social-share__button--tw').onclick = function(){
	  			window.open(this.href, "Popup", "width=600,height=400")
	  		}
	  		shareBox.querySelector('a.social-share__button--tg').onclick = function(){
	  			window.open(this.href, "Popup", "width=600,height=400")
	  		}
	  		shareBox.querySelector('a.social-share__button--vk').onclick = function(){
	  			window.open(this.href, "Popup", "width=600,height=400")
	  		}
	  	}
	  });    
	});
	 
	// создаем конфигурации для наблюдателя
	var config = { attributes: true, childList: true, characterData: true };
	 
	// запускаем механизм наблюдения
	observer.observe(target,  config);

});
