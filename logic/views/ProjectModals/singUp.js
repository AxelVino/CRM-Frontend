export default () => {
    const views = `
            <div>
                <span class="close">&times;</span>
            </div>
            <div class="modal-form">
                <label for="id" class ="iDuser">ID</label>
                <input type="number" id="id" name="id" required placeholder="Ej:1,2,3,4...">
                <p class ="errorMsg" id="errorMsg"></p>
                <input type="submit" id ="modalBtn" class="btnModal" value="Accept">
            </div>`;
    const divElement = document.createElement('div');
    divElement.setAttribute("id", "modalRoot");
    divElement.setAttribute("class", "modalRoot");
    divElement.innerHTML = views;

    return divElement;
};