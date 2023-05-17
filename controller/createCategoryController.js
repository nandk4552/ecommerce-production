import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
export const createCategoryController = async (req, res) => {
  try {
    //destructering from request body from UI
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    // if the category already exists return    success
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }
    // if the category does not exist create a new category and save into DB
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating category",
    });
  }
};

// * Update category

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    //  will get id from url
    const { id } = req.params;
    //  finding the category by id and updating it
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All category list",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all category",
    });
  }
};
// * To get a single category
export const singleCategoryController = async (req, res) => {
  try {
    // const { slug } = req.params;
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Got single category succefully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category",
    });
  }
};

//* To Delete a single category based on their id from req.params
export const deleteCategoryController = async (req, res) => {
  try {
    // destructuring the params to get the id 
    const { id } = req.params;
    await categoryModel.findByIdAndDelete({ _id:id });
    res.status(200).send({
      success: true,
      message: "Category Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};
