

function obtenerMinutosySegundos(string) {
  const [minutos, segundos] = string.split(":");
  return {
    minutos: parseInt(minutos),
    segundos: parseInt(segundos),
  };
}

export function actualizarMinutosySegundos(cadena) {
  const { minutos, segundos } = obtenerMinutosySegundos(cadena);
  const segundosTotales = minutos * 60 + segundos;
  const actualizarSegundos = segundosTotales - 1;
  const newMinutos = Math.floor(actualizarSegundos / 60);
  const newSegundos = actualizarSegundos % 60;
  return `${newMinutos.toString().padStart(2, "0")}:${newSegundos
    .toString()
    .padStart(2, "0")}`;
}
