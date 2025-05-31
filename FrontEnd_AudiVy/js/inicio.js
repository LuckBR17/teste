// Banco de dados simulado de músicas
const musicDatabase = [
    {
        id: 1,
        title: "Too Sweet",
        artist: "Hozier",
        album: "Unheard",
        duration: "4:08",
        image: "../images/toosweet.jpeg",
        audio: "../images/toosweetmusica.mp3",
        genre: "Indie Rock"
    },
    {
        id: 2,
        title: "Get Lucky",
        artist: "Daft Punk",
        album: "Random Access Memories",
        duration: "4:07",
        image: "../images/getlucky.jpg",
        audio: "../images/getluckymusica.mp3",
        genre: "Electronic"
    },
   

    {
        id: 3,
        title: "Smells Like Teen Spirit",
        artist: "Nirvana",
        album: "Peso Certo",
        duration: "5:01",
        image: "../images/nirvana2.jpg",
        audio: "../images/nirvanamusica.mp3",
        genre: "Grunge"
    },


    {
        id: 4,
        title: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        album: "Peso Certo",
        duration: "5:56",
        image: "../images/sweetchild.jpeg",
        audio: "../images/sweetchildmusica.mp3",
        genre: "Rock"
    },

    {
        id: 5,
        title: "Thunderstruck",
        artist: "AC/DC",
        album: "Peso Certo",
        duration: "4:52",
        image: "../images/thunderstruck.webp",
        audio: "../images/thunderstruckmusica.mp3",
        genre: "Rock"
    },
    {
        id: 6,
        title: "In The End",
        artist: "Linkin Park",
        album: "Peso Certo",
        duration: "3:36",
        image: "../images/linkinpark.jpg",
        audio: "../images/08 In The End.mp3",
        genre: "Rock"
    },

    {
        id: 7,
        title: "Réu Confesso",
        artist: "Tim Maia",
        album: "Vibe Brasil",
        duration: "3:37",
        image: "../images/timmaia.png",
        audio: "../images/reuconfessomusica.mp3",
        genre: "Soul"
    },

    {
        id: 8,
        title: "Cheia de Manias",
        artist: "Raça Negra",
        album: "Vibe Brasil",
        duration: "3:29",
        image: "../images/raçanegra.jpeg",
        audio: "../images/raçanegramusica.mp3",
        genre: "Pagode"
    },

    {
        id: 9,
        title: "Apaguei Para Todos",
        artist: "Ferrugem",
        album: "Vibe Brasil",
        duration: "1:28",
        image: "../images/apagueiparatodos.png",
        audio: "../images/apagueiparatodosmusica.mp3",
        genre: "Pagode"
    },

    {
        id: 10,
        title: "Sonho de Amor",
        artist: "Zezé Di Camargo & Luciano",
        album: "Vibe Brasil",
        duration: "3:15",
        image: "../images/zezé.png",
        audio: "../images/sonhodeamormusica.mp3",
        genre: "Sertanejo"
    },

    {
        id: 11,
        title: "No Role Modelz",
        artist: "J.Cole",
        album: "Hip Hop Vibes",
        duration: "4:52",
        image: "../images/modelz.jpeg",
        audio: "../images/rolemodelzmusica.mp3",
        genre: "Hip Hop"
    },

    {
        id: 12,
        title: "Lose Yourself",
        artist: "Eminem",
        album: "Hip Hop Vibes",
        duration: "5:26",
        image: "../images/eminem.jpg",
        audio: "../images/eminemmusica.mp3",
        genre: "Hip Hop"
    },

    {
        id: 13,
        title: "Ms. Jackson",
        artist: "Outkast",
        album: "Hip Hop Vibes",
        duration: "4:05",
        image: "../images/msjackson.jpg",
        audio: "../images/msjacksonmusica.mp3",
        genre: "Hip Hop"
    },

    {
        id: 14,
        title: "SICKO MODE",
        artist: "Travis Scott",
        album: "Hip Hop Vibes",
        duration: "5:14",
        image: "../images/travis.png",
        audio: "../images/travismusica.mp3",
        genre: "Hip Hop"
    }
];

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
    const searchInput = document.querySelector('.search-bar input');

    let progressAnimationId; // ID da animação de progresso
    let searchResults = []; // Resultados da busca

    // Inicializa o visualizador de ondas
    generateWaveVisualizer();

    // Funcionalidade do menu mobile
    initializeMobileMenu();

    // Inicializa o sistema de busca
    initializeSearch();

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

    // Função para inicializar o sistema de busca
    function initializeSearch() {
        if (!searchInput) return;

        let searchTimeout;
        
        // Evento de input para busca em tempo real
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length === 0) {
                hideSearchResults();
                return;
            }
            
            // Debounce para evitar muitas buscas
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });

        // Evento para fechar resultados ao clicar fora
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-bar') && !e.target.closest('.search-results')) {
                hideSearchResults();
            }
        });

        // Evento para navegação com teclado
        searchInput.addEventListener('keydown', function(e) {
            const resultsContainer = document.querySelector('.search-results');
            if (!resultsContainer) return;

            const items = resultsContainer.querySelectorAll('.search-result-item');
            let currentIndex = Array.from(items).findIndex(item => item.classList.contains('selected'));

            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                    updateSelection(items, currentIndex);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                    updateSelection(items, currentIndex);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (currentIndex >= 0 && items[currentIndex]) {
                        items[currentIndex].click();
                    }
                    break;
                case 'Escape':
                    hideSearchResults();
                    searchInput.blur();
                    break;
            }
        });
    }

    // Função para realizar a busca
    function performSearch(query) {
        const results = musicDatabase.filter(song => {
            const searchTerm = query.toLowerCase();
            return song.title.toLowerCase().includes(searchTerm) ||
                   song.artist.toLowerCase().includes(searchTerm) ||
                   song.album.toLowerCase().includes(searchTerm) ||
                   song.genre.toLowerCase().includes(searchTerm);
        });

        searchResults = results;
        displaySearchResults(results, query);
    }

    // Função para exibir os resultados da busca
    function displaySearchResults(results, query) {
        // Remove container de resultados anterior se existir
        const existingResults = document.querySelector('.search-results');
        if (existingResults) {
            existingResults.remove();
        }

        if (results.length === 0) {
            showNoResults(query);
            return;
        }

        // Cria container de resultados
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        
        // Adiciona título dos resultados
        const resultsHeader = document.createElement('div');
        resultsHeader.className = 'search-results-header';
        resultsHeader.innerHTML = `
            <h3>Resultados para "${query}" (${results.length})</h3>
            <button class="close-search">×</button>
        `;
        resultsContainer.appendChild(resultsHeader);

        // Adiciona cada resultado
        results.forEach((song, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div class="result-image">
                    <img src="${song.image}" alt="${song.title}">
                    <div class="result-play-btn">▶</div>
                </div>
                <div class="result-info">
                    <h4 class="result-title">${highlightMatch(song.title, query)}</h4>
                    <p class="result-artist">${highlightMatch(song.artist, query)}</p>
                    <p class="result-album">${highlightMatch(song.album, query)} • ${song.duration}</p>
                </div>
                <div class="result-genre">${song.genre}</div>
            `;

            // Adiciona evento de clique
            resultItem.addEventListener('click', () => {
                playSearchResult(song);
                hideSearchResults();
                searchInput.value = '';
            });

            resultsContainer.appendChild(resultItem);
        });

        // Adiciona evento para fechar
        resultsContainer.querySelector('.close-search').addEventListener('click', () => {
            hideSearchResults();
        });

        // Adiciona ao DOM
        document.querySelector('.search-bar').appendChild(resultsContainer);
    }

    // Função para destacar termos correspondentes
    function highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // Função para mostrar "nenhum resultado"
    function showNoResults(query) {
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        resultsContainer.innerHTML = `
            <div class="search-results-header">
                <h3>Nenhum resultado para "${query}"</h3>
                <button class="close-search">×</button>
            </div>
            <div class="no-results">
                <p>Tente buscar por:</p>
                <ul>
                    <li>Nome da música</li>
                    <li>Nome do artista</li>
                    <li>Nome do álbum</li>
                    <li>Gênero musical</li>
                </ul>
            </div>
        `;

        resultsContainer.querySelector('.close-search').addEventListener('click', () => {
            hideSearchResults();
        });

        document.querySelector('.search-bar').appendChild(resultsContainer);
    }

    // Função para esconder resultados da busca
    function hideSearchResults() {
        const resultsContainer = document.querySelector('.search-results');
        if (resultsContainer) {
            resultsContainer.remove();
        }
    }

    // Função para atualizar seleção com teclado
    function updateSelection(items, newIndex) {
        items.forEach(item => item.classList.remove('selected'));
        if (items[newIndex]) {
            items[newIndex].classList.add('selected');
            items[newIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    // Função para tocar resultado da busca
    function playSearchResult(song) {
        if (song.audio) {
            playRealAudio(song.title, song.image, song.audio);
        } else {
            simulatePlayingTrack(song.title, song.image);
        }
    }

    // Subscription and ad display logic for non-subscribed users
    const isSubscribed = localStorage.getItem('isSubscribed') === 'true';

    if (!isSubscribed) {
        // Show ad banner in corner
        const adBanner = document.createElement('div');
        adBanner.id = 'subscription-ad-banner';
        adBanner.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #FA973C;
            color: black;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            cursor: pointer;
            z-index: 1000;
            font-weight: bold;
            max-width: 250px;
            text-align: center;
        `;
        adBanner.textContent = '🎵 Assine para ouvir músicas ilimitadas! Clique aqui.';

        adBanner.addEventListener('click', () => {
            window.location.href = '../html/assinatura.html';
        });

        document.body.appendChild(adBanner);

        // Show initial offer message in welcome section
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            const offerMessage = document.createElement('div');
            offerMessage.id = 'subscription-offer-message';
            offerMessage.style.cssText = `
                background-color: #FFF3CD;
                color: #856404;
                padding: 10px 20px;
                margin-top: 15px;
                border: 1px solid #FFEeba;
                border-radius: 5px;
                text-align: center;
            `;
            offerMessage.innerHTML = '⚠️ Você está ouvindo como usuário gratuito. <strong>Assine para ter acesso ilimitado e sem anúncios!</strong>';

            welcomeSection.appendChild(offerMessage);
        }
    }
});
