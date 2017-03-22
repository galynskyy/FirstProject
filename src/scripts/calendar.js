var btn = document.getElementById("add");

var calendarModule = (function() {
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
		var taskName = document.getElementById("input-form").value.trim();
		var d = $('#datetimepicker').datetimepicker("getValue");
		var task = {
			name: taskName,
			enddate: d,
			isDataPassed: false,
			isDone: false
		};

		_removeMessageBlock();
		_draw(task);
	};

	var _removeMessageBlock = function() {
		var activeBlock = document.getElementById("activeBlock");
		var blockForMessage = document.querySelector(".message");

		if (activeBlock) {
			blockForMessage.removeChild(activeBlock);
		}
	};

	var _checkFillingOfChart = function() {
		var percent = document.querySelector(".goal-chart__percent");

		return percent.textContent === "100%";
	};

	var _draw = function(task) {
		var taskContainer = document.getElementById("tasks");
		var calendar_container = document.getElementById("task-table");
		var tr = document.createElement("tr");

		tr.className = "calendar__columns";
		calendar_container.appendChild(tr);
		taskContainer.appendChild(_getTask(task));
		_getCalendar(tr, task);
	};

	var _getTask = function(task) {
		var templateElement = document.getElementById('taskTemplate');
		var templateContainer = 'content' in templateElement ? templateElement.content : templateElement;
		var newTask = templateContainer.querySelector('.tasks-list__item').cloneNode(true);
		newTask.querySelector('.tasks-list__text').textContent = task.name;

		return newTask;
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

		if (daysEnd < 0) {
			var modalError = document.getElementById("error");
			modalError.textContent = "Поменяйте дату";
			return;
		}

		if (daysStart < 0) {
			var tdEmpty = document.createElement("td");
			tr.appendChild(tdEmpty);
			tdEmpty.colSpan = Math.abs(daysStart);
		}

		td.className = "calendar__day";
		td.colSpan = daysEnd;
		divInner.className = "calendar__inner";
		div.className = "calendar__task-line";
		span.className = "calendar__progress";

		(task.isDone || _checkFillingOfChart() === true) ? span.className += " _delay" : span.className += " _done";

		div.appendChild(span);
		divInner.appendChild(div);
		td.appendChild(divInner);
		tr.appendChild(td);
	};

	return {
		init: _init
	};
})();

btn && calendarModule.init({
	tasks: [
		{
			name: "Лендинг для корпоратива",
			enddate: moment("2017-03-26").toString(),
			isDone: false,
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
