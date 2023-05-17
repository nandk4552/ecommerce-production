import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Button, Checkbox, Radio, Spin } from "antd";
import { Prices } from "../components/Prices";
// importing custom hook to use the context
import { LoadingOutlined } from "@ant-design/icons";
import Card from "../components/Card";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]); // categories
  const [radio, setRadio] = useState([]); // prices
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1); // 1 page =  6 products
  const [loading, setLoading] = useState(false);

  //logic to filter products by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  // get all categories
  const getAllCategories = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotalProducts();
  }, []);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      // const { data } = await axios.get(
      //   `${process.env.REACT_APP_API}/api/v1/product/get-product`
      // );
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      // toast.error("Something went wrong in getting all products");
    }
  };

  //* get total count of products
  const getTotalProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //* load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (checked.length || radio.length) filtredProduct();
  }, [checked, radio]);
  //** Get filtered products
  const filtredProduct = async () => {
    try {
      const {
        data,
      } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filter`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout
      title={"Best Offers | E-commerce Wala"}
      description={"this is Home page"}
    >
      {/* <h1>HomePage</h1> */}
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      <div className="row mt-3 me-0">
        <div className="col-md-2">
          <h5 className="text-center">Filter By Category</h5>
          <div className="d-flex flex-column p-3 ">
            {/*  filter products by category */}
            {categories &&
              categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => {
                    handleFilter(e.target.checked, c._id);
                  }}
                >
                  {c.name}
                </Checkbox>
              ))}
          </div>
          <h5 className="text-center mt-4">Filter By Price </h5>
          <div className="d-flex flex-column p-3">
            {/*  filter products by prices */}
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <Button
              onClick={() => window.location.reload()}
              type="primary"
              className="ms-1 btn btn-sm btn-danger"
              danger
            >
              Reset Filters
            </Button>
          </div>
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(checked, null, 4)}
          {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All products</h1>
          <div className="d-flex flex-wrap">
            {products && products?.map((p) => <Card key={p._id} p={p} />)}
          </div>
          {/* onClick={() => enterLoading(0)}             */}

          <div className="m-2 p-3 d-flex justify-content-center">
            {products && products?.length < total && (
              <Button
                className="btn btn-warning"
                type="primary"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  <Spin indicator={<LoadingOutlined />} />
                ) : (
                  "Load More"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
