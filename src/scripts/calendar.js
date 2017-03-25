var btn = document.getElementById("add");
var taskContainer = document.getElementById("tasks");
var templateElement = document.getElementById("taskTemplate");
var templateContainer = "content" in templateElement ? templateElement.content : templateElement;

var percent = document.querySelector(".goal-chart__percent");
var calendar_container = document.getElementById("task-table");

var templateTittle = document.getElementById("tittle");
var templateTittleContainer = "content" in templateTittle ? templateTittle.content : templateTittle;

var templateDays = document.getElementById("days");
var templateDaysContainer = "content" in templateDays ? templateDays.content : templateDays;

var mobileContainer = document.querySelector(".mobile-tasks__list");
var tMobile = document.getElementById('mobileTasks');
var tMobileContainer = 'content' in tMobile ? tMobile.content : tMobile;


var tasks = [
	{
		name: "Лендинг для корпоратива",
		status: "todo",
		enddate: moment("2017-03-26").toString(),
		startdate: moment("2017-03-11").toString()
	},
	{
		name: "Креатив на афишу",
		status: "todo",
		enddate: moment("2017-03-27").toString(),
		startdate: moment("2017-03-10").toString()

	}
];

var calendarModule = (function() {
	var _init = function(config) {
		_eventListener();
		_renderList(tasks);
		_isDayProc(tasks);
		_getStatistics();
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
		_getStatistics();
	};

	var _createNewTodo = function(taskName, d) {
		return {
				name: taskName,
				enddate: d,
				status: "todo"
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
		var taskElements = taskContainer.querySelectorAll(".tasks-list__text");
		var namesList = Array.prototype.map.call(taskElements, function(element) {

			return element.textContent;
		});

		return namesList.indexOf(taskName) > -1;
	};

	var _checkFillingOfChart = function() {

		return percent.textContent === "100%";
	};
	
	var _getTittle = function() {
		var taskTittle = templateTittleContainer
			.querySelector(".tasks-list__item")
			.cloneNode(true);

		return taskTittle;
	};

	var _getDays = function() {
		var days = templateDaysContainer
			.querySelector(".calendar__dates")
			.cloneNode(true);

		return days;
	};

	var _renderList = function(list) {
		taskContainer.innerHTML = "";
		calendar_container.innerHTML = "";

		// var result = parent.contains(child);
		// element.children.length > 0

		// if (mobileContainer.children.length > 0) {
		// 	mobileContainer.innerHTML = "";
		// }

		mobileContainer.innerHTML = ""



		taskContainer.appendChild(_getTittle());
		calendar_container.appendChild(_getDays());

		list.map(_getTask).forEach(_insertTodoElement);
		list.map(_getTaskMobile).forEach(_insertTodoMobileElement);
	};



	var _insertTodoElement = function(elem) {
		taskContainer.appendChild(elem);
	};

	var _insertTodoMobileElement = function(elem) {
		mobileContainer.appendChild(elem);
	};

	var _getTask = function(task) {
		var tr = document.createElement("tr");
		tr.innerHTML = "";
		tr.className = "calendar__columns";
		calendar_container.appendChild(tr);

		_getCalendar(tr, task);

		var newTask = templateContainer.querySelector(".tasks-list__item").cloneNode(true);
		newTask.querySelector(".tasks-list__text").textContent = task.name;

		return newTask;
	};

	var _getTaskMobile = function(task) {

		var newTaskMobile = tMobileContainer.querySelector('.mobile-tasks__item').cloneNode(true);

		newTaskMobile.querySelector('.mobile-task__text._name').textContent = task.name;
		newTaskMobile.querySelector('.mobile-task__text._status').textContent = task.status === "todo" ? "Ждет выполнения" : "Выполнена";
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
		console.log(daysEnd);

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


		(task.status === "done" || _checkFillingOfChart() === true) ? span.className += " _delay" : span.className += " _done";
		div.appendChild(span);
		divInner.appendChild(div);
		td.appendChild(divInner);
		tr.appendChild(td);
	};


	// <ul class="tasks-type__list">
	// 	<li class="tasks-type__item">
	// 	<label class="tasks-type__label _active">
	// 	<span class="tasks-badge _active">3</span> Действующих
	// 	</label>
	// 	</li>
	// 	<li class="tasks-type__item">
	// 	<label class="tasks-type__label _overdue">
	// 	<span class="tasks-badge _overdue">1</span> Просроченных
	// 	</label>
	// 	</li>
	// 	<li class="tasks-type__item">
	// 	<label class="tasks-type__label _done">
	// 	<span class="tasks-badge _done">3</span> Выполненых
	// 	</label>
	// 	</li>
	// 	</ul>

	var _getStatistics = function() {
		var st = document.querySelector('.tasks-type__list');
		var statistics = {
			proc: st.querySelector('.tasks-badge._overdue'),
			done: st.querySelector('.tasks-badge._done'),
			todo: st.querySelector('.tasks-badge._active'),
		};

		var done = tasks.filter(todo => todo.status === 'done');
		var countAll = tasks.length;
		var countDone = done.length;

		statistics.done.textContent = countDone;
		statistics.todo.textContent = countAll - countDone;
	};

	var _isDayProc = function(tasks) {
		var now = moment();
		[...tasks].forEach(function(task) {
			var endDate = moment(task.enddate);
			var daysProc = endDate.diff(now, "days");

			if (daysProc < 0) {
				var doneTasks = document.querySelectorAll(".calendar__progress._done");
				var delayTasks = document.querySelectorAll(".calendar__progress._delay");

				[...delayTasks].forEach(function(task) {
					task.className = "calendar__progress _proc";
				});

				[...doneTasks].forEach(function(task) {
					task.className = "calendar__progress _proc";
				});

			}}
		);
	};

	return {
		init: _init
	};
})();

btn && calendarModule.init();