function guardarRutina() {
  const dia = document.getElementById("dia").value.toLowerCase();
  const grupo = document.getElementById("grupo").value.trim();
  const ejerciciosTexto = document.getElementById("ejercicios").value.trim();

  if (!grupo || !ejerciciosTexto) {
    alert("Completa todos los campos");
    return;
  }

  const ejercicios = ejerciciosTexto.split(",").map(e => e.trim());

  const rutinas = JSON.parse(localStorage.getItem("rutinas")) || {};

  rutinas[dia] = {
    grupo: grupo,
    ejercicios: ejercicios
  };

  localStorage.setItem("rutinas", JSON.stringify(rutinas));

  mostrarRutinas();
  limpiarFormulario();
}

function mostrarRutinas() {
  const rutinas = JSON.parse(localStorage.getItem("rutinas")) || {};
  const tabla = document.getElementById("tabla-rutinas");
  tabla.innerHTML = "";

  for (const dia in rutinas) {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${dia}</td>
      <td>${rutinas[dia].grupo}</td>
      <td>${rutinas[dia].ejercicios.join(", ")}</td>
      <td>
        <button onclick="eliminarRutina('${dia}')">Eliminar</button>
      </td>
    `;

    tabla.appendChild(fila);
  }
}

function eliminarRutina(dia) {
  const rutinas = JSON.parse(localStorage.getItem("rutinas")) || {};
  delete rutinas[dia];
  localStorage.setItem("rutinas", JSON.stringify(rutinas));
  mostrarRutinas();
}

function limpiarFormulario() {
  document.getElementById("grupo").value = "";
  document.getElementById("ejercicios").value = "";
}

mostrarRutinas();
