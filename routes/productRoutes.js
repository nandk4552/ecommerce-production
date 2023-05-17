import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductsController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controller/productController.js";
import formidable from "express-formidable";
const router = express.Router();

// Routes
//** create product || POST request with signin as admin access */
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(), // calling the middleware to handle the files
  createProductController
);
//** update product || PUT request with signin as admin access */
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(), // calling the middleware to handle the files
  updateProductController
);
// ** get products || GET request
router.get("/get-product", getProductsController);

// ** single products || GET request
router.get("/get-product/:slug", getSingleProductController);

// ** get photo || GET request
router.get("/product-photo/:pid", productPhotoController);

// ** delete photo || DELETE request
router.delete("/delete-product/:pid", deleteProductController);

// ** filter products || POST request
router.post("/product-filter", productFilterController);

// ** product count || GET request
router.get("/product-count", productCountController);

// ** product per page || GET request
router.get("/product-list/:page", productListController);

// ** search product || GET request
router.get("/search/:keyword", searchProductController);

// ** similar / related products || GET request
router.get("/related-product/:pid/:cid", relatedProductController);


// ** category wise products || GET request
router.get("/product-category/:slug", productCategoryController);

// ** payments route
// token is coming from frontend
router.get('/braintree/token', braintreeTokenController);

//payment route
router.post('/braintree/payment',requireSignIn, braintreePaymentController)

export default router;
