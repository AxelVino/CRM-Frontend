export default () => {
    const views = `
    <div class="addInteractionModal" id="addInteractionModal">
        <div class="modal-addInteraction" id="modal-addInteraction">
            <div class ="head-modal">
                <div class ="modalTittle">New Interaction</div>
                <span class="closeModal">&times;</span>
            </div>
            <div class="modal-FormAddInteracion">
                <label for="interactionType">Interaction Type</label>
                <select id="interactionType" class= "interactionType">
                        <option value="1">Initial Meeting</option>
                        <option value="2">Phone callg</option>
                        <option value="3">Email</option>
                        <option value="4">Presentation of Results</option>
                </select>
                <label for="interactionDueDate">Date</label>
                <input type="datetime-local" id="interactionDueDate" name="date" required>
                <p id = "errorMsgDueDate" class = "errorMsg"></p>
                <label for="interactionNotes">Notes</label>
                <input type="name" id="interactionNotes" name="interactionNotes" required placeholder="Ej: Hello, this is my first interaction!">
                <input type="submit" id ="acceptNewInteraction" class="acceptBtn" value="Accept">
            </div>
        </div>
    </div>`;
    const divElement = document.createElement('div');
    divElement.innerHTML = views;

    return divElement;
};