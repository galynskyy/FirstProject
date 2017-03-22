var inputElement = document.getElementById("input-form");
var modalError = document.getElementById('error');
var minLength = 4;
var maxLength = 20;

var validateModule =  (function() {
	var _init = function() {
		_eventListener();
	};

	var _eventListener = function() {
		inputElement.addEventListener('blur', _onInputBlur);
	};


	var _onInputBlur = function() {
		if (this.value.length === 0) {
			_colorInputBorder(inputElement, "red");
			return;
		}

		if (_checkIfTaskAlreadyExists(this.value)) {
			_colorInputBorder(this, "red");
			return;
		}

		if (this.value.length < minLength) {
			modalError.textContent = "Введите не менее 4 символов";
			_colorInputBorder(this, "red");
			return;
		}

		if (this.value.length > maxLength) {
			modalError.textContent = "Введите не более 20 символов";
			_colorInputBorder(this, "red");
			return;
		}

		_colorInputBorder(this, "#acadaf");
	};

	var _colorInputBorder = function(input, color) {
		input.style.border = `1px solid ${color}`;
	};

	var _checkIfTaskAlreadyExists = function(taskName) {
		var taskContainer = document.getElementById("tasks");
		var taskElements = taskContainer.querySelectorAll('.tasks-list__text');
		var namesList = Array.prototype.map.call(taskElements, function(element) {

			return element.textContent;
		});

		return namesList.indexOf(taskName) > -1;
	};

	return {
		init: _init
	};
})();
inputElement && validateModule.init();










