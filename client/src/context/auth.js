import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios'


// create a gloabal context for the user
const AuthContext = createContext();

// create a provider for the context
const AuthProvider = ({ children }) => {
    // state variable to store the user data
    const [auth, setAuth] = useState({
        user: null,// user data
        token: '',// token
    })
    //default axios properties
    axios.defaults.headers.common['Authorization'] = auth?.token;

    // useEffect to check if the user is logged in or not and update the state variable auth
    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            // parse the data to convert string to object
            const parseData = JSON.parse(data);
            // update the global state variable
            setAuth({
                //adding previous state to the new state
                ...auth,
                // adding the user data and token to the state variable
                user: parseData.user,
                token: parseData.token,
            });
        }
        //eslint-disable-next-line
    }, [])



    return (
        // return the context provider with the state variable and the function to update the state variable
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
// create a custom hook to use the context
const useAuth = () => {
    // return the context
    return useContext(AuthContext);
}

export { useAuth, AuthProvider }




