// Initialize NodeJS libraries
const express = require("express");
const cookieParser = require("cookie-parser");
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
app.use(cookieParser());
app.use(i18n.init);
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/locale/:lang", (req, res) => {
    res.cookie("language", req.params.lang, { maxAge: 900000});
    res.setLocale(req.params.lang);
    res.redirect("/login");
});

// Renders all pages in array
const pages = ["login", "settings",
    "landing"];
pages.forEach(page => {
    app.get(`/${page}`, (req, res) =>
        res.render(page));
});

app.get("/", (req, res) => {
    if (res.getLocale() == "en")
        return res.redirect("login");
    res.render("index");
})

app.get("/register", (req, res) => {
    res.render("register", { scriptPath: "/scripts/register.js"});
})

// Create website
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});