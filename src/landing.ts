import Database from "./mongodb.js";


console.log("hallo");
const mongodb = new Database();
mongodb.findSubject().then(subject => console.log("haii" + subject));

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