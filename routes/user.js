const {Router} = require("express");
const userModel = require("../models/user")
const multer = require("multer");
const path = require("path");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images');
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName);
    }
  });

const upload = multer({ storage: storage });

router.get('/signup', (req, res) => {
    return res.render("signup");
})

router.get('/signin', (req, res) => {
    return res.render("signin");
})

router.post("/signup", upload.single("profileImageUrl"), async (req, res) => {
    const {fullName, email, password} = req.body;
    await userModel.create({
        fullName, 
        email,
        password,
        profileImageUrl: `/images/${req.file.filename}`,
    });

    return res.redirect("/");
})

router.post('/signin', async (req, res) => {
    const {email, password } = req.body;
    try {
        const token = await userModel.matchPasswordAndCreateToken(email, password);
        
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect Password or mail",
        });
    }
});

router.get('/logout', async (req, res) => {
    res.clearCookie("token").redirect("/");
})

module.exports = router;