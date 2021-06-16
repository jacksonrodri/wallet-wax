import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import AuthenticationContext from './context/Authentication';

const DashboardLayout = ({ children, role }) => {
  const { userAccount, logout } = useContext(AuthenticationContext);
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="pb-36 -mb-20">
      <div className="px-36 shadow-xl">
        <div className="flex justify-between py-10 items-center">
          <nav>
            <ul className="flex uppercase text-white text-2xl">
              <li
                className={`mr-40 cursor-pointer ${
                  location.pathname === '/' && 'border-b border-white'
                }`}
                onClick={() => history.push('/')}
              >
                Home
              </li>
              <li
                onClick={() => history.push('/assets')}
                className={`mr-40 cursor-pointer ${
                  location.pathname === '/assets' && 'border-b border-white'
                }`}
              >
                My Assets
              </li>
              {role === 'admin' ||
                (role === 'super-admin' && (
                  <li
                    onClick={() => history.push('/new-story')}
                    className={`mr-40 cursor-pointer ${
                      location.pathname === '/new-story' &&
                      'border-b border-white'
                    }`}
                  >
                    Add Story
                  </li>
                ))}
              {role === 'admin' ||
                (role === 'super-admin' && (
                  <li
                    onClick={() => history.push('/stories')}
                    className={`cursor-pointer ${
                      location.pathname === '/stories' &&
                      'border-b border-white'
                    }`}
                  >
                    Manage Stories
                  </li>
                ))}
              {role === 'super-admin' && (
                <li
                  onClick={() => history.push('/manage-admins')}
                  className={`ml-40 cursor-pointer ${
                    location.pathname === '/manage-admins' &&
                    'border-b border-white'
                  }`}
                >
                  Manage Admins
                </li>
              )}
            </ul>
          </nav>
          <div className="flex items-center">
            <p className="mr-4 text-white text-2xl">{userAccount}</p>
            <div
              className="w-12 h-12 rounded-full bg-secondary flex justify-center items-center cursor-pointer"
              onClick={() => logout()}
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24.303 24.303"
                className="w-6/12 text-white"
              >
                <path
                  className="fill-current"
                  d="M10.269,11.298V1.883C10.269,0.844,11.113,0,12.152,0s1.883,0.844,1.883,1.883v9.415
		c0,1.039-0.844,1.883-1.883,1.883S10.269,12.337,10.269,11.298z M19.616,2.761c-0.61-0.483-1.5-0.377-1.983,0.234
		c-0.483,0.612-0.378,1.5,0.234,1.984c2.24,1.767,3.524,4.413,3.524,7.261c0,5.094-4.145,9.239-9.238,9.239
		c-5.094,0-9.239-4.145-9.239-9.239c0-2.847,1.283-5.492,3.521-7.258c0.612-0.483,0.717-1.371,0.234-1.984
		c-0.483-0.612-1.37-0.716-1.984-0.234C1.764,5.069,0.089,8.523,0.089,12.24c0,6.652,5.412,12.063,12.063,12.063
		s12.063-5.412,12.063-12.063C24.215,8.521,22.538,5.067,19.616,2.761z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
