import React from "react";
import {
  Link
} from "react-router-dom";

export default function Navbar({ role, userAccount, logout }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between py-6 lg:py-10">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex lg:w-auto lg:static lg:block justify-end">
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fa fa-bars text-2xl"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none w-full items-center justify-between">
              <li className="nav-item">
                <Link
                  to="/"
                  className="px-3 py-2 flex items-center uppercase leading-snug text-white xl:text-2xl md:text-xl hover:opacity-75"
                  onClick={() => setNavbarOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/"
                  className="px-3 py-2 flex items-center uppercase leading-snug text-white xl:text-2xl md:text-xl hover:opacity-75"
                  onClick={() => setNavbarOpen(false)}
                >
                  My Assets
                </Link>
              </li>
              {role === 'admin' ||
                (role === 'super-admin' && (
                  <li className="nav-item">
                    <Link
                      to="new-story"
                      className="px-3 py-2 flex items-center uppercase leading-snug text-white xl:text-2xl md:text-xl hover:opacity-75"
                      onClick={() => setNavbarOpen(false)}
                    >Add Story</Link>
                  </li>
                ))}
              {role === 'admin' ||
                (role === 'super-admin' && (
                  <li className="nav-item">
                    <Link
                      to="/stories"
                      className="px-3 py-2 flex items-center uppercase leading-snug text-white xl:text-2xl md:text-xl hover:opacity-75"
                      onClick={() => setNavbarOpen(false)}
                    >Manage Stories</Link>
                  </li>
                ))}
              {role === 'super-admin' && (
                <li className="nav-item">
                  <Link
                    to="/manage-admins"
                    className="px-3 py-2 flex items-center uppercase leading-snug text-white xl:text-2xl md:text-xl hover:opacity-75"
                    onClick={() => setNavbarOpen(false)}
                  >Manage Admins</Link>
                </li>
              )}
              <li className="flex items-center">
                <p className="mr-4 text-white xl:text-2xl md:text-xl">{userAccount}</p>
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
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}