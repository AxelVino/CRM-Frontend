export default () => {
    const views = `
    <section class ="whatisCRM">
        <article class ="CRM">   
            <h2>¿What is a CRM?</h2>
            <p class ="explainCRM"> 
                CRM stands for Customer Relationship Management and refers to a set of practices,
                business strategies, and technologies focused on customer relationships.<br/>
                By using a CRM system,
                businesses of all sizes can stay connected with customers,
                optimize processes, improve profitability, and drive business growth.
            </p>
            <div class="try">
                <a href="#/singUpForm" class="btnTry"><button id="btnJoin">¡Join us!</button></a>
                <figure class="group">
                    <img src="/imgs/pngegg1.png" alt="bunisess">
                    <figcaption><a href="https://www.pngegg.com/es" title="informacion de iconos">Image provided by pngegg</a></figcaption>
                </figure>
            </div>
        </article>
        <article class ="whatdoes">
            <div>
                <h2>¿What does a CRM do?</h2>
                <p>The CRM stores information about current and potential customers (such as name, address, phone number, etc.) and
                    tracks their activities and points of contact with the company. This includes customer visits to the website,
                    phone calls made, email exchanges, and various other interactions.<br />
                    <br />It's important to highlight that the CRM system is not just a detailed contact list, as it primarily collects 
                    and integrates valuable data to prepare and update your teams with personal customer information, their purchase history, and their preferences.
                </p>
            </div>
            <figure class="stadistics">
                <img src="/imgs/estadisticas.png" alt="profit">
                <figcaption><a href="https://www.flaticon.es/iconos-gratis/informacion" title="información iconos">Image provided by ultimatearm - Flaticon</a></figcaption>
            </figure>
        </article>
    </section>`;
    const sectionElement = document.createElement('section');
    sectionElement.innerHTML = views;
    return sectionElement;
};