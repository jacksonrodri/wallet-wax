import React from 'react';

const Modal = ({ children, show }) => {
  if (show) {
    return (
      <div className="fixed h-screen w-full bg-black bg-opacity-80 flex justify-center items-center z-20 top-0">
        <div className="bg-beige w-6/12 py-10 px-12 rounded-lg">{children}</div>
      </div>
    );
  } else return null;
};

export default Modal;
