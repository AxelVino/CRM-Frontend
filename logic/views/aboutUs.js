export default () => {
    const views = `
    <article class ="crmArticleThree">
            <div class="crmArticleDescriptionThree">
                <h4 class ="crmArticleTitleThree">¿Who are we?</h4>
                <p>We are a new company with a short track record but high trustworthiness,
                    as we have highly qualified personnel and the ideal infrastructure for the development of all your projects. 
                    <br/>
                    Founded in 2023, CatRM, led by CEO Axel Vino, aims to provide quality to its clients and increase their profits, 
                    because when the client wins, everyone wins.
                </p>
            </div>
            <div class="crmImageThree">
                <figure class="crmDetailsThree">
                    <img src="/imgs/rascacielos.png" alt="building">
                    <figcaption><a href="https://www.flaticon.es/iconos-gratis/informacion" title="icon info">Image provided by ultimatearm - Flaticon</a></figcaption>
                </figure>
            </div>
    </article>`;
    const sectionElement = document.createElement('Section');
    sectionElement.setAttribute("class", "boxSection");
    sectionElement.innerHTML = views;
    return sectionElement;
};