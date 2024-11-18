import { db } from "./server";

const loginName = document.getElementById("login_db") as HTMLInputElement;
const loginPw = document.getElementById("login_pw") as HTMLInputElement;
//const loginSubmit = document.getElementById("login_submit") as HTMLInputElement;
const form = document.getElementById("login") as HTMLFormElement;

//form.addEventListener("submit", async (event) => {
form.onsubmit = async (event) => {
    event.preventDefault();
    const isValid = await db.loginAccount(loginName.value, loginPw.value);
    if (!isValid) {
        loginName.setCustomValidity("baaaaaaaaaaaaaaa");
        loginName.reportValidity();
    }
    else {
        loginName.setCustomValidity("c");
        loginName.reportValidity();
    }
};