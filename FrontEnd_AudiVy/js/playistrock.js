document.addEventListener('DOMContentLoaded', () => {
    const songList = document.getElementById('song-list');
    const audioPlayer = document.getElementById('audio-player');
    const coverImage = document.getElementById('player-cover');
    const titleText = document.getElementById('player-title');
    const artistText = document.getElementById('player-artist');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeElem = document.getElementById('current-time');
    const durationElem = document.getElementById('duration');

    let isPlaying = false;

    function playSong(tr) {
        const src = tr.getAttribute('data-src');
        const cover = tr.getAttribute('data-cover');
        const title = tr.getAttribute('data-title');
        const artist = tr.getAttribute('data-artist');

        audioPlayer.src = src;
        audioPlayer.play();
        isPlaying = true;
        playPauseBtn.textContent = '⏸';

        coverImage.src = cover;
        titleText.textContent = title;
        artistText.textContent = artist;
    }

    songList.querySelectorAll('tr').forEach((tr) => {
        tr.addEventListener('click', () => {
            playSong(tr);
        });
    });

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            playPauseBtn.textContent = '▶';
        } else {
            audioPlayer.play();
            playPauseBtn.textContent = '⏸';
        }
        isPlaying = !isPlaying;
    });

    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.value = progressPercent;

            currentTimeElem.textContent = formatTime(audioPlayer.currentTime);
            durationElem.textContent = formatTime(audioPlayer.duration);
        }
    });

    progressBar.addEventListener('input', () => {
        if (audioPlayer.duration) {
            const seekTime = (progressBar.value / 100) * audioPlayer.duration;
            audioPlayer.currentTime = seekTime;
        }
    });

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Play first song by default
    const firstSong = songList.querySelector('tr');
    if (firstSong) {
        playSong(firstSong);
    }
});
