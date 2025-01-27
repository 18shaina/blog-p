import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './BlogManagement.css'


const BlogManagement = () => {
 
  const [data, setData] = useState([
   {id:1 ,title:"eduation", category:"education"},
   {id:2, title:"lifestyle",category:"lifestyle"}
  ]);
  const navigate = useNavigate();
   const HandleBack = () => {
    navigate(-1)
  }

  const handleEdit = (id) => {
    console.log(`Edit blog with ID: ${id}`);
    
  };

  const handleDelete = (id) => {
    console.log(`Delete blog with ID: ${id}`);
  
  };

  return (
    <>
      <div className="card">
          <div className='card-group'>
        <button onClick={HandleBack} className='back-button '> <IoIosArrowBack /></button>
          <h3> Blogs List</h3></div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Blog Title</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>
                      <button className="edit-button"onClick={() => handleEdit(item.id)}> Edit</button>
                      <button className="delete-button"onClick={() => handleDelete(item.id)}> Delete </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No blogs available...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BlogManagement;
