// Dados de exemplo - você pode substituir por dados reais da sua API
const musicData = {
    categories: ['Tudo','Rock', 'Hip Hop', 'Eletrônica','Brasileira', 'Indie'],
    featured: [
        { title: 'Sweet Child O Mine', artist: 'Nirvana', genre: 'Grunge', src: '../images/nirvanamusica.mp3', img: '../images/nirvana2.jpg' },
        { title: 'In The End', artist: 'Linkin Park',genre: 'Rock', src: '../images/08 In The End.mp3', img: '../images/linkinpark.jpg' },
        { title: 'Get Lucky', artist: 'Daft Punk', genre: 'Eletrônica', src: '../images/getluckymusica.mp3', img: '../images/getlucky.jpg' },
        { title: 'Too Sweet', artist: 'Hozier', genre: 'Indie Rock', src: '../images/toosweetmusica.mp3', img: '../images/toosweet.jpeg' },
        { title: 'SICKO MODE', artist: 'Travis Scott', genre: 'Hip Hop', src: '../images/travismusica.mp3', img: '../images/travis.png' },
        { title: 'Sweet Child O Mine', artist: 'Guns N Roses', genre: 'Rock', src: '../images/sweetchildmusica.mp3', img: '../images/sweetchild.jpeg' },
        { title: 'Lose Yourself', artist: 'Eminem', genre: 'Hip Hop', src: '../images/eminemmusica.mp3', img: '../images/eminem.jpg' },
        { title: 'Ms. Jackson', artist: 'Outkast', genre: 'Hip Hop', src: '../images/msjacksonmusica.mp3', img: '../images/msjackson.jpg' },
        { title: 'Sonho de Amor', artist: 'Zezé Di Camargo & Luciano', genre: 'Brasileira', src: '../images/sonhodeamormusica.mp3', img: '../images/zezé.png' },
        { title: 'No Role Modelz', artist: 'J.Cole', genre: 'Hip Hop', src: '../images/rolemodelzmusica.mp3', img: '../images/modelz.jpeg' },
        { title: 'Cheia de Manias', artist: 'Raça Negra', genre: 'Brasileira', src: '../images/raçanegramusica.mp3', img: '../images/raçanegra.jpeg' },
        { title: 'Réu Confesso', artist: 'Tim Maia', genre: 'Brasileira', src: '../images/reuconfessomusica.mp3', img: '../images/timmaia.png' }
    ],
    trending: [
        { title: 'As It Was', artist: 'Harry Styles', duration: '2:47', src: '../images/asitwas.mp3', img: '' },
        { title: 'About Damn Time', artist: 'Lizzo', duration: '3:12', src: '../images/aboutdamntime.mp3', img: '' },
        { title: 'Running Up That Hill', artist: 'Kate Bush', duration: '4:58', src: '../images/runningupthat.mp3', img: '' },
        { title: 'First Class', artist: 'Jack Harlow', duration: '2:54', src: '../images/firstclass.mp3', img: '' },
        { title: 'Wait For U', artist: 'Future ft. Drake', duration: '3:19', src: '../images/waitforu.mp3', img: '' },
        { title: 'I\'m Good', artist: 'David Guetta & Bebe Rexha', duration: '2:55', src: '../images/imgood.mp3', img: '' },
        { title: 'Unholy', artist: 'Sam Smith', duration: '2:36', src: '../images/unholy.mp3', img: '' },
        { title: 'Anti-Hero', artist: 'Taylor Swift', duration: '3:20', src: '../images/antihero.mp3', img: '' }
    ]
};

let currentFilter = 'Tudo';
let isPlaying = false;
let currentSong = null;

// Inicializar página
function init() {
    renderCategories();
    renderFeaturedMusic();
    setupSearch();
    // Remove any previously stored song
    currentSong = null;
    // Hide player on initial load
    const playerMini = document.getElementById('playerMini');
    if (playerMini) {
        playerMini.style.display = 'none';
    }
}

// Renderizar categorias
function renderCategories() {
    const container = document.getElementById('categories');
    container.innerHTML = musicData.categories.map(category => 
        `<div class="category-chip ${category === currentFilter ? 'active' : ''}" onclick="filterByCategory('${category}')">${category}</div>`
    ).join('');
}

// Renderizar música em destaque
function renderFeaturedMusic() {
    const container = document.getElementById('featuredMusic');
    const filtered = filterMusic(musicData.featured);
    
    container.innerHTML = filtered.map(song => `
        <div class="music-card" onclick="playSong('${song.title}', '${song.artist}')">
            <div class="album-cover">
                <img src="${song.img}" alt="${song.title}" class="album-cover-img" />
                <div class="play-overlay">▶️</div>
            </div>
            <div class="music-info">
                <div class="music-title">${song.title}</div>
                <div class="music-artist">${song.artist}</div>
            </div>
        </div>
    `).join('');
}

// Filtrar música por categoria
function filterMusic(songs) {
    if (currentFilter === 'Tudo') return songs;
    return songs.filter(song => 
        song.genre && song.genre.toLowerCase().includes(currentFilter.toLowerCase())
    );
}

// Filtrar por categoria
function filterByCategory(category) {
    currentFilter = category;
    renderCategories();
    renderFeaturedMusic();
}

