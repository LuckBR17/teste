// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona elementos principais
    const playButtons = document.querySelectorAll('.play-button');
    const audioPlayer = document.getElementById('audio-player');
    const mainPlayButton = document.querySelector('.control-button.play');
    const navItems = document.querySelectorAll('.nav-item');
    const progressInner = document.querySelector('.progress-inner');
    const progressContainer = document.querySelector('.progress-container');
    const volumeLevel = document.querySelector('.volume-level');
    const volumeSlider = document.querySelector('.volume-slider');
    const likeButton = document.querySelector('.like-button');
    const musicCards = document.querySelectorAll('.music-card');
    const trackItems = document.querySelectorAll('.track-item');
    const waveVisualizer = document.querySelector('.wave-visualizer');
    const currentTrackInfo = document.querySelector('.current-track-info h4');
    const currentTrackImage = document.querySelector('.current-track-image');
    const currentTimeDisplay = document.querySelector('.current-time');

    let progressAnimationId; // ID da animação de progresso

    // Inicializa o visualizador de ondas
    generateWaveVisualizer();

    // Funcionalidade do menu mobile
    initializeMobileMenu();

    // Adiciona eventos aos botões de play
    playButtons.forEach(button => button.addEventListener('click', togglePlay));

    // Controle principal de play/pause
    if (mainPlayButton) {
        mainPlayButton.addEventListener('click', togglePlay);
    }

    // Controle do progresso da música
    if (progressContainer) {
        progressContainer.addEventListener('click', handleProgressClick);
    }

    // Controle do volume
    if (volumeSlider) {
        volumeSlider.addEventListener('click', handleVolumeChange);
    }

    // Controle dos itens de navegação
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Adiciona interação ao botão de like
    if (likeButton) {
        likeButton.addEventListener('click', toggleLike);
    }

    // Adiciona interação com os cards de música
    musicCards.forEach(card => {
        card.addEventListener('click', () => {
            const trackName = card.querySelector('.card-title').textContent;
            const imageSrc = card.querySelector('.card-image img').src;
            simulatePlayingTrack(trackName, imageSrc);
        });
    });

    // Adiciona interação com os itens da lista de músicas
    trackItems.forEach(track => {
        track.addEventListener('click', () => {
            const trackName = track.querySelector('.track-title').textContent;
            const imageSrc = track.querySelector('.track-image img').src;
            
            // Verifica se é uma música com áudio real
            if (trackName === 'Too Sweet') {
                playRealAudio(trackName, imageSrc, '../images/toosweetmusica.mp3');
            } else if (trackName === 'Get Lucky') {
                playRealAudio(trackName, imageSrc, '../images/getluckymusica.mp3');
            } else {
                simulatePlayingTrack(trackName, imageSrc);
            }
        });
    });

    // Função para tocar áudio real de qualquer música
    function playRealAudio(trackName, imageSrc, audioSrc) {
        // Para qualquer áudio que esteja tocando
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        
        // Define o arquivo de áudio
        audioPlayer.src = audioSrc;
        
        // Atualiza a interface
        if (currentTrackInfo && currentTrackImage) {
            currentTrackInfo.textContent = trackName;
            currentTrackImage.src = imageSrc;
        }
        
        // Toca o áudio
        audioPlayer.play().then(() => {
            mainPlayButton.textContent = '❚❚';
            startRealAudioProgress();
        }).catch(error => {
            console.error('Erro ao reproduzir áudio:', error);
            // Fallback para simulação se houver erro
            simulatePlayingTrack(trackName, imageSrc);
        });
        
        // Adiciona eventos do áudio
        audioPlayer.onended = () => {
            mainPlayButton.textContent = '▶';
            stopProgressAnimation();
        };
        
        audioPlayer.ontimeupdate = () => {
            if (audioPlayer.duration) {
                const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                progressInner.style.width = `${progress}%`;
                updateRealTimeDisplay();
            }
        };
    }

    // Função para alternar entre play e pause
    function togglePlay() {
        // Se há um áudio carregado (qualquer arquivo de áudio real)
        if (audioPlayer.src && (audioPlayer.src.includes('.mp3') || audioPlayer.src.includes('.wav') || audioPlayer.src.includes('.m4a'))) {
            if (audioPlayer.paused) {
                audioPlayer.play();
                mainPlayButton.textContent = '❚❚';
            } else {
                audioPlayer.pause();
                mainPlayButton.textContent = '▶';
            }
        } else {
            // Comportamento original para simulação
            if (mainPlayButton.textContent === '▶') {
                mainPlayButton.textContent = '❚❚';
                startProgressAnimation();
            } else {
                mainPlayButton.textContent = '▶';
                stopProgressAnimation();
            }
        }
    }

    // Função para simular a reprodução de uma música
    function simulatePlayingTrack(trackName, imageSrc) {
        if (currentTrackInfo && currentTrackImage) {
            currentTrackInfo.textContent = trackName;
            currentTrackImage.src = imageSrc;
            mainPlayButton.textContent = '❚❚'; // Símbolo de pause
            progressInner.style.width = '0%'; // Reseta a barra de progresso
            startProgressAnimation();
        }
    }

    // Função para lidar com o clique no progresso
    function handleProgressClick(e) {
        const clickPosition = e.offsetX;
        const containerWidth = progressContainer.offsetWidth;
        const percentPosition = (clickPosition / containerWidth) * 100;

        progressInner.style.width = `${percentPosition}%`;
        
        // Se estiver tocando áudio real, atualiza a posição
        if (audioPlayer.src && (audioPlayer.src.includes('.mp3') || audioPlayer.src.includes('.wav') || audioPlayer.src.includes('.m4a')) && audioPlayer.duration) {
            audioPlayer.currentTime = (percentPosition / 100) * audioPlayer.duration;
        } else {
            updateTimeDisplay(percentPosition);
        }
    }

    // Função para lidar com a mudança de volume
    function handleVolumeChange(e) {
        const clickPosition = e.offsetX;
        const sliderWidth = volumeSlider.offsetWidth;
        const volumePercentage = (clickPosition / sliderWidth) * 100;

        volumeLevel.style.width = `${volumePercentage}%`;
        
        // Aplica o volume ao áudio real se estiver tocando
        if (audioPlayer.src) {
            audioPlayer.volume = volumePercentage / 100;
        }
    }

    // Função para alternar o estado do botão de like
    function toggleLike() {
        likeButton.classList.toggle('active');
        likeButton.style.color = likeButton.classList.contains('active') ? '#f72585' : 'var(--text-secondary)';
    }

    // Função para iniciar a animação da barra de progresso
    function startProgressAnimation() {
        stopProgressAnimation(); // Cancela qualquer animação anterior

        const startWidth = parseFloat(progressInner.style.width) || 0;
        const startTime = performance.now();
        const duration = 210000; // 3:30 em milissegundos

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min((elapsed / duration) * 100 + startWidth, 100);

            progressInner.style.width = `${progress}%`;
            updateTimeDisplay(progress);

            if (progress < 100) {
                progressAnimationId = requestAnimationFrame(animate);
            } else {
                mainPlayButton.textContent = '▶'; // Reseta para play
            }
        }

        progressAnimationId = requestAnimationFrame(animate);
    }

    // Função para parar a animação da barra de progresso
    function stopProgressAnimation() {
        if (progressAnimationId) {
            cancelAnimationFrame(progressAnimationId);
            progressAnimationId = null;
        }
    }

    // Função para iniciar o progresso do áudio real
    function startRealAudioProgress() {
        stopProgressAnimation(); // Para qualquer animação simulada
    }

    // Função para atualizar o display de tempo do áudio real
    function updateRealTimeDisplay() {
        if (audioPlayer.currentTime && audioPlayer.duration) {
            const currentTime = Math.floor(audioPlayer.currentTime);
            const totalTime = Math.floor(audioPlayer.duration);
            
            const currentMinutes = Math.floor(currentTime / 60);
            const currentSeconds = currentTime % 60;
            const totalMinutes = Math.floor(totalTime / 60);
            const totalSecondsDisplay = totalTime % 60;

            if (currentTimeDisplay) {
                currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
            }
            
            const totalTimeDisplay = document.querySelector('.total-time');
            if (totalTimeDisplay) {
                totalTimeDisplay.textContent = `${totalMinutes}:${totalSecondsDisplay < 10 ? '0' : ''}${totalSecondsDisplay}`;
            }
        }
    }

    // Função para atualizar o display de tempo (simulação)
    function updateTimeDisplay(progressPercentage) {
        const totalTime = 210; // 3:30 em segundos
        const currentTime = Math.floor((progressPercentage / 100) * totalTime);

        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;

        if (currentTimeDisplay) {
            currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }

    // Função para gerar o visualizador de ondas
    function generateWaveVisualizer() {
        if (!waveVisualizer) return;

        waveVisualizer.innerHTML = ''; // Limpa o conteúdo anterior
        for (let i = 0; i < 20; i++) {
            const waveBar = document.createElement('div');
            waveBar.classList.add('wave-bar');
            waveBar.style.height = `${Math.random() * 100}%`;
            waveVisualizer.appendChild(waveBar);
        }
    }

    // Função para inicializar o menu mobile
    function initializeMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        const sidebarOverlay = document.querySelector('.sidebar-overlay');

        if (!menuToggle || !sidebar || !sidebarOverlay) return;

        // Abre/fecha o menu
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : 'auto';
        });

        // Fecha o menu ao clicar no overlay
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Fecha o menu ao redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('open');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Fecha o menu ao clicar em um item de navegação (mobile)
        const navItems = sidebar.querySelectorAll('.nav-item, .playlist');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                    sidebarOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }
});
