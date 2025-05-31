// Funcionalidade para os planos de assinatura
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os cards de planos
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        const checkbox = card.querySelector('.terms-checkbox');
        const subscribeBtn = card.querySelector('.subscribe-btn');
        const planTitle = card.querySelector('.plan-content h3').textContent;
        
        // Map plan titles to keys
        const planKeyMap = {
            'Plano Mensal': 'Mensal',
            'Plano Anual': 'Anual',
            'Plano Familiar': 'Familiar'
        };
        const planKey = planKeyMap[planTitle] || 'Mensal';
        
        // Habilita/desabilita o botão baseado no checkbox
        checkbox.addEventListener('change', function() {
            subscribeBtn.disabled = !this.checked;
            
            // Adiciona feedback visual
            if (this.checked) {
                subscribeBtn.style.opacity = '1';
                subscribeBtn.style.cursor = 'pointer';
            } else {
                subscribeBtn.style.opacity = '0.6';
                subscribeBtn.style.cursor = 'not-allowed';
            }
        });
        
        // Funcionalidade do botão de assinatura
        subscribeBtn.addEventListener('click', function() {
            if (!this.disabled) {
                // Salva o plano selecionado no localStorage
                localStorage.setItem('selectedPlan', planKey);
                
                // Redireciona para a página de pagamentos
                window.location.href = 'pagamentos.html';
            }
        });
    });
    
    // Funcionalidade do botão voltar
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Adiciona animação antes de voltar
            document.body.style.opacity = '0.8';
            setTimeout(() => {
                history.back();
            }, 200);
        });
    });
    
    // Adiciona efeitos de hover nos cards
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Função para mostrar mensagem de sucesso
function showSuccessMessage(planName) {
    // Cria elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">✓</div>
            <div class="notification-text">
                <strong>Sucesso!</strong><br>
                ${planName} assinado com sucesso!
            </div>
        </div>
    `;
    
    // Adiciona estilos inline para a notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #7209b7, #f72585);
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Adiciona animação CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-icon {
            width: 24px;
            height: 24px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        
        .notification-text {
            flex: 1;
            font-size: 14px;
            line-height: 1.4;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Remove a notificação após 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 300);
    }, 4000);
}

// Adiciona efeito de parallax suave no scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const logoContainer = document.querySelector('.logo-container');
    
    if (logoContainer) {
        logoContainer.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Adiciona animações de entrada quando a página carrega
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.plan-card');
    const logo = document.querySelector('.logo-container');
    
    // Anima o logo
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-30px)';
        logo.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Anima os cards com delay
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
    });
});
