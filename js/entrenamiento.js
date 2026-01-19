/***************************************
 * entrenamiento.js
 * Muestra la rutina programada para HOY
 ***************************************/

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

// LEEMOS LO QUE GUARDA COACH
const rutinas = JSON.parse(localStorage.getItem("rutinas")) || {};

// ELEMENTOS HTML
const trainingGroup = document.getElementById("trainingGroup");
const exerciseList = document.getElementById("exerciseList");

// VALIDACIÓN
if (!rutinas[hoy]) {
  trainingGroup.textContent = "Hoy es día de descanso 💤";
  exerciseList.innerHTML = `
    <tr>
      <td colspan="3">No hay ejercicios programados</td>
    </tr>
  `;
} else {
  const rutina = rutinas[hoy];

  // MOSTRAR GRUPO MUSCULAR
  trainingGroup.textContent = rutina.grupo;

  // LIMPIAR TABLA
  exerciseList.innerHTML = "";

  // MOSTRAR EJERCICIOS
  rutina.ejercicios.forEach((ejercicio, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${ejercicio}</td>
      <td>
        <button onclick="startExercise('${ejercicio}')">
          Entrenar
        </button>
      </td>
    `;

    exerciseList.appendChild(tr);
  });
}

// FUNCIÓN EXISTENTE (NO LA TOCAMOS)
function startExercise(exerciseName) {
  alert("Ejercicio: " + exerciseName);
}
