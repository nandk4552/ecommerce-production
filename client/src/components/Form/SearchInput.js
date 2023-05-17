import React from "react";
import { Button, Form, Input } from "antd";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (values, e) => {
    // Add "values" as a parameter
    try {
      e.preventDefault(); // Move the preventDefault call inside the function
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate(`/search/`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setValues({ ...values, keyword: e.target.value });
  };

  return (
    <Form className="mx-auto" onFinish={handleSubmit} initialValues={{ remember: true }}>
      <Form.Item className="m-0 d-flex align-items-center justify-content-center">
        <Search
          placeholder="search products"
          allowClear
          enterButton={
            <Button
              type="primary"
              size="large"
              className="search-button"
              icon={<SearchOutlined />}
           />
          }
          size="large"
          value={values.keyword}
          onChange={handleInputChange}
          onSearch={(value, e) => handleSubmit(values, e)} // Call the handleSubmit function here
        />
      </Form.Item>
    </Form>
  );
};

export default SearchInput;
