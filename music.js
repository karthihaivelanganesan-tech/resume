// light background music - starts by itself when the page opens
// (if the browser blocks that, it starts on the visitor's first click or key press)
(function () {
  var btn = document.getElementById('music-btn');
  if (!btn) return;

  var song = new Audio('music.mp3');
  song.loop = true;
  song.volume = 0.5;
  var userPaused = false;

  // keep the button text in step with the music
  function showState() {
    if (song.paused) {
      btn.textContent = '♪ Play music';
      btn.setAttribute('aria-pressed', 'false');
    } else {
      btn.textContent = '❚❚ Pause music';
      btn.setAttribute('aria-pressed', 'true');
    }
  }
  song.addEventListener('play', showState);
  song.addEventListener('pause', showState);

  function start() {
    if (userPaused || !song.paused) return;
    var attempt = song.play();
    if (attempt && attempt.catch) attempt.catch(function () {});
  }

  // try straight away, then again on the first interaction
  start();
  ['click', 'keydown', 'touchstart'].forEach(function (type) {
    document.addEventListener(type, start, { once: true });
  });

  btn.addEventListener('click', function () {
    if (song.paused) {
      userPaused = false;
      song.play();
    } else {
      userPaused = true;
      song.pause();
    }
  });
})();
