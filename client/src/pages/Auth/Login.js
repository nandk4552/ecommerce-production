import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import '../../styles/Auth.css'
import toast from 'react-hot-toast';
import axios from 'axios'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from '../../context/auth';
// importing custom hook to use the context


const Register = () => {
    // state variable to handle the form data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //hook variable to navigate btw pages using useNavigate from react-route-dom
    const navigate = useNavigate();
    // for location
    const location = useLocation();

    //
    const [auth, setAuth] = useAuth();

    // function to handle the form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        //using try and catch block to handle the error without breaking the application        
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
                email, password,
            });
            // if the response data is success then show alert using react toastify
            if (res && res.data.success) {

                // save the data to the context user and token with auth state   adding object             
                setAuth({
                    //adding previous state to the new state    
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                // saving the token to the local storage to keep the user logged in in string format
                localStorage.setItem('auth', JSON.stringify(res.data));

                //after success fully logged in redirect to home page
                navigate(location.state || '/');
                toast.success(res.data && res.data.message)
            }
            else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout title={"Login | Ecommerce wala"}>
            <div className="form-container ">
                <form onSubmit={handleSubmit}>
                    <h1 className='title'>Login to eCom</h1>

                    <div className="mb-3">
                        <input type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            required
                            placeholder='Enter Your Email' className="form-control" id="InputEmail" />
                    </div>

                    <div className="mb-3">
                        <input type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            required
                            placeholder='Enter Your Password' className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-1">
                        <button type="button" className="btn btn-primary my-2"
                            onClick={() => { navigate('/forgot-password') }}
                        >Forgot Password</button>
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                    <div className="mt-3">
                        <span className="mr-2">Don't have an account yet?</span>
                        <Link to='/register' className='mx-2'>
                            Register
                        </Link>
                    </div>



                </form>
            </div>
        </Layout>
    )
}

export default Register
