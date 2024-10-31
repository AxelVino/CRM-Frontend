export default () => {
    const views = `<section class ="regist">
        <img src="/imgs/CATRM.png" alt="brand logo">
        <h1>New account</h1>
        <form class="form">
            <label for="username">Name</label>
            <input type="text" id="username" name="username" required placeholder="Ej: patricio"><br>
            <label for="gmail">Email</label>
            <input type="text" id="email" name="email" required placeholder="Ej: abcd@gmail.com"><br>
            <label for="company">Company</label>
            <input type="text" id="company" name="company bunisess" required placeholder="Ej: lamnda s.a"><br>
            <label for="phone">Phone</label>
            <input type="text" id="phone" name="phone number" required placeholder="Ej: 11-12345678"><br>
            <label for="address">Adress</label>
            <input type="text" id="adress" name="adress direction" required placeholder="Ej: Av. conan 2590"><br><br>
            <input type="submit" class="btn" value="Create account">
        </form>
        <div class="container">
            <a href="#/Home"><button class="btnB">Back</button></a>
        </div>
    </section>`;
    const sectionElement = document.createElement('section');
    sectionElement.innerHTML = views;
    return sectionElement;
};