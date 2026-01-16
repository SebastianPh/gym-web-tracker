const dias = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado"
];

const hoy = dias[new Date().getDay()];
const rutinas = JSON.parse(localStorage.getItem("rutinas")) || {};
const contenedor = document.getElementById("rutina-hoy");

if (rutinas[hoy]) {
  contenedor.innerHTML = `
    <h3>${rutinas[hoy].grupo}</h3>
    <ul>
      ${rutinas[hoy].ejercicios.map(e => `<li>${e}</li>`).join("")}
    </ul>
  `;
} else {
  contenedor.innerHTML = "<p>No hay rutina configurada para hoy.</p>";
}
