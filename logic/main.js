import { router } from '/logic/router/index.routes.js';

//modal logic
//guardo los id en variables
var selectedClient = null;
const EP_GET = 'https://localhost:7012/api/v1/Client'
var modal = document.getElementById("ModalUser");
var btn = document.getElementById("openModal");
var span = document.getElementsByClassName("close")[0];
var inputElement = document.getElementById("id");
var acceptBtn = document.getElementById("modalBtn");

//Cuando el usuario realiza un click en el boton, cambia el display

btn.onclick = function () {
    modal.style.display = "flex";
}
//Cuando el usuario realiza un click en cerrar, cambia el display

span.onclick = function () {
    modal.style.display = "none";
}
//Cuando el usuario hace un click fuera del nodal, vuelve a cambiar el display

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Agregar un event listener para el botón

acceptBtn.addEventListener('click', function () {

    //variable para verificar el valor en el input
    let savedValue = parseInt(inputElement.value);

    //verifico que se envie un valor valido
    if (isNaN(savedValue)) {
        console.log('Por favor, ingresa un ID válido');
        return; // Sale de la función si el ID no es válido
    }
    else {
        //instancio dentro de la funcion para no tener que cargarlo aunque no apreten
        //el boton
        var projects = document.getElementById("projects");
        var create = document.getElementById("create");
        var btnJoinUs = document.getElementById("btnJoin");
        var username = document.getElementById("iduser");
        var idusername = '';

        //cada vez que hagan  click en el boton, hare la peticion get.
        fetch(EP_GET)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
                return res.json();
            })
            .then(data => {
                const client = data.find(user => user.id === savedValue)
                if (client) {
                    //guardo el cliente para usarlo despues
                    selectedClient = client.id;

                    //desactivo los visuales que ya no necesito y activo otros.
                    selectedClient = client;
                    idusername = client.name;
                    modal.style.display = "none";
                    projects.style.display = "flex";
                    btn.style.display = "none";
                    create.style.display = "none";
                    btnJoinUs.style.display = "none";
                    username.style.display = "flex";

                    //muestro el nombre del usuario
                    username.innerText = idusername;
                }
                else {
                    console.log('No se encontró ningún cliente con el ID:', savedValue);
                }
            })
            .catch(error => console.log('Error en la solicitud fetch:', error));
    }
});

//Utilizo la tecnica SPA para poder mostrar varias pantallas sin tener que cargar un nuevo html
window.addEventListener('hashchange', () => {
    router(window.location.hash)
})
export { selectedClient }
