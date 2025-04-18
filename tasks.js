document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const logoutButton = document.getElementById('logoutButton');

    const currentUser  = localStorage.getItem('currentUser ');
    if (!currentUser ) {
        alert('Пожалуйста, войдите в систему!');
        window.location.href = 'index.html'; // Перенаправление на страницу входа
    }

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem(currentUser  + '_tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${task.title}</strong> (Срок: ${task.deadline})<br>
                Описание: ${task.description}<br>
                Ответственный: ${task.assignee}<br>
                <button onclick="editTask(${index})">Редактировать</button>
                <button onclick="deleteTask(${index})">Удалить</button>
                <span>${task.completed ? '✅ Завершено' : '❌ В процессе'}</span>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Отменить' : 'Завершить'}</button>
            `;
            taskList.appendChild(li);
        });
    };

    const saveTasks = (tasks) => {
        localStorage.setItem(currentUser  + '_tasks', JSON.stringify(tasks));
        loadTasks();
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const deadline = document.getElementById('taskDeadline').value;
        const assignee = document.getElementById('taskAssignee').value;

        const tasks = JSON.parse(localStorage.getItem(currentUser  + '_tasks')) || [];
        tasks.push({ title, description, deadline, assignee, completed: false });
        saveTasks(tasks);

        taskForm.reset();
    });

    window.editTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem(currentUser  + '_tasks'));
        const task = tasks[index];

        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskDeadline').value = task.deadline;
        document.getElementById('taskAssignee').value = task.assignee;

        tasks.splice(index, 1);
        saveTasks(tasks);
    };

    window.deleteTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem(currentUser  + '_tasks'));
        tasks.splice(index, 1);
        saveTasks(tasks);
    };

    window.toggleComplete = (index) => {
        const tasks = JSON.parse(localStorage.getItem(currentUser  + '_tasks'));
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
    };

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser ');
        window.location.href = 'index.html'; // Перенаправление на страницу входа
    });

    loadTasks();
});