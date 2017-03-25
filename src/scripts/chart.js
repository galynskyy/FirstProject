var checkboxes = document.querySelectorAll(".goal-checkbox");

var chartModule = (function() {
	var _init = function() {
		_eventListeners();
		_initChart();
	};

	var _eventListeners = function() {
		for (var checkbox of checkboxes) {
			checkbox.addEventListener("click", _initChart);
		}
	};

	var _initChart = function() {
		var circle = document.querySelector(".goal-chart__active");
		var checkboxesAll = document.querySelectorAll(".goal-checkbox").length;
		var checkboxesChecked = document.querySelectorAll(".goal-checkbox:checked").length;
		var percent = document.querySelector(".goal-chart__percent");
		var radius = circle.getAttribute("r");
		var circleLength = (radius * 2) * Math.PI;

		percent.innerHTML = Math.ceil(100 * checkboxesChecked / checkboxesAll) + "%";
		circle.style.strokeDashoffset = circleLength - (circleLength * checkboxesChecked / checkboxesAll);
		circle.classList.add("_transition");

		_getStatisticsChart(checkboxesChecked, checkboxesAll);
		_getDoneTasks(percent.innerHTML);



	};

	var _getStatisticsChart = function(countChecked, countAll) {
		var countActiveTasks = document.querySelector(".goal-badge._active");
		var countCompleteTasks = document.querySelector(".goal-badge._complete");

	    countActiveTasks.textContent = String(countAll - countChecked);
		countCompleteTasks.textContent = String(countChecked);
	};

	var _getDoneTasks = function(percentCount) {
		if (percentCount === "100%") {
			var activeTasks = document.querySelectorAll(".calendar__progress._done");

			[...activeTasks].forEach(function(task) {
				task.className = "calendar__progress _delay";

				// меняю статус всех задач в массиве tasks который в calendar.js

			})
		} else {
			var closeTasks = document.querySelectorAll(".calendar__progress._delay");

			[...closeTasks].forEach(function(task) {
				task.className = "calendar__progress _done";
			})
		}

		_getCalendarStatistic();
	};

	var _getCalendarStatistic = function() {
		var st = document.querySelector('.tasks__item_link');
		var statistics = {
			proc: st.querySelector('.tasks__item._color_red'),
			done: st.querySelector('.tasks__item._color_gray'),
			todo: st.querySelector('.tasks__item._color_blue'),
		};

		var doneTasks = document.querySelectorAll(".calendar__progress._delay");
		var countDelay = doneTasks.length;
		var todoTasks = document.querySelectorAll(".calendar__progress._done");
		var countTodo = todoTasks.length;

		statistics.done.textContent = countDelay;
		statistics.todo.textContent = countTodo;
	};

	return {
		init: _init
	};
})();

window.onload = function() {
	checkboxes && chartModule.init();
};