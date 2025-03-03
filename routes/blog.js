const {Router} = require("express");
const multer = require("multer");
const path = require("path");
const blogModel = require("../models/blog");
const commentModel = require("../models/comments");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()} - ${file.originalname}`
      cb(null, fileName);
    }
  });
  
  const upload = multer({ storage: storage });

router.get('/add-new', (req, res) => {
    return res.render("add-blog", {
        user: req.user,
    });
});
router.post('/', upload.single("coverImage"), async (req, res) => {
    const {title, body} = req.body;
    try {
        const blog = await blogModel.create({
            title,
            body,
            createdBy: req.user._id,
            coverImageURL: `/uploads/${req.file.filename}`
        });
        return res.redirect(`/blog/${blog._id}`);   
    } catch (error) {
        console.log(error);
    }
    
});
router.get("/:id", async (req, res) => {
    const blog = await blogModel.findById(req.params.id).populate("createdBy");
    const comments = await commentModel.find({blogId: req.params.id}).populate("createdBy");
    return res.render("blog", {
        user: req.user,
        blog,
        comments, 
    });
});

router.get("/delete/:id", async (req, res) => {
    try {
        await blogModel.deleteOne({_id: req.params.id,});
        return res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});

router.post("/comment/:blogId", async (req,res) => {
    try {
        await commentModel.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id,
        });
    
        return res.redirect(`/blog/${req.params.blogId}`);
        
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;