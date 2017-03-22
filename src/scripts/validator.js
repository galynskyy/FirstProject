var inputElement = document.getElementById("input-form");

const colorInputBorder = function(input, color) {
	input.style.border = `1px solid ${color}`;
};

inputElement.addEventListener('blur', function() {
	if (this.value.length === 0 || _checkIfTaskAlreadyExists(this.value)) {
		colorInputBorder(this, "red");
		return;
	}

	colorInputBorder(this, "#acadaf");
});

var _checkIfTaskAlreadyExists = function(taskName) {
	var taskContainer = document.getElementById("tasks");
	var taskElements = taskContainer.querySelectorAll('.tasks-list__text');
	var namesList = Array.prototype.map.call(taskElements, function(element) {

		return element.textContent;
	});

	return namesList.indexOf(taskName) > -1;
};

