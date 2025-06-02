document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    form.addEventListener('submit', (e) => {
        if (!usernameInput.value.trim() || !emailInput.value.trim() || !passwordInput.value.trim() || !confirmPasswordInput.value.trim()) {
            e.preventDefault();
            alert('Por favor, preencha todos os campos.');
            return;
        }
        if (passwordInput.value !== confirmPasswordInput.value) {
            e.preventDefault();
            alert('As senhas não coincidem. Por favor, verifique e tente novamente.');
            confirmPasswordInput.focus();
            return;
        }
        // Save user data to localStorage on successful validation
        const userData = {
            username: usernameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        };
        localStorage.setItem('userData', JSON.stringify(userData));
    });
});