import Database from "./mongodb.js";

Database.print();
Database.findSubject().then(subjects => {
    console.log(subjects ? subjects.name : null);
})
const subj_table: HTMLTableElement = document.getElementById("subj_table") as HTMLTableElement;

for (let i = 0; i < 6; i++) {
    // TODO: Finish this
    const subj_tr: HTMLTableRowElement = document.createElement("tr");
    subj_tr.setAttribute("id", `subj_${i}`);

    const subj_td: HTMLTableCellElement = document.createElement("td");
    subj_td.textContent = "GIS";
    subj_tr.appendChild(subj_td);
    subj_table.appendChild(subj_tr);
    //console.log(subj_tr);

}
//console.log(Database.findSubject());
/*(async () => {
    console.log("hi");
    //const subject = await mongodb.findSubject();
    console.log(subject ? subject.name : "bro");
})();*/
//const subj_name: HTMLTableElement = document.querySelector("#subj_name") as HTMLTableElement;

//mongodb.findSubject().then((subject) => {
//    subj_name.textContent = subject ? subject.name : "null";
//})

// TODO: This is terrible and I hate it.
/*(async () => {
    const subject = await mongodb.findSubject();
    console.log(subject);
})();*/