// Esta es la base de datos de nuestros usuarios
const baseDeDatos = {
    usuarios: [
        {
            id: 1,
            name: "Steve Jobs",
            email: "steve@jobs.com",
            password: "Steve123",
        },
        {
            id: 2,
            name: "Ervin Howell",
            email: "shanna@melissa.tv",
            password: "Ervin345",
        },
        {
            id: 3,
            name: "Clementine Bauch",
            email: "nathan@yesenia.net",
            password: "Floppy39876",
        },
        {
            id: 4,
            name: "Patricia Lebsack",
            email: "julianne.oconner@kory.org",
            password: "MysuperPassword345",
        },
    ],
};

// ACTIVIDAD

// Paso a paso:

// 1) Al momento de que la persona inicia sesión, si las validaciones que ya tenemos implementadas
// han sido exitosas, deberemos almacenar la información del usuario en el LocalStorage.

// 2) Al mensaje de bienvenida que ya teníamos implementado, deberemos agregarle el nombre de la
// persona y un botón de "Cerrar Sesión".

// 3) Una vez iniciada la sesión, la misma se deberá mantener en ese estado para el caso de que la persona
// recargue la página. Para ello, deberás validar si existe información del usuario al momento en
// que se produce la carga de la página, y en base a dicha condción decidir que elementos mostrar.

// 3) Para el caso de que la persona haga click en el botón "Cerrar Sesión", se deberá eliminar
// la información del usuario, mostrar un mensaje indicando que se ha cerrado la sesión, y recargar
// la página para mostrar nuevamente el formulario de login.

/* 
TIPS:
  - Para lograr los objetivos de este ejercicio, deberás valerte de algunos eventos y métodos que vimos en
    las clases anteriores. Te invitamos a que revises los recursos en caso de que tengas dudas, ya que allí
    encontrarás todas las respuestas que necesitas para completar la actividad.

  - Recuerda que puedes seleccionar y manipular los elementos del archivo index.html, usando los
    recursos que Javascript te ofrece para ello. Además, en el archivo styles.css tiene algunas clases y 
    estilos predefinidos para ayudarte a completar la actividad.

  - Al momento de guardar información del usuario en el navegador, recuerda que debemos almacenar solo la 
    información necesaria, y EN NINGUN CASO DEBEMOS GUARDAR LA CONTRASEÑA. Por ello, deberás seleccionar y
    separar la información que tienes que almacenar, a partir del objeto que contiene la información del 
    usuario.

   ¡Manos a la obra!
 */

window.addEventListener("load", () => {
    showElement(document.querySelector("h1"));
    if (localStorage.getItem("userName")) {
        render();
    } else {
        login();
    }
});

function login() {
    showElement(document.querySelector("form"));
    const button = document.querySelector("button.login-btn");
    button.removeEventListener("click", validateForm);
    button.addEventListener("click", validateForm);
}

function validateForm() {
    const loader = document.querySelector("#loader");
    const errorContainer = document.querySelector("#error-container");
    const email = document.querySelector("#email-input").value;
    const password = document.querySelector("#password-input").value;

    hideElement(errorContainer);
    showElement(loader);

    setTimeout(() => {
        if (
            validateEmail(email) &&
            validatePassword(password) &&
            validatePerson(email, password, baseDeDatos.usuarios)
        ) {
            render();
        } else {
            hideElement(loader);
            errorContainer.innerHTML = `<small>Uno o todos los datos ingresados son incorrectos</small>`;
            showElement(errorContainer);
        }
    }, 3000);
}

function render() {
    hideElement(document.querySelector("form"));
    const h1 = document.querySelector("h1");
    const user = localStorage.getItem("userName");
    h1.innerText = `Bienvenido al sitio ${user} 😀`;
    const logoutButton = document.querySelector("button.logout-btn");
    showElement(logoutButton);
    logoutButton.removeEventListener("click", logout);
    logoutButton.addEventListener("click", logout);
}

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function validatePassword(password) {
    // Mínimo 8 caracteres
    // Al menos una letra mayúscula
    // Al menos una letra minúscula
    // Al menos un número
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
}

function validatePerson(email, password, users) {
    for (const user of users) {
        if (user.email === email && user.password === password) {
            localStorage.setItem("userName", user.name);
            return true;
        }
    }
    return false;
}

function logout() {
    localStorage.clear();
    document.querySelector("h1").innerText = "Iniciar Sesión";
    hideElement(document.querySelector("button.logout-btn"));
    login();
}

function showElement(element) {
    element.classList.remove("hidden");
}

function hideElement(element) {
    element.classList.add("hidden");
}
