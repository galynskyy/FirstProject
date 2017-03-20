

var taskContainer = document.getElementById("tasks");

function onListOfTasksClick(e) {
	var target =  e.target;

	if (isCloseBtn(target)) {
		var taskLi = target.parentNode.parentNode;
		deleteTask(taskLi);
	}

}


function deleteTask(element) {
	taskContainer.removeChild(element);
}

function isCloseBtn(target) {
	return target.classList.contains("tasks-list__close");
}


taskContainer.addEventListener('click', onListOfTasksClick);

