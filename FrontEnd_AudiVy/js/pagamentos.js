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

const selectedPlan = localStorage.getItem('selectedPlan') || 'Mensal';
let planPrice = '29,90';

if (selectedPlan === 'Mensal') {
    planPrice = '29,90';
} else if (selectedPlan === 'Anual') {
    planPrice = '299,90';
} else if (selectedPlan === 'Familiar') {
    planPrice = '69,90';
}

document.getElementById('selected-plan').textContent = selectedPlan;
document.getElementById('plan-price').textContent = planPrice;

paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
        paymentOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');

        const method = option.dataset.method;

        if (method === 'pix') {
            creditDebitForm.classList.add('hidden');
            pixForm.classList.remove('hidden');
        } else {
            creditDebitForm.classList.remove('hidden');
            pixForm.classList.add('hidden');
            installmentsGroup.style.display = method === 'credit' ? 'block' : 'none';
        }
    });
});

cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value;
});

expiryInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

cvvInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});

if (copyPixButton) {
    copyPixButton.addEventListener('click', () => {
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

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const activeMethod = document.querySelector('.payment-option.active').dataset.method;

    if (activeMethod === 'pix') {
        showSuccessMessage('Pagamento PIX aguardando confirmação. Por favor, complete a transação no seu aplicativo.');
        return;
    }

    if (!validateCardFields()) {
        return;
    }

    showLoadingState();

    setTimeout(() => {
        localStorage.setItem('isSubscribed', 'true');
        showSuccessMessage('Pagamento processado com sucesso! Redirecionando...');

        setTimeout(() => {
            window.location.href = 'inicio.html';
        }, 2000);
    }, 1500);
});

function validateCardFields() {
    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    const expiry = expiryInput.value;
    const cvv = cvvInput.value;
    const cardName = document.getElementById('card-name').value;

    let isValid = true;

    if (!isValidCardNumber(cardNumber)) {
        showError(cardNumberInput, 'Número do cartão inválido');
        isValid = false;
    } else {
        removeError(cardNumberInput);
    }

    if (!isValidExpiry(expiry)) {
        showError(expiryInput, 'Data de validade inválida ou expirada');
        isValid = false;
    } else {
        removeError(expiryInput);
    }

    if (cvv.length !== 3) {
        showError(cvvInput, 'CVV inválido');
        isValid = false;
    } else {
        removeError(cvvInput);
    }

    if (!cardName.trim()) {
        showError(document.getElementById('card-name'), 'Nome no cartão é obrigatório');
        isValid = false;
    } else {
        removeError(document.getElementById('card-name'));
    }

    return isValid;
}

function isValidCardNumber(cardNumber) {
    if (!/^\d{13,19}$/.test(cardNumber)) return false;

    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

function isValidExpiry(expiry) {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;

    const [monthStr, yearStr] = expiry.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
}

function showError(input, message) {
    input.classList.add('error');
    let errorDiv = input.parentElement.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('span');
        errorDiv.className = 'error-message';
        input.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
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