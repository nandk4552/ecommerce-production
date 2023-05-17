import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import '../../styles/Auth.css'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {

    // state variable to handle the form data
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    //hook variable to navigate btw pages using useNavigate from react-route-dom
    const navigate = useNavigate();


    // function to handle the form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        //using try and catch block to handle the error without breaking the application        
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
                email, newPassword, answer
            });
            // if the response data is success then show alert using react toastify
            if (res && res.data.success) {

                //after success fully resetting passsword redirect to login page
                toast.success(res.data && res.data.message)
                navigate('/login');
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
        <Layout title={"Forgot Password | eCom"}>
            <div className="form-container ">
                <form onSubmit={handleSubmit}>
                    <h1 className='title'>Forgot Password</h1>
                    <div className="mb-3">
                        <input type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            required
                            placeholder='Enter Your Email' className="form-control" id="InputEmail" />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                            value={answer}
                            onChange={(e) => { setAnswer(e.target.value) }}
                            required
                            placeholder='Enter Your Favourite Food?' className="form-control" id="InputEmail" />
                    </div>
                    <div className="mb-3">
                        <input type="password"
                            value={newPassword}
                            onChange={(e) => { setNewPassword(e.target.value) }}
                            required
                            placeholder='Enter New Password' className="form-control" id="exampleInputPassword1" />
                    </div>

                    <button type="submit" className="btn btn-primary">Reset</button>

                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword
