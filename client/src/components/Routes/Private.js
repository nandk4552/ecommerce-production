import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth"
import { Outlet } from "react-router-dom"
import axios from 'axios'
import Spinner from "../Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth();

    //to get the auth
    useEffect(() => {
        const autoCheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }
        // checking if the user is logged in or not then call autoCheck() func
        if (auth?.token) autoCheck();
        //checking auth token is their or not
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner />
}
