// var taskList = document.getElementById("tasks");
//
// var count = taskList.querySelectorAll(".tasks-list__item").length;
//
// if (count <= 1) {
// 	var templateElement = document.getElementById('taskTemplate');
// 	var templateContainer = 'content' in templateElement ? templateElement.content : templateElement;
// 	var newTask = templateContainer.querySelector('.tasks-list__item').cloneNode(true);
// 	newTask.querySelector('.tasks-list__text').textContent = "Активных задач нет";
//
// }


var checkboxesChecked = document.querySelectorAll(".goal-checkbox:checked").length;
console.log(checkboxesChecked);
