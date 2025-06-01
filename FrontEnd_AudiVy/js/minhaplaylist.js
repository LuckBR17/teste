// Estado da aplicação
let playlists = [
    {
        id: 1,
        name: 'Favoritas',
        description: 'Minhas músicas favoritas',
        songs: [
            
        ],
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
    },
    {
        id: 2,
        name: 'Rock Clássico',
        description: 'Os maiores sucessos do rock',
        songs: [
            
        ],
        image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop'
    }
];

let selectedPlaylist = null;
let searchTerm = '';
let songSearchTerm = '';

const siteSongs = [
    { id: 201, title: 'Too Sweet', artist: 'Hozier', duration: '4:08', album: '', file: '../images/toosweetmusica.mp3' },
    { id: 202, title: 'Apaguei Para Todos', artist: 'Ferrugem', duration: '1:28', album: '', file: '../images/apagueiparatodosmusica.mp3' },
    { id: 203, title: 'Lose Yourself', artist: 'Eminem', duration: '5:26', album: '', file: '../images/eminemmusica.mp3' },
    { id: 204, title: 'Get Lucky', artist: 'Daft Punk', duration: '4:07', album: '', file: '../images/getluckymusica.mp3' },
    { id: 205, title: 'In The End', artist: 'Linkin Park', duration: '3:36', album: '', file: '../images/linkinpark.jpg' },
    { id: 206, title: 'Ms. Jackson', artist: 'Outkast', duration: '4:05', album: '', file: '../images/msjacksonmusica.mp3' },
    { id: 207, title: 'Smells Like Teen Spirit', artist: 'Nirvana', duration: '5:01', album: '', file: '../images/nirvanamusica.mp3' },
    { id: 208, title: 'Cheia de Manias', artist: 'Raça Negra', duration: '3:29', album: '', file: '../images/raçanegramusica.mp3' },
    { id: 209, title: 'Réu Confesso', artist: 'Tim Maia', duration: '3:37', album: '', file: '../images/reuconfessomusica.mp3' },
    { id: 210, title: 'No Role Modelz', artist: 'J.Cole', duration: '4:52', album: '', file: '../images/rolemodelzmusica.mp3' },
    { id: 211, title: 'Sonho de Amor', artist: 'Zezé Di Camargo & Luciano', duration: '3:15', album: '', file: '../images/sonhodeamormusica.mp3' },
    { id: 212, title: 'Sweet Child O Mine', artist: 'Guns N Roses', duration: '5:02', album: '', file: '../images/sweetchildmusica.mp3' },
    { id: 213, title: 'Thunderstruck', artist: 'AC/DC', duration: '4:54', album: '', file: '../images/thunderstruckmusica.mp3' },
];

let availableSongs = siteSongs;

const elements = {
    playlistSearch: document.getElementById('playlist-search'),
    createPlaylistBtn: document.getElementById('create-playlist-btn'),
    createFirstPlaylist: document.getElementById('create-first-playlist'),
    playlistsContainer: document.getElementById('playlists-container'),
    noSelection: document.getElementById('no-selection'),
    playlistDetail: document.getElementById('playlist-detail'),
    playlistImage: document.getElementById('playlist-image'),
    playlistName: document.getElementById('playlist-name'),
    playlistDescription: document.getElementById('playlist-description'),
    songCount: document.getElementById('song-count'),
    addSongBtn: document.getElementById('add-song-btn'),
    addFirstSong: document.getElementById('add-first-song'),
    songsList: document.getElementById('songs-list'),
    emptyPlaylist: document.getElementById('empty-playlist'),
    createModal: document.getElementById('create-modal'),
    playlistNameInput: document.getElementById('playlist-name-input'),
    playlistDescInput: document.getElementById('playlist-desc-input'),
    cancelCreate: document.getElementById('cancel-create'),
    confirmCreate: document.getElementById('confirm-create'),
    addSongModal: document.getElementById('add-song-modal'),
    closeAddSong: document.getElementById('close-add-song'),
    closeAddSongFooter: document.getElementById('close-add-song-footer'),
    songSearch: document.getElementById('song-search'),
    availableSongs: document.getElementById('available-songs'),
    noSongsFound: document.getElementById('no-songs-found')
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar ícones do Lucide
    lucide.createIcons();
    
    // Renderizar playlists iniciais
    renderPlaylists();
    
    // Event listeners
    setupEventListeners();
});

