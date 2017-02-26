var list = document.querySelector(".tasks-list");
var countLi = list.getElementsByTagName("li").length;
var taskContainer = document.getElementById("tasks");

if (countLi <= 1) {
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
}
