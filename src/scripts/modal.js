var btn = document.querySelector('.tasks__btn');
console.log(btn);

btn.addEventListener('click', function(){
	var modal = document.querySelector('.fixed-wrap');
	console.log(modal);
	modal.classList.toggle("_show");
});
