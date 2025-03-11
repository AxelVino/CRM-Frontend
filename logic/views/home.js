export default () => {
    const views =
        `<article class ="crmArticle">
                <div class ="crmArticleDescription">
                    <h2 class ="crmArticleTitle">¿What is a CRM?</h2>
                    <p> CRM stands for Customer Relationship Management and refers to a set of practices,
                        business strategies, and technologies focused on customer relationships.
                        By using a CRM system,
                        businesses of all sizes can stay connected with customers,
                        optimize processes, improve profitability, and drive business growth.
                    </p>
                </div>   
                <div class="crmImage">
                    <figure class="crmDetails">
                        <img src="/imgs/pngegg1.png" alt="bunisess">
                        <figcaption><a href="https://www.pngegg.com/es" title="informacion de iconos">Image provided by pngegg</a></figcaption>
                    </figure>
                </div>
            </article>
            <article class ="crmArticleTwo">
                <div class ="crmArticleDescriptionTwo">
                    <h2 class ="crmArticleTitleTwo">¿What does a CRM do?</h2>
                    <p>The CRM stores information about current and potential customers (such as name, address, phone number, etc.) and
                        tracks their activities and points of contact with the company. This includes customer visits to the website,
                        phone calls made, email exchanges, and various other interactions.<br />
                        <br />It's important to highlight that the CRM system is not just a detailed contact list, as it primarily collects 
                        and integrates valuable data to prepare and update your teams with personal customer information, their purchase history, and their preferences.
                    </p>
                </div>
                <div class="crmImageTwo">
                    <figure class="crmDetailsTwo">
                        <img src="/imgs/estadisticas.png" alt="profit">
                        <figcaption><a href="https://www.flaticon.es/iconos-gratis/informacion" title="información iconos">Image provided by ultimatearm - Flaticon</a></figcaption>
                    </figure>
                </div>
            </article>`;
    const sectionElement = document.createElement('Section');
    sectionElement.setAttribute("class", "boxSection");
    sectionElement.innerHTML = views;
    return sectionElement;
};