document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const paymentOptions = document.querySelectorAll('.payment-option');
    const creditDebitForm = document.getElementById('credit-debit-form');
    const pixForm = document.getElementById('pix-form');
    const installmentsGroup = document.getElementById('installments-group');
    const paymentForm = document.getElementById('payment-form');
    const cardNumberInput = document.getElementById('card-number');
    const expiryInput = document.getElementById('expiry');
    const cvvInput = document.getElementById('cvv');
    const copyPixButton = document.querySelector('.copy-pix-code');

    // Recuperar informações do plano selecionado do localStorage
    const selectedPlan = localStorage.getItem('selectedPlan') || 'Mensal';
    const planPrice = selectedPlan === 'Mensal' ? '29,90' : '299,90';
    
    // Atualizar informações do plano na página
    document.getElementById('selected-plan').textContent = selectedPlan;
    document.getElementById('plan-price').textContent = planPrice;

    // Gerenciar seleção do método de pagamento
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remover classe active de todas as opções
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            // Adicionar classe active na opção selecionada
            option.classList.add('active');

            const method = option.dataset.method;
            
            // Mostrar/esconder formulários apropriados
            if (method === 'pix') {
                creditDebitForm.classList.add('hidden');
                pixForm.classList.remove('hidden');
            } else {
                creditDebitForm.classList.remove('hidden');
                pixForm.classList.add('hidden');
                // Mostrar/esconder opções de parcelamento
                installmentsGroup.style.display = method === 'credit' ? 'block' : 'none';
            }
        });
    });

    // Formatar número do cartão
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value;
    });

    // Formatar data de validade
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        e.target.value = value;
    });

    // Formatar CVV
    cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // Copiar código PIX
    if (copyPixButton) {
        copyPixButton.addEventListener('click', () => {
            // Simular código PIX
            const pixCode = 'AUDIVY12345PAGAMENTO';
            navigator.clipboard.writeText(pixCode)
                .then(() => {
                    copyPixButton.textContent = 'Código Copiado!';
                    setTimeout(() => {
                        copyPixButton.textContent = 'Copiar Código PIX';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Erro ao copiar código:', err);
                    alert('Não foi possível copiar o código. Por favor, tente novamente.');
                });
        });
    }

    // Validação e envio do formulário
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const activeMethod = document.querySelector('.payment-option.active').dataset.method;

        if (activeMethod === 'pix') {
            showSuccessMessage('Pagamento PIX aguardando confirmação. Por favor, complete a transação no seu aplicativo.');
            return;
        }

        // Validar campos do cartão
        if (!validateCardFields()) {
            return;
        }

        // Simular processamento do pagamento
        showLoadingState();
        
        setTimeout(() => {
            // Simular sucesso do pagamento
            localStorage.setItem('isSubscribed', 'true');
            showSuccessMessage('Pagamento processado com sucesso! Redirecionando...');
            
            // Redirecionar para a página inicial após 2 segundos
            setTimeout(() => {
                window.location.href = 'inicio.html';
            }, 2000);
        }, 1500);
    });

    // Função para validar campos do cartão
    function validateCardFields() {
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        const expiry = expiryInput.value;
        const cvv = cvvInput.value;
        const cardName = document.getElementById('card-name').value;

        let isValid = true;

        // Validar número do cartão (deve ter 16 dígitos)
        if (cardNumber.length !== 16) {
            showError(cardNumberInput, 'Número do cartão inválido');
            isValid = false;
        } else {
            removeError(cardNumberInput);
        }

        // Validar data de validade (formato MM/YY)
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            showError(expiryInput, 'Data de validade inválida');
            isValid = false;
        } else {
            removeError(expiryInput);
        }

        // Validar CVV (3 dígitos)
        if (cvv.length !== 3) {
            showError(cvvInput, 'CVV inválido');
            isValid = false;
        } else {
            removeError(cvvInput);
        }

        // Validar nome no cartão
        if (!cardName.trim()) {
            showError(document.getElementById('card-name'), 'Nome no cartão é obrigatório');
            isValid = false;
        } else {
            removeError(document.getElementById('card-name'));
        }

        return isValid;
    }

    // Funções auxiliares
    function showError(input, message) {
        input.classList.add('error');
        const errorDiv = input.parentElement.querySelector('.error-message') || 
                        document.createElement('span');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        if (!input.parentElement.querySelector('.error-message')) {
            input.parentElement.appendChild(errorDiv);
        }
    }

    function removeError(input) {
        input.classList.remove('error');
        const errorDiv = input.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    function showLoadingState() {
        const submitButton = document.querySelector('.submit-button');
        submitButton.textContent = 'Processando...';
        submitButton.disabled = true;
    }

    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        const form = document.querySelector('.payment-form');
        form.insertBefore(successDiv, form.firstChild);
    }
});
