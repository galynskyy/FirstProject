var btn = document.querySelector('.tasks__btn');

btn.addEventListener('click', function(){
	var modal = document.querySelector('.fixed-wrap');
	modal.classList.toggle("_show");
    var elem = document.getElementsByClassName('fixed-wrap fixed-wrap__modal _show')[0];
    elem.style.display="block";
});


var closeBtn = document.getElementById('close');

closeBtn.addEventListener('click', function(){
    var elem = document.getElementsByClassName('fixed-wrap fixed-wrap__modal _show')[0];
    elem.style.display="none";
});