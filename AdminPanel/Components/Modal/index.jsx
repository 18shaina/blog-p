import React from 'react';
import './Modal.css';  // Import the modal's CSS file

const Modal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Modal Title</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button className="black" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;




// import React, { useState } from 'react';
// import Modal from './AdminPanel/';  // Import the Modal component
// import './App.css';  // Import the main CSS file

// const App = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="App">
//       <button className="blue" onClick={openModal}>Open Modal</button>
      
//       <Modal show={isModalOpen} onClose={closeModal}>
//         <h2>Welcome to the Modal</h2>
//         <p>This is a dark-themed modal example in React!</p>
//       </Modal>
//     </div>
//   );
// };

// export default App;
