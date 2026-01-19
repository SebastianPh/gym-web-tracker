const diasSemana = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado"
];

const hoy = diasSemana[new Date().getDay()];
const contenedor = document.getElementById("inicio-contenido");

const rutinas = JSON.parse(localStorage.getItem("rutinas")) || {};

if (!rutinas[hoy]) {
  contenedor.innerHTML = `
    <h3>Hoy es día de descanso 💤</h3>
    <p>No tienes entrenamiento programado</p>
  `;
} else {
  const rutina = rutinas[hoy];

  contenedor.innerHTML = `
    <h3>Rutina de hoy</h3>
    <p><strong>${rutina.grupo}</strong></p>
    <ul>
      ${rutina.ejercicios.map(e => `<li>${e}</li>`).join("")}
    </ul>
    <button id="btnEntrenar">Iniciar entrenamiento</button>
  `;

  document.getElementById("btnEntrenar").addEventListener("click", () => {
    window.location.href = "entrenamiento.html";
  });
}
