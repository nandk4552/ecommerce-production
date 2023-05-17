import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  // state variable to handle the form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // function to handle the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //using try and catch block to handle the error without breaking the application
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updateUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(`Profile Updated successfully...!`);
      }
    } catch (error) {   
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setEmail(email);
    setName(name);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  return (
    <Layout title={"Your Profile | eCom"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container ">
              <form onSubmit={handleSubmit}>
                <h1 className="title">User Profile</h1>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Enter Your Name"
                    className="form-control"
                    id="exampleInputName"
                    
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    disabled
                    placeholder="Enter Your Email"
                    className="form-control"
                    id="InputEmail"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    
                    placeholder="Enter Your Password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    
                    placeholder="Enter Your Phone"
                    className="form-control"
                    id="InputPhone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    placeholder="Enter Your Address"
                    className="form-control"
                    
                    id="InputAddress"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
