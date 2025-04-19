document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const logoutButton = document.getElementById('logoutButton');
    const clearTasksButton = document.getElementById('clearTasksButton');

    const currentUser = localStorage.getItem('currentUser '); // пробел оставлен намеренно
    if (!currentUser) {
        alert('Пожалуйста, войдите в систему!');
        window.location.href = 'login.html';
        return;
    }

    let editIndex = null;

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem(currentUser + '_tasks')) || [];
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${task.title}</strong> (Срок: ${task.deadline})<br>
                <em>Приоритет: ${task.priority}</em><br>
                Статус: ${task.status}<br>
                Описание: ${task.description}<br>
                Ответственный: ${task.assignee}<br>
                <button onclick="editTask(${index})">Редактировать</button>
                <button onclick="deleteTask(${index})">Удалить</button>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Отменить завершение' : 'Завершить'}</button>
                <span>${task.completed ? '✅ Завершено' : '❌ В процессе'}</span>
            `;
            taskList.appendChild(li);
        });
    };

    const saveTasks = (tasks) => {
        localStorage.setItem(currentUser + '_tasks', JSON.stringify(tasks));
        loadTasks();
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const deadline = document.getElementById('taskDeadline').value;
        const assignee = document.getElementById('taskAssignee').value;
        const priority = document.getElementById('taskPriority').value || 'Средний';
        const status = document.getElementById('taskStatus').value || 'В процессе';

        const tasks = JSON.parse(localStorage.getItem(currentUser + '_tasks')) || [];

        const taskData = { title, description, deadline, assignee, priority, status, completed: false };

        if (editIndex !== null) {
            taskData.completed = tasks[editIndex].completed; // сохраняем текущий статус "завершено"
            tasks[editIndex] = taskData;
            editIndex = null;
        } else {
            tasks.push(taskData);
        }

        saveTasks(tasks);
        taskForm.reset();
    });

    window.editTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem(currentUser + '_tasks'));
        const task = tasks[index];

        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskDeadline').value = task.deadline;
        document.getElementById('taskAssignee').value = task.assignee;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskStatus').value = task.status;

        editIndex = index;
    };

    window.deleteTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem(currentUser + '_tasks'));
        tasks.splice(index, 1);
        saveTasks(tasks);
    };

    window.toggleComplete = (index) => {
        const tasks = JSON.parse(localStorage.getItem(currentUser + '_tasks'));
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
    };

    clearTasksButton.addEventListener('click', () => {
        if (confirm('Вы уверены, что хотите удалить все задачи?')) {
            localStorage.removeItem(currentUser + '_tasks');
            loadTasks();
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser ');
        window.location.href = 'login.html';
    });

    loadTasks();
});