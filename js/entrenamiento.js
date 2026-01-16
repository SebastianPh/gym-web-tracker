checkAuth();

const user = JSON.parse(localStorage.getItem("gymUser"));

let exercisesCompleted = 0;

const goalEl = document.getElementById("trainingGoal");
const groupEl = document.getElementById("trainingGroup");
const dayEl = document.getElementById("day");
const timeEl = document.getElementById("startTime");
const exerciseList = document.getElementById("exerciseList");
const exerciseDetail = document.getElementById("exerciseDetail");

let currentSeriesCount = 3;

const now = new Date();
dayEl.textContent = now.toLocaleDateString();
timeEl.textContent = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
});

const goalMap = {
    muscle: "Ganar músculo",
    fat_loss: "Perder grasa",
    maintain: "Mantener"
};

goalEl.textContent = "Meta: " + (goalMap[user.goal] || "No definida");

// ⚠️ SIMULADO (luego viene desde Coach)
const todayRoutine = {
    day: "Lunes",
    group: "Espalda - Bíceps",
    exercises: [
        "Remo con mancuerna",
        "Curl bíceps",
        "Pullover"
    ]
};

groupEl.textContent = todayRoutine.group;
exerciseList.innerHTML = "";

// Render lista
todayRoutine.exercises.forEach((exercise, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${exercise}</td>
        <td>
            <button onclick="startExercise('${exercise}')">
                Entrenar
            </button>
        </td>
    `;
    exerciseList.appendChild(tr);
});

// =======================
// ENTRENAR EJERCICIO
// =======================
function startExercise(exerciseName) {

    currentSeriesCount = 3;

    exerciseDetail.innerHTML = `
        <h3>${exerciseName}</h3>

        <table>
            <thead>
                <tr>
                    <th>Serie</th>
                    <th>Reps</th>
                    <th>Peso (kg)</th>
                </tr>
            </thead>
            <tbody id="seriesBody">
                ${renderSeriesRows(currentSeriesCount)}
            </tbody>
        </table>

        <div style="margin: 10px 0;">
            <button onclick="addSeries()">➕ Agregar serie</button>
            <button onclick="removeSeries()">➖ Quitar serie</button>
        </div>

        <button onclick="saveExercise('${exerciseName}')">
            Guardar ejercicio
        </button>
        <hr>
    `;
}


// Crear filas de series
function renderSeriesRows(total) {
    let rows = "";
    for (let i = 1; i <= total; i++) {
        rows += `
            <tr>
                <td>${i}</td>
                <td><input type="number" id="reps-${i}" min="1"></td>
                <td><input type="number" id="weight-${i}" min="0"></td>
            </tr>
        `;
    }
    return rows;
}

// =======================
// GUARDAR EJERCICIO
// =======================
function saveExercise(exerciseName) {

    const series = [];

    for (let i = 1; i <= currentSeriesCount; i++) {

        const reps = document.getElementById(`reps-${i}`).value;
        const weight = document.getElementById(`weight-${i}`).value;

        if (reps && weight) {
            series.push({
                serie: i,
                reps: reps,
                weight: weight
            });
        }
    }

    if (series.length === 0) {
        alert("Debes registrar al menos una serie");
        return;
    }

    const training = {
        date: now.toISOString(),
        day: todayRoutine.day,
        group: todayRoutine.group,
        exercise: exerciseName,
        series: series
    };

    let history = JSON.parse(localStorage.getItem("trainingHistory")) || [];
    history.push(training);
    localStorage.setItem("trainingHistory", JSON.stringify(history));

    exercisesCompleted++;
showFinishButton();

    alert("Ejercicio guardado 💪");

    exerciseDetail.innerHTML = "";
}
function addSeries() {
    currentSeriesCount++;
    document.getElementById("seriesBody").innerHTML =
        renderSeriesRows(currentSeriesCount);
}

function removeSeries() {
    if (currentSeriesCount <= 1) {
        alert("Debe haber al menos una serie");
        return;
    }
    currentSeriesCount--;
    document.getElementById("seriesBody").innerHTML =
        renderSeriesRows(currentSeriesCount);
}
// =======================
// MOSTRAR BOTÓN FINALIZAR
// =======================
function showFinishButton() {

    if (exercisesCompleted < 1) return;

    if (!document.getElementById("finishTrainingBtn")) {
        const btn = document.createElement("button");
        btn.id = "finishTrainingBtn";
        btn.textContent = "🏆 Entrenamiento logrado";
        btn.style.marginTop = "20px";

        btn.onclick = finishTraining;

        document.body.appendChild(btn);
    }
}
// =======================
// FINALIZAR ENTRENAMIENTO
// =======================
function finishTraining() {

    const today = new Date().toISOString().split("T")[0];

    let trainingDays =
        JSON.parse(localStorage.getItem("trainingDays")) || {};

    trainingDays[today] = {
        completed: true,
        group: todayRoutine.group
    };

    localStorage.setItem("trainingDays", JSON.stringify(trainingDays));

    // MENSAJE MOTIVACIONAL
    alert("🔥 Lo hiciste campeón, sigue así 💪");

    // REDIRECCIÓN
    window.location.href = "inicio.html";
}

