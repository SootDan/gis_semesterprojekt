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
app.use(express.static("public", { maxAge: "1d" }));
app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");


/**
 * Renders all pages in array
 */
app.get("/locale/:lang", (req, res) => {
    res.cookie("language", req.params.lang, { maxAge: 900000 });
    res.cookie("timeFormat", (req.params.lang == "de" ? "DD.MM.YY" : "MM/DD/YY"), { maxAge: 900000 });

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
});


/**
 * This adds the study time for each subject.
 * Only available through /landing.
 */
app.get("/studyTime", async (req, res) => {
    const account = req.query.account as string;
    const subject = req.query.subject as string;
    const time = parseFloat(req.query.time as string);
    await db.addStudyTime(account, subject, time);
    res.cookie("account", await db.getAccountInfo(account));
    return res.redirect("landing");
});

/** 
 * This edits a subject.
 */
app.get("/editSubject", async (req, res) => {
    const account = req.query.account as string;
    const subjectOldName = req.query.subjectOldName as string;
    const subjectNewName = req.query.subjectNewName as string;
    const timeReq = parseFloat(req.query.timeReq as string);
    const hasDeadline = req.query.hasDeadline as unknown as boolean;
    const deadline = new Date(req.query.deadline as string);
    await db.editSubject(account, subjectOldName, subjectNewName, timeReq, hasDeadline, deadline);
    res.cookie("account", await db.getAccountInfo(account));
    return res.redirect("landing");
});


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
    for (let i = 0; i < 5; i++) {
        const subject: Subjects = {
            name: req.body[`subj_name_${i}`],
            timeReq: req.body[`subj_req_time_${i}`],
            timeDone: 0,
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