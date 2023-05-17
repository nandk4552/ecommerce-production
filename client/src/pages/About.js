import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
    return (
        <Layout title={"Abous Us | E-commerce Wala"} description={"this is abut page"}>
            <div className="row contactus container m-5 d-flex justify-content-center">
                <div className="col-md-6">
                    <img src="https://img.freepik.com/free-vector/forming-team-leadership-concept-illustration_114360-13973.jpg?size=626&ext=jpg&ga=GA1.2.2045289296.1682054579&semt=ais" alt="contactus-img"
                        className='img-fluid w-100'


                    />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center text-uppercase">about us</h1>
                    <p className="text-left mt-2">
                        Welcome to our ecommerce app! We're thrilled that you're interested in learning more about us. At EcommerceApp, we're dedicated to providing our customers with a seamless and enjoyable shopping experience. Here's a bit more about who we are and what we stand for.

                    </p>
                </div>
            </div>        </Layout> 
    )
}

export default About
