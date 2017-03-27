"use strict";

var minLength = 2;
var maxLength = 50;

var btnAdd = document.getElementById("add");
var taskContainer = document.getElementById("tasks");
var taskElements = taskContainer.querySelectorAll(".tasks-list__text");
var inputElement = document.getElementById("input-form");
var calendar_container = document.getElementById("task-table");
var percent = document.querySelector(".goal-chart__percent");

var templateElement = document.getElementById("taskTemplate");
var templateContainer = "content" in templateElement ? templateElement.content : templateElement;

var mobileContainer = document.querySelector(".mobile-tasks__list");
var tMobile = document.getElementById("mobileTasks");
var tMobileContainer = "content" in tMobile ? tMobile.content : tMobile;

var st = document.querySelector(".tasks-type__list");
var statistics = {
	proc: st.querySelector(".tasks-badge._overdue"),
	done: st.querySelector(".tasks-badge._done"),
	todo: st.querySelector(".tasks-badge._active"),
};

var tasks = [];

var calendarModule = (function() {
	var _init = function() {
		_eventListeners();
		_loadTasksFromStore();
		_isDayProc();
	};

	var _eventListeners = function() {
		btnAdd.addEventListener("click", _addOnClick);
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
		tasks.filter(function(item) {
			var elem = element.querySelector(".tasks-list__text");

			if (elem.textContent !== item.name) {
				return item;
			}
			var index = tasks.indexOf(item);

			tasks.splice(index, 1);
			_saveList(tasks);
		});

		taskContainer.removeChild(element);
		_renderStatistics(tasks);
		activeTasksModule.initMessage();
	};

	var _isCloseBtn = function(target) {
		return target.classList.contains("tasks-list__close");
	};

	var _addOnClick = function() {
		var taskName = inputElement.value.trim();
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

		var d = $("#datetimepicker").datetimepicker("getValue");
		var task = _createNewTodo(taskName, d);
		var endDate = moment(task.enddate);
		var startDate = moment(task.startdate);
		var daysEnd = endDate.diff(startDate.add(-1, "days"), "days");

		if (daysEnd <= 0) {
			var modalError = document.getElementById("error");

			modalError.textContent = "Поменяйте дату";

			return;
		}

		_insertTodoElement(_getTaskTemplate(task));
		_insertTodoMobileElement(_getTaskMobileTemplate(task));
		inputElement.value = "";
		tasks.push(task);
		_saveList(tasks);
		_renderStatistics(tasks);
		_removeMessageBlock(tasks);
	};

	var _saveList = function(tasks) {
		var tasksStore = [];

		tasks.forEach(item => {
			tasksStore.push(item);
		});

		if ("localStorage" in window && window["localStorage"] !== null)  {
			localStorage.tasksStore = JSON.stringify(tasksStore);
		} else {
			alert("Сохранение невозможно. Браузер не поддерживает localstorage");
		}

		return tasksStore;
	};

	var _loadTasksFromStore = function() {
		if (typeof localStorage.tasksStore === "undefined") {
			return;
		}

		if (localStorage.tasksStore) {
			var tasksStore = JSON.parse(localStorage.tasksStore);
		}

		tasksStore.forEach(item => {
			tasks.push(item);
		});

		_renderCurrentTasks(tasks);
	};

	var _getCalendarColumns = function(task) {
		var tr = document.createElement("tr");

		tr.innerHTML = "";
		tr.className = "calendar__columns";
		calendar_container.appendChild(tr);
		_getCalendar(tr, task);
	};

	var _renderCurrentTasks = function(tasks) {
		tasks.map(_getTaskTemplate).forEach(_insertTodoElement);
		tasks.map(_getTaskMobileTemplate).forEach(_insertTodoMobileElement);
	};

	var _getTaskMobileTemplate = function(task) {
		var newTaskMobile = tMobileContainer.querySelector(".mobile-tasks__item").cloneNode(true);
		var endDate = moment(task.enddate);

		newTaskMobile.querySelector(".mobile-task__text._name").textContent = task.name;
		newTaskMobile.querySelector(".mobile-task__text._status").textContent = task.status === "todo" ? "Ждет выполнения" : "Выполнена";
		newTaskMobile.querySelector(".mobile-task__text._date").textContent = endDate.format("DD.MM.YY HH:mm:ss");
		newTaskMobile.querySelector(".mobile-task__text._time").textContent = task.time;
		newTaskMobile.querySelector(".mobile-task__text._author").textContent = document.querySelector(".contact-info__item._fio").textContent;

		return newTaskMobile;
	};

	var _insertTodoMobileElement = function(elem) {
		mobileContainer.appendChild(elem);
	};

	var _getTaskTemplate = function(task) {
		_getCalendarColumns(task);

		var newTask = templateContainer.querySelector(".tasks-list__item").cloneNode(true);

		newTask.querySelector(".tasks-list__text").textContent = task.name;

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

		(task.status === "done" || _checkFillingOfChart()) ?
			span.className += " _delay" : span.className += " _done";

		div.appendChild(span);
		divInner.appendChild(div);
		td.appendChild(divInner);
		tr.appendChild(td);
	};

	var _insertTodoElement = function(elem) {
		taskContainer.appendChild(elem);
	};

	var _createNewTodo = function(taskName, d) {
		return {
			name: taskName,
			enddate: d,
			status: "todo"
		};
	};

	var _checkFillingOfChart = function() {

		return percent.textContent === "100%";
	};

	var _removeMessageBlock = function(tasks) {
		if (tasks.length !== 0) {
			var blockForMessage = document.querySelector(".message");
			var activeBlock = document.getElementById("activeBlock");

			blockForMessage.removeChild(activeBlock);
		}
	};

	var _checkIfTaskAlreadyExists = function(taskName) {
		var namesList = Array.prototype.map.call(taskElements, function(element) {

			return element.textContent;
		});

		return namesList.indexOf(taskName) > -1;
	};

	var _isDayProc = function() {
		var now = moment();

		[...tasks].forEach(function(task) {
			var endDate = moment(task.enddate);
			var daysProc = endDate.diff(now, "days");

			if (daysProc < 0) {
				tasks.status = "proc";
			}}
		);
	};

	var _renderStatistics = function(tasks) {
		var done = tasks.filter(todo => todo.status === "done");
		var proc = tasks.filter(todo => todo.status === "proc");
		var countAll = tasks.length;
		var countDone = done.length;
		var countProc = proc.length;

		statistics.done.textContent = countDone;
		statistics.todo.textContent = countAll - countDone - countProc;
		statistics.proc.textContent = countProc;
	};

	return {
		init: _init
	};
})();

btnAdd && taskContainer && calendarModule.init();