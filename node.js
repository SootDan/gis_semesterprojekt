// Initialize NodeJS libraries
const express = require("express");
const i18n = require("i18n");

const app = express();
const port = 5000;

// Initialize language settings
i18n.configure({
    locales: ["de", "en"],
    directory: __dirname + "/locales",
    defaultLocale: "en",
    cookie: "language",
    autoReload: true,
    syncFiles: true
})

// Load libraries
app.use(i18n.init);
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

// Create website
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});