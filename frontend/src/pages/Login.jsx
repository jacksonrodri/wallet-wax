import React, { useState, useContext } from 'react';
import * as waxjs from '@waxio/waxjs/dist';
import axios from 'axios';

import AuthenticationContext from '../components/context/Authentication';

const Login = () => {
  const { authenticate } = useContext(AuthenticationContext);

  const [error, setError] = useState('');

  const loginHandler = async () => {
    const wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false);
    try {
      let uAccount = await wax.login();
      let pubKeys = wax.pubKeys;

      axios.post('/login').then((res) => {
        authenticate({
          userAccount: uAccount,
          publicKey: pubKeys[0],
          token: res.data.token,
        });
      });
    } catch (e) {
      setError('Failed to login, please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-6xl text-white uppercase">
          Welcome to NFT Story Cards
        </h1>
        <button
          onClick={loginHandler}
          className="mt-6 bg-secondary py-3 px-6 w-24 self-center rounded-md text-white uppercase"
        >
          Login
        </button>
        {error}
      </div>
    </div>
  );
};

export default Login;
