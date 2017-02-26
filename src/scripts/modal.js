var modalWnd = (function() {

		var _init = function() {
			_eventsListener();
		};
		
		var modal = document.querySelector(".modal");		
		var modalOverlay = document.querySelector(".fixed-wrap");

		var _eventsListener = function() {
			modalElem.addEventListener("click", _showModal, false);
			modalOverlay.addEventListener("click", _closeModal, false);
			modal.addEventListener("click", _stopProp, false);
		};

		var _stopProp = function(event) {
			event.stopPropagation();
		};

		var _showModal = function() {
			modalOverlay.classList.add("_show");
		};

		var _closeModal = function() {
			modalOverlay.classList.remove("_show");
		};

	return {
		init: _init,
		show: _showModal,
		close: _closeModal
	};
})();

var modalElem = document.querySelector(".tasks__btn");
var checkElem = function(modalElem) {
	switch(document.querySelector) {
		case ".tasks__btn":
			modalWnd.init();
			break;
		case ".fixed-wrap":
			modalWnd.init();
			break;
		case ".modal":
			modalWnd.init();
			break;
		case ".modal-container":
			modalWnd.init();
			break;
		default: 
			console.log("Модальное окно не найдено");
	}
};