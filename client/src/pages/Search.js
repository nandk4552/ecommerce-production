import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { Button } from "antd";
import Card from "../components/Card";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results?.length === 0   
              ? "No Products found"
              : `Found : ${values?.results?.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values.results && values?.results.map((p) => <Card key={p?._id} p={p} />)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
