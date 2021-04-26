import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import 'tailwindcss/tailwind.css';

import AuthenticationContext from './components/context/Authentication';
import ModalContext from './components/context/Modal';

import Login from './pages/Login';
import Stories from './pages/Stories';
import MyAssets from './pages/MyAssets';

import DashboardLayout from './components/DashboardLayout';

const MyApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [userAccount, setUserAccount] = useState('');

  useEffect(() => {
    const uAccount = localStorage.getItem('userAccount');
    const pubKey = localStorage.getItem('publicKey');

    if (uAccount && pubKey) {
      setIsAuthenticated(true);
      setPublicKey(pubKey);
      setUserAccount(uAccount);
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
            authenticate: (data) => {
              setUserAccount(data.userAccount);
              setPublicKey(data.publicKey);
              setIsAuthenticated(true);
              localStorage.setItem('userAccount', data.userAccount);
              localStorage.setItem('publicKey', data.publicKey);
            },
            logout: () => {
              setIsAuthenticated(false);
              setPublicKey('');
              setUserAccount('');
              localStorage.removeItem('userAccount');
              localStorage.removeItem('publicKey');
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
                </Switch>
              </DashboardLayout>
            )}
          </div>
          <Redirect to={isAuthenticated ? '/' : '/login'} />
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
