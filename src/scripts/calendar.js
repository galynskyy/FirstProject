var btn = document.getElementById("add");

var CalendarModule = (function() {
	var _init = function (config) {
		_eventListener();
		if (config && config.tasks) {
			config.tasks.forEach(_draw);
		}
	};

	var _eventListener = function() {
		btn.addEventListener("click", _addOnCLick);
	};

	var _addOnCLick = function addOnCLick() {
		_draw({
			name: "Новая задача"
		});
	};

	var _draw = function(task) {
		var container_id = "tasks";
		var task_calendar_id = "task-calendar";

		var task_container = document.getElementById(container_id);
		var calendar_container = document.getElementById(task_calendar_id);

		var index = calendar_container.getAttribute("data-calendar-index");

		if (!index) {
			index = 1;
			//  index = takeLastIdxed();
            // var lines = document.querySelectorAll('.calendar__task-line');
            // var lastIndex = lines[lines.length - 1].id // data-attr? 

        }

		index++;
		// takeLastIdxed

		task_container.appendChild(_getTask(task));
		calendar_container.appendChild(_getCalendar(index));

        var lines = document.querySelectorAll('.calendar__task-line');

        // узнаем последний индекс
         var lastIndex = lines[lines.length - 1].id;
        //
        // берем последний элемент
         var elem = document.getElementById(lastIndex);

         elem.style.top = '40px';

        //debugger;
        //elem.style.top = (parseInt(document.getElementById(prev).style.top) + 40) + "px";




        // var topVal = parseInt(elem.style.top, 10);
        // elem.style.top = (topVal + 40) + "px";




		calendar_container.setAttribute("data-calendar-index", index);

	};


	var _getTask = function(task) {
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

	var _getCalendar = function(index, calendarContainer) {
		var div = document.createElement("div");
		var span = document.createElement('span');

		div.className = "calendar__task-line";
		div.id = "index_" + index;

		span.className = "calendar__progress _done";

		div.appendChild(span);

		return div;
	};

	return {
		init: _init
	}
})();

btn && CalendarModule.init();
	{
	tasks: [
		{
			name: "Лендинг для корпоратива"
		},
		{
			name: "Креатив на афишу"
		},
		{
			name: "Отрисовка баннеров"
		}
	]
}
