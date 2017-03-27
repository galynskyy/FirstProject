var taskContainer = document.getElementById("tasks");
var countTasks = document.querySelectorAll(".tasks-list__item");

var activeTasksModule = (function() {
	var _init = function() {
		_eventListeners();
	};

	var _eventListeners = function() {
		window.addEventListener("load", _initMessage);
	};

	var _initMessage = function() {
		if (taskContainer.children.length <= (countTasks.length + 1)) {
			var templateEmptyTasks = document.getElementById("emptyTaskTemplate");
			var blockForMessage = document.querySelector(".message");
			var containerEmptyTasks = "content" in templateEmptyTasks ? templateEmptyTasks.content : templateEmptyTasks;
			var message = containerEmptyTasks.querySelector(".message__tasks-empty").cloneNode(true);

			message.textContent = "Активных задач нет";
			message.id = "activeBlock";
			blockForMessage.appendChild(message);
		}
	};

	return {
		init: _init,
		initMessage: _initMessage
	};

})();

activeTasksModule.init();