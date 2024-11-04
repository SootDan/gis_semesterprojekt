let db_name = document.getElementById("db_name");
db_name.addEventListener("keydown", onKeyDown);

let db_pw = document.querySelector("#db_pw");
db_pw.addEventListener("keydown", onKeyDown);

let db_pw_repeat = document.getElementById("db_pw_repeat");
db_pw_repeat.addEventListener("keydown", onKeyDown);

console.log(db_name);
console.log(db_pw);
//db_pw.setAttribute(":invalid", true);

function onKeyDown(event) {
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