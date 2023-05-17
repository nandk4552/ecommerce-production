import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        // assigning object id of product model
        type: mongoose.ObjectId,
        ref: "Products", // with ref we are telling mongoose that we are referring to the Product model
      },
    ],
    payment: {},
    buyer: {
      // assigning object id of user model
      type: mongoose.ObjectId,
      ref: "users", // with ref we are telling mongoose that we are referring to the User model
    },
    status: {
      type: String,
      default: "Not Processed",
      // enum:["Not Processed", "Processing", "Dispatched", "Cancelled", "Completed"],
      enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Cancel"],
    },
  },
  { timeseries: true }
);

export default mongoose.model("Order", orderSchema);
