import { actualizarMinutosySegundos } from "./utils.js";

$(function () {
  const breakDecrement = $("#break-decrement");
  const breakLength = $("#break-length");
  const breakIncrement = $("#break-increment");

  const sessionDecrement = $("#session-decrement");
  const sessionLength = $("#session-length");
  const sessionIncrement = $("#session-increment");

  const timerLabel = $("#timer-label");

  const timeLeft = $("#time-left");

  const startStop = $("#start_stop");
  const reset = $("#reset");

  const beep = $("#beep");

  const estadosIniciales = {
    breakLength: 5,
    sessionLength: 25,
    timeLeft: function () {
      return this.sessionLength.toString().padStart(2, "0") + ":00";
    },
  };

  const estados = { play: false };

  breakLength.text(estadosIniciales.breakLength);
  sessionLength.text(estadosIniciales.sessionLength);
  timeLeft.text(estadosIniciales.timeLeft());
  putIconoPlay(startStop);

  breakDecrement.on("click", function () {
    if (parseInt(breakLength.text()) > 1) {
      breakLength.text(parseInt(breakLength.text()) - 1);
    }
  });
  breakIncrement.on("click", function () {
    if (parseInt(breakLength.text()) < 60) {
      breakLength.text(parseInt(breakLength.text()) + 1);
    }
  });

  sessionDecrement.on("click", function () {
    if (parseInt(sessionLength.text()) > 1) {
      sessionLength.text(parseInt(sessionLength.text()) - 1);
      timeLeft.text(sessionLength.text().padStart(2, "0") + ":00");
    }
  });

  sessionIncrement.on("click", function () {
    if (parseInt(sessionLength.text()) < 60) {
      sessionLength.text(parseInt(sessionLength.text()) + 1);
      timeLeft.text(sessionLength.text().padStart(2, "0") + ":00");
    }
  });

  let intervaloActual = null;
  const intervalo = () => {
    return setInterval(function () {
      const nombreSession = timerLabel.text();
      let actualTime = timeLeft.text();

      //logica cuando se acaba el tiempo 00:00
      if (actualTime == "00:00" && nombreSession == "Session") {
        playAudio(beep);
        timerLabel.text("Break");

        actualTime = timeLeft
          .text(breakLength.text().padStart(2, "0") + ":00")
          .text();
        timeLeft.text(actualTime);
        return;
      }
      if (actualTime == "00:00" && nombreSession == "Break") {
        playAudio(beep);
        timerLabel.text("Session");

        actualTime = timeLeft
          .text(sessionLength.text().padStart(2, "0") + ":00")
          .text();
        timeLeft.text(actualTime);
        return;
      }

      timeLeft.text(actualizarMinutosySegundos(actualTime));
    }, 1000);
  };

  startStop.on("click", function () {
    if (estados.play) {
      estados.play = false;
      putIconoPlay(startStop);
      clearInterval(intervaloActual);
      intervaloActual = null;
    } else {
      intervaloActual = intervalo();
      putIconoStop(startStop);
      estados.play = true;
    }
  });

  reset.on("click", function () {
    if (intervaloActual || estados.play == false) {
      breakLength.text(estadosIniciales.breakLength);
      sessionLength.text(estadosIniciales.sessionLength);
      timeLeft.text(estadosIniciales.timeLeft());
      timerLabel.text("Session");
      stopAudio(beep);
      if (intervaloActual) {
        clearInterval(intervaloActual);
        intervaloActual = null;
        putIconoPlay(startStop);
        estados.play = false;
      }
    }
  });
});

function putIconoPlay(startStop) {
  return startStop.html(
    '<i class="fa-solid fa-play" title="Click to start"></i>',
  );
}

function putIconoStop(startStop) {
  return startStop.html(
    '<i class="fa-solid fa-stop" title="Click to stop"></i>',
  );
}

function playAudio(beep) {
  beep[0].play();
}
function stopAudio(beep) {
  beep[0].pause();
  beep[0].currentTime = 0;
}
