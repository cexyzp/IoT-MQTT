import express from "express";
import cors from "cors";
import path from "path";
import session from "express-session";
import { fileURLToPath } from "url";
import { state, publishDevice } from "./src/mqtt.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret: "rahasia-bjir",
        resave: false,
        saveUninitialized: false, // Ubah ke false biar lebih hemat memory
        cookie: { secure: false }
    })
);

const auth = (req, res, next) => {
    if (!req.session.user) return res.redirect("/login");
    next();
};

app.get("/", auth, (req, res) => {
    res.render("index", {
        user: req.session.user.username,
        ...state
    });
});

app.get("/login", (req, res) => res.render("login"));

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "TEIB" && password === "MURID_BERPRESTASI") {
        req.session.user = { username };
        return res.redirect("/");
    }
    res.send(
        "<script>alert('Gagal Login!'); window.location='/login';</script>"
    );
});

app.get("/api/data", (req, res) => res.json(state));

app.post("/toggle", (req, res) => {
    const { device } = req.body;
    if (device in state.statusDevices) {
        const status = !state.statusDevices[device];
        publishDevice(device, status);
        return res.json({ success: true, status });
    }
    res.status(400).json({ success: false });
});

export default app;
