import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import '../../styles/Auth.css'
import toast from 'react-hot-toast';
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
    // state variable to handle the form data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    //hook variable to navigate btw pages using useNavigate from react-route-dom
    const navigate = useNavigate();

    // function to handle the form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        //using try and catch block to handle the error without breaking the application        
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address, answer });
            // if the response data is success then show alert using react toastify
            if (res && res.data.success) {

                toast.success(res.data && res.data.message)
                //after success fully logged in redirect to login page
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // 2 second delay
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
        <Layout title={"Register | Ecommerce wala"}>
            <div className="form-container ">
                <form onSubmit={handleSubmit}>
                    <h1 className='title'>Register With eCom</h1>
                    <div className="mb-3">
                        <input type="text"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            placeholder='Enter Your Name' className="form-control" id="exampleInputName"
                            required
                        />
                    </div>
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
                    <div className="mb-3">
                        <input type="text"
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                            required
                            placeholder='Enter Your Phone'
                            className="form-control"
                            id="InputPhone" />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                            value={address}
                            onChange={(e) => { setAddress(e.target.value) }}
                            placeholder='Enter Your Address'
                            className="form-control"
                            required

                            id="InputAddress"
                        />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                            value={answer}
                            onChange={(e) => { setAnswer(e.target.value) }}
                            placeholder='What is your favourite food?'
                            className="form-control"
                            required
                            id="InputAnswer"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <p className='mt-2'>
                        If you already have an account?
                        <Link to='/login' className='mx-2'>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </Layout>
    )
}

export default Register
