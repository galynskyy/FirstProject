var linkProc = document.querySelector(".tasks-type__link._proc");
var linkDelay = document.querySelector(".tasks-type__link._delay");
var linkDone = document.querySelector(".tasks-type__link._done");

var tasksModule = (function() {
    var _tasksProc = document.querySelectorAll("[data-progress='_proc']");
    var _tasksDelay = document.querySelectorAll("[data-progress='_delay']");
    var _tasksDone = document.querySelectorAll("[data-progress='_done']");
    var _calendarProc = document.querySelectorAll(".calendar__progress._proc");
    var _calendarDelay = document.querySelectorAll(".calendar__progress._delay");
    var _calendarDone = document.querySelectorAll(".calendar__progress._done");

    var _init = function() {
        _eventListeners();
    };

    var _eventListeners = function() {
        linkProc.addEventListener("click", _showProc);
        linkDelay.addEventListener("click", _showDelay);
        linkDone.addEventListener("click", _showDone);
    };

    var _showProc = function() {
        for (var task of _tasksProc) {
            task.classList.remove("hide");
            task.classList.add("show");
        }
        for (var calendar of _calendarProc) {
            calendar.parentNode.classList.remove("hide");
            calendar.parentNode.classList.add("show");
        }
        for (var task of _tasksDelay) {
            task.classList.remove("show");
            task.classList.add("hide");
        }
        for (var calendar of _calendarDelay) {
            calendar.parentNode.classList.remove("show");
            calendar.parentNode.classList.add("hide");
        }
        for (var task of _tasksDone) {
            task.classList.remove("show");
            task.classList.add("hide");
        }
        for (var calendar of _calendarDone) {
            calendar.parentNode.classList.remove("show");
            calendar.parentNode.classList.add("hide");
        }
    };

    var _showDelay = function() {
        for (var task of _tasksDelay) {
            task.classList.remove("hide");
            task.classList.add("show");
        }
        for (var calendar of _calendarDelay) {
            calendar.parentNode.classList.remove("hide");
            calendar.parentNode.classList.add("show");
        }
        for (var task of _tasksProc) {
            task.classList.remove("show");
            task.classList.add("hide");
        }
        for (var calendar of _calendarProc) {
            calendar.parentNode.classList.add("hide");
        }
        for (var task of _tasksDone) {
            task.classList.remove("show");
            task.classList.add("hide");
        }
        for (var calendar of _calendarDone) {
            calendar.parentNode.classList.remove("show");
            calendar.parentNode.classList.add("hide");
        }
    };

    var _showDone = function() {
        for (var task of _tasksDone) {
            task.classList.remove("hide");
            task.classList.add("show");
        }
        for (var calendar of _calendarDone) {
            calendar.parentNode.classList.remove("hide");
            calendar.parentNode.classList.add("show");
        }
        for (var task of _tasksDelay) {
            task.classList.remove("show");
            task.classList.add("hide");
        }
        for (var calendar of _calendarDelay) {
            calendar.parentNode.classList.remove("show");
            calendar.parentNode.classList.add("hide");
        }
        for (var task of _tasksProc) {
            task.classList.remove("show");
            task.classList.add("hide");
        }
        for (var calendar of _calendarProc) {
            calendar.parentNode.classList.remove("show");
            calendar.parentNode.classList.add("hide");
        }
    };

    return {
        init: _init
    };
})();

window.onload = function() {
    linkProc && linkDelay && linkDone && tasksModule.init();
};