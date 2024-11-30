// Initialize NodeJS libraries
import express from "express";
import cookieParser from "cookie-parser";
import i18n from "i18n";
import Database, { Subjects } from "./persistence";


// Creates Express + Session
const app = express();
const port = 8080;
export const db: Database = new Database();


// Initialize language settings
i18n.configure({
    locales: ["de", "en"],
    directory: "locales",
    defaultLocale: "en",
    cookie: "language",
    autoReload: true,
    syncFiles: true
})


/**
 * Middleware
 */
app.use(cookieParser());
app.use(i18n.init);
// FOAC problem solved by caching, starts sessions
app.use(express.static("public", { maxAge: "1d"}));
app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");


/**
 * Renders all pages in array
 */
app.get("/locale/:lang", (req, res) => {
    res.cookie("language", req.params.lang, { maxAge: 900000});
    res.setLocale(req.params.lang);
    res.redirect("/login");
});

app.get("/", (req, res) => {
    const lang: string = req.cookies.language;
    if (!lang)
        return res.render("index");
    return res.redirect("/login");
}); 

app.get("/landing", async (req, res) => {
    const account = req.cookies.account;
    res.render("landing", { account, scriptPath: "landing.js", });
})

const pages: string[] = ["login", "settings", "register"];
pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.render(page, { scriptPath: `${page}.js` });
    });
});


/**
 * Creates new account.
 */
app.post("/register", async (req, res) => {
    const username = req.body.db_name;
    const password = req.body.db_pw;
    const subjects = [];
    for (let i = 0; i < 6; i++) {
        const subject: Subjects = {
            name: req.body[`subj_name_${i}`],
            timeReq: req.body[`subj_req_time_${i}`],
            hasDeadline: req.body[`subj_has_deadline_${i}`],
        };

        if (subject.hasDeadline)
            subject.deadline = req.body[`subj_deadline_${i}`];
        subjects.push(subject);
    }
    await db.createAccount(username, password, subjects);
    res.redirect("/login");
})


/**
 * Logs the user in and creates a session.
 */
app.post("/login", async (req, res) => {
    const username = req.body.login_db;
    const password = req.body.login_pw;
    const isValidAccount: boolean = await db.loginAccount(username, password);
    if (isValidAccount) {
        res.cookie("account", await db.getAccountInfo(username));
        return res.redirect("landing");
    }
    // TODO: Add function that handles when there is no proper login data
    return res.redirect("/login");
})


// Create website and MongoDB
app.listen(port, async() => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
    await db.startDB();
});