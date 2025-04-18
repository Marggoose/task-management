
function handleLogin(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Отправляем данные на сервер для входа
    fetch('login-handler.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Если вход успешен, перенаправляем пользователя на tasks.html
            window.location.href = 'tasks.html'; // Перенаправление на страницу задач
        } else {
            // Если возникла ошибка, показываем сообщение
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = data.message; // Сообщение об ошибке
            errorMessage.style.display = 'block'; // Показываем сообщение
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Произошла ошибка при входе. Попробуйте еще раз.';
        errorMessage.style.display = 'block';
    });
}

function handleRegister(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    // Отправляем данные на сервер для регистрации
    fetch('register-handler.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Если регистрация успешна, перенаправляем пользователя на страницу входа
            window.location.href = 'login.html'; // Перенаправление на страницу входа
        } else {
            // Если возникла ошибка, показываем сообщение
            const errorMessage = document.getElementById('reg-error-message');
            errorMessage.textContent = data.message; // Сообщение об ошибке
            errorMessage.style.display = 'block'; // Показываем сообщение
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        const errorMessage = document.getElementById('reg-error-message');
        errorMessage.textContent = 'Произошла ошибка при регистрации. Попробуйте еще раз.';
        errorMessage.style.display = 'block';
    });
}