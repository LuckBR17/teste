// Estado da aplicação
let playlists = [
    {
        id: 1,
        name: 'Favoritas',
        description: 'Minhas músicas favoritas',
        songs: [
            { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55' },
            { id: 2, title: 'Hotel California', artist: 'Eagles', duration: '6:30' },
            { id: 3, title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02' }
        ],
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
    },
    {
        id: 2,
        name: 'Rock Clássico',
        description: 'Os maiores sucessos do rock',
        songs: [
            { id: 4, title: 'Sweet Child O Mine', artist: 'Guns N Roses', duration: '5:03' },
            { id: 5, title: 'Smoke on the Water', artist: 'Deep Purple', duration: '5:40' }
        ],
        image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop'
    }
];

let selectedPlaylist = null;
let searchTerm = '';
let songSearchTerm = '';

const siteSongs = [
    { id: 201, title: '08 In The End', artist: 'Unknown', duration: '4:00', album: '', file: '../images/08 In The End.mp3' },
    { id: 202, title: 'Apaguei Para Todos', artist: 'Unknown', duration: '3:30', album: '', file: '../images/apagueiparatodosmusica.mp3' },
    { id: 203, title: 'Eminem', artist: 'Eminem', duration: '5:00', album: '', file: '../images/eminemmusica.mp3' },
    { id: 204, title: 'Get Lucky', artist: 'Daft Punk', duration: '4:00', album: '', file: '../images/getluckymusica.mp3' },
    { id: 205, title: 'Linkin Park', artist: 'Linkin Park', duration: '4:30', album: '', file: '../images/linkinpark.jpg' },
    { id: 206, title: 'Ms Jackson', artist: 'Outkast', duration: '3:50', album: '', file: '../images/msjacksonmusica.mp3' },
    { id: 207, title: 'Nirvana', artist: 'Nirvana', duration: '5:00', album: '', file: '../images/nirvanamusica.mp3' },
    { id: 208, title: 'Propaganda', artist: 'Unknown', duration: '3:20', album: '', file: '../images/propaganda.mp3' },
    { id: 209, title: 'Raça Negra', artist: 'Raça Negra', duration: '4:10', album: '', file: '../images/raçanegramusica.mp3' },
    { id: 210, title: 'Reu Confesso', artist: 'Unknown', duration: '3:40', album: '', file: '../images/reuconfessomusica.mp3' },
    { id: 211, title: 'Role Modelz', artist: 'Unknown', duration: '3:30', album: '', file: '../images/rolemodelzmusica.mp3' },
    { id: 212, title: 'Sonho de Amor', artist: 'Unknown', duration: '4:00', album: '', file: '../images/sonhodeamormusica.mp3' },
    { id: 213, title: 'Sweet Child', artist: 'Guns N Roses', duration: '5:00', album: '', file: '../images/sweetchildmusica.mp3' },
    { id: 214, title: 'Thunderstruck', artist: 'AC/DC', duration: '4:50', album: '', file: '../images/thunderstruckmusica.mp3' },
    { id: 215, title: 'Tim Maia', artist: 'Tim Maia', duration: '4:20', album: '', file: '../images/timmaia.png' },
    { id: 216, title: 'Too Sweet', artist: 'Unknown', duration: '3:30', album: '', file: '../images/toosweetmusica.mp3' },
    { id: 217, title: 'Travis', artist: 'Unknown', duration: '3:40', album: '', file: '../images/travismusica.mp3' },
    { id: 218, title: 'Zezé', artist: 'Unknown', duration: '3:50', album: '', file: '../images/zezé.png' }
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