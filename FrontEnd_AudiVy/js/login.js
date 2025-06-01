document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    const loginBtn = document.querySelector('.btn');
    const socialButtons = document.querySelectorAll('.social-btn');

    // Preencher campos se dados estiverem salvos
    const savedUser = JSON.parse(localStorage.getItem('userData'));
    if (savedUser) {
        emailInput.value = savedUser.email || '';
        passwordInput.value = savedUser.password || '';
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }

    // Validação de formulário simples
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!emailInput.value.trim()) {
            showError(emailInput, 'Por favor, insira seu email ou nome de usuário');
            return;
        }

        // Validação de formato de email se conter '@'
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

        // Se tudo estiver válido, simular login
        loginBtn.textContent = 'Entrando...';

        // Salvar ou remover dados conforme checkbox "Lembrar de mim"
        if (rememberCheckbox && rememberCheckbox.checked) {
            const userData = {
                email: emailInput.value.trim(),
                password: passwordInput.value.trim()
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            // Salvar o nome de usuário/email também na chave 'username' para aparecer no perfil
            localStorage.setItem('username', emailInput.value.trim());
        } else {
            localStorage.removeItem('userData');
            localStorage.removeItem('username');
        }

        // Redirecionar para a página inicio.html imediatamente após clicar em Entrar
        setTimeout(() => {
            window.location.href = 'inicio.html';
        }, 500);
    });

    // Função para mostrar erros
    function showError(input, message) {
        // Remover mensagem de erro anterior se existir
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Adicionar borda vermelha
        input.style.borderColor = '#e91429';

        // Criar e adicionar mensagem de erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e91429';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '6px';

        input.parentElement.appendChild(errorDiv);

        // Limpar erro quando o usuário começar a digitar novamente
        input.addEventListener('input', function() {
            input.style.borderColor = '#727272';
            const error = input.parentElement.querySelector('.error-message');
            if (error) {
                error.remove();
            }
        }, { once: true });
    }

    // Simulação de login com os botões sociais
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const provider = this.querySelector('span:last-child').textContent.split(' ').pop();

            // Feedback visual
            this.style.opacity = '0.7';

            // Simulação de login (normalmente seria OAuth)
            setTimeout(() => {
                window.location.href = 'inicio.html';
            }, 500);
        });
    });
});
