var btn = document.getElementById("add");

var CalendarModule = (function() {
	var _init = function(config) {
		_eventListener();
		if (config && config.tasks) {
			config.tasks.forEach(_draw);
		}
	};

	var _eventListener = function() {
		btn.addEventListener("click", _addOnCLick);
	};

	var _addOnCLick = function addOnCLick() {
		var taskName = document.getElementById("input-form").value;

		if (taskName.length === 0 || _checkIfTaskAlreadyExists(taskName)) {
			alert("Задача с таким названием уже существует");
			return;
		}

		var d = $('#datetimepicker').datetimepicker("getValue");

		_draw({
			name: taskName,
			enddate: d
		});
	};

	var _checkIfTaskAlreadyExists = function(taskName) {
		var task_container = document.getElementById("tasks");
		var taskElements = task_container.querySelectorAll('.tasks-list__text');
		var namesList = Array.prototype.map.call(taskElements, function(element) {

			return element.textContent;
		});

		return namesList.indexOf(taskName) > -1;
	};

	var _draw = function(task) {
		var container_id = "tasks";
		var task_calendar_id = "task-table";
		var task_container = document.getElementById(container_id);
		var calendar_container = document.getElementById(task_calendar_id);
		var tr = document.createElement("tr");

		tr.className = "calendar__columns";
		calendar_container.appendChild(tr);
		task_container.appendChild(_getTask(task));
		_getCalendar(tr, task);
	};


	var _getTask = function(task) {
		var li = document.createElement("li");
		var a = document.createElement("a");
		var span = document.createElement("span");
		var button = document.createElement("a");
		var span1 = document.createElement("span");
		var span2 = document.createElement("span");

		li.classList.add("tasks-list__item");
		a.classList.add("tasks-list__title");
		span.classList.add("tasks-list__text");
		span.innerText = task.name;
		a.href = "#";
		button.href = "#";

		button.classList.add("tasks-list__close");
		a.appendChild(span);
		button.appendChild(span1);
		button.appendChild(span2);

		li.appendChild(a);
		a.appendChild(button);

		return li;
	};

	var _getCalendar = function(tr, task) {
		var td = document.createElement("td");
		var divInner = document.createElement("div");
		var div = document.createElement("div");
		var span = document.createElement("span");
		var now = moment();
		var endDate = moment(task.enddate);
		var startDate = moment(task.startdate);
		var daysStart = moment({
			year: now.year(),
			month: now.month(),
			days: 1
		}).diff(startDate, "days");

		var daysEnd = endDate.diff(startDate.add(-1, "days"), "days");

		if (daysStart < 0) {
			var td2 = document.createElement("td");
			tr.appendChild(td2);
			td2.colSpan = Math.abs(daysStart);
		}

		td.className = "calendar__day";
		td.colSpan = daysEnd;
		divInner.className = "calendar__inner";
		div.className = "calendar__task-line";
		span.className = "calendar__progress";
		if (task.isDone) {
			span.className += " _delay";
		} else {
			span.className += " _done";
		}

		div.appendChild(span);
		divInner.appendChild(div);
		td.appendChild(divInner);
		tr.appendChild(td);
	};

	return {
		init: _init
	}
})();

btn && CalendarModule.init({
	tasks: [
		{
			name: "Лендинг для корпоратива",
			enddate: moment("2017-03-28").toString(),
			progress: 2,
			startdate: moment("2017-03-11").toString()
		},
		{
			name: "Креатив на афишу",
			enddate: moment("2017-03-27").toString(),
			isDone: true,
			startdate: moment("2017-03-10").toString()
		}
	]
});