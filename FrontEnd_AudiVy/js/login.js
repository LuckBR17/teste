document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');
    const socialButtons = document.querySelectorAll('.social-btn');
    
    // Validação de formulário simples
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Por favor, insira seu email ou nome de usuário');
            return;
        }
        
        if (!passwordInput.value.trim()) {
            showError(passwordInput, 'Por favor, insira sua senha');
            return;
        }
        
        // Se tudo estiver válido, simular login
        loginBtn.textContent = 'Entrando...';
        
        // Simulação de login (normalmente seria uma chamada API)
        setTimeout(() => {
            // Redirecionar para a página inicial após login bem-sucedido
            window.location.href = 'index.html';
        }, 1500);
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
                window.location.href = 'index.html';
            }, 1500);
        });
    });
});