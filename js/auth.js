// REGISTRO
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        weight: document.getElementById("weight").value,
        height: document.getElementById("height").value,
        goal: document.getElementById("goal").value,
        coach: {},           // Se llenará después
        trainings: [],       // Historial
        progress: {}         // Progreso
    };

    localStorage.setItem("gymUser", JSON.stringify(user));
    alert("Usuario registrado correctamente");
});
// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("gymUser"));

    const loginUser = document.getElementById("loginUser").value;
    const loginPass = document.getElementById("loginPass").value;

    if (!storedUser) {
        alert("No hay usuarios registrados");
        return;
    }

    if (
        loginUser === storedUser.username &&
        loginPass === storedUser.password
    ) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userName", storedUser.name)
        
        console.log("Login correcto, redirigiendo...");
setTimeout(() => {
    window.location.replace("inicio.html");
}, 500);

    } else {
        alert("Usuario o contraseña incorrectos");
    }
});
