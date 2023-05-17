import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'
import '../styles/Pagenotfound.css'
const Pagenotfound = () => {
    return (
        <Layout title={" Go back | Page Not Found"} description={"this is 404 page"}>
            <div className="pnf">
                <h1 className="pnf-title mb-0">404</h1>
                <h2 className="pnf-heading">Oops! Page Not Found</h2>
                <Link
                    to='/'
                    className="pnf-btn"
                >
                    Go Back
                </Link>

            </div>

        </Layout>
    )
}

export default Pagenotfound
