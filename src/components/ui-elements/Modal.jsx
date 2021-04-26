import React from 'react';

const Modal = ({ children, show }) => {
  if (show) {
    return (
      <div className="absolute h-screen w-full bg-black bg-opacity-80 top-0 flex justify-center items-center">
        <div className="bg-beige w-6/12 py-10 px-12 rounded-lg">{children}</div>
      </div>
    );
  } else return null;
};

export default Modal;
