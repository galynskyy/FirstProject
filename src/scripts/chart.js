var checkboxes = document.querySelectorAll(".goal-checkbox");

/**
	* Chart module.
	* @constructor
	* @name chartModule
	* _init function add listeners to elements and draw chart.
*/

var chartModule = (function() {
    	/**
 		* Init.
		* @memberof chartModule
 	*/
	var _init = function() {
       		_eventListeners();
        	_initChart();
    	};
	
    	/**
 		* Add event listeners.
		* @memberof chartModule
 	*/
	var _eventListeners = function() {
        	for (var checkbox of checkboxes) {
            		checkbox.addEventListener("click", _initChart);
        	};
    	};
	
	/**
 		* Drawing chart on page.
		* @memberof chartModule
 	*/

    	var _initChart = function() {
        	var circle = document.querySelector(".goal-chart__active");
        	var checkboxesAll = document.querySelectorAll(".goal-checkbox").length;
        	var checkboxesChecked = document.querySelectorAll(".goal-checkbox:checked").length;
        	var percent = document.querySelector(".goal-chart__percent");
        	var radius = circle.getAttribute("r");
        	var circleLength = (radius * 2) * Math.PI;

        	percent.innerHTML = Math.ceil(100 * checkboxesChecked / checkboxesAll) + "%";
        	circle.style.strokeDashoffset = circleLength - (circleLength * checkboxesChecked / checkboxesAll);
        	circle.classList.add("_transition");
    	};

   	return {
        	init: _init
    	};
})();

window.onload = function() {
    checkboxes && chartModule.init();
};
