import React, { useEffect, useState } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import Card from "../../components/Card";
import ImageCard from "../../components/ImageCard";
const Orders = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Orders | eCom"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All orders</h1>
            {orders?.map((order, index) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{order?.status}</td>
                        <td>{order?.buyer?.name}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>{order?.payment.success ? "Success" : "Failed"}</td>
                        <td>{order?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {order?.products &&
                      order?.products?.map((p) => (
                        <div className="row mb-2 card flex-row shadow-sm">
                          <div className="col-md-4 ">
                            <ImageCard
                              key={p?._id}
                              p={p}
                              style={{ width: "100px", height: "100px" }}
                            />
                          </div>
                          <div className="col-md-8 p-3">
                            <p>{p?.name}</p>
                            <p>{p?.description.substring(0, 30)}...</p>
                            <p>Price: ₹{p?.price} /-</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