// Tocar música
function playSong(title, artist) {
    let allSongs = [...musicData.featured, ...musicData.trending];
    let song = allSongs.find(s => s.title === title && s.artist === artist);
    if (!song) {
        console.error('Música não encontrada:', title, artist);
        return;
    }

    currentSong = song;
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = song.src;
    audioPlayer.play();

    document.getElementById('currentTitle').textContent = song.title;
    document.getElementById('currentArtist').textContent = song.artist;

    const coverImg = document.getElementById('currentCoverImg');
    const coverEmoji = document.getElementById('currentCoverEmoji');
    if (song.img) {
        coverImg.src = song.img;
        coverImg.style.display = 'block';
        coverEmoji.style.display = 'none';
    } else {
        coverImg.style.display = 'none';
        coverEmoji.style.display = 'block';
        coverEmoji.textContent = '🎵';
    }

    document.getElementById('playerMini').style.display = 'block';

    isPlaying = true;
    const playPauseIcon = document.getElementById('playPauseIcon');
    playPauseIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';

    console.log(`Tocando: ${song.title} - ${song.artist}`);
}

let isShuffleOn = false;
let isRepeatOn = false;
let shuffledPlaylist = [];

// Toggle play/pause with updated icon
function togglePlayPause() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseIcon = document.getElementById('playPauseIcon');
    
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        playPauseIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
    } else {
        audioPlayer.play();
        isPlaying = true;
        playPauseIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
    }
    
    updatePlaybackStatus();
}

// Format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Update time display and progress
function updateTimeDisplay() {
    const audioPlayer = document.getElementById('audioPlayer');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const progressFill = document.getElementById('progressFill');
    
    if (audioPlayer.duration) {
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        totalTimeEl.textContent = formatTime(audioPlayer.duration);
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

// Seek functionality
function seek(event) {
    const audioPlayer = document.getElementById('audioPlayer');
    const progressBar = event.currentTarget;
    const bounds = progressBar.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const width = bounds.width;
    const percentage = x / width;
    
    audioPlayer.currentTime = percentage * audioPlayer.duration;
    updateTimeDisplay();
}

// Toggle shuffle
function toggleShuffle() {
    const shuffleBtn = document.getElementById('shuffleBtn');
    isShuffleOn = !isShuffleOn;
    shuffleBtn.classList.toggle('active');
    
    if (isShuffleOn) {
        let allSongs = [...musicData.featured, ...musicData.trending];
        shuffledPlaylist = [...allSongs].sort(() => Math.random() - 0.5);
    }
}

// Toggle repeat
function toggleRepeat() {
    const repeatBtn = document.getElementById('repeatBtn');
    isRepeatOn = !isRepeatOn;
    repeatBtn.classList.toggle('active');
}

// Previous song with shuffle support
function previousSong() {
    let allSongs = isShuffleOn ? shuffledPlaylist : [...musicData.featured, ...musicData.trending];
    let currentIndex = allSongs.findIndex(s => s.title === currentSong.title && s.artist === currentSong.artist);
    
    if (currentIndex > 0) {
        playSong(allSongs[currentIndex - 1].title, allSongs[currentIndex - 1].artist);
    } else if (isRepeatOn) {
        playSong(allSongs[allSongs.length - 1].title, allSongs[allSongs.length - 1].artist);
    }
}

// Next song with shuffle and repeat support
function nextSong() {
    let allSongs = isShuffleOn ? shuffledPlaylist : [...musicData.featured, ...musicData.trending];
    let currentIndex = allSongs.findIndex(s => s.title === currentSong.title && s.artist === currentSong.artist);
    
    if (currentIndex < allSongs.length - 1) {
        playSong(allSongs[currentIndex + 1].title, allSongs[currentIndex + 1].artist);
    } else if (isRepeatOn) {
        playSong(allSongs[0].title, allSongs[0].artist);
    }
}

// Initialize audio player event listeners
function initializeAudioPlayer() {
    const audioPlayer = document.getElementById('audioPlayer');
    
    audioPlayer.addEventListener('timeupdate', updateTimeDisplay);
    audioPlayer.addEventListener('loadedmetadata', updateTimeDisplay);
    audioPlayer.addEventListener('ended', () => {
        if (isRepeatOn) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else {
            nextSong();
        }
    });
}

// Update playback status
function updatePlaybackStatus() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (!audioPlayer.paused) {
        requestAnimationFrame(updateTimeDisplay);
    }
}

// Configurar busca
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        searchMusic(query);
    });
}

// Buscar música
function searchMusic(query) {
    if (!query) {
        renderFeaturedMusic();
        return;
    }

    const allSongs = [...musicData.featured];
    const filtered = allSongs.filter(song => 
        song.title.toLowerCase().includes(query) || 
        song.artist.toLowerCase().includes(query)
    );

    // Atualizar seções com resultados da busca
    const container = document.getElementById('featuredMusic');
    container.innerHTML = filtered.map(song => `
        <div class="music-card" onclick="playSong('${song.title}', '${song.artist}')">
            <div class="album-cover">
                <img src="${song.img}" alt="${song.title}" class="album-cover-img" />
                <div class="play-overlay">▶️</div>
            </div>
            <div class="music-info">
                <div class="music-title">${song.title}</div>
                <div class="music-artist">${song.artist}</div>
            </div>
        </div>
    `).join('');
}

// Animações de entrada
function animateCards() {
    const cards = document.querySelectorAll('.music-card, .trending-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    init();
    initializeAudioPlayer();
    setTimeout(animateCards, 500);
});
