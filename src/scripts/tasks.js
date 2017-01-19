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
            task.style.display = "block";
        }
        for (var calendar of _calendarProc) {
            calendar.parentNode.style.display = "block";
        }
        for (var task of _tasksDelay) {
            task.style.display = "none";
        }
        for (var calendar of _calendarDelay) {
            calendar.parentNode.style.display = "none";
        }
        for (var task of _tasksDone) {
            task.style.display = "none";
        }
        for (var calendar of _calendarDone) {
            calendar.parentNode.style.display = "none";
        }
    };

    var _showDelay = function() {
        for (var task of _tasksDelay) {
            task.style.display = "block";
        }
        for (var calendar of _calendarDelay) {
            calendar.parentNode.style.display = "block";
        }
        for (var task of _tasksProc) {
            task.style.display = "none";
        }
        for (var calendar of _calendarProc) {
            calendar.parentNode.style.display = "none";
        }
        for (var task of _tasksDone) {
            task.style.display = "none";
        }
        for (var calendar of _calendarDone) {
            calendar.parentNode.style.display = "none";
        }
    };

    var _showDone = function() {
        for (var task of _tasksDone) {
            task.style.display = "block";
        }
        for (var calendar of _calendarDone) {
            calendar.parentNode.style.display = "block";
        }
        for (var task of _tasksDelay) {
            task.style.display = "none";
        }
        for (var calendar of _calendarDelay) {
            calendar.parentNode.style.display = "none";
        }
        for (var task of _tasksProc) {
            task.style.display = "none";
        }
        for (var calendar of _calendarProc) {
            calendar.parentNode.style.display = "none";
        }
    };

    return {
        init: _init
    };
})();

window.onload = function() {
    linkProc && linkDelay && linkDone && tasksModule.init();
};