function guardarRutina() {
  const dia = document.getElementById("dia").value;
  const grupo = document.getElementById("grupo").value;
  const ejerciciosTexto = document.getElementById("ejercicios").value;

  if (!grupo || !ejerciciosTexto) {
    alert("Completa todos los campos");
    return;
  }

  const ejercicios = ejerciciosTexto.split(",").map(e => e.trim());

  let rutinas = JSON.parse(localStorage.getItem("rutinas")) || {};

  rutinas[dia] = {
    grupo,
    ejercicios
  };

  localStorage.setItem("rutinas", JSON.stringify(rutinas));

  alert("Rutina guardada correctamente");
  cargarRutinas();
}

function cargarRutinas() {
  const tabla = document.getElementById("tabla-rutinas");
  tabla.innerHTML = "";

  const rutinas = JSON.parse(localStorage.getItem("rutinas")) || {};

  for (let dia in rutinas) {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${dia}</td>
      <td>${rutinas[dia].grupo}</td>
      <td>${rutinas[dia].ejercicios.join(", ")}</td>
      <td>
        <button onclick="editarRutina('${dia}')">Editar</button>
        <button onclick="eliminarRutina('${dia}')">Eliminar</button>
      </td>
    `;

    tabla.appendChild(fila);
  }
}
cargarRutinas();
function eliminarRutina(dia) {
  if (!confirm("¿Eliminar rutina del " + dia + "?")) return;

  let rutinas = JSON.parse(localStorage.getItem("rutinas")) || {};
  delete rutinas[dia];

  localStorage.setItem("rutinas", JSON.stringify(rutinas));
  cargarRutinas();
}
function editarRutina(dia) {
  const rutinas = JSON.parse(localStorage.getItem("rutinas"));

  document.getElementById("dia").value = dia;
  document.getElementById("grupo").value = rutinas[dia].grupo;
  document.getElementById("ejercicios").value = rutinas[dia].ejercicios.join(", ");
}


