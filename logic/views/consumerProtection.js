export default () => {
    const views = `<img src="/imgs/404.png" alt="building" class ="404">`;
    const sectionElement = document.createElement('section');
    sectionElement.innerHTML = views;
    return sectionElement;
};