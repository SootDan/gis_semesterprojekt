const db_name: HTMLInputElement = document.querySelector("#db_name") as HTMLInputElement;
const db_pw: HTMLInputElement = document.querySelector("#db_pw") as HTMLInputElement;
const db_pw_repeat: HTMLInputElement = document.getElementById("db_pw_repeat") as HTMLInputElement;

//TODO: const submit_button: HTMLInputElement = document.getElementById("submit_register") as HTMLInputElement;
addEventListener("input", main);

const subjects: HTMLTableElement = document.querySelector("#subject_creator") as HTMLTableElement;
let toggleSubjects = false;

/**
 * Check if a DB name is valid.
 * TODO: Proper validation.
 */
function validateDb(): boolean {
    const isValid: boolean = db_name.value != null && db_name.value.length >= 3;
    const str: string = (isValid) ? "" : "<%=__(\"register_invalid_name\") %>";
    db_name.setCustomValidity(str);
    return isValid;
}

/**
 * This checks if a password is valid.
 * TODO: Proper validation.
*/
function validatePassword(): boolean {
    const doesMatch: boolean = db_pw.value == db_pw_repeat.value;
    const correctSize: boolean = db_pw.value.length >= 6 && db_pw.value.length < 16;
    if (!doesMatch || !correctSize) {
        db_pw.setCustomValidity("TODO: Add invalid password string.");
        db_pw_repeat.setCustomValidity("TODO: Add invalid password string.");
        
    } else {
        db_pw.setCustomValidity("");
        db_pw_repeat.setCustomValidity("");
    }
    return doesMatch && correctSize;
}

/**
 * Creates the form for each subject individually.
 */
function createSubjects() {
    for (let i = 0; i < 6; i++) {
        const tr = document.createElement("tr");
        const subj_name = document.createElement("input");
        subj_name.setAttribute("id", `subj_name${i}`);

        const subjects_attr = ["subj_name", "subj_req_time", "subj_deadline"];
        for (const subj of subjects_attr) {
            const td = document.createElement("td");
            const input = document.createElement("input");
            input.setAttribute("id", `${subj}${i}`);
            td.appendChild(input);
            tr.appendChild(td);
        }
        subjects.appendChild(tr);
    }
}

function main() {
    if (validatePassword() && validateDb() && !toggleSubjects) {
        createSubjects();
        toggleSubjects = true;
    }
}