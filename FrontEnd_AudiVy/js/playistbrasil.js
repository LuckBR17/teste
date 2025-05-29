document.addEventListener('DOMContentLoaded', () => {
    const songList = document.getElementById('song-list');
    const audio = document.getElementById('audio');
    const cover = document.getElementById('cover');
    const currentTitle = document.getElementById('current-title');
    const currentArtist = document.getElementById('current-artist');

    function playSong(li) {
        const src = li.getAttribute('data-src');
        const coverSrc = li.getAttribute('data-cover');
        const title = li.querySelector('h3').textContent;
        const artist = li.querySelector('p').textContent;

        audio.src = src;
        cover.src = coverSrc;
        currentTitle.textContent = title;
        currentArtist.textContent = artist;
        audio.play();
    }

    songList.addEventListener('click', (e) => {
        let li = e.target;
        while (li && li.tagName !== 'LI') {
            li = li.parentElement;
        }
        if (li) {
            playSong(li);
        }
    });

    // Play first song by default
    const firstSong = songList.querySelector('li');
    if (firstSong) {
        playSong(firstSong);
    }
});
