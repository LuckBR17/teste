document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const currentPlanSpan = document.getElementById('current-plan');
    const cancelPlanBtn = document.getElementById('cancel-plan-btn');
    const saveUsernameBtn = document.getElementById('save-username-btn');
    const messageBox = document.getElementById('message-box');
    const backButton = document.getElementById('back-button');

    // Carregar dados do usuário do localStorage
    function loadUserData() {
        const storedUsername = localStorage.getItem('username') || '';
        const storedPassword = localStorage.getItem('password') || '';
        const isSubscribed = localStorage.getItem('isSubscribed') === 'true';
        const selectedPlan = localStorage.getItem('selectedPlan') || 'Nenhum';
        const monthlyValue = localStorage.getItem('monthlyValue') || 'R$ 0,00';

        usernameInput.value = storedUsername;
        newPasswordInput.value = storedPassword;
        confirmPasswordInput.value = storedPassword;
        currentPlanSpan.textContent = isSubscribed ? selectedPlan : 'Nenhum plano ativo';

        // Atualiza o valor mensal na página
        const monthlyValueElement = document.getElementById('monthly-value');
        if (monthlyValueElement) {
            monthlyValueElement.textContent = isSubscribed ? monthlyValue : 'R$ 0,00';
        }

        cancelPlanBtn.disabled = !isSubscribed;
    }

    saveUsernameBtn.addEventListener('click', () => {
        const newUsername = usernameInput.value.trim();
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (newUsername.length < 3) {
            showMessage('Nome de usuário deve ter pelo menos 3 caracteres.', 'error');
            return;
        }
        if (newPassword.length < 6) {
            showMessage('A senha deve ter pelo menos 6 caracteres.', 'error');
            return;
        }
        if (newPassword !== confirmPassword) {
            showMessage('As senhas não coincidem.', 'error');
            return;
        }

        localStorage.setItem('username', newUsername);
        localStorage.setItem('password', newPassword);
        showMessage('Informações salvas com sucesso!', 'success');
    });

    cancelPlanBtn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja cancelar sua assinatura?')) {
            localStorage.removeItem('isSubscribed');
            localStorage.removeItem('selectedPlan');
            currentPlanSpan.textContent = 'Nenhum plano ativo';
            cancelPlanBtn.disabled = true;
            showMessage('Assinatura cancelada com sucesso.', 'success');
        }
    });

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = '../html/inicio.html';
        });
    }

    function showMessage(text, type) {
        messageBox.textContent = text;
        messageBox.className = type === 'error' ? 'message error' : 'message success';
        messageBox.style.display = 'block';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 4000);
    }

    loadUserData();
});