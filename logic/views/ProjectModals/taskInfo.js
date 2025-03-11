export default () => {
    const views = `
    <div class="infoTaskModal" id="infoTaskModal" role="dialog" aria-labelledby="modalTittle">
        <div class="modal-infoTask" id="modal-infoTask">
            <div class ="head-modal">
                <h3 class ="modalTittle">Task info</h3>
                <span class="closeModal" role="button" aria-label="Close">&times;</span>
            </div>
            <div id ="modal-infoTaskConteiner" class="modal-infoTaskConteiner">
                <dl class="modal-infoTaskData">
                    <dt>Name</dt>
                    <dd id="taskName"></dd>
                    <dt>Status</dt>
                    <dd id="taskStatus"></dd>
                    <dt>Due date</dt>
                    <dd id="taskDueDate"></dd>
                    <dt>Assigned to</dt>
                    <dd id="taskAssignedTo"></dd>
                    <dt>Contact email</dt>
                    <dd id="taskContact"></dd>
                    <button id="modifyTask" class="acceptBtn">Modify</button>
                </dl>
            </div>
        </div>
    </div>`;
    const divElement = document.createElement('div');
    divElement.innerHTML = views;

    return divElement;
};