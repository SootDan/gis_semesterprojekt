const subjTable = document.getElementById("subj_table") as HTMLTableElement;
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
    const subjSelect = document.createElement("select") as HTMLSelectElement;
    const selectOptions = ["Edit", "Deadline"];
    selectOptions.forEach(option => {
        const subjOption = document.createElement("option") as HTMLOptionElement;
        subjOption.textContent = option;
        subjSelect.appendChild(subjOption);
    });
    return subjSelect;
}


/**
 * Sets up the database for each individual user.
 */
function createDatabase() {
    // Create a tree column for each subject.
    for (let i = 0; i < json.subjects.length; i++) {
        const subjTr: HTMLTableRowElement = document.createElement("tr");
        subjTr.setAttribute("id", `subj_${i}`);
    
        const deadline = json.subjects[i].has_deadline;
        if (deadline) {
            json.subjects[i].deadline = new Date(json.subjects[i].deadline).toDateString();
        }

        const jsonOutput = [json.subjects[i].name, json.subjects[i].time_req,
            json.subjects[i].time_done, addDeadlineTimers(deadline),
            addDeadlineTimers(deadline), addDeadlineTimers(deadline),
            json.subjects[i].deadline];
    
        // Creates the subject rows
        for (let j = 0; j < 8; j++) {
            const subjTd: HTMLTableCellElement = document.createElement("td");
            subjTd.setAttribute("id", `subj_${i}_${j}`);
            if (j < 7)
                subjTd.textContent = jsonOutput[j];
            else
                subjTd.appendChild(createSubjectOptions());
    
            subjTr.appendChild(subjTd);
        }
    
        // Finishes up subject
        subjTable.appendChild(subjTr);
    }
}


createDatabase();