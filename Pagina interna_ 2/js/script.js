const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.getElementById("progressContainer");
const timeDisplay = document.getElementById("time");

// Alternar entre play y pause
playPauseBtn.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.classList.remove("play");
        playPauseBtn.classList.add("pause");
    } else {
        audio.pause();
        playPauseBtn.classList.remove("pause");
        playPauseBtn.classList.add("play");
    }
});

// Actualizar la barra de progreso mientras el audio se reproduce
audio.addEventListener("timeupdate", function() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + "%";

    // Mostrar tiempo actual en formato mm:ss
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    const formattedTime = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    timeDisplay.textContent = formattedTime;
});

// Hacer clic en la barra de progreso para avanzar o retroceder en el audio
progressContainer.addEventListener("click", function(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
});

// Reiniciar cuando el audio termine
audio.addEventListener("ended", function() {
    playPauseBtn.classList.remove("pause");
    playPauseBtn.classList.add("play");
    progressBar.style.width = "0%";
    timeDisplay.textContent = "00:00";
});

var count_particles, stats, update;
stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function() {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);