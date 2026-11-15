// background music
// it tries to play as soon as the page opens. chrome sometimes blocks this,
// so it also starts the first time you click anywhere on the page

var btn = document.getElementById("music-btn");
var song = new Audio("music.mp3");
song.loop = true;
song.volume = 0.5;
var stoppedByMe = false;

// change the button text when the music plays or stops
function updateButton() {
  if (song.paused) {
    btn.innerHTML = "&#9834; Play music";
  } else {
    btn.innerHTML = "&#10074;&#10074; Pause music";
  }
}

song.addEventListener("play", updateButton);
song.addEventListener("pause", updateButton);

function startMusic() {
  if (stoppedByMe == false && song.paused) {
    song.play().catch(function () {
      // the browser blocked it, it will try again on the first click
    });
  }
}

startMusic();
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("keydown", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });

// play / pause button
btn.addEventListener("click", function () {
  if (song.paused) {
    stoppedByMe = false;
    song.play();
  } else {
    stoppedByMe = true;
    song.pause();
  }
});
