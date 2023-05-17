import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import ProductImage from "../components/ProductImage";
import Card from "../components/Card";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  // get products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params?.slug}`
      );
      setProduct(data?.product);
      //this will run att initial time
      getSimilarProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };
  // initial render -> product
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // get similar products pid = product id and cid = category id
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {/* <h1>Product Details</h1>
      {JSON.stringify(product, null, 4)}; */}

      <div className="row container m-5">
        <div className="col-md-6">
          <div className="w-100 h-100 overflow-hidden ">
            {/* accesing photo dynamically */}
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
              className="scale-on-hover card-img-top  border-bottom img-responsive img object-fit-center"
              alt={product?.name}
              height={"300px"}
              width={"200px"}
            />
          </div>
        </div>
        <div className="col-md-6 text-center">
      <h1 className="text-center underline mt-4">Product Details</h1>
          <h4>Name: {product?.name}</h4>
          <h4>Description: {product?.description}</h4>
          <h4>Price: {product?.price}</h4>
          <h4>Category: {product?.category?.name}</h4>
          <Button type="primary" danger className="ms-1">
            Add to Cart
          </Button>
        </div>
      </div>
      <hr />
      <div className="row d-flex justify-content-center ">
        <h4 className="text-center">Similar products</h4>
        {relatedProducts.length < 1 && (
          <p className=" w-50 text-center alert alert-danger">
            No Similar products found
          </p>
        )}
        {/* {JSON.stringify(relatedProducts, null, 4)}  */}
          {relatedProducts &&
            relatedProducts?.map((p) => (
              <Card btnDisable={true} key={p._id} p={p} />
            ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
