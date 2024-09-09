import categoryModel from "../models/categoryModel.js"

class CategoryController {
    static getCategories = async (req, res) => {
        try {
            const fetchAllCategory = await categoryModel.find({});
            return res.status(200).json(fetchAllCategory);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    };
    static addNewCategory = async (req, res) => {
        const {title} = req.body;
        try {
            if(title){
                const newCategory = new categoryModel({
                    title,
                });
                const savedCategory = await newCategory.save();
                if(savedCategory){
                    return res.status(201).json({message: "Category saved Successfull"});
                }
            }else{
                return res.status(400).json({message: "All Fields are required"});
            }
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    };
};

export default CategoryController;