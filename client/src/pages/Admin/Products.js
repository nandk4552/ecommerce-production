import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProducts = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in Products");
    }
  };
  // lifecylce method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard | Manage Products"}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10">
            <h1 className="text-center">All products list</h1>
            <div className="d-flex flex-wrap" >
              {products &&
                products?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="text-dark text-decoration-none "
                  >
                    <div className="card m-2 scale-container" style={{ width: "18rem" }}>
                      {/* accesing photo dynamically */}
                      <div className="w-100 h-100 overflow-hidden">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          className="scale-on-hover card-img-top border-bottom img-responsive img object-fit-center"
                          alt={p.name}
                          height={"200px"}
                          width={"300px"}
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      {/* </div> */}
    </Layout>
  );
};

export default Products;
