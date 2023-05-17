import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../src/context/cart";
import { toast } from "react-hot-toast";
import ImageCard from "./ImageCard";
const Card = ({ p, btnDisable }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  return (
    <div
      className="card m-2 shadow-sm scale-container"
      style={{ width: "18rem" }}
    >
      <ImageCard p={p} />
      <div className="card-body">
        <h5 className="card-title">{p?.name}</h5>
        <p className="card-text">{p?.description.substring(0, 30)}...</p>
        <p className="card-text">₹{p?.price} /-</p>
        <Button
          onClick={() => navigate(`/product/${p?.slug}`)}
          type="primary"
          className={`${btnDisable ? "d-none" : "ms-1"}`}
        >
          More Details
        </Button>
        <Button
          type="primary"
          danger
          className="ms-1"
          onClick={() => {
            setCart([...cart, p]);
            localStorage.setItem("cart", JSON.stringify([...cart, p]));
            toast.success(`${p?.name} added to cart`);
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Card;
