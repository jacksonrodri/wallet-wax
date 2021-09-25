import React from 'react';
import './Modal.css';

const Modal = ({ children, show }) => {
  if (show) {
    return (
      <div className="modal-content fixed h-screen w-full bg-black bg-opacity-80 flex justify-center items-center z-20 top-0 p-2">
        <div className="modal-body bg-beige py-10 px-12 rounded-lg">{children}</div>
      </div>
    );
  } else return null;
};

export default Modal;