// Setup dos event listeners
function setupEventListeners() {
    // Busca de playlists
    elements.playlistSearch.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderPlaylists();
    });
    
    // Botões de criar playlist
    elements.createPlaylistBtn.addEventListener('click', () => showCreateModal());
    elements.createFirstPlaylist.addEventListener('click', () => showCreateModal());
    
    // Modal de criar playlist
    elements.cancelCreate.addEventListener('click', () => hideCreateModal());
    elements.confirmCreate.addEventListener('click', () => createPlaylist());
    
    // Botões de adicionar música
    elements.addSongBtn.addEventListener('click', () => showAddSongModal());
    elements.addFirstSong.addEventListener('click', () => showAddSongModal());
    
    // Modal de adicionar música
    elements.closeAddSong.addEventListener('click', () => hideAddSongModal());
    elements.closeAddSongFooter.addEventListener('click', () => hideAddSongModal());
    
    // Busca de músicas
    elements.songSearch.addEventListener('input', (e) => {
        songSearchTerm = e.target.value;
        renderAvailableSongs();
    });
    
    // Fechar modal ao clicar fora
    elements.createModal.addEventListener('click', (e) => {
        if (e.target === elements.createModal) {
            hideCreateModal();
        }
    });
    
    elements.addSongModal.addEventListener('click', (e) => {
        if (e.target === elements.addSongModal) {
            hideAddSongModal();
        }
    });
    
    // Enter para criar playlist
    elements.playlistNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            createPlaylist();
        }
    });
}

// Renderizar playlists
function renderPlaylists() {
    const filteredPlaylists = playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    elements.playlistsContainer.innerHTML = '';
    
    filteredPlaylists.forEach(playlist => {
        const playlistElement = document.createElement('div');
        playlistElement.className = `playlist-item ${selectedPlaylist?.id === playlist.id ? 'selected' : ''}`;
        playlistElement.onclick = () => selectPlaylist(playlist);
        
        playlistElement.innerHTML = `
            <img src="${playlist.image}" alt="${playlist.name}">
            <div class="playlist-info">
                <h3>${playlist.name}</h3>
                <p>${playlist.description}</p>
                <span class="song-count">${playlist.songs.length} músicas</span>
            </div>
            <button class="delete-btn" onclick="event.stopPropagation(); deletePlaylist(${playlist.id})">
                <i data-lucide="trash-2"></i>
            </button>
        `;
        
        elements.playlistsContainer.appendChild(playlistElement);
    });
    
    // Recriar ícones do Lucide
    lucide.createIcons();
}

// Selecionar playlist
function selectPlaylist(playlist) {
    selectedPlaylist = playlist;
    renderPlaylists();
    renderPlaylistDetail();
}

// Renderizar detalhes da playlist
function renderPlaylistDetail() {
    if (!selectedPlaylist) {
        elements.noSelection.classList.remove('hidden');
        elements.playlistDetail.classList.add('hidden');
        return;
    }
    
    elements.noSelection.classList.add('hidden');
    elements.playlistDetail.classList.remove('hidden');
    
    elements.playlistImage.src = selectedPlaylist.image;
    elements.playlistImage.alt = selectedPlaylist.name;
    elements.playlistName.textContent = selectedPlaylist.name;
    elements.playlistDescription.textContent = selectedPlaylist.description;
    elements.songCount.textContent = `${selectedPlaylist.songs.length} músicas`;
    
    renderSongs();
}

// Renderizar músicas da playlist
function renderSongs() {
    if (!selectedPlaylist) return;
    
    if (selectedPlaylist.songs.length === 0) {
        elements.songsList.innerHTML = '';
        elements.emptyPlaylist.classList.remove('hidden');
        return;
    }
    
    elements.emptyPlaylist.classList.add('hidden');
    elements.songsList.innerHTML = '';
    
    selectedPlaylist.songs.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.className = 'song-item';
        
        songElement.innerHTML = `
            <div class="song-info">
                <span class="song-number">${index + 1}</span>
                <div class="song-details">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
            </div>
            <div class="song-actions">
                <span class="song-duration">${song.duration}</span>
                <button class="song-btn">
                    <i data-lucide="heart"></i>
                </button>
                <button class="song-btn" onclick="removeSong(${song.id})">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>
        `;
        
        songElement.addEventListener('click', () => {
            playSong(song.file);
        });
        
        elements.songsList.appendChild(songElement);
    });
    
    // Recriar ícones do Lucide
    lucide.createIcons();
}

const audioPlayer = new Audio();

