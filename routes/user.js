const {Router} = require("express");
const userModel = require("../models/user")

const router = Router();

router.get('/signup', (req, res) => {
    return res.render("signup");
})

router.get('/signin', (req, res) => {
    return res.render("signin");
})
router.post('/signup', async (req, res) => {
    const {fullName, email, password} = req.body;
    await userModel.create({
        fullName, 
        email,
        password,
    });

    return res.redirect("/");
})

router.post('/signin', (req, res) => {
    return res.render("signup");
})

module.exports = router;