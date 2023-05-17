import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy | E-commerce Wala"} description={"this is policy page"}>
      <div className="row contactus container m-5 d-flex justify-content-center">
        <div className="col-md-6">
          <img src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7478.jpg?w=2000" alt="contactus-img"
            className='img-fluid w-100'
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center text-uppercase">Privacy Policy
          </h1>
          <h4 className='mt-2'>Introduction</h4>
          <p className="text-left mt-2">
            Our e-commerce app is committed to protecting the privacy of our customers. This Privacy Policy explains how we collect, use, disclose, and protect your personal information.

          </p>
          <h4 className='mt-2'>Collection of Personal Information</h4>
          <p>
            We collect personal information that you provide when you register an account, place an order, complete a survey, or contact our customer service. This information may include your name, email address, phone number, shipping and billing address, and payment information. We may also collect information about your device, including your IP address and browser type.
          </p>

        </div>
      </div>
    </Layout>
  )
}

export default Policy
