const subj_table: HTMLTableElement = document.getElementById("subj_table") as HTMLTableElement;
const accountInfoElement = document.getElementById('accountInfo');
const accountInfo = accountInfoElement?.getAttribute("data-info");
const json = JSON.parse(accountInfo? accountInfo : "");

for (let i = 0; i < json.subjects.length; i++) {
    // TODO: Finish this
    const subj_tr: HTMLTableRowElement = document.createElement("tr");
    subj_tr.setAttribute("id", `subj_${i}`);

    const deadline = json.subjects[i].has_deadline;
    const json_output = [json.subjects[i].name, json.subjects[i].time_req,
        json.subjects[i].time_done, add_deadline_timers(deadline),
        add_deadline_timers(deadline), add_deadline_timers(deadline),
        json.subjects[i].deadline];
    for (let j = 0; j < 7; j++) {
        const subj_td: HTMLTableCellElement = document.createElement("td");
        subj_td.setAttribute("id", `subj_${i}_${j}`);
            subj_td.textContent = json_output[j];
            subj_tr.appendChild(subj_td);
        //subj_table.appendChild(subj_tr);
    }
    const td = document.createElement("td") as HTMLTableCellElement;
    const subj_select = document.createElement("select") as HTMLSelectElement;
    const subj_option = document.createElement("option") as HTMLOptionElement;
    subj_select.appendChild(subj_option);
    td.appendChild(subj_select);
    subj_tr.appendChild(td);
    subj_table.appendChild(subj_tr);
}

function add_deadline_timers(hasDeadline: boolean) {
    if (!hasDeadline)
        return "N/A";
    else
        return "TODO: Add timer";
}