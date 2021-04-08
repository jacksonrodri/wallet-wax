import React, { useEffect, useState } from 'react';
import * as waxjs from '@waxio/waxjs/dist';
import 'tailwindcss/tailwind.css';
import axios from 'axios';

function App() {
  const [userAccount, setUserAccount] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [error, setError] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [assetId, setAssetId] = useState('');
  useEffect(() => {
    autoLogin();
  }, []);

  const autoLogin = async () => {
    const wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false);
    const isAutoLoginAvailable = await wax.isAutoLoginAvailable();
    if (isAutoLoginAvailable) {
      let uAccount = wax.userAccount;
      let pubKeys = wax.pubKeys;
      setPublicKey(pubKeys[0]);
      setUserAccount(uAccount);
      setError('');
    } else {
      setError('You are not logged In.');
    }
  };

  const login = async () => {
    const wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false);
    try {
      let uAccount = await wax.login();
      let pubKeys = wax.pubKeys;
      setPublicKey(pubKeys[0]);
      setUserAccount(uAccount);
    } catch (e) {
      setError('Failed to login, please try again.');
    }
  };

  const authorize = async () => {
    axios
      .get(
        `https://test.wax.api.atomicassets.io/atomicassets/v1/assets/${assetId}`
      )
      .then((response) => {
        const data = response.data.data;

        console.log(data);
        const { authorized_accounts } = data.collection;
        for (let i = 0; i < authorized_accounts.length; i++) {
          if (authorized_accounts[i] === 'uAccount') {
            setAuthorized(true);
          }
        }

        if (!authorized) {
          alert("You're not authorized for this asset.");
        }
      })
      .catch((err) => {
        console.log('This asset does not exist!');
        alert('This asset does not exist');
      });
  };

  // const fetchAssets = () => {};
  return (
    <div className="h-screen bg-primary flex flex-col items-center justify-center">
      <h1 className="text-center text-6xl text-hover mb-20 uppercase">
        NFT Story Cards
      </h1>

      <div className="text-white text-center text-lg mb-12">
        {publicKey && <p className="mb-4">PUBLIC KEY: {publicKey}</p>}
        {userAccount && <p>USER ACCOUNT: {userAccount}</p>}
      </div>

      {!publicKey && (
        <button
          onClick={() => login()}
          className="w-64 bg-secondary rounded-xl h-12 hover:bg-hover uppercase text-primary text-xl shadow-xl"
        >
          Login
        </button>
      )}
      {publicKey && (
        <>
          <input
            type="text"
            placeholder="Enter asset id."
            onChange={(e) => setAssetId(e.target.value)}
            value={assetId}
            className="p-3 rounded-lg mb-8"
          />
          <button
            onClick={() => authorize()}
            className="w-64 bg-secondary rounded-xl h-12 hover:bg-hover uppercase text-primary text-xl shadow-xl"
          >
            Authenticate
          </button>

          {authorized && <p>You are authorized for that asset.</p>}
        </>
      )}

      {error && <p className="mt-12 text-lg text-white">{error}</p>}
    </div>
  );
}

export default App;
