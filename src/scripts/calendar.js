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
		var dataValue = document.getElementById("datetimepicker").value.trim();

		if (taskName.length === 0 || _checkIfTaskAlreadyExists(taskName)) {
			return;
		}

		if (taskName.length < minLength || taskName.length > maxLength) {
			return;
		}

		if (dataValue.length === 0) {
			return;
		}

		var d = $('#datetimepicker').datetimepicker("getValue");
		var task = {
			name: taskName,
			enddate: d,
			isDataPassed: false,
			status: "active"
		};

		_removeMessageBlock();

		var endDate = moment(task.enddate);
		var startDate = moment(task.startdate);
		var daysEnd = endDate.diff(startDate.add(-1, "days"), "days");

		if (daysEnd <= 0) {
			var modalError = document.getElementById("error");
			modalError.textContent = "Поменяйте дату";
			return;
		}

		_draw(task);
	};


	var _removeMessageBlock = function() {
		var activeBlock = document.getElementById("activeBlock");
		var blockForMessage = document.querySelector(".message");

		if (activeBlock) {
			blockForMessage.removeChild(activeBlock);
		}
	};

	var _checkIfTaskAlreadyExists = function(taskName) {
		var taskContainer = document.getElementById("tasks");
		var taskElements = taskContainer.querySelectorAll('.tasks-list__text');
		var namesList = Array.prototype.map.call(taskElements, function(element) {

			return element.textContent;
		});

		return namesList.indexOf(taskName) > -1;
	};

	var _checkFillingOfChart = function() {
		var percent = document.querySelector(".goal-chart__percent");

		return percent.textContent === "100%";
	};

	var _draw = function(task) {
		var taskContainer = document.getElementById("tasks");
		var calendar_container = document.getElementById("task-table");
		var tr = document.createElement("tr");
		var mobileContainer = document.querySelector(".mobile-tasks__list");

		tr.className = "calendar__columns";
		calendar_container.appendChild(tr);
		_getCalendar(tr, task);
		taskContainer.appendChild(_getTask(task));

		mobileContainer.appendChild(_getTaskMobile(task));
	};

	var _getTask = function(task) {
		var templateElement = document.getElementById('taskTemplate');
		var templateContainer = 'content' in templateElement ? templateElement.content : templateElement;
		var newTask = templateContainer.querySelector('.tasks-list__item').cloneNode(true);
		newTask.querySelector('.tasks-list__text').textContent = task.name;

		return newTask;
	};

	var _getTaskMobile = function(task) {
		var tMobile = document.getElementById('mobileTasks');
		var tMobileContainer = 'content' in tMobile ? tMobile.content : tMobile;
		var newTaskMobile = tMobileContainer.querySelector('.mobile-tasks__item').cloneNode(true);

		newTaskMobile.querySelector('.mobile-task__text._name').textContent = task.name;
		newTaskMobile.querySelector('.mobile-task__text._status').textContent = task.status === "active" ? "Ждет выполнения" : "Выполнена";
		var endDate = moment(task.enddate);
		newTaskMobile.querySelector('.mobile-task__text._date').textContent = endDate.format("DD.MM.YY HH:mm:ss");
		newTaskMobile.querySelector('.mobile-task__text._time').textContent = task.time;
		newTaskMobile.querySelector('.mobile-task__text._author').textContent = document.querySelector(".contact-info__item._fio").textContent;

		return newTaskMobile;
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
			var tdEmpty = document.createElement("td");
			tr.appendChild(tdEmpty);
			tdEmpty.colSpan = Math.abs(daysStart);
		}

		td.className = "calendar__day";
		td.colSpan = daysEnd;
		divInner.className = "calendar__inner";
		div.className = "calendar__task-line";
		span.className = "calendar__progress";

		(task.status === "active" || _checkFillingOfChart() === true) ? span.className += " _delay" : span.className += " _done";

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
			enddate: moment("2017-03-26 16:00:00").toString(),
			status: "inactive",
			startdate: moment("2017-03-11").toString()
		},
		{
			name: "Креатив на афишу",
			enddate: moment("2017-03-27 17:00:00").toString(),
			status: "active",
			startdate: moment("2017-03-10").toString()
		}
	]
});
