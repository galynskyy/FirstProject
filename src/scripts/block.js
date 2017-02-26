var list = document.querySelector(".tasks-list");
console.log( list );
var numberLi = list.getElementsByTagName("li").length;
console.log( numberLi );
var taskContainer = document.getElementById("tasks");
console.log(taskContainer);

if (list.getElementsByTagName("li").length <= 1) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        var span = document.createElement("span");

        li.classList.add("tasks-list__no-tasks");
        a.classList.add("tasks-list__title");
        span.classList.add("tasks-list__text");
        span.innerText = "Активных задач нет";
        a.href = "#";
        a.appendChild(span);
        li.appendChild(a);
        taskContainer.appendChild(li);

} else {
	var elemLi = document.getElementsByClassName("tasks-list__no-tasks")[0];
	console.log(elemLi);
	// taskContainer.removeChild
}

var checkTasks = (function () {

})();