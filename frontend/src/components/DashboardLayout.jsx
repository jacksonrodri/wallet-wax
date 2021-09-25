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
    <div className="-mb-20">
      <div className="shadow-xl">
        <div className="container mx-auto">
          <Header
            role={role}
            userAccount={userAccount}
            logout={logout}
          />
        </div>
      </div>
      <div className="py-16 md:py-24 lg:py-36">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
