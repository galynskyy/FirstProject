var modalWnd = (function() {

	var _init = function() {
		_eventsListener();
	};

	var modal = document.querySelector(".modal");
	var modalOverlay = document.querySelector(".fixed-wrap");

	var _eventsListener = function() {
		modalBtn.addEventListener("click", _showModal, false);
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

var modalBtn = document.querySelector(".tasks__btn");

if (!modalBtn) {
	console.log("меня нет на странице");
} else {
	modalWnd.init();
}