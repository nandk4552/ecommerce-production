import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
const Spinner = () => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    // to get the location of the page
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => --prev);
        }, 1000)
        // if the count is 0 then redirect to login page additionally with the location of the page
        count === 0 && navigate('/login', {
            state: location.pathname
        })
        return () => clearInterval(interval)
    }, [count, navigate, location])


    return (
        <>
            <div className="d-flex 
flex-column
justify-content-center align-items-center " style={{ minHeight: "100vh" }}>


                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <h3 className="text-center  my-5">redirecting in {count} seconds</h3>
            </div>
        </>
    )
}

export default Spinner