const musicPlayer = document.getElementById('music-player');
const playerSongTitle = document.getElementById('player-song-title');
const playerPlayPauseBtn = document.getElementById('player-play-pause');
const playPauseIcon = document.getElementById('play-pause-icon');
const playerProgress = document.getElementById('player-progress');

let currentSongFile = null;
let isPlaying = false;

function playSong(file, title = '') {
    if (!file) return;
    currentSongFile = file;
    audioPlayer.src = file;
    audioPlayer.play();
    isPlaying = true;
    updatePlayerUI(title);
    updatePlayButtonIcons();
    showPlayer();
}

function updatePlayerUI(title) {
    playerSongTitle.textContent = title || 'Título da música';
    playPauseIcon.setAttribute('data-lucide', 'pause');
    lucide.createIcons();
}

function updatePlayButtonIcons() {
    // Esta função foi removida conforme solicitado para desfazer a última alteração.
}

function togglePlayPause() {
    if (!currentSongFile) return;
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play();
        isPlaying = true;
    }
    updatePlayButtonIcons();
}

playerPlayPauseBtn.addEventListener('click', togglePlayPause);

audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        playerProgress.value = progressPercent;
    }
});

playerProgress.addEventListener('input', () => {
    if (audioPlayer.duration) {
        const seekTime = (playerProgress.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    }
});

// Update renderSongs to pass song title to playSong and set initial play icon
function renderSongs() {
    if (!selectedPlaylist) return;
    
    if (selectedPlaylist.songs.length === 0) {
        elements.songsList.innerHTML = '';
        elements.emptyPlaylist.classList.remove('hidden');
        return;
    }
    
    elements.emptyPlaylist.classList.add('hidden');
    elements.songsList.innerHTML = '';
    
    selectedPlaylist.songs.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.className = 'song-item';
        
        songElement.innerHTML = `
            <div class="song-info">
                <span class="song-number">${index + 1}</span>
                <div class="song-details">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
            </div>
            <div class="song-actions">
                <span class="song-duration">${song.duration}</span>
                <button class="song-btn">
                    <i data-lucide="play"></i>
                </button>
                <button class="song-btn" onclick="removeSong(${song.id})">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>
        `;
        
        songElement.addEventListener('click', () => {
            playSong(song.file, song.title);
        });
        
        elements.songsList.appendChild(songElement);
    });
    
    // Recriar ícones do Lucide
    lucide.createIcons();
}

function showPlayer() {
    musicPlayer.classList.remove('hidden');
}

function togglePlayPause() {
    if (!currentSongFile) return;
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        playPauseIcon.setAttribute('data-lucide', 'play');
    } else {
        audioPlayer.play();
        isPlaying = true;
        playPauseIcon.setAttribute('data-lucide', 'pause');
    }
    lucide.createIcons();
}

playerPlayPauseBtn.addEventListener('click', togglePlayPause);

audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        playerProgress.value = progressPercent;
    }
});

playerProgress.addEventListener('input', () => {
    if (audioPlayer.duration) {
        const seekTime = (playerProgress.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    }
});

// Update renderSongs to pass song title to playSong
function renderSongs() {
    if (!selectedPlaylist) return;
    
    if (selectedPlaylist.songs.length === 0) {
        elements.songsList.innerHTML = '';
        elements.emptyPlaylist.classList.remove('hidden');
        return;
    }
    
    elements.emptyPlaylist.classList.add('hidden');
    elements.songsList.innerHTML = '';
    
    selectedPlaylist.songs.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.className = 'song-item';
        
        songElement.innerHTML = `
            <div class="song-info">
                <span class="song-number">${index + 1}</span>
                <div class="song-details">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
            </div>
            <div class="song-actions">
                <span class="song-duration">${song.duration}</span>
                <button class="song-btn">
                    <i data-lucide="heart"></i>
                </button>
                <button class="song-btn" onclick="removeSong(${song.id})">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>
        `;
        
        songElement.addEventListener('click', () => {
            playSong(song.file, song.title);
        });
        
        elements.songsList.appendChild(songElement);
    });
    
    // Recriar ícones do Lucide
    lucide.createIcons();
}

// Criar playlist
function createPlaylist() {
    const name = elements.playlistNameInput.value.trim();
    if (!name) return;
    
    const newPlaylist = {
        id: Date.now(),
        name: name,
        description: elements.playlistDescInput.value.trim(),
        songs: [],
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
    };
    
    playlists.push(newPlaylist);
    renderPlaylists();
    hideCreateModal();
    
    // Limpar formulário
    elements.playlistNameInput.value = '';
    elements.playlistDescInput.value = '';
}

// Deletar playlist
function deletePlaylist(playlistId) {
    if (confirm('Tem certeza que deseja excluir esta playlist?')) {
        playlists = playlists.filter(p => p.id !== playlistId);
        
        if (selectedPlaylist && selectedPlaylist.id === playlistId) {
            selectedPlaylist = null;
        }
        
        renderPlaylists();
        renderPlaylistDetail();
    }
}

// Remover música da playlist
function removeSong(songId) {
    if (!selectedPlaylist) return;
    
    selectedPlaylist.songs = selectedPlaylist.songs.filter(song => song.id !== songId);
    
    // Atualizar no array principal
    const playlistIndex = playlists.findIndex(p => p.id === selectedPlaylist.id);
    if (playlistIndex !== -1) {
        playlists[playlistIndex] = selectedPlaylist;
    }
    
    renderSongs();
    renderPlaylists();
}

// Adicionar música à playlist
function addSongToPlaylist(song) {
    if (!selectedPlaylist || !song) return;
    
    // Verificar se a música já está na playlist
    const songExists = selectedPlaylist.songs.some(s => s.id === song.id);
    if (songExists) {
        alert('Esta música já está na playlist!');
        return;
    }
    
    selectedPlaylist.songs.push(song);
    
    // Atualizar no array principal
    const playlistIndex = playlists.findIndex(p => p.id === selectedPlaylist.id);
    if (playlistIndex !== -1) {
        playlists[playlistIndex] = selectedPlaylist;
    }
    
    renderSongs();
    renderPlaylists();
    renderAvailableSongs();
    
    // Limpar busca e fechar modal
    songSearchTerm = '';
    elements.songSearch.value = '';
    hideAddSongModal();
}

// Renderizar músicas disponíveis
function renderAvailableSongs() {
    const filteredSongs = availableSongs.filter(song =>
        song.title.toLowerCase().includes(songSearchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(songSearchTerm.toLowerCase()) ||
        song.album.toLowerCase().includes(songSearchTerm.toLowerCase())
    );
    
    if (filteredSongs.length === 0) {
        elements.availableSongs.innerHTML = '';
        elements.noSongsFound.classList.remove('hidden');
        return;
    }
    
    elements.noSongsFound.classList.add('hidden');
    elements.availableSongs.innerHTML = '';
    
    filteredSongs.forEach(song => {
        const isAlreadyInPlaylist = selectedPlaylist?.songs.some(s => s.id === song.id);
        
        const songElement = document.createElement('div');
        songElement.className = `available-song-item ${isAlreadyInPlaylist ? 'added' : ''}`;
        
        songElement.innerHTML = `
            <div class="song-icon">
                <i data-lucide="music"></i>
            </div>
            <div class="available-song-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
                <span class="album">${song.album}</span>
            </div>
            <span class="song-duration-available">${song.duration}</span>
            <div>
                ${isAlreadyInPlaylist ? `
                    <div class="added-indicator">
                        <span>Já adicionada</span>
                        <div class="check-icon">✓</div>
                    </div>
                ` : `
                    <button class="add-song-btn" onclick="addSongToPlaylist(${JSON.stringify(song).replace(/"/g, '&quot;')})">
                        <i data-lucide="plus"></i>
                        <span>Adicionar</span>
                    </button>
                `}
            </div>
        `;
        
        elements.availableSongs.appendChild(songElement);
    });
    
    // Recriar ícones do Lucide
    lucide.createIcons();
}

// Mostrar modal de criar playlist
function showCreateModal() {
    elements.createModal.classList.remove('hidden');
    elements.playlistNameInput.focus();
}

// Esconder modal de criar playlist
function hideCreateModal() {
    elements.createModal.classList.add('hidden');
    elements.playlistNameInput.value = '';
    elements.playlistDescInput.value = '';
}

// Mostrar modal de adicionar música
function showAddSongModal() {
    if (!selectedPlaylist) return;
    
    elements.addSongModal.classList.remove('hidden');
    songSearchTerm = '';
    elements.songSearch.value = '';
    renderAvailableSongs();
    elements.songSearch.focus();
}

// Esconder modal de adicionar música
function hideAddSongModal() {
    elements.addSongModal.classList.add('hidden');
    songSearchTerm = '';
    elements.songSearch.value = '';
}