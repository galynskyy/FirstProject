$(function() {
	reDraw();
});

$(".goal-checkbox").change(function() {
	reDraw();
});

function reDraw () {
	var all = $(".goal-checkbox").length;
	var checked = $(".goal-checkbox:checked").length;
	var val = parseInt((checked * 100) / all);
	var circle = $(".goal-chart__active");

  	if (isNaN(val)) {
 		val = 100; 
 	}
 	else {
 		var r = circle.attr("r");
    	var c = Math.PI * (r * 2);
   
    	if (val < 0) {
    		val = 0;
    	}

    	if (val > 100) {
    		val = 100;
    	}
    
    	var percent = ((100 - val) / 100) * c;
    
    	$(".goal-chart__active").css({
    		strokeDashoffset: percent
    	});
    
    	$(".goal-chart__percent").html(val + "%");
 	}
}