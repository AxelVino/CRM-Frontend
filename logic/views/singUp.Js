import { loadStyle } from "/logic/loadStyle.js";

export default () => {
    const views =
        `
        <form class="formRegist" id="formRegist">
            <h4>New account</h4>
            <input type="text" id="userNameRegist" class="controls" required placeholder="Enter your name">
            <span id = "errorNameRegist" class = "errorMsgNew"></span>
            <input type="text" id="gmailRegist" class="controls" required placeholder="Enter your gmail">
            <span id = "errorGmailRegist" class = "errorMsgNew"></span>
            <input type="text" id="companyRegist" class="controls" required placeholder="Enter your company name">
            <span id = "errorCompanyRegist" class = "errorMsgNew"></span>
            <input type="text" id="phoneRegist" class="controls" required placeholder="Enter your phone number">
            <span id = "errorPhoneRegist" class = "errorMsgNew"></span>
            <input type="text" id="adressRegist" class="controls" required placeholder="Enter your adress">
            <span id = "errorAddressRegist" class = "errorMsgNew"></span>
            <input type="submit" class="btnCreateRegist" id="btnCreateRegist" value="Create">
        </form>
        <dialog id="popUp" class="popUp">
            <p>¡Account created!</p>
            <button id="closePop" class="closePop">Close</button>
        </dialog>
        `;
    const sectionElement = document.createElement('section');
    sectionElement.setAttribute("class", "regist");
    sectionElement.setAttribute("id", "regist");
    sectionElement.innerHTML = views;
    loadStyle("/styles/StylesCRMSingUp.css");
    return sectionElement;
};