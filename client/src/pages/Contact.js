import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi"
const Contact = () => {
    return (
        <Layout title={"ContactUs | E-commerce Wala"} description={"this is contact page"}>
            <div className="row contactus container m-5 d-flex justify-content-center">
                <div className="col-md-6">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/2.jpg" alt="contactus-img"
                        className='img-fluid w-100'


                    />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center text-uppercase">contact us</h1>
                    <p className="text-left mt-2">
                        any query and info about any product feel free to call anytime we are available 24X7 for you.
                    </p>
                    <p className="mt-3">
                        <BiMailSend /> : xyz@ecommerceapp
                    </p>
                    <p className="mt-3">
                        <BiPhoneCall /> : 0123456789
                    </p>
                    <p className="mt-3">
                        <BiSupport /> : 1800-0000-0000 (toll free)
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Contact
