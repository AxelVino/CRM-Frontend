export default () => {
    const views = `
    <div class="createModal" id="createModal">
        <div class="modal-CreateProject" id="modal-CreateProject">
            <div class ="head-modal" id ="head-modal">
                <div class="modalTittle">New project</div>
                <span class="closeModal">&times;</span>
            </div>
            <div class="modal-FormCreateProject">
                <label for="projectName">Name</label>
                <input type="name" id="projectName" name="projectName" required placeholder="Ej: Unaj">
                <p id = "errorMsgName" class = "errorMsg"></p>
                <label for="startDate">Start</label>
                <input type="datetime-local" id="startDate" name="startDate" required>
                <p id = "errorMsgSDate" class = "errorMsg"></p>
                <label for="endDate">End</label>
                <input type="datetime-local" id="endDate" name="endDate" required>
                <p id = "errorMsgEDate" class = "errorMsg"></p>
                <label for="campaignType">Campaign type</label>
                <select id="campaignType" class= "campaignType">
                        <option value="1">SEO</option>
                        <option value="2">PPC</option>
                        <option value="3">Social Media</option>
                        <option value="4">Email Marketing</option>
                </select>
                <input type="submit" id ="acceptBtn" class="acceptBtn" value="Accept">
            </div> 
        </div>
    </div>`;

    const divElement = document.createElement('div');
    divElement.innerHTML = views;

    return divElement;
};