// soft background tune - plays only when the visitor clicks the music button
// it is made in the browser with the Web Audio API, so no audio file is needed
(function () {
  var btn = document.getElementById('music-btn');
  if (!btn) return;

  var ctx = null, master = null, timer = null, playing = false, step = 0;

  // four gentle chords (C, A minor, F, G), each played as a slow 4-note pattern
  var melody = [
    523.25, 659.25, 783.99, 659.25,
    440.00, 523.25, 659.25, 523.25,
    349.23, 440.00, 523.25, 440.00,
    392.00, 493.88, 587.33, 493.88
  ];
  var bass = [130.81, 110.00, 87.31, 98.00];

  function tone(freq, start, length, volume, type) {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(volume, start + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
    osc.connect(gain);
    gain.connect(master);
    osc.start(start);
    osc.stop(start + length + 0.1);
  }

  function nextNote() {
    var t = ctx.currentTime + 0.05;
    tone(melody[step % 16], t, 1.2, 0.10, 'sine');
    if (step % 4 === 0) {
      tone(bass[Math.floor(step / 4) % 4], t, 2.6, 0.07, 'triangle');
    }
    step++;
  }

  btn.addEventListener('click', function () {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = 0.6;
      master.connect(ctx.destination);
    }
    if (playing) {
      clearInterval(timer);
      playing = false;
      btn.textContent = '♪ Play music';
      btn.setAttribute('aria-pressed', 'false');
    } else {
      ctx.resume();
      nextNote();
      timer = setInterval(nextNote, 600);
      playing = true;
      btn.textContent = '❚❚ Pause music';
      btn.setAttribute('aria-pressed', 'true');
    }
  });
})();
