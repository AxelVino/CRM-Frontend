import { router } from '/logic/router/index.routes.js';
import { EP_GETCLIENT } from '/logic/config.js';
import { initializeRegist } from './singUp.js';
import { initializeProjectWindow } from './projectsLogic.js';
import SingUp from './views/ProjectModals/singUp.js';

// Variables globales
let selectedClient = null;
let savedId = null;
const btnOpenModal = document.getElementById("openModal");
const projects = document.getElementById("projects");
const username = document.getElementById("iduser");
const create = document.getElementById("createAccount");
const LogOut = document.getElementById("logoutBtn");

const modalPredem = () => {

    const modalOverlay = document.getElementById("modalOverlay");

    modalOverlay.innerHTML = '';
    modalOverlay.appendChild(SingUp());
    modalOverlay.style.display = "flex";

    const btnCloseModal = document.getElementsByClassName("close")[0];
    const acceptBtn = document.getElementById("modalBtn");
    const errorMsg = document.getElementById("errorMsg");
    let inputElement = document.getElementById("id");

    document.getElementById("id").addEventListener("keydown", function (e) {
        if (e.key === "-" || e.key === "." || e.key === "e" || e.key === ",") {
            e.preventDefault(); // Bloquea el ingreso de negativos, decimales y notación científica
        }
    });

    // Función para ocultar el modal
    function hideModal() {
        modalOverlay.style.display = "none";
    }

    // Manejo del evento click fuera del modal
    function handleOutsideClick(event) {
        if (event.target === modalOverlay) {
            hideModal();
        }
    }


    function handleLogOutClick() {
        username.textContent = '';
        selectedClient = null;
        savedId = null;
        projects.style.display = "none";
        btnOpenModal.style.display = "flex";
        create.style.display = "flex";
        username.style.display = "none";
        LogOut.style.display = "none";
        errorMsg.textContent = "";
        inputElement.value = "";
        window.location.hash = "#/home";
    }

    // Función para actualizar la UI al seleccionar un cliente
    function updateUIForClient(client) {

        // Mostrar el nombre del cliente

        const { name } = client;
        const lastName = name.split(" ")[1] || ""; // Obtiene la segunda parte o una cadena vacía si no existe

        username.textContent = lastName;
        // Ocultar/mostrar elementos
        projects.style.display = "flex";
        btnOpenModal.style.display = "none";
        create.style.display = "none";
        username.style.display = "flex";
        LogOut.style.display = "flex";

        hideModal();
    }

    // Función para manejar la selección del cliente
    async function handleAcceptClick() {

        let inputElement = document.getElementById("id");
        const savedValue = parseInt(inputElement.value);

        if (isNaN(savedValue)) {
            errorMsg.textContent = "Please enter an ID";
            errorMsg.classList.add("errorVisible");
            return;
        }

        try {
            const response = await fetch(EP_GETCLIENT);
            if (!response.ok) throw new Error('Error en la respuesta de la red');

            const data = await response.json();
            const client = data.find(user => user.id === savedValue);

            if (client) {
                selectedClient = client;
                savedId = client.id;
                window.location.hash = '#/home'
                // Actualiza la UI
                updateUIForClient(client);
            } else {
                errorMsg.textContent = "Invalid ID";
                errorMsg.classList.add("errorVisible");
            }
        } catch (error) {
            console.error('Error en la solicitud fetch:', error);
        }
    }

    btnCloseModal.addEventListener("click", hideModal);

    window.addEventListener("click", handleOutsideClick);

    acceptBtn.addEventListener("click", handleAcceptClick);

    LogOut.addEventListener("click", handleLogOutClick);

};

btnOpenModal.addEventListener("click", modalPredem);

window.addEventListener("load", () => {
    if (window.location.hash !== "#/home") {
        window.location.hash = "#/home"; // Redirige a Home al cargar la página
    }
});

window.addEventListener("hashchange", () => {
    router(window.location.hash);
    if (window.location.hash == '#/singUp') {
        initializeRegist();
    } else if (window.location.hash == '#/projects') {
        initializeProjectWindow();
    }

});

export { modalPredem };
export { savedId };

