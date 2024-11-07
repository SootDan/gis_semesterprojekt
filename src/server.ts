// Initialize NodeJS libraries
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import i18n from "i18n";
import Database from "./mongodb.js";

// Creates Express + Session and MongoDB
const app = express();
const exp_session = {
    secret: "hello world",
    cookie: {}
}

const port: number = 5000;
//const mongodb = new Database();
Database.startDB();

// Initialize language settings
i18n.configure({
    locales: ["de", "en"],
    directory: "locales",
    defaultLocale: "en",
    cookie: "language",
    autoReload: true,
    syncFiles: true
})

// Middleware
app.use(cookieParser());
app.use(i18n.init);
// FOAC problem solved by caching, starts sessions
app.use(express.static("public", { maxAge: "1d"}));
app.use(express.static("dist"));
app.use(session(exp_session));

app.set("view engine", "ejs");

app.get("/locale/:lang", (req, res) => {
    res.cookie("language", req.params.lang, { maxAge: 90000});
    res.setLocale(req.params.lang);
    res.redirect("/login");
});

// Renders all pages in array
app.get("/", (req, res) => {
    const lang: string = req.cookies.language;
    if (!lang)
        return res.render("index");
    return res.redirect("/login");
})

const pages: Array<string> = ["login", "landing", "settings", "register"];
pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.render(page, { scriptPath: `${page}.js` });
    });
});

// Create website
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});