var btn = document.getElementById("add");

var CalendarModule = (function () {
    var _init = function (config) {
        _eventListener();
        if (config && config.tasks) {
            config.tasks.forEach(_draw);
        }
    };

    var _eventListener = function () {
        btn.addEventListener("click", _addOnCLick);
    };

    var _addOnCLick = function addOnCLick() {
        var text = document.getElementById("input-form").value;
        var d = $('#datetimepicker').datetimepicker("getValue");

        _draw({
            name: text,
            enddate: d
        });
    };

    var _draw = function (task) {
        var container_id = "tasks";
        var task_calendar_id = "task-calendar";
        var task_container = document.getElementById(container_id);
        var calendar_container = document.getElementById(task_calendar_id);
        var index = calendar_container.getAttribute("data-calendar-index");

        if (!index) {
            index = 1;
        }
        index++;
        task_container.appendChild(_getTask(task));
        var lines = document.querySelectorAll(".calendar__task-line");
        // var lastIndex = lines[lines.length - 1].id;
        // var elem = document.getElementById(lastIndex);
        // elem.style.top = "40px";
        //var top = parseInt(elem.style.top) + 40 +"px";
        calendar_container.appendChild(_getCalendar(index, task));
        calendar_container.setAttribute("data-calendar-index", index);
    };


    var _getTask = function (task) {
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

    var _getCalendar = function (index, task) {
        var div = document.createElement("div");
        var span = document.createElement("span");
        var now = moment();
        var endDate = moment(task.enddate);
        var days = endDate.diff(now, "days");
        var dayCalendar = document.querySelector(".calendar__day");
        var width = days * parseInt(window.getComputedStyle(dayCalendar).width) + "px";

        div.className = "calendar__task-line";
        div.id = "index_" + index;
        span.className = "calendar__progress";
        if (task.isDone) {
            span.className += " _done";
        }
        span.style.width = width;
        //span.style.top = top;
        div.appendChild(span);

        return div;
    };

    return {
        init: _init
    }
})();

btn && CalendarModule.init({
    tasks: [
        {
            name: "Лендинг для корпоратива",
            enddate: moment("2017-02-28").toString(),
            isDone: true
        },
        {
            name: "Креатив на афишу",
            enddate: moment("2017-02-29").toString(),
            isDone: true
        },
        {
            name: "Отрисовка баннеров",
            enddate: moment("2017-02-28").toString()
        }
    ]
});