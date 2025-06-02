// Atualizar labels dos arquivos quando selecionados
document.getElementById('audioFile').addEventListener('change', function(e) {
    const fileName = e.target.files[0]?.name;
    if (fileName) {
        const label = e.target.nextElementSibling;
        label.innerHTML = `
            <div>
                <div class="file-icon">🎵</div>
                <div><strong>Arquivo selecionado:</strong></div>
                <div style="color: #667eea; margin-top: 5px;">${fileName}</div>
            </div>
        `;
    }
});

document.getElementById('coverImage').addEventListener('change', function(e) {
    const fileName = e.target.files[0]?.name;
    if (fileName) {
        const label = e.target.nextElementSibling;
        label.innerHTML = `
            <div>
                <div class="file-icon">🖼️</div>
                <div><strong>Capa selecionada:</strong></div>
                <div style="color: #667eea; margin-top: 5px;">${fileName}</div>
            </div>
        `;
    }
});

// Formatação automática da duração
document.getElementById('duration').addEventListener('input', function(e) {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.length >= 3) {
        value = value.substring(0, 2) + ':' + value.substring(2, 4);
    }
    e.target.value = value;
});

document.getElementById('submissionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação básica
    const requiredFields = ['artistName', 'realName', 'email', 'songTitle', 'genre', 'audioFile'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value && element.type !== 'file') {
            isValid = false;
            element.style.borderColor = '#e53e3e';
        } else if (element.type === 'file' && element.files.length === 0) {
            isValid = false;
            element.nextElementSibling.style.borderColor = '#e53e3e';
        } else {
            element.style.borderColor = '#e2e8f0';
            if (element.type === 'file') {
                element.nextElementSibling.style.borderColor = '#e2e8f0';
            }
        }
    });
    
    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '⏳ Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        document.getElementById('submissionForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
    }, 2000);
});

document.querySelectorAll('input, select, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    element.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});