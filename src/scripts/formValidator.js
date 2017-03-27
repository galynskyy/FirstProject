// "use strict";
// var minLength = 4;
// var maxLength = 10;
//
// var inputLogin = document.getElementById("login");
// var inputPassd = document.getElementById("pw");
// var btnSubmit = document.getElementById("submit");
// var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
//
// var validateModule = (function() {
// 	var _init = function() {
// 		_eventListener();
// 	};
//
// 	var _eventListener = function() {
// 		// btnAdd.addEventListener("click", _validate);
// 		btnSubmit.addEventListener("click", _validate);
//
// 	};
//
// 	var _validate = function(input) {
// 		console.log("hello");
// 		var name = input.getAttribute("name");
// 		switch (name) {
// 			case "user":
// 				_validateLogin(input);
// 				break;
// 			case "password":
// 				_validatePassword(input);
// 				break;
// 		}
// 	};
//
// 	var _checkEmpty = function(input) {
// 		if (!input.value || input.value === null) {
// 			console.log("Поле пустое");
// 		}
// 	};
//
// 	var _checkMinLength = function(input) {
// 		if (input.value.length < this.minLength) {
// 			console.log("Введите больше, чем 4 символа");
// 		}
// 	};
//
// 	var _checkMaxLength = function(input) {
// 		if (input.value.length > this.maxLength) {
// 			console.log("Длина не должна превышать 10 символов");
// 		}
// 	};
//
// 	var _checkPassword = function(input) {
// 		if (!this.passwordRegex.test(input.value)) {
// 			console.log("Невалидный паспорт");
// 		}
// 	};
//
// 	var _validateLogin = function(input) {
// 		_checkEmpty(input);
// 		_checkMinLength(input);
// 		_checkMaxLength(input);
// 	};
//
// 	var _validatePassword = function(input) {
// 		_checkEmpty(input);
// 		_checkMinLength(input);
// 		_checkMaxLength(input);
// 		_checkPassword(input);
// 	};
//
// 	return {
// 		init: _init
// 	};
// })();
//
// btnSubmit && validateModule.init();