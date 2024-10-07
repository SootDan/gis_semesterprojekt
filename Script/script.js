/*
Adds both the head as well as the navbar to all html files.
*/
fetch("../Templates/head.html")
    .then(response => response.text())
    .then(data => {
        const head = document.head;
        const div = document.createElement("div");
        div.innerHTML = data.trim();

        Array.from(div.children).forEach(element => {
            head.appendChild(element);
        });
    })
    .catch(error => console.error("Error", error));

fetch("../Templates/navbar.html")
    .then(response => response.text())
    .then(data => {
        const nav = document.body;
        const div = document.createElement("div");
        div.innerHTML = data.trim();

        Array.from(div.children).forEach(element => {
            nav.prepend(element);
        })
    })

fetch("../Templates/footer.html")
    .then(response => response.text())
    .then(data => {
        const nav = document.body;
        const div = document.createElement("div");
        div.innerHTML = data.trim();

        Array.from(div.children).forEach(element => {
            nav.appendChild(element);
        })
    })
