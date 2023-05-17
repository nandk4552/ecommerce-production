import React from 'react'
import Layout from "../../components/Layout/Layout"
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3 mt-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 mt-3">
            <div className="card w-75 p-3">
              <h2 className='text-center text-decoration-underline mb-3'>Admin Details</h2>
              <h3>Admin Name: <span className="text-secondary">{auth?.user?.name}</span></h3>
              <h3>Admin Email: <span className="text-secondary">{auth?.user?.email}</span></h3>
              <h3>Admin Contact: <span className="text-secondary">{auth?.user?.phone}</span></h3>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default AdminDashboard
