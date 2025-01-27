import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./EmployeManagement.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const EmployeeManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [User, setUser] = useState(); // User being edited
  const [updatedData, setUpdatedData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      if (!authData || !authData.token) {
        toast.error("Authentication token is missing. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:3000/api/users/showuser", {
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add token to the header
        },
      });
      console.log("Fetched users:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      if (!authData || !authData.token) {
        toast.error("Authentication token is missing. Please log in again.");
        return;
      }

      const response = await axios.delete(`http://localhost:3000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add token to the header
        },
      });

      console.log(response, "User deleted");
      if (response.status === 200) {
        toast.success("User deleted successfully");
        fetchUsers(); // Refresh user list after deletion
      } else {
        toast.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const handleEdit = (user) => {
    setUser(user);
    setUpdatedData({
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
    setShowEditModal(true);
  };
  
  const handleEditSubmit = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem('authData'));
      if (!authData || !authData.token) {
        toast.error("Authentication token is missing. Please log in again.");
        return;
      }
  
      const response = await axios.put(
        `http://localhost:3000/api/users/update/${User.Id}`, // Pass `userId` in the URL
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
  
      if (response.status === 200) {
        toast.success("User updated successfully");
      } else {
        toast.error("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-group">
          <button onClick={handleBack} className="back-button">
            <IoIosArrowBack />
          </button>
          <h3>Register Employee List</h3>
        </div>
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Verified User</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={user.isVerified}
                          readOnly
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="edit-button"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="delete-button"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit User</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={updatedData.username}
                onChange={handleInputChange}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={updatedData.email}
                onChange={handleInputChange}
              />
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={updatedData.phone}
                onChange={handleInputChange}
              />
              <div className="modal-actions">
                <button type="button" onClick={handleEditSubmit}>
                  Save
                </button>
                <button type="button" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeManagement;
