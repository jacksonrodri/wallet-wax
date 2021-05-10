import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import dotenv from 'dotenv';

import AuthenticationContext from './components/context/Authentication';
import ModalContext from './components/context/Modal';

import Login from './pages/Login';
import Stories from './pages/Stories';
import MyAssets from './pages/MyAssets';
import FullStory from './pages/FullStory';
import AddStory from './pages/AddStory';

import DashboardLayout from './components/DashboardLayout';
import AdminStories from './pages/AdminStories';

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  (request) => {
    console.log(request);
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

const MyApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [userAccount, setUserAccount] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const uAccount = localStorage.getItem('userAccount');
    const pubKey = localStorage.getItem('publicKey');
    const token = localStorage.getItem('token');

    if (uAccount && pubKey && token) {
      setToken(token);
      setIsAuthenticated(true);
      setPublicKey(pubKey);
      setUserAccount(uAccount);
      axios.defaults.headers.common['Authorization'] = token;
      axios.interceptors.response.use(
        (response) => {
          console.log(response);
          return response;
        },
        (error) => {
          console.log(error);
          return Promise.reject(error);
        }
      );
    }
  }, []);

  return (
    <>
      <Router>
        <AuthenticationContext.Provider
          value={{
            isAuthenticated,
            userAccount,
            publicKey,
            token,
            authenticate: (data) => {
              setUserAccount(data.userAccount);
              setPublicKey(data.publicKey);
              setToken(data.token);
              setIsAuthenticated(true);
              localStorage.setItem('token', data.token);
              localStorage.setItem('userAccount', data.userAccount);
              localStorage.setItem('publicKey', data.publicKey);
              axios.defaults.headers.common['Authorization'] = data.token;
              axios.interceptors.response.use(
                (response) => {
                  console.log(response);
                  return response;
                },
                (error) => {
                  console.log(error);
                  return Promise.reject(error);
                }
              );
            },
            logout: () => {
              setIsAuthenticated(false);
              setPublicKey('');
              setUserAccount('');
              setToken('');
              localStorage.removeItem('userAccount');
              localStorage.removeItem('publicKey');
              localStorage.removeItem('token');
            },
          }}
        >
          <div className="min-h-screen bg-primary">
            {!isAuthenticated && (
              <Route component={Login} path="/login" exact />
            )}
            {isAuthenticated && (
              <DashboardLayout>
                <Switch>
                  <Route component={Stories} path="/" exact />
                  <Route component={MyAssets} path="/assets" exact />
                  <Route component={FullStory} path="/story/:id" exact />
                  <Route component={AddStory} path="/new-story" exact />
                  <Route component={AdminStories} path="/stories" exact />
                </Switch>
              </DashboardLayout>
            )}
          </div>
          {/* <Redirect to={isAuthenticated ? '/' : '/login'} /> */}
        </AuthenticationContext.Provider>
      </Router>
    </>
  );
};

ReactDOM.render(
  <ModalContext.Provider>
    <MyApp />
  </ModalContext.Provider>,
  document.getElementById('root')
);
