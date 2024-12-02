const dbName = document.querySelector("#db_name") as HTMLInputElement;
const dbPw = document.querySelector("#db_pw") as HTMLInputElement;
const dbPwRepeat = document.getElementById("db_pw_repeat") as HTMLInputElement;

addEventListener("input", main);

const subjs: HTMLTableElement = document.querySelector("#subject_creator") as HTMLTableElement;
let toggleSubjs = false;


/**
 * Check if a DB name is valid.
 */
function validateDb(): boolean {
    const isValid: boolean = dbName.value != null && dbName.value.length >= 3;
    const str: string = (isValid) ? "" : "<%=__(\"register_invalid_name\") %>";
    dbName.setCustomValidity(str);
    return isValid;
}


/**
 * This checks if a password is valid.
*/
function validatePassword(): boolean {
    const doesMatch: boolean = dbPw.value == dbPwRepeat.value;
    const correctSize: boolean = dbPw.value.length >= 6 && dbPw.value.length < 16;
    const responseString = "TODO: Add invalid password string.";
    
    if (!doesMatch || !correctSize) {
        dbPw.setCustomValidity(responseString);
        dbPwRepeat.setCustomValidity(responseString);
    } else {
        dbPw.setCustomValidity("");
        dbPwRepeat.setCustomValidity("");
    }
    return doesMatch && correctSize;
}


/**
 * Creates the form for each subject individually.
 */
function createSubjects() {
    for (let i = 0; i < 5; i++) {
        const tr = document.createElement("tr");
        const subjName = document.createElement("input");
        subjName.setAttribute("id", `subj_name${i}`);

        const subjsAttr = ["subj_name", "subj_req_time", "subj_has_deadline", "subj_deadline"];
        for (const subj of subjsAttr) {
            const td = document.createElement("td");
            const input = document.createElement("input");
            if (subj == "subj_has_deadline")
                input.setAttribute("type", "checkbox");
            if (subj == "subj_deadline")
                input.setAttribute("type", "date");

            input.setAttribute("id", `${subj}_${i}`);
            input.setAttribute("name", `${subj}_${i}`);
            td.appendChild(input);
            tr.appendChild(td);
        }
        subjs.appendChild(tr);
    }
}


function main() {
    if (validatePassword() && validateDb() && !toggleSubjs) {
        createSubjects();
        toggleSubjs = true;
    }
}