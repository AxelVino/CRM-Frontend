import { loadStyle } from '/logic/loadStyle.js';
import { loadScript } from '/logic/loadScript.js';
import { savedId } from "/logic/main.js";
import { EP_GETPROJECT } from "/logic/config.js";

let savedTaskId = null;
let savedprojectId = null;
let savedIniProject = null;
let savedEndProject = null;
let currentPage = 0; // Pagina inicial
let pageSize = 10; // Número de proyectos por página
let tasks = null;
let interactions = null;
//Inicializo los elementos de la interfaz al invocar esta funcion en el main

const initializeProjectWindow = () => {

    //elementos de interfaz 
    const searchButton = document.getElementById("SearchBtn");
    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton");
    const modalOverlay = document.getElementById("modalOverlay");
    const tasksButton = document.getElementById("btnTasks");
    const interactionsButton = document.getElementById("btnInteractions");

    //Configuraciones iniciales
    nextButton.disabled = true;
    prevButton.disabled = true;
    nextButton.style.visibility = 'hidden';
    prevButton.style.visibility = 'hidden';

    // Evento para buscar con paginación
    searchButton.addEventListener("click", async () => {
        currentPage = 0;
        fetchAndRenderProjects();
    });
    // Botón "Next"
    nextButton.addEventListener("click", () => {
        currentPage++;
        fetchAndRenderProjects();
    });
    // Botón "Back"
    prevButton.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            fetchAndRenderProjects();
        }
    });
    //Si el usuario clickea fuera del modal, este se cierra
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
    //Si el usuario hace click en la cruz, cierra el modal
    modalOverlay.addEventListener('click', (event) => {
        if (event.target.classList.contains('closeModal')) {
            closeModal();
        }
    });
    // Event listener para manejar los clics en botones y cargar modales dinámicos
    document.querySelector('.boxSectionTwo').addEventListener('click', (event) => {
        if (event.target.classList.contains('createProject')) {
            // Cargar dinámicamente el modal de create Project
            loadModalContent(() => import('/logic/views/ProjectModals/createProject.js'), './styles/StylesProjectModals.css', './logic/ModalsLogic/createProject.js');

        } else if (event.target.classList.contains('btnAddInteraction')) {
            // Cargar dinámicamente el modal de Add Interaction
            loadModalContent(() => import('/logic/views/ProjectModals/addInteraction.js'), './styles/StylesProjectModals.css', './logic/ModalsLogic/addInteraction.js');

        } else if (event.target.classList.contains('btnAddTask')) {
            // Cargar dinámicamente el modal de Add Task
            loadModalContent(() => import('/logic/views/ProjectModals/addTask.js'), './styles/StylesProjectModals.css', './logic/ModalsLogic/addTask.js');
        }
    });
    // MOSTRAR TAREAS DE UN PROYECTO
    tasksButton.addEventListener("click", () => {
        if (!tasks) return;

        singlePopulateList(contentView, tasks, (task) => {
            const ul = document.createElement("ul");
            const li = document.createElement("li");
            const fields = [`${task.name}`];
            fields.forEach((field) => {
                const span = document.createElement("span");
                span.textContent = field;
                li.appendChild(span);
                li.appendChild(document.createElement("br"));
                li.style.cursor = "pointer";
            });
            // Agrego el evento al <li>
            li.addEventListener("click", async function () {
                try {
                    // Esperamos a que el modal termine de cargarse
                    await loadModalContent(
                        () => import('/logic/views/ProjectModals/taskInfo.js'),
                        './styles/StylesProjectModals.css',
                        '/logic/ModalsLogic/modifyTask.js');

                    savedTaskId = task.id;
                    // Ahora el modal está listo, podemos modificarlo
                    let taskName = document.getElementById("taskName");
                    let taskAssignedTo = document.getElementById("taskAssignedTo");
                    let taskContact = document.getElementById("taskContact");
                    let taskStatus = document.getElementById("taskStatus");
                    let dueDate = document.getElementById("taskDueDate");
                    if (taskName) {
                        taskName.textContent = task.name;
                        taskAssignedTo.textContent = task.userAssigned.name;
                        taskContact.textContent = task.userAssigned.email;
                        taskStatus.textContent = task.status.name;
                        dueDate.textContent = new Date(task.dueDate).toLocaleDateString();
                    }
                } catch (error) {
                    console.error("Hubo un error al cargar el modal:", error);
                }
            });
            ul.appendChild(li);
            return ul;
        });
    });
    // MOSTRAR LAS INTERACCIONES DE UN PROYECTO
    interactionsButton.addEventListener("click", () => {
        if (!interactions) return;
        singlePopulateList(contentView, interactions, (interaction) => {
            const ul = document.createElement("ul");
            const li = document.createElement("li");
            const fields = [
                `${interaction.interactionType.name}`
            ];
            fields.forEach((field) => {
                const span = document.createElement("span");
                span.textContent = field;
                li.appendChild(span);
                li.appendChild(document.createElement("br"));
                li.style.cursor = "pointer";
            });
            //Agrego el evento al li
            li.addEventListener("click", async function () {
                try {
                    await loadModalContent(() => import('/logic/views/ProjectModals/interactionInfo.js'),
                        './styles/StylesProjectModals.css',
                        '');
                    let interactName = document.getElementById("interactName");
                    let interactNote = document.getElementById("interactNote");
                    let interactDate = document.getElementById("interactDate");
                    if (interactName) {
                        interactName.textContent = interaction.interactionType.name;
                        interactNote.textContent = interaction.notes;
                        interactDate.textContent = new Date(interaction.date).toLocaleDateString();
                    }
                } catch (error) {
                    console.error("Hubo un error al cargar el modal:", error);
                }
            });
            ul.appendChild(li);
            return ul;
        });
    });

};

//Buscar un proyecto
const fetchAndRenderProjects = async () => {

    const errorMsg = document.getElementById("errorMsg");
    const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]*$/;
    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton");
    const url = new URL(EP_GETPROJECT);
    const nameList = document.getElementById("nameList");
    const campaignList = document.getElementById("campaignList");

    let inputName = document.getElementById("nameInput");
    let inputCampaign = document.getElementById("campaignOption");

    if (regex.test(inputName.value)) {

        //Limpio y escondo
        errorMsg.innerHTML = '';
        errorMsg.style.display = 'none';

        const params = {
            client: savedId,
            name: inputName.value,
            campaign: inputCampaign.value,
            offset: currentPage * pageSize,
            size: pageSize
        };

        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.delete(key);
            if (value !== null) url.searchParams.append(key, value);
        });

        const data = await fetchData(url.toString());

        populateList(nameList, campaignList, data);

        nextButton.disabled = false;
        prevButton.disabled = false;

        addClickEventToListItems();

        //Dependiendo de la cantidad de paginas, se iran mostrando
        prevButton.style.visibility = currentPage > 0 ? 'visible' : 'hidden';
        nextButton.style.visibility = data.length === pageSize ? 'visible' : 'hidden';

    } else {
        //Reescribo y muestro
        errorMsg.innerHTML = 'Invalid character detected';
        errorMsg.style.display = 'flex';
    }
};

//Limpiador de datos
const clearContainer = (containerName, containerCampaign) => {
    if (containerName) {
        containerName.innerHTML = "";
    }
    if (containerCampaign) {
        containerCampaign.innerHTML = "";
    }
};

//Funcion para hacer un fetch
const fetchData = async (endpoint) => {
    try {
        const response = await fetch(endpoint, { method: "GET" });
        if (!response.ok) throw new Error("Error");
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

//Limpia los 2 contenedores y muestra nuevos datos
const populateList = (nameList, campaignList, data) => {
    const nameItems = nameList.querySelectorAll("li");
    const campaignItems = campaignList.querySelectorAll("li");

    for (let i = 0; i < nameItems.length; i++) {
        if (data[i]) {
            nameItems[i].textContent = data[i].name || "No data";
            nameItems[i].setAttribute("data-id", data[i].id);
            nameItems[i].classList.remove("disabled");

            campaignItems[i].textContent = data[i].campaignType?.name || "No data";
            campaignItems[i].setAttribute("data-id", data[i].id);
            campaignItems[i].classList.remove("disabled");
        } else {
            nameItems[i].textContent = "-";
            campaignItems[i].textContent = "";

            nameItems[i].removeAttribute("data-id");
            campaignItems[i].removeAttribute("data-id");

            nameItems[i].classList.add("disabled");
            campaignItems[i].classList.add("disabled");
        }
    }
};

//Limpia el contenedor y muestra nuevos datos
const singlePopulateList = (container, items, createItemNameCallback,) => {
    clearContainer(container, null);
    items.forEach((item) => container.appendChild(createItemNameCallback(item)));
};

//Mostrar lista de proyectos
const addClickEventToListItems = () => {

    let nameList = document.getElementById("nameList");
    let campaignList = document.getElementById("campaignList");

    const liElementsName = Array.from(nameList.getElementsByTagName("li"));
    const liElementsCampaign = Array.from(campaignList.getElementsByTagName("li"));
    // Fusionar ambas listas en una sola
    const liElements = [...liElementsName, ...liElementsCampaign];
    liElements.forEach((li) => {
        li.removeEventListener("click", handleItemClick); // Eliminar eventos previos 
        if (!li.classList.contains("disabled") && li.getAttribute("data-id")) {
            li.addEventListener("click", handleItemClick);
            li.style.cursor = 'pointer';
        }
    });
};

//Nueva función para manejar el clic en los elementos
const handleItemClick = async function () {

    let nameProject = document.getElementById("Name");
    let startProject = document.getElementById("Start");
    let endProject = document.getElementById("End");
    let dinamicDiv = document.getElementById("dinamicDiv");
    let contentView = document.getElementById("contentView");
    const addTask = document.getElementById("btnAddInteraction");
    const addInteraction = document.getElementById("btnAddTask");
    const tasksButton = document.getElementById("btnTasks");
    const interactionsButton = document.getElementById("btnInteractions");

    const projectId = this.getAttribute("data-id");
    if (!projectId) return; // Evita errores si no hay ID

    nameProject.textContent = " ";
    startProject.textContent = "";
    endProject.textContent = "";
    clearContainer(contentView);
    savedprojectId = null;

    const data = await fetchData(`${EP_GETPROJECT}/${projectId}`);
    if (data) {
        nameProject.textContent += ` ${data.data.name}`;
        startProject.textContent += ` ${new Date(data.data.start).toLocaleDateString()}`;
        endProject.textContent += ` ${new Date(data.data.end).toLocaleDateString()}`;
        interactions = data.interaction;
        tasks = data.tasks;
        savedprojectId = projectId;
        savedIniProject = new Date(data.data.start).toISOString();
        savedEndProject = new Date(data.data.end).toISOString();
        tasksButton.disabled = false;
        interactionsButton.disabled = false;
        addTask.disabled = false;
        addInteraction.disabled = false;
        dinamicDiv.style.display = 'flex';
    }
};

//Funcion para cargar dinamicamente la vista de los modales, los script y estilos correspondientes
async function loadModalContent(dynamicImport, stylePath, scriptPath) {
    return new Promise(async (resolve, reject) => {
        try {
            modalOverlay.innerHTML = ''; // Limpia el contenido actual del modal
            // Importa dinámicamente la vista
            const { default: viewFunction } = await dynamicImport();

            const modalView = viewFunction(); // Obtiene el contenido de la vista

            // Carga los estilos si hay
            if (stylePath) {
                loadStyle(stylePath);
            }

            // Carga los scripts si hay
            // Inserta el contenido de la vista en el modal
            modalOverlay.appendChild(modalView);

            if (scriptPath) {
                loadScript(scriptPath);
            }

            // Muestra el modal y el overlay
            modalOverlay.style.display = 'flex';
            modalOverlay.style.display = 'flex';

            resolve(); // Resolvemos la promesa cuando todo ha cargado correctamente
        } catch (error) {
            console.error('Error al cargar la vista, estilos o scripts:', error);
            reject(error); // En caso de error, rechazamos la promesa
        }
    });
}

//Función para cerrar el modal
function closeModal() {
    modalOverlay.style.display = 'none';
    modalOverlay.innerHTML = '';
}

export { initializeProjectWindow };
export { fetchAndRenderProjects };

export { savedTaskId };
export { savedprojectId };
export { savedIniProject };
export { savedEndProject };


