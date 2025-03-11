import { EP_PUTPROJECTTASKM } from '/logic/config.js';
import { savedTaskId } from '../projectsLogic.js';
import { cleanContainer } from "../cleanContainers.js";
import { savedIniProject } from '../projectsLogic.js';
import { savedEndProject } from '../projectsLogic.js';

let errorNameMsg = document.createElement("p");
let errorDueDateMsg = document.createElement("p");

document.addEventListener("click", function (event) {
    if (event.target.id === "modifyTask") {
        const modalInfo = document.getElementById("modal-infoTaskConteiner");
        if (modalInfo) {
            modalInfo.innerHTML = ""; // Limpia el contenido

            // Creo el formulario dinámicamente
            let div = document.createElement("div");
            let label = document.createElement("label");
            let input = document.createElement("input");
            let inputBttn = document.createElement("input");
            let labelDate = document.createElement("label");
            let inputDate = document.createElement("input");
            let labelUser = document.createElement("label");
            let selectUser = document.createElement("select");
            let labelStatus = document.createElement("label");
            let selectStatus = document.createElement("select");
            let contextView = document.getElementById("contentView");
            let nextBttn = document.getElementById("nextButton");
            let prevBttn = document.getElementById("prevButton");

            div.setAttribute("class", "modal-FormModify")

            label.setAttribute("for", "taskName");
            label.textContent = "Name";
            input.setAttribute("id", "taskName");
            input.setAttribute("class", "taskName");
            input.setAttribute("type", "text");
            errorNameMsg.setAttribute("id", "errorNM");
            errorNameMsg.setAttribute("class", "errorMsg");

            div.appendChild(label);
            div.appendChild(input);
            div.appendChild(errorNameMsg);

            labelDate.setAttribute("for", "dueDateTask");
            labelDate.textContent = "Due date";
            inputDate.setAttribute("id", "dueDateTask");
            inputDate.setAttribute("type", "datetime-local");
            errorDueDateMsg.setAttribute("id", "errorDDM");
            errorDueDateMsg.setAttribute("class", "errorMsg");

            div.appendChild(labelDate);
            div.appendChild(inputDate);
            div.appendChild(errorDueDateMsg);

            // Select para Task User
            labelUser.setAttribute("for", "taskUser");
            labelUser.textContent = "User";
            selectUser.setAttribute("id", "taskUser");

            ["Joe Done", "Nill Amsstrong", "Marlyn Morales", "Antony Orué", "Jazmin Fernandez"].forEach((user, index) => {
                let option = document.createElement("option");
                option.value = index + 1;
                option.textContent = user;
                selectUser.appendChild(option);
            });

            div.appendChild(labelUser);
            div.appendChild(selectUser);

            // Select para Task Status
            labelStatus.setAttribute("for", "taskStatus");
            labelStatus.textContent = "Status";
            selectStatus.setAttribute("id", "taskStatus");

            ["Pending", "In Progress", "Blocked", "Done", "Cancelled"].forEach((status, index) => {
                let option = document.createElement("option");
                option.value = index + 1;
                option.textContent = status;
                selectStatus.appendChild(option);
            });

            div.appendChild(labelStatus);
            div.appendChild(selectStatus);

            inputBttn.setAttribute("type", "button");
            inputBttn.setAttribute("value", "Accept");
            inputBttn.setAttribute("class", "acceptBtn")

            div.appendChild(inputBttn);
            modalInfo.appendChild(div);

            inputBttn.addEventListener("click", function () {
                handleInteraction();
                contextView.innerHTML = "";
                nextBttn.disabled = true;
                prevBttn.disabled = true;
            });
        }
    }
});

const handleInteraction = async () => {

    let nameTask = document.getElementById("taskName");
    let dueDateTask = document.getElementById("dueDateTask");
    let taskUser = document.getElementById("taskUser");
    let taskStatus = document.getElementById("taskStatus");

    if (validator(nameTask.value, dueDateTask.value)) {

        let taskId = savedTaskId;
        let url = EP_PUTPROJECTTASKM.replace('{id}', taskId);

        // Lógica del fetch
        let savedName = nameTask.value || null;
        let savedDueDate = new Date(dueDateTask.value).toISOString();
        let savedTaskUser = taskUser.value || null;
        let savedTaskStatus = taskStatus.value || null;

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

const validator = (inputName, inputDueDate) => {

    let flag = true;
    if (inputDueDate) {

        let dueDate = new Date(inputDueDate).toISOString();
        const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]*$/;
        // Validar el nombre
        if (!regex.test(inputName)) {
            errorNameMsg.textContent = "Invalid character";
            errorNameMsg.style.display = 'block';
            flag = false;
        } else {
            errorNameMsg.style.display = 'none';  // Ocultar mensaje de error si el nombre es válido
        }
        // Validar la fecha de vencimiento
        if (!(dueDate > savedIniProject) || !(dueDate < savedEndProject)) {
            errorDueDateMsg.textContent = "Invalid due date";
            errorDueDateMsg.style.display = 'block';
            flag = false;
        } else {
            errorDueDateMsg.style.display = 'none';  // Ocultar mensaje si la fecha de inicio es válida
        }
    } else {
        errorDueDateMsg.textContent = "Please enter an date";
        errorDueDateMsg.style.display = 'block';
        flag = false;
    }
    return flag;
};


const fetchData = async (endpoint, requestData) => {
    try {
        const response = await fetch(endpoint, {
            method: "PUT",
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
