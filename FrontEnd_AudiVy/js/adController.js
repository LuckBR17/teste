export default function AdController(audioPlayer, playPauseBtn, coverImage, titleText, artistText) {
    let songsPlayedCount = 0;
    let isPlayingAd = false;

    function isUserSubscribed() {
        return !!localStorage.getItem('selectedPlan');
    }

    function playAd() {
        if (isPlayingAd) return;
        isPlayingAd = true;

        audioPlayer.pause();
        audioPlayer.src = 'images/propaganda.mp3';
        audioPlayer.load();
        audioPlayer.play().then(() => {
            playPauseBtn.textContent = '⏸';
        }).catch((error) => {
            console.error('Erro ao reproduzir áudio da propaganda:', error);
        });

        coverImage.src = 'images/logo.png'; 
        titleText.textContent = 'Publicidade';
        artistText.textContent = '';

        audioPlayer.onended = () => {
            isPlayingAd = false;
            songsPlayedCount = 0;
            
        };
    }

    function incrementSongCount() {
        if (!isUserSubscribed()) {
            songsPlayedCount++;
            if (songsPlayedCount >= 3) {
                playAd();
                return true; 
            }
        }
        return false; 
    }

    function reset() {
        songsPlayedCount = 0;
        isPlayingAd = false;
    }
// Aq seria propaganda, tocar audio a cada 3 músicas
    function getIsPlayingAd() {
        return isPlayingAd;
    }

    return {
        incrementSongCount,
        reset,
        getIsPlayingAd,
        playAd,
        isUserSubscribed
    };
}