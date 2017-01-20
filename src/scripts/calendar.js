(function() {
	function TaskList(config) {
		var tasks = [];
		var container_id = (config || {}).container_id || 'tasks';
		var container = document.getElementById(container_id);

		this.add = function(task) {
			tasks.push(task);
			this.draw(task);
		};

		this.redraw = function() {
			container.innerHTML='';
			for (var task in tasks) {
				this.draw(task);
			}
		};

		this.draw = function(task) {
			var li = document.createElement('li');
			var a = document.createElement('a');
			var span = document.createElement('span');

			li.classList.add('tasks-list__item');
			a.classList.add('tasks-list__title');
			span.classList.add('tasks-list__text');

			span.innerText = task.name;
			a.href="#";

			a.appendChild(span);
			li.appendChild(a);
			container.appendChild(li);
		}
	}

	var taskList = new TaskList();
	taskList.add({name: 'Лендинг для корпоратива'});
	taskList.add({name: 'Креатив на афишу'});
	taskList.add({name: 'Отрисовка баннеров'});

	document.addEventListener('DOMContentLoaded', function() {
		taskList.add({name: 'Новая задача'});
	});

	var btn = document.getElementById('add');

	btn.addEventListener( "click" , function() {
		taskList.add({name: 'Новая задача1'});
	});
}());

