import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";


const CreatCategory = () => {
  const [categories, setCategories] = useState("");
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  // handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data,
      } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        // after submitting the form then call the get all categories
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
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
      toast.error("Something went wrong in getting all categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {
        data,
      } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong in updating category");
    }
  };
  // delete category
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong in updating category");
    }
  };

  return (
    <Layout title={"Dashboard | Manage category"}>
      <div className="container-fluid  p-3">
        <div className="row m-3">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            <div className="w-75">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories &&
                    categories.map((c) => (
                      <>
                        <tr key={c._id}>
                          <td>{c.name}</td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                setVisible(true);
                                setSelected(c);
                                setUpdatedName(c.name);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger mx-2 btn-sm"
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreatCategory;
