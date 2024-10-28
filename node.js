// Initialize NodeJS
const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

// Renders all pages in array
const pages = ["", "login", "settings",
    "register", "landing"];
pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        if (page == "") 
            res.render("index");
        else
            res.render(page);
    });
});

// Creates website
const port = 5000;
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});
