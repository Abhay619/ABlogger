const {Router} = require("express");
const userModel = require("../models/user")

const router = Router();

router.get('/signup', (req, res) => {
    return res.render("signup");
})

router.get('/signin', (req, res) => {
    return res.render("signin");
})

router.post("/signup", async (req, res) => {
    const {fullName, email, password} = req.body;
    await userModel.create({
        fullName, 
        email,
        password,
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