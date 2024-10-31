export default () => {
    const views = `<article class = "aboutUs" id="aboutD">
                <div>
                    <h2>¿Who are we?</h2>
                    <p>We are a new company with a short track record but high trustworthiness,
                        as we have highly qualified personnel and the ideal infrastructure for the development of all your projects. 
                        <br />
                        <br />
                        Founded in 2023, CatRM, led by CEO Axel Vino, aims to provide quality to its clients and increase their profits, 
                        because when the client wins, everyone wins.
                    </p>
                </div>
                <figure class="company">
                    <img src="/imgs/rascacielos.png" alt="building">
                    <figcaption><a href="https://www.flaticon.es/iconos-gratis/informacion" title="información iconos">Image provided by ultimatearm - Flaticon</a></figcaption>
                </figure>
            </article>`;
    const sectionElement = document.createElement('section');
    sectionElement.innerHTML = views;
    return sectionElement;
};