
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const loginEmailInput = document.getElementById('loginEmail');
        const loginPasswordInput = document.getElementById('loginPassword');
        const loginSubmitButton = loginForm.querySelector('.submit');

        loginSubmitButton.addEventListener('click', function (event) {
            event.preventDefault(); 

            const email = loginEmailInput.value.trim();
            const password = loginPasswordInput.value.trim();

            if (email === '' || password === '') {
                alert('Por favor, preencha todos os campos.');
            } else {
             
                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert(data.message);
                        
                    } else {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Erro na solicitação de login:', error);
                    alert('Erro ao tentar fazer login. Por favor, tente novamente mais tarde.');
                });
            }
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const registerEmailInput = document.getElementById('registerEmail');
        const registerPasswordInput = document.getElementById('registerPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const registerSubmitButton = registerForm.querySelector('.submit');

        registerSubmitButton.addEventListener('click', function (event) {
            event.preventDefault(); 

            const email = registerEmailInput.value.trim();
            const password = registerPasswordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();

            if (email === '' || password === '' || confirmPassword === '') {
                alert('Por favor, preencha todos os campos.');
            } else if (password !== confirmPassword) {
                alert('As senhas não coincidem.');
            } else {
                
                fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert(data.message);
                        
                    } else {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Erro na solicitação de registro:', error);
                    alert('Erro ao tentar registrar. Por favor, tente novamente mais tarde.');
                });
            }
        });
    }
});