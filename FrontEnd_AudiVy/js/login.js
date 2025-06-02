document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    const loginBtn = document.querySelector('.btn');
    const socialButtons = document.querySelectorAll('.social-btn');

    const savedUser = JSON.parse(localStorage.getItem('userData'));
    if (savedUser) {
        emailInput.value = savedUser.email || '';
        passwordInput.value = savedUser.password || '';
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!emailInput.value.trim()) {
            showError(emailInput, 'Por favor, insira seu email ou nome de usuário');
            return;
        }

        if (emailInput.value.includes('@')) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                showError(emailInput, 'Por favor, insira um email válido');
                return;
            }
        }

        if (!passwordInput.value.trim()) {
            showError(passwordInput, 'Por favor, insira sua senha');
            return;
        }

        loginBtn.textContent = 'Entrando...';

        if (rememberCheckbox && rememberCheckbox.checked) {
            const userData = {
                email: emailInput.value.trim(),
                password: passwordInput.value.trim()
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('username', emailInput.value.trim());
        } else {
            localStorage.removeItem('userData');
            localStorage.removeItem('username');
        }

        setTimeout(() => {
            window.location.href = 'inicio.html';
        }, 500);
    });

    function showError(input, message) {
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        input.style.borderColor = '#e91429';

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e91429';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '6px';

        input.parentElement.appendChild(errorDiv);

        input.addEventListener('input', function() {
            input.style.borderColor = '#727272';
            const error = input.parentElement.querySelector('.error-message');
            if (error) {
                error.remove();
            }
        }, { once: true });
    }

    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const provider = this.querySelector('span:last-child').textContent.split(' ').pop();

            // Feedback visual
            this.style.opacity = '0.7';

            setTimeout(() => {
                window.location.href = 'inicio.html';
            }, 500);
        });
    });
});