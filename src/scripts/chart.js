window.onload = function() {
    initCircle();
    eventItem();
};

function eventItem() {
    var item = document.querySelectorAll(".goal-checkbox");
    
    for (var i = 0; i < item.length; i++) {
        item[i].addEventListener("click", initCircle);
    }
}

function initCircle() {
    var circle = document.querySelector(".goal-chart__active");
    var checkboxesAll = document.querySelectorAll(".goal-checkbox").length;
    var checkboxesChecked = document.querySelectorAll(".goal-checkbox:checked").length;
    var percent = document.querySelector(".goal-chart__percent");
    var radius = circle.getAttribute("r");
    var circleLength = (radius * 2) * Math.PI;

    percent.innerHTML = Math.ceil(100 * checkboxesChecked / checkboxesAll) + "%";
    circle.style.strokeDashoffset = circleLength - (circleLength * checkboxesChecked / checkboxesAll);
    circle.classList.add("_transition");
}