function checkAuth() {
    const loggedIn = localStorage.getItem("loggedIn");
    console.log("checkAuth -> loggedIn =", loggedIn);

    if (loggedIn !== "true") {
        console.log("NO autenticado, redirigiendo a login");
        window.location.href = "login.html";
    } else {
        console.log("AUTENTICADO, acceso permitido");
    }
}
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

const btn = document.getElementById("logoutBtn");
if (btn) {
    btn.addEventListener("click", logout);
}
