// Cache audio biar gak di-load ulang
const audioCache = {};

document.querySelectorAll('.aksara').forEach(elem => {
  elem.addEventListener('click', () => {
    const soundName = elem.getAttribute('data-sound');

    // Kalau belum ada di cache, buat dan simpan
    if (!audioCache[soundName]) {
      audioCache[soundName] = new Howl({
        src: [`assets/sounds/${soundName}.mp3`],
        html5: true
      });
    }

    // Putar audio dari cache
    audioCache[soundName].play();
  });
});
