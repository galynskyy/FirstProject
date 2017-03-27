var minLength = 2;
var maxLength = 50;
var inputElement = document.getElementById("input-form");
var inputData = document.getElementById("datetimepicker");
var modalError = document.getElementById("error");

var validateModule = (function() {
	var _init = function() {
		_eventListeners();
	};

	var _eventListeners = function() {
		inputElement.addEventListener("blur", _onInputBlur);
		inputData.addEventListener("blur", _onInputDataBlur);
	};

	var _onInputBlur = function() {
		if (this.value.length === 0) {
			modalError.textContent = "Вы не ввели название задачи";
			_colorInputBorder(inputElement, "red");
			
			return;
		}

		if (_checkIfTaskAlreadyExists(this.value)) {
			modalError.textContent = "Задача с таким названием уже существует";
			_colorInputBorder(this, "red");

			return;
		}

		if (this.value.length < minLength) {
			modalError.textContent = "Введите не менее 4 символов";
			_colorInputBorder(this, "red");

			return;
		}

		if (this.value.length > maxLength) {
			modalError.textContent = "Введите не более 50 символов";
			_colorInputBorder(this, "red");

			return;
		}

		_colorInputBorder(this, "#acadaf");
		modalError.textContent = "";
	};

	var _onInputDataBlur = function() {
		if (this.value.length === 0) {
			modalError.textContent = "Вы не выбрали дату";
			_colorInputBorder(inputData, "red");

			return;
		}
		modalError.textContent = "";
	};

	var _colorInputBorder = function(input, color) {
		input.style.border = `1px solid ${color}`;
	};

	var _checkIfTaskAlreadyExists = function(taskName) {
		var taskContainer = document.getElementById("tasks");
		var taskElements = taskContainer.querySelectorAll(".tasks-list__text");
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