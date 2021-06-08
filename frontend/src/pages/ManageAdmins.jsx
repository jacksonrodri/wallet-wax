import React, { useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import axios from 'axios';

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [username, setUsername] = useState('');
  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = () => {
    axios.get('/super-admin/all-admins').then((response) => {
      setAdmins(response.data);
    });
  };

  const deleteAdmin = (storyId) => {
    axios.delete(`/super-admin/delete-admin/${storyId}`).then(() => {
      alert('Admin deleted successfully');
      getAdmins();
    });
  };

  const addAdmin = () => {
    axios.post('/super-admin/add-admin', { username }).then(() => {
      alert('Admin added successfully');
      setUsername('');
      getAdmins();
    });
  };

  return (
    <div className="mt-24 w-6/12 mx-auto text-white text-2xl pb-10">
      <div className="flex h-16 justify-end mt-28 mb-12">
        <input
          type="text"
          placeholder="username to add as admin..."
          className="px-8 rounded-l-md shadow-lg w-96 text-black"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button
          className="rounded-r-md bg-secondary text-white uppercase px-8 h-full shadow-lg focus:outline-none"
          onClick={() => addAdmin()}
        >
          Add
        </button>
      </div>
      {admins.map((admin, key) => {
        return (
          <div className="h-20 bg-secondary mb-8 rounded-xl flex items-center px-8 shadow-xl">
            <div className="flex items-center flex-grow">{admin.username}</div>
            <div className="flex items-center">
              <RiDeleteBin7Fill
                className="cursor-pointer hover:text-red-400"
                onClick={() => deleteAdmin(admin._id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ManageAdmins;
