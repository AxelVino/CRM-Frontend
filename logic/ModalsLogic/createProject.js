import { EP_POSTPROJECT } from "/logic/config.js";
import { savedId } from "/logic/main.js";
import { cleanContainer } from "../cleanContainers.js";

const modalOverlay = document.getElementById("modalOverlay");
let url = new URL(EP_POSTPROJECT);

let errorMsgName = document.getElementById("errorMsgName");
let errorMsgSDate = document.getElementById("errorMsgSDate");
let errorMsgEDate = document.getElementById("errorMsgEDate");

document.body.addEventListener("click", async function (event) {
    if (event.target.id === "acceptBtn") {
        console.log("Se hace click");
        await handleInteraction();
    }
});

const validator = (inputName, inputStartDate, inputEndDate) => {
    let savedStartDate = new Date(inputStartDate.value);
    let savedEndDate = new Date(inputEndDate.value);
    let flag = true;
    let today = new Date();
    today.setHours(0, 0, 0, 0);  // Asegurarse de que se compara solo la fecha sin la hora
    const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]*$/;

    // Validar el nombre
    if (!regex.test(inputName.value)) {
        errorMsgName.textContent = "Invalid character";
        errorMsgName.style.display = 'block';
        flag = false;
    } else {
        errorMsgName.style.display = 'none';  // Ocultar mensaje de error si el nombre es válido
    }

    // Validar la fecha de inicio
    if (!(savedStartDate > today) || !(savedStartDate < savedEndDate)) {
        errorMsgSDate.textContent = "Invalid start date";
        errorMsgSDate.style.display = 'block';
        flag = false;
    } else {
        errorMsgSDate.style.display = 'none';  // Ocultar mensaje si la fecha de inicio es válida
    }

    // Validar la fecha de fin
    if (!(savedEndDate > today) || !(savedEndDate > savedStartDate)) {
        errorMsgEDate.textContent = "Invalid end date";
        errorMsgEDate.style.display = 'block';
        flag = false;
    } else {
        errorMsgEDate.style.display = 'none';  // Ocultar mensaje si la fecha de fin es válida
    }
    return flag;
};

const handleInteraction = async () => {

    let inputProjectName = document.getElementById("projectName");
    let inputStartDate = document.getElementById("startDate");
    let inputEndDate = document.getElementById("endDate");
    let inputCampaignType = document.getElementById("campaignType");

    inputCampaignType.addEventListener("keydown", function (e) {
        if (e.key === "-" || e.key === "." || e.key === "e" || e.key === ",") {
            e.preventDefault(); // Bloquea el ingreso de negativos, decimales y notación científica
        }
    });

    if (validator(inputProjectName, inputStartDate, inputEndDate, inputCampaignType)) {
        console.log("Pasa el validador");
        // Obtengo los datos de los inputs
        let savedProjectName = inputProjectName.value;
        let savedStartDate = inputStartDate.value;
        let savedEndDate = inputEndDate.value;
        let savedCampaignType = inputCampaignType.value;
        let savedClientId = savedId;

        console.log(savedProjectName + "nombre del projecto");
        console.log(savedStartDate + "fecha de inicio");
        console.log(savedEndDate + "fecha de fin");
        console.log(savedCampaignType + "campaña");
        console.log(savedClientId + "id");

        const requestData = {
            name: savedProjectName,
            start: savedStartDate,
            end: savedEndDate,
            campaignType: savedCampaignType,
            client: savedClientId
        };
        const data = await fetchData(url, requestData);
        console.log("Realiza el fetch");
        if (data) {
            console.log("Devuelve la info");
            modalOverlay.style.display = "none";
            cleanContainer();
        }
    }
};

const fetchData = async (endpoint, requestData) => {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            errorMsgName.textContent = "Name in use";
            errorMsgName.style.display = 'block';
            return;
        }
        else {
            return await response.json();
        }
    } catch (error) {
        console.error("Error en fetchData:", error);
        alert("Ocurrió un problema al realizar la operación. Por favor, verifica los datos e inténtalo de nuevo.");
    }
};
