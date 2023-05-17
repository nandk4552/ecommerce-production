import axios from "axios";
import React, { useState, useEffect } from "react";

function ProductImage({ productId }) {
  const [imageData, setImageData] = useState(null);

  const getProductImage = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/product-photo/${productId}`
    );
    setImageData(data);
  };
  useEffect(() => {
    getProductImage();
  }, [productId]);

  return imageData ? (
    <img
      src={imageData}
      className="scale-on-hover card-img-top border-bottom img-responsive img object-fit-center"
      alt="Product image"
      height={"300px"}
      width={"200px"}
    />
  ) : (
    <div>Loading image...</div>
  );
}

export default ProductImage;
