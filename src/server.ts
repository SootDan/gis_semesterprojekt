// Initialize NodeJS libraries
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import i18n from "i18n";
import Database from "./persistence";

// Creates Express + Session
const app = express();
const exp_session = {
    secret: "hello world",
    resave: false,
    saveUninitialized: true,
    cookie: {}
}
const port = 5000;
const db: Database = new Database();

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
    res.cookie("language", req.params.lang, { maxAge: 900000});
    res.setLocale(req.params.lang);
    res.redirect("/login");
});

// Renders all pages in array
app.get("/", (req, res) => {
    const lang: string = req.cookies.language;
    if (!lang)
        return res.render("index");
    return res.redirect("/login");
});

app.get("/landing", async (req, res) => {
    const accountInfo = await db.getAccountInfo("test1");
    res.render("landing", { scriptPath: "landing.js", database: accountInfo});
})

const pages: string[] = ["login", "landing", "settings", "register"];
pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.render(page, { scriptPath: `${page}.js` });
    });
});

// Create website and MongoDB
app.listen(port, async () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
    await db.startDB();
    await db.createAccount("test1", "test1234", 3, [ {name: "GIS", time_req: 135,
        time_done: 0, has_deadline: true, deadline: new Date(2025, 2, 15)}]);
});