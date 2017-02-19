var modalButton = document.querySelector(".tasks__btn");
var modalOverlay = document.querySelector(".fixed-wrap");

var modalWindow = (function() {

		var _init = function() {
			_eventListener();
			_initModal();
			_closeModal();
		};

		var _eventListener = function() {			
			modalButton.addEventListener("click", _initModal);
		};

		var _initModal = function() {
			var modal = document.querySelector(".fixed-wrap");		
			modal.classList.add("_show");
		};

		var _closeModal = function() {
			var overlay = document.querySelector(".fixed-wrap");		
			overlay.classList.remove("_show");
		}

	return {
		init: _init,
		close: _closeModal
	};
})();

modalButton.onclick = function() {
	modalWindow.init();
};

modalOverlay.onclick = function() {
	modalWindow.close();
};