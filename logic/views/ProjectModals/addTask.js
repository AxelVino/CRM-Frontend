export default () => {
    const views = `
    <div class="addTaskModal" id="addTaskModal">
        <div class="modal-addTask" id="modal-addTask">
            <div class ="head-modal">
                <div class ="modalTittle">New Task</div>
                <span class="closeModal">&times;</span>
            </div>
            <div class="modal-FormAddTask">
                <label for="taskName">Name</label>
                <input type="name" id="taskName" name="taskName" required placeholder="Ej: Logistic">
                <p id = "errorMsgNameTask" class = "errorMsg"></p>
                <label for="taskDueDate">Due Date</label>
                <input type="datetime-local" id="taskDueDate" name="taskDueDate" required>
                <p id = "errorMsgDueDate" class = "errorMsg"></p>
                <label for="taskUser">User</label>
                <select id="taskUser" class= "taskUser">
                        <option value="1">Joe Done</option>
                        <option value="2">Nill Amstrong</option>
                        <option value="3">Marlyn Morales</option>
                        <option value="4">Antony Orué</option>
                        <option value="5">Jazmin Fernandez</option>
                </select>
                <label for="taskStatus">Status</label>
                <select id="taskStatus" class= "taskStatus">
                        <option value="1">Pending</option>
                        <option value="2">In Progress</option>
                        <option value="3">Blocked</option>
                        <option value="4">Done</option>
                        <option value="5">Cancel</option>
                </select>
                <input type="submit" id ="acceptNewTask" class="acceptBtn" value="Accept">
            </div>
        </div>
    </div>`;
    const divElement = document.createElement('div');
    divElement.innerHTML = views;

    return divElement;
};