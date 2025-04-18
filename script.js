function handleLogin(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Проверяем, существует ли пользователь и совпадает ли пароль
    const storedPassword = localStorage.getItem(username);
    if (storedPassword && storedPassword === password) {
        // Если вход успешен, перенаправляем пользователя на tasks.html
        window.location.href = 'tasks.html'; // Перенаправление на страницу задач
    } else {
        // Если возникла ошибка, показываем сообщение
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Неверное имя пользователя или пароль.'; // Сообщение об ошибке
        errorMessage.style.display = 'block'; // Показываем сообщение
    }
}

function handleRegister(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    // Проверка, существует ли пользователь
    if (localStorage.getItem(username)) {
        const errorMessage = document.getElementById('reg-error-message');
        errorMessage.textContent = 'Пользователь с таким именем уже существует';
        errorMessage.style.display = 'block'; // Показываем сообщение
        return false;
    }

    // Сохраняем пользователя в localStorage
    localStorage.setItem(username, password);
    localStorage.setItem(email, username); // Сохраняем email для дальнейшего использования

    // Успешная регистрация
    alert('Регистрация прошла успешно!'); // Вы можете перенаправить пользователя или показать сообщение
    window.location.href = 'login.html'; // Перенаправление на страницу входа
}