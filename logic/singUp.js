import { EP_POSTCLIENT } from "./config.js";

const initializeRegist = () => {

    const regist = document.getElementById("regist");
    const form = regist.querySelector("#formRegist");
    const popUp = regist.querySelector("#popUp");
    const closePopUp = regist.querySelector("#closePop");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        handleInteraction();
    });

    closePopUp.addEventListener("click", () => {
        popUp.close();
        form.reset();
        window.location.hash = "#/Home";
    });
};

const handleInteraction = async () => {

    const regist = document.getElementById("regist");
    const form = regist.querySelector("#formRegist");

    let nameUser = form.querySelector("#userNameRegist");
    let gmail = form.querySelector("#gmailRegist");
    let company = form.querySelector("#companyRegist");
    let phone = form.querySelector("#phoneRegist");
    let address = form.querySelector("#adressRegist");

    if (validator(nameUser.value, gmail.value, company.value, phone.value, address.value)) {
        const requestData = {
            name: nameUser.value,
            email: gmail.value,
            company: company.value,
            phone: phone.value,
            address: address.value
        };

        const data = await fetchData(EP_POSTCLIENT, requestData);
        if (data) {
            popUp.showModal();
        }
    }
};

const validator = (name, gmail, company, phone, address) => {

    let flag = true;
    const errorName = document.getElementById("errorNameRegist");
    let nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    if (!name || !nameRegex.test(name)) {
        errorName.textContent = "Invalid character entered";
        errorName.classList.add("errorVisibleNew");
        flag = false;
    } else {
        errorName.textContent = "";
        errorName.classList.remove("errorVisibleNew");
    }

    let errorGmail = document.getElementById("errorGmailRegist");
    let gmailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}(?<=\.com)$/;
    if (!gmail || !gmailRegex.test(gmail)) {
        errorGmail.textContent = "Invalid email format";
        errorGmail.classList.add("errorVisibleNew");
        flag = false;
    } else {
        errorGmail.textContent = "";
        errorGmail.classList.remove("errorVisibleNew");
    }

    let errorCompany = document.getElementById("errorCompanyRegist");
    let companyRegex = /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/; // Evita caracteres especiales y espacios al inicio o final
    if (!company || !companyRegex.test(company)) {
        errorCompany.textContent = "Cannot contain special characters";
        errorCompany.classList.add("errorVisibleNew");
        flag = false;
    } else {
        errorCompany.textContent = "";
        errorCompany.classList.remove("errorVisibleNew");
    }


    let errorPhone = document.getElementById("errorPhoneRegist");
    let phoneRegex = /^[0-9]+$/;

    if (!phone || !phoneRegex.test(phone)) {
        errorPhone.textContent = "Can only contain numbers";
        errorPhone.classList.add("errorVisibleNew");
        flag = false;
    } else {
        errorPhone.textContent = "";
        errorPhone.classList.remove("errorVisibleNew");
    }

    let errorAddress = document.getElementById("errorAddressRegist");
    let addressRegex = /^[a-zA-Z0-9]+(?:[.\s][a-zA-Z0-9]+)*$/;
    if (!address || !addressRegex.test(address)) {
        errorAddress.textContent = "Invalid address format";
        errorAddress.classList.add("errorVisibleNew");
        flag = false;
    } else {
        errorAddress.textContent = "";
        errorAddress.classList.remove("errorVisibleNew");
    }

    return flag;
};

const fetchData = async (endpoint, requestData) => {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            const errorDetails = response.text();
            console.error(`Error in response: ${response.status} - ${errorDetails}`);
            throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error on fetchData:", error);
        alert("There was a problem performing the operation. Please check the data and try again.");
    }
};

export { initializeRegist };