//TODO: const db_name: HTMLInputElement = document.getElementById("db_name") as HTMLInputElement;
const db_pw: HTMLInputElement = document.querySelector("#db_pw") as HTMLInputElement;
const db_pw_repeat: HTMLInputElement = document.getElementById("db_pw_repeat") as HTMLInputElement;

const submit_button: HTMLInputElement = document.getElementById("submit_register") as HTMLInputElement;
submit_button.addEventListener("click", validatePassword);

/**
 * This checks if a password is valid.
 * TODO: Proper validation.
*/
function validatePassword() {
    const doesMatch: boolean = db_pw.value == db_pw_repeat.value;
    const correctSize: boolean = db_pw.value.length >= 6 && db_pw.value.length < 16;
    if (!doesMatch || !correctSize)
        db_pw.setCustomValidity("TODO: Add invalid password string.");
    else {
        db_pw.setCustomValidity("");
        db_pw_repeat.setCustomValidity("");
    }
}