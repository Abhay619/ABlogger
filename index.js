const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const {connectMongoDb} = require("./connect");
const cookieParser = require("cookie-parser");
const {checkForAuthenticationCookie} = require("./middlewares/authentication");
const Blog = require("./models/blog");

const app = express();

const PORT = 8001;

connectMongoDb("mongodb://127.0.0.1:27017/ABlogger");

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    return res.render("home",{
        user: req.user,
        blogs: allBlogs,
    });
});

app.use("/user",userRouter);
app.use("/blog",blogRouter);

app.listen(PORT, (e) => console.log(`Server is live at: ${PORT}`));