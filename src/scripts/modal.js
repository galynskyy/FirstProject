var btn = document.querySelector('.tasks__btn');
console.log(btn);

btn.addEventListener('click', function(){
	var modal = document.querySelector('.fixed-wrap');
	console.log(modal);
	modal.classList.toggle("_show");
});


/*
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".tasks__btn").addEventListener("click", function() {
        var popup = document.querySelector(".fixed-wrap");
        	popup.classList.toggle("_show");
    })
});
*/

/*document.addEventListener("DOMContentLoaded", function() {
	var btnPopup = document.getElementsByClassName("tasks__btn")[0].addEventListener("click", function() {
		var popup =	document.getElementsByClassName("fixed-wrap")[0];
		window.setTimeout(function() {
            popup.classList.add("_show")
        }, 0)
		popup.classList.add("_show");
	})
});*/

/*
function() {
	var popup = document.getElementsByClassName("tasks__btn")[0].addEventListener("click", function() {
		document.getElementsByClassName("fixed-wrap")[0].classList.add("_show");
	});
};
*/