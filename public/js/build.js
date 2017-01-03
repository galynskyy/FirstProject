(function() {
    reDraw();
    eventItem();
})();

function eventItem() {
    var item = document.querySelectorAll(".goal-checkbox");
    
    for (var i = 0; i < item.length; i++) {
        item[i].addEventListener("click", reDraw);
    }
}

function reDraw() {
    var all = document.querySelectorAll(".goal-checkbox").length;
    var checked = document.querySelectorAll(".goal-checkbox:checked").length;
    var pctCheck = parseInt(checked * 100 / all);
    var circle = document.querySelector(".goal-chart__active");
    var pctChart = document.querySelector(".goal-chart__percent");

    if (isNaN(pctCheck)) {
        pctCheck = 100; 
    } else {
        var radius = circle.getAttribute("r");
        var area = Math.PI * (radius * 2);
   
        if (pctCheck < 0) {
            pctCheck = 0;
        }

        if (pctCheck > 100) {
            pctCheck = 100;
        }
    
        var inActive = ((100 - pctCheck) / 100) * area;
    
        circle.style.strokeDashoffset = inActive;
    
        pctChart.innerHTML = pctCheck + "%";
    }
}