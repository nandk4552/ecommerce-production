import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
  createCategoryController,
} from "../controller/createCategoryController.js";
// make router
const router = express.Router();

//* ROUTES

// ** Create Category
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

// ** Update Category based on id req.params
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//** Get All Category */
router.get("/get-category", categoryController);

//** Single Category based on id req.params */
router.get("/single-category/:slug", singleCategoryController);

//** Delete Category based on id req.params */
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
