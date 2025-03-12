import { savedprojectId } from "/logic/projectsLogic.js";
import { EP_PATCHPROJECT } from "/logic/config.js";
import { cleanContainer } from "../cleanContainers.js";
import { savedIniProject } from "../projectsLogic.js";
import { savedEndProject } from "../projectsLogic.js";

const modalOverlay = document.getElementById("modalOverlay");
let errorDueDate = document.getElementById("errorMsgDueDate");

document.body.addEventListener("click", async function (event) {
    if (event.target.id === "acceptNewInteraction") {
        await handleInteraction();
    }
});

// Función separada para manejar la interacción
const handleInteraction = async () => {

    let interactionType = document.getElementById("interactionType");
    let dateTime = document.getElementById("interactionDueDate");
    let notes = document.getElementById("interactionNotes");
    // Construir la URL reemplazando {id} con el valor real de savedprojectId
    let url = EP_PATCHPROJECT.replace('{id}', savedprojectId);
    console.log(savedprojectId + "id del proyecto");
    if (validator(dateTime.value)) {

        errorDueDate.style.display = 'none';

        let savedInteractionType = interactionType.value;
        let savedNotes = notes.value || null;

        const requestData = {
            notes: savedNotes,
            date: dateTime.value,
            interactionType: savedInteractionType
        };

        const data = await fetchData(url, requestData);
        if (data) {
            modalOverlay.style.display = "none";
            cleanContainer();
        }
    }
};

const validator = (dateTime) => {

    if (dateTime) {

        let savedDateTime = new Date(dateTime).toISOString();

        if ((savedDateTime > savedIniProject) && (savedDateTime < savedEndProject)) {
            return true;
        }
        else {
            errorDueDate.textContent = "Invalid due date";
            errorDueDate.style.display = 'block';
            return false;
        }
    }
    else {
        errorDueDate.textContent = "Please enter an date";
        errorDueDate.style.display = 'block';
        return false;
    }
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