import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();

// ** Payment Gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAIN_TREE_MERCHANT_ID,
  publicKey: process.env.BRAIN_TREE_PUBLIC_KEY,
  privateKey: process.env.BRAIN_TREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    // getting data from non-fields for eg: text
    const {
      name,
      slug,
      description,
      price,
      category,
      quantity,
      shipping,
    } = req.fields;

    // to destructer file eg: images
    const { photo } = req.files;

    // * validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 10000000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be less then 1mb" });
    }

    // * create new product object
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    // validate: if photo is their then read the file and save it into DB
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    //save into DB
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in creating a product",
      error,
    });
  }
};

// get all products
export const getProductsController = async (req, res) => {
  try {
    // getting all product by slug withoud photo
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

//* get single products
export const getSingleProductController = async (req, res) => {
  try {
    // getting single product by slug withoud photo
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single products",
      error,
    });
  }
};

//* product photo products
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product && product.photo.data) {
      // setting the content type of the photo
      res.set("Content-Type", product.photo.contentType);
      // sending the photo
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting product photo",
      error,
    });
  }
};

// deleteProduct
export const deleteProductController = async (req, res) => {
  try {
    //getting product by id
    const product = await productModel
      .findByIdAndDelete(req.params.pid)
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};
//* update product
export const updateProductController = async (req, res) => {
  try {
    // getting data from non-fields for eg: text
    const {
      name,
      slug,
      description,
      price,
      category,
      quantity,
      shipping,
    } = req.fields;

    // to destructer file eg: images
    const { photo } = req.files;

    // * validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 10000000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be less then 1mb" });
    }

    // * create new product object by finding id from params and update the product
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    // validate: if photo is their then read the file and save it into DB
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    //save into DB
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update a product",
      error,
    });
  }
};

// * filter products controller
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    // gte = greater then equal to
    // lte =  less then equal to
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      message: "Filtered products",
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};

// * product Count Controller
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      message: "Total products",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting product count",
      error,
    });
  }
};

// * product list controller
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in per page controller",
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    // geting keyword from url params
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          //option i = case insensitive
          //regex = regular expression
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while searching products",
      error,
    });
  }
};

// related product controller
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    const products = await productModel
      .find({
        category: cid,
        // $ne = not included
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting the related products",
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting category wise proucts",
      error,
    });
  }
};

//**  braintree payment gateway api

//*token generate controller
export const braintreeTokenController = async (req, res) => {
  try {
    // * generate token from braintree
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//* braintree  payment controller
export const braintreePaymentController = async (req, res) => {
  try {
    // nonce-from-the-client = nonce from docs of braintree
    const { cart, nonce } = req.body;
    let total = 0;
    cart?.map((i) => {
      total += i?.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          // * save this result into DB
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user?._id, //getting user id from auth middleware requireSignin
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
