import Projects from '/logic/views/projects.js'
import SingUp from '/logic/views/singUp.js'
import Home from '/logic/views/home.js'
import AboutUs from '/logic/views/aboutUs.js'
import Contact from '/logic/views/contact.js'
import Accesibility from '../views/accessibility.js'
import Consumerprotection from '../views/consumerprotection.js'
import Privacy from '../views/privacy.js'
import Help from '../views/help.js'
import Work from '/logic/views/workWithUs.js'
import Terms from '/logic/views/termsAndConditions.js'

//Router, envia las funciones dependiendo del hipervinculo que aprete el usuario

//Cada funcion tiene una  porcion de codigo html que pintara en  la  interfaz

const content = document.getElementById('root');

const router = (route) => {
    content.innerHTML = '';
    switch (route) {
        case '#/home': {
            return content.appendChild(Home());
        }
        case '#/projects': {
            return content.appendChild(Projects());
        }
        case '#/singUp': {
            return content.appendChild(SingUp());
        }
        case '#/aboutus': {
            return content.appendChild(AboutUs());
        }
        case '#/contacuss': {
            return content.appendChild(Contact());
        }
        case '#/accessibility': {
            return content.appendChild(Accesibility());
        }
        case '#/consumerprotection': {
            return content.appendChild(Consumerprotection());
        }
        case '#/privacy': {
            return content.appendChild(Privacy());
        }
        case '#/help': {
            return content.appendChild(Help());
        }
        case '#/work': {
            return content.appendChild(Work());
        }
        case '#/term': {
            return content.appendChild(Terms());
        }
    }
};

export { router };