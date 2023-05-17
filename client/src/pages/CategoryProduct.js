import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  // get products by category

useEffect(() => {

 if(params?.slug) getProductsByCategory();

}, [category])


  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params?.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container my-5">
        <h4 className="text-center"> Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found</h6>
        <div className="d-flex flex-wrap">
            {products && products?.map((p) => <Card key={p._id} p={p} />)}
          </div>
</div>
    </Layout>
  );
};

export default CategoryProduct;
