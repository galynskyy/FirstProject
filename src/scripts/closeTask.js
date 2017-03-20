var taskContainer = document.getElementById("tasks");

var removeTaskModule = (function() {
	var _init = function() {
		_eventListener();
	};

	var _eventListener = function() {
		taskContainer.addEventListener("click", _onListOfTasksClick);
	};

	var _onListOfTasksClick = function(e) {
		var target =  e.target;

		if (_isCloseBtn(target)) {
			var taskLi = target.parentNode.parentNode;
			_deleteTask(taskLi);
		}
	};

	var _deleteTask = function(element) {
		taskContainer.removeChild(element);
	};

	var _isCloseBtn = function(target) {
		return target.classList.contains("tasks-list__close");
	};

	return {
		init: _init
	};
})();

taskContainer && removeTaskModule.init();

