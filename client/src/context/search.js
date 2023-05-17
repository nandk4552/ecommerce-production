import { useState,  useContext, createContext } from "react";

// create a gloabal context for the user
const SearchContext = createContext();

// create a provider for the context
const SearchProvider = ({ children }) => {
  // state variable to store the user data
  const [auth, setAuth] = useState({
    keyword: "", // for search keyword
    result: [], // for search result
});

  return (
    // return the context provider with the state variable and the function to update the state variable
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};
// create a custom hook to use the context
const useSearch = () => {
  // return the context
  return useContext(SearchContext);
};

export { useSearch, SearchProvider };
