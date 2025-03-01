const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const {connectMongoDb} = require("./connect");
const cookieParser = require("cookie-parser");
const {checkForAuthenticationCookie} = require("./middlewares/authentication");

const app = express();

const PORT = 8001;

connectMongoDb("mongodb://127.0.0.1:27017/ABlogger");

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
    return res.render("home",{
        user: req.user,
    });
});

app.use("/user",userRouter);

app.listen(PORT, (e) => console.log(`Server is live at: ${PORT}`));