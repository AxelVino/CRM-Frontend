export default () => {
    const views = `
    <section class = "projectSection">
        <div class = "projectDiv">
            <div class="filters">
                <div class="divFilters">
                    <label for="name">Name:</label>
                    <input type="text" id="name" placeholder="ej: SpaceX"></input>
                </div>
                <div class="divFilters">
                    <label for="number">Campaign:</label>
                    <input type="number" id="campaign" placeholder="ej: 1,2,3"></input>
                </div>
                <div class="divFilters">
                    <label for="number">Offset:</label>
                    <input type="number" id="offset" placeholder="ej: 10"></input>
                </div>
                <div class="divFilters">
                    <label for="number">Size:</label>
                    <input type="number" id="size" placeholder="ej: 20"></input>
                </div>
                <div>
                <a href="#" class="btnSearch">
                    <button>Search</button>
                </a>
                </div>
            </div>
            <div class="projectList">
                <ul class = "projectVar">
                    <li>name</li>
                    <li>Campaign type</li>
                </ul>
                <ul class = "listProjects">

        </ul>
            </div>
            <div>
                <a href="#" class="btnBack">
                    <button>Back</button>
                </a>
                <a href="#" class="btnCreate">
                    <button>Create Project</button>
                </a>
                <a href="#" class="btnNext">
                    <button>Next</button>
                </a>
            </div>
        </div>
        <div class ="dinamicDiv"> 
            <div  class="projectName">
                <h2>Project name</h2>
            </div>
            <div>
                <p>Guid:</p>
                <p>Create Date:</p>
                <p>Start date:</p>
                <p>Update date:</p>
                <p>End date:</p>
            </div>
            <div class ="buttonsConteiner">
                <a href="#" class="btn">
                    <button>Task</button>
                </a>
                <a href="#" class="btn">
                    <button>Interactions</button>
                </a>
            </div>
            <div class="contentView">
                <p></p>
            </div>
            <div class="dinamicDivBtn">
                <a href="#" class="btnCreate">
                    <button>Add interaction</button>
                </a>
                <a href="#" class="btnCreate">
                    <button>Add task</button>
                </a>
                <a href="#" class="btnCreate">
                    <button>Search task</button>
                </a>
            </div>
        </div>
    </section>`;
    const sectionElement = document.createElement('section');
    sectionElement.innerHTML = views;
    return sectionElement;
};
import { selectedClient } from "/logic/main.js";


