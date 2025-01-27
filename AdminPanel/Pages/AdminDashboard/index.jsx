import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {

  const navigate = useNavigate();
  const [role, setRole] = useState('Admin');

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard">
      <h2> WELCOME! Admin Dashboard</h2>
      <div className="dashboard-sections">
        <div className="section">
          <h3>User Mangement</h3>
          <button onClick={() => handleNavigation('/UserManagement')} className="manage-button">
            Manage Users
          </button>
        </div>

        <div className="section">
          <h3>Employee Management</h3>
          <button onClick={() => handleNavigation('/EmployeeManagement')} className="manage-button">
            Manage Employees
          </button>


        </div>

        <div className="section">
          <h3>Blog Management</h3>
          <div>
            <button onClick={() => handleNavigation('/BlogManagement')} className="manage-button">
              Manage Blogs
            </button></div> </div>

        <div>
          <button className="manage-button" onClick={() => {
            localStorage.clear()
            navigate('/blog')
          }}>Logout</button></div>
        <p>
          {role === "Admin" && <Link to="/reset-password"> reset password </Link>}
        </p>
      </div>
    </div>

  );
};

export default AdminDashboard;
