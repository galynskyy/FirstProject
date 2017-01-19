var checkboxes = document.querySelectorAll(".goal-checkbox");

var chartModule = (function() {
    var _init = function() {
        _eventListeners();
        _initChart();
    };

    var _eventListeners = function() {
        for (var checkbox of checkboxes) {
            checkbox.addEventListener("click", _initChart);
        };
    };

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