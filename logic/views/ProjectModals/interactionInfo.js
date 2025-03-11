export default () => {
    const views = `
    <div class="infoInteractionModal" id="infoInteractionModal">
        <div class="modal-infoInteraction" id="modal-infoInteraction">
            <div class ="head-modal">
                <h3 class ="modalTittleI">Interaction info</h3>
                <span class="closeModal">&times;</span>
            </div>
            <div class="modal-DivInfo">
                <div class="modal-infoInteractionData">
                    <p id = "interactName" ></p>
                    <p id = "interactDate" ></p>
                </div>
                <div class="modal-infoInteractionNote">
                    <p id = "interactNote" class ="interactNote"></p>
                </div>
            </div>
        </div>
    </div>`;
    const divElement = document.createElement('div');
    divElement.innerHTML = views;

    return divElement;
};