import { loadScript } from "../loadScript.js";
import { loadStyle } from "../loadStyle.js";
export default () => {
    const views = `
        <div class = "projectDiv">
            <div class="divHead">
                <div class="divFilters">
                    <label for="nameInput">Name</label>
                    <input type="text" id="nameInput" placeholder="ej: SpaceX">
                    <span id = "errorMsg" class = "errorMsg"></span>
                    <label for="campaignOption">Campaign</label>
                    <select id="campaignOption" class= "campaignOption">
                        <option value="">Select an option</option>
                        <option value="1">SEO</option>
                        <option value="2">PPC</option>
                        <option value="3">Social Media</option>
                        <option value="4">Email Marketing</option>
                    </select>
                    <input type="submit" id ="SearchBtn" class="SearchBtn" value="Search project">
                </div>
                <div class="divCat">
                    <img src="/imgs/CuteCat.png" alt="cute">
                </div>
            </div>
            <div class="projectList">
                <span class = "projectVar">Projects</span>
                <div class="orderDiv">
                    <div class="projectItems">
                        <span class ="listName">Name</span>
                        <ul id="nameList" class = "itemList">
                            <li>.</li>
                            <li>.</li>      
                            <li>.</li>      
                            <li>.</li>      
                            <li>.</li>      
                            <li>.</li>      
                            <li>.</li>      
                            <li>.</li>
                            <li>.</li>
                            <li>.</li>      
                        </ul>
                    </div>
                    <div class="projectItems">
                        <span class ="listCampaign">Campaign type</span>
                        <ul id="campaignList" class = "itemList">
                            <li></li>
                            <li></li>
                            <li></li> 
                            <li></li> 
                            <li></li> 
                            <li></li> 
                            <li></li> 
                            <li></li> 
                            <li></li> 
                            <li></li> 
                        </ul>
                    </div>
                </div>
            </div>
            <div class ="bottomButtoms">
                <button id="createProject" class ="createProject">Create project</button>
                <button id="prevButton" class="prevButton">Back</button>
                <button id="nextButton" class="nextButton">Next</button>
            </div>
        </div>
        <div class ="dinamicDiv" id ="dinamicDiv"> 
            <div class ="dinamicData">
                <h3 id="Name" class ="tittleProject"></h3>
                <dl class ="dinamicDate">
                    <dt>Start</dt>
                    <dd id="Start"></dd>
                    <dt>End</dt>
                    <dd id="End"></dd>
                </dl>
            </div>
            <div class ="buttonsConteiner">
                <button id="btnTasks">Task</button>
                <button id="btnInteractions">Interactions</button>
            </div>
            <ul class="contentView" id="contentView">
            </ul>
            <div class="dinamicDivBtn">
                <button class="btnAddTask" id="btnAddTask">Add task</button>
                <button class="btnAddInteraction" id="btnAddInteraction">Add interaction</button>
            </div>
        </div>`;
    const sectionElement = document.createElement('Section');
    sectionElement.setAttribute("class", "boxSectionTwo");
    sectionElement.innerHTML = views;
    loadScript('/logic/projectsLogic.js');
    loadStyle('/styles/StylesCRMProjects.css');
    return sectionElement;
};