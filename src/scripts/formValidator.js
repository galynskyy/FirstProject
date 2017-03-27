// "use strict";
// var minLength = 4;
// var maxLength = 10;
//
// var inputLogin = document.getElementById("login");
// var inputPassd = document.getElementById("pw");
// var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
//
// var validateModule = (function() {
// 	var _init = function() {
// 		_eventListeners();
// 	};
//
// 	var _checkEmpty = function(input) {
// 		if (!input.value || input.value === null) {
// 			throw new SyntaxError("Поле пустое");
// 		}
// 	};
//
// 	var _checkMinLength = function() {
//
// 	}
//
//
//
// 	return {
// 		init: _init
// 	};
// })();
//
//
//
// (function() {
// 	"use strict";
//
// 	class Validator {
// 		constructor() {
// 			this.minLength = 4;
// 			this.maxLength = 10;
// 			this.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
// 		}
//
// 		checkEmpty(input) {
// 			if (!input.value || input.value === null) {
// 				throw new SyntaxError("Поле пустое");
// 			}
// 		}
// 		checkMinLength(input) {
// 			if (input.value.length < this.minLength) {
// 				throw new SyntaxError("Введите больше, чем 4 символа");
// 			}
// 		}
// 		checkMaxLength(input) {
// 			if (input.value.length > this.maxLength) {
// 				throw new SyntaxError("Длина не должна превышать 10 символов");
// 			}
// 		}
// 		checkPassword(input) {
// 			if (!this.passwordRegex.test(input.value)) {
// 				throw new SyntaxError("Невалидный паспорт");
// 			}
// 		}
//
// 		validateLogin(input) {
// 			this.checkEmpty(input);
// 			this.checkMinLength(input);
// 			this.checkMaxLength(input);
// 		}
//
// 		validatePassword(input) {
// 			this.checkEmpty(input);
// 			this.checkMinLength(input);
// 			this.checkMaxLength(input);
// 			this.checkPassword(input);
// 		}
//
// 		validate(input) {
// 			const name = input.getAttribute("name");
// 			switch (name) {
// 				case "login":
// 					this.validateLogin(input);
// 					break;
// 				case "password":
// 					this.validatePassword(input);
// 					break;
// 			}
// 		}
// 	}
//
// 	window.Validator = Validator;
// })();
