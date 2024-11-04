let db_name: HTMLInputElement = document.getElementById("db_name") as HTMLInputElement;
db_name.addEventListener("keydown", onKeyDown);

let db_pw: HTMLInputElement = document.querySelector("#db_pw") as HTMLInputElement;
db_pw.addEventListener("keydown", onKeyDown);

let db_pw_repeat: HTMLInputElement = document.getElementById("db_pw_repeat") as HTMLInputElement;
db_pw_repeat.addEventListener("keydown", onKeyDown);

console.log(db_name);
console.log(db_pw);
//db_pw.setAttribute(":invalid", true);

function onKeyDown(event: Event) {
    console.log("Taste: " + db_pw.value);
    validatePassword();
}

function validatePassword() {
    if (db_pw.value != db_pw_repeat.value ||
        db_pw.value.length <= 6
    ) {
        db_pw.checkValidity();
    }
}