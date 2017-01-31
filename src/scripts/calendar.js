var btn = document.getElementById("add");

var CalendarModule = (function () {
	var _init = function (config) {
		_eventListener();
		if (config && config.tasks) {
			config.tasks.forEach(_draw);
		}
	};

	var _eventListener = function () {
		btn.addEventListener("click", _addOnCLick);
	};

	var _addOnCLick = function addOnCLick() {
		_draw({name: "Новая задача"});
	};

	var _draw = function (task) {
		var container_id = "tasks";
		var task_calendar_id = "task-calendar";

		var container = document.getElementById(container_id);
		var calendar = document.getElementById(task_calendar_id);

		var index = calendar.getAttribute("data-calendar-index");

		if (!index) {
			index = 1;
		}

		container.appendChild(_getTask(task));
		calendar.appendChild(_getCalendar(index));

		index++;

		calendar.setAttribute("data-calendar-index", index);
	};


	var _getTask = function (task) {
		var li = document.createElement("li");
		var a = document.createElement("a");
		var span = document.createElement("span");

		li.classList.add("tasks-list__item");
		a.classList.add("tasks-list__title");
		span.classList.add("tasks-list__text");

		span.innerText = task.name;
		a.href = "#";

		a.appendChild(span);
		li.appendChild(a);

		return li;
	};

	var _getCalendar = function (index, calendar) {
		var div = document.createElement("div");
		var span = document.createElement('span');

		div.className = "calendar__task-line _index_" + index;
		span.className = "calendar__progress _done";

		div.appendChild(span);

		return div;
	};

	return {
		init: _init
	}
})();

btn && CalendarModule.init({tasks: [{name: "Лендинг для корпоратива"}, {name: "Креатив на афишу"}, {name: "Отрисовка баннеров"}]});
