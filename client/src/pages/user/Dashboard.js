import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {

    // eslint-disable-next-line no-unused-vars
    const [auth, setAuth] = useAuth()
    return (
        <Layout title={'Dashboard | eCom'}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h2 className='text-center text-decoration-underline mb-3'>User Details</h2>
                            <h4>User Name: <span className="text-secondary">{auth?.user?.name}</span></h4>
                            <h4>User Email: <span className="text-secondary">{auth?.user?.email}</span></h4>
                            <h4>User Contact: <span className="text-secondary">{auth?.user?.phone}</span></h4>

                        </div>
                    </div>

                </div>
            </div>
        </Layout>

    )
}

export default Dashboard
