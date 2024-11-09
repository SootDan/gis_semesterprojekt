const subj_table: HTMLTableElement = document.getElementById("subj_table") as HTMLTableElement;
const accountInfoElement = document.getElementById('accountInfo');
const accountInfo = accountInfoElement?.getAttribute("data-info");
const json = JSON.parse(accountInfo? accountInfo : "");

for (let i = 0; i < json.subjects.length; i++) {
    // TODO: Finish this
    const subj_tr: HTMLTableRowElement = document.createElement("tr");
    subj_tr.setAttribute("id", `subj_${i}`);

    for (let j = 0; j < 7; j++) {
        const subj_td: HTMLTableCellElement = document.createElement("td");
        subj_td.setAttribute("id", json.name);
        subj_td.textContent = json.subjects[i].name;
        subj_tr.appendChild(subj_td);
    }
    subj_table.appendChild(subj_tr);
}