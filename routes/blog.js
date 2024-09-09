import express from "express";
import AuthController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import CategoryController from "../controllers/categoryController.js";
import multer from "multer";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/upload/');
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage:storage});

const router = express.Router();

router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);

//Protected Routes
router.get("/get/allblogs", checkIsUserAuthenticated, BlogController.getAllBlog);
router.post("/add/newblog", upload.single("thumbnail"), checkIsUserAuthenticated, BlogController.addNewBlog);
router.get("/get/blogs/:id", checkIsUserAuthenticated, BlogController.getSingleBlog);

router.get("/get/allcategory", checkIsUserAuthenticated, CategoryController.getCategories);
router.post("/add/category", checkIsUserAuthenticated, CategoryController.addNewCategory);

export default router;