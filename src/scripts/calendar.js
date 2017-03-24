var btn = document.getElementById("add");
var taskContainer = document.getElementById("tasks");
var templateElement = document.getElementById('taskTemplate');
var templateContainer = 'content' in templateElement ? templateElement.content : templateElement;
var taskElements = taskContainer.querySelectorAll('.tasks-list__text');
var percent = document.querySelector(".goal-chart__percent");
var calendar_container = document.getElementById("task-table");

var templateTittle = document.getElementById('tittle');
var templateTittleContainer = 'content' in templateTittle ? templateTittle.content : templateTittle;

var tasks = [
	{
		name: "Лендинг для корпоратива",
		status: 'todo',
		enddate: moment("2017-03-26").toString(),
		startdate: moment("2017-03-11").toString()
	},
	{
		name: "Креатив на афишу",
		status: 'done',
		enddate: moment("2017-03-27").toString(),
		startdate: moment("2017-03-10").toString()

	}
];

var calendarModule = (function() {
	var _init = function(config) {
		_eventListener();
		_renderList(tasks);
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
		var task = _createNewTodo(taskName, d);


		_removeMessageBlock();


		var endDate = moment(task.enddate);
		var startDate = moment(task.startdate);
		var daysEnd = endDate.diff(startDate.add(-1, "days"), "days");

		if (daysEnd <= 0) {
			var modalError = document.getElementById("error");
			modalError.textContent = "Поменяйте дату";
			return;
		}


		tasks.push(task);
		_renderList(tasks);
		// _getStatistics();
	};

	var _createNewTodo = function(taskName, d) {
		return {
				name: taskName,
				enddate: d,
				status: 'todo'
		}
	};

	var _removeMessageBlock = function() {
		var activeBlock = document.getElementById("activeBlock");
		var blockForMessage = document.querySelector(".message");

		if (activeBlock) {
			blockForMessage.removeChild(activeBlock);
		}
	};

	var _checkIfTaskAlreadyExists = function(taskName) {
		var namesList = Array.prototype.map.call(taskElements, function(element) {

			return element.textContent;
		});

		return namesList.indexOf(taskName) > -1;
	};

	var _checkFillingOfChart = function() {

		return percent.textContent === "100%";
	};

	var _getTittle = function() {
		var taskTittle = templateTittleContainer.querySelector('.tasks-list__item').cloneNode(true);

		return taskTittle;
	};

	var _renderList = function(list) {
		taskContainer.innerHTML = '';
		taskContainer.appendChild(_getTittle());

		list.map(_getTask).forEach(_insertTodoElement);
	};

	var _insertTodoElement = function(elem) {
		taskContainer.appendChild(elem);
	};

	var _getTask = function(task) {

		var tr = document.createElement("tr");
		tr.innerHTML = '';
		tr.className = "calendar__columns";
		calendar_container.appendChild(tr);

		_getCalendar(tr, task);

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

		(task.status === 'done' || _checkFillingOfChart() === true) ? span.className += " _delay" : span.className += " _done";

		div.appendChild(span);
		divInner.appendChild(div);
		td.appendChild(divInner);
		tr.appendChild(td);
	};

	return {
		init: _init
	};
})();

btn && calendarModule.init();
