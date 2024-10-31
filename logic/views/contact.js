export default () => {
    const views = `<img src="/imgs/OutService.png" alt="yellow" class ="OutService">`;
    const sectionElement = document.createElement('section');
    sectionElement.innerHTML = views;
    return sectionElement;
};