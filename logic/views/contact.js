import { loadStyle } from "../loadStyle.js";

export default () => {
    const views = `<img src="/imgs/OutService.png" alt="yellow" class ="OutService">`;
    const sectionElement = document.createElement('Section');
    sectionElement.setAttribute("class", "boxSection");
    sectionElement.innerHTML = views;
    loadStyle("styles/StylesCRMContact.css");
    return sectionElement;
};