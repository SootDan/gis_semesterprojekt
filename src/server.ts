// Initialize NodeJS libraries
import express from "express";
import cookieParser from "cookie-parser";
import i18n from "i18n";
import Database from "./mongodb";

// Creates Express and MongoDB
const app = express();
const port: number = 5000;
const mongodb = new Database();
mongodb.startDB();

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
// FOAC problem solved by caching
app.use(express.static("public", { maxAge: "1d"}));
app.use(express.static("dist"));
app.set("view engine", "ejs");

app.get("/locale/:lang", (req, res) => {
    res.cookie("language", req.params.lang, { maxAge: 90000});
    res.setLocale(req.params.lang);
    res.redirect("/login");
});

// Renders all pages in array
const pages: Array<string> = ["login", "settings", "landing"];
pages.forEach(page => {
    app.get(`/${page}`, (req, res) =>
        res.render(page));
});

app.get("/", (req, res) => {
    const lang: string = req.cookies.language;
    if (!lang)
        return res.render("index");
    return res.redirect("/login");
})

app.get("/register", (req, res) => {
    res.render("register", { scriptPath: "register.js" });
})

// Create website
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});

// TODO: This is terrible and I hate it.
(async () => {
    const subject = await mongodb.findSubject();
    console.log(subject);
})();