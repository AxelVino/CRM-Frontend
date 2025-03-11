import { savedprojectId } from "/logic/projectsLogic.js";
import { EP_PATCHPROJECTTASK } from "/logic/config.js";
import { cleanContainer } from "../cleanContainers.js";
import { savedIniProject } from "/logic/projectsLogic.js";
import { savedEndProject } from "/logic/projectsLogic.js";

let errorName = document.getElementById("errorMsgNameTask");
let errorDueDate = document.getElementById("errorMsgDueDate");


const modalOverlay = document.getElementById("modalOverlay");

// Construir la URL reemplazando {id} con el valor real de savedprojectId
let url = EP_PATCHPROJECTTASK.replace('{id}', savedprojectId);

document.body.addEventListener("click", async function (event) {
    if (event.target.id === "acceptNewTask") {
        await handleInteraction();
    }
});

// Función separada para manejar la interacción
const handleInteraction = async () => {

    let name = document.getElementById("taskName");
    let dueDate = document.getElementById("taskDueDate");
    let taskUser = document.getElementById("taskUser");
    let taskStatus = document.getElementById("taskStatus");
    if (validator(name.value, dueDate)) {

        // Lógica del fetch
        let savedTaskStatus = taskStatus.value;
        let savedTaskUser = taskUser.value;
        let savedDueDate = new Date(dueDate.value).toISOString(); // Asegúra de que sea una fecha válida
        let savedName = name.value || null;

        const requestData = {
            name: savedName,
            dueDate: savedDueDate,
            user: savedTaskUser,
            status: savedTaskStatus
        };

        const data = await fetchData(url, requestData);
        if (data) {
            modalOverlay.style.display = "none";
            cleanContainer();
        }
    }
};
// Normalizar a formato "YYYY-MM-DD"

const validator = (inputName, inputDueDate) => {

    if (!inputDueDate.value) {
        errorDueDate.textContent = "Invalid due date";
        errorDueDate.style.display = 'block';
        return;
    }

    let flag = true;
    let dueDate = new Date(inputDueDate.value).toISOString();
    const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]*$/;

    // Validar el nombre
    if (!regex.test(inputName)) {
        errorName.textContent = "Invalid character";
        errorName.style.display = 'block';
        flag = false;
    } else {
        errorName.style.display = 'none';  // Ocultar mensaje de error si el nombre es válido
    }
    // Validar la fecha de vencimiento
    if (!(dueDate > savedIniProject) || !(dueDate < savedEndProject)) {
        errorDueDate.textContent = "Invalid due date";
        errorDueDate.style.display = 'block';
        flag = false;
    } else {
        errorDueDate.style.display = 'none';  // Ocultar mensaje si la fecha de inicio es válida
    }
    return flag;
};

// Función para realizar el fetch
const fetchData = async (endpoint, requestData) => {
    try {
        const response = await fetch(endpoint, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            const errorDetails = await response.text(); // Obtén más información del error
            console.error(`Error en la respuesta: ${response.status} - ${errorDetails}`);
            throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en fetchData:", error);
        alert("Ocurrió un problema al realizar la operación. Por favor, verifica los datos e inténtalo de nuevo.");
    }
};