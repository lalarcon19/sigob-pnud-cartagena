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

$(document).ready(function(){
    /*Almacenar como variable la URL (valor del atributo src del elemento iframe) del video*/
    var url = $("#four-seasons-video").attr('src');
    
    /*Valor vacío para el atributo src de iframe cuando se cierra la ventana modal, con lo cual se detiene la reproducción del video*/  
    $("#myModal").on('hide.bs.modal', function(){
          $("#four-seasons-video").attr('src', '');
      });
    
    /*Volver a asignar la url almaceneda*/
    $("#myModal").on('show.bs.modal', function(){
          $("#four-seasons-video").attr('src', url);
      });
  });
  
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        iframe.src = iframe.src; // Detener el video al cerrar el modal
    }
}