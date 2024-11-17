const subj_table: HTMLTableElement = document.getElementById("subj_table") as HTMLTableElement;
const accountInfoElement = document.getElementById('accountInfo');
const accountInfo = accountInfoElement?.getAttribute("data-info");
const json = JSON.parse(accountInfo? accountInfo : "");

/**
 * This adds the necessary data for a deadline.
 * Handles days, weeks, and months until deadline.
 */
function addDeadlineTimers(hasDeadline: boolean) {
    if (!hasDeadline)
        return "N/A";
    else
        return "TODO: Add timer";
}


/**
 * Creates the options for each subject.
 */
function createSubjectOptions(): HTMLSelectElement{
    const subj_select = document.createElement("select") as HTMLSelectElement;
    const select_options = ["Edit", "Deadline"];
    select_options.forEach(option => {
        const subj_option = document.createElement("option") as HTMLOptionElement;
        subj_option.textContent = option;
        subj_select.appendChild(subj_option);
    });
    return subj_select;
}


/**
 * Sets up the database for each individual user.
 */
function createDatabase() {
    // Create a tree column for each subject.
    for (let i = 0; i < json.subjects.length; i++) {
        const subj_tr: HTMLTableRowElement = document.createElement("tr");
        subj_tr.setAttribute("id", `subj_${i}`);
    
        const deadline = json.subjects[i].has_deadline;
        if (deadline) {
            json.subjects[i].deadline = new Date(json.subjects[i].deadline).toDateString();
        }

        const json_output = [json.subjects[i].name, json.subjects[i].time_req,
            json.subjects[i].time_done, addDeadlineTimers(deadline),
            addDeadlineTimers(deadline), addDeadlineTimers(deadline),
            json.subjects[i].deadline];
    
        // Creates the subject rows
        for (let j = 0; j < 8; j++) {
            const subj_td: HTMLTableCellElement = document.createElement("td");
            subj_td.setAttribute("id", `subj_${i}_${j}`);
            if (j < 7)
                subj_td.textContent = json_output[j];
            else
                subj_td.appendChild(createSubjectOptions());
    
            subj_tr.appendChild(subj_td);
        }
    
        // Finishes up subject
        subj_table.appendChild(subj_tr);
    }
}


createDatabase();