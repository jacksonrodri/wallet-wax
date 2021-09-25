import React, { useContext, useEffect } from 'react';
import {
  useHistory,
  useLocation,
  Link
} from 'react-router-dom';
import Header from './header';
import AuthenticationContext from './context/Authentication';

const DashboardLayout = ({ children, role }) => {
  const { userAccount, logout } = useContext(AuthenticationContext);
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="pb-36 -mb-20">
      <div className="shadow-xl">
        <div className="container mx-auto">
          <Header
            role={role}
            userAccount={userAccount}
            logout={logout}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
