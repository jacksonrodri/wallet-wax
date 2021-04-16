import React, { useState, useEffect } from 'react';
import * as waxjs from '@waxio/waxjs/dist';
import 'tailwindcss/tailwind.css';
import axios from 'axios';

function Home() {
  const [userAccount, setUserAccount] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [error, setError] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [assetId, setAssetId] = useState('');
  const [ownerInfo, setOwnerInfo] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [nftsList, setNftsList] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    autoLogin();
  }, []);

  const autoLogin = async () => {
    const wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false);
    const isAutoLoginAvailable = await wax.isAutoLoginAvailable();
    if (isAutoLoginAvailable) {
      let uAccount = wax.userAccount;
      let pubKeys = wax.pubKeys;
      setError('');
      authenticate(uAccount, pubKeys[0]);
    } else {
      setError('You are not logged In.');
    }
  };

  const login = async () => {
    const wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false);
    try {
      let uAccount = await wax.login();
      let pubKeys = wax.pubKeys;

      authenticate(uAccount, pubKeys[0]);
    } catch (e) {
      setError('Failed to login, please try again.');
    }
  };

  const authenticate = async (username, publicKey) => {
    setPublicKey(publicKey);
    setUserAccount(username);
    setOwnerInfo(username);
    setToken('123');
    findAssets();
  };

  const findAssets = async (e) => {
    // e.preventDefault();
    axios
      .get(
        `https://wax.api.atomicassets.io/atomicassets/v1/schemas?authorized_account=${ownerName}&page=1&limit=10&order=desc&sort=created`
      )
      .then((response) => {
        const data = response.data.data;

        let arr = [];

        data.forEach((item) => {
          arr.push({
            image: 'https://ipfs.atomichub.io/ipfs/' + item.collection.img,
            ownedBy: item.collection.author,
          });
        });

        setNftsList(arr);
      });
  };

  return (
    <div className="w-full min-h-screen bg-primary flex">
      <div className="w-9/12 py-8 px-12 flex flex-col">
        <div className="mb-24 flex justify-between">
          <h1 className="text-white uppercase text-xl">NFT Story Cards</h1>
          {/* <form onSubmit={(e) => findAssets(e)}>
            <input
              placeholder="owner name"
              className="py-2 px-4 rounded-l-lg"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
            <button
              className="rounded-r-lg h-full px-6 text-white uppercase"
              style={{ backgroundColor: '#965937' }}
            >
              Find
            </button>
          </form> */}
        </div>
        <div className="flex justify-center">
          <div className="w-8/12 flex flex-col items-center">
            <h2 className="text-4xl text-white uppercase text-center">
              Welcome to Nft Story Cards
            </h2>

            {!token && (
              <p className="text-white mt-12">Please login to continue.</p>
            )}
            {token && (
              <div className="flex justify-center mt-12 flex-wrap">
                {nftsList.map((item) => (
                  <div
                    className="mx-3 mt-12 rounded-xl"
                    style={{
                      backgroundColor: '#965937',
                      border: '2px solid #965937',
                    }}
                  >
                    <img src={item.image} className="w-60 h-60 rounded-xl" />
                    <div className="p-5">
                      <div className="flex justify-between">
                        <h5 className="uppercase text-gray-200 text-xs">
                          owner
                        </h5>
                        <p className="text-xs uppercase text-green-300 text-secondary font-bold">
                          Authorized
                        </p>
                      </div>
                      <p className="text-lg text-white mt-2">{item.ownedBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-3/12 bg-secondary min-h-full p-8 flex items-center flex-col fixed right-0">
        {!token && (
          <>
            <button
              className="px-8 py-4 text-white rounded-md shadow-xl uppercase"
              style={{ backgroundColor: '#CD845B' }}
              onClick={() => login()}
            >
              Login with wax
            </button>
            <p className="text-white mt-8">You are not logged in!</p>
          </>
        )}

        {token && (
          <>
            <button
              onClick={() => {
                setOwnerInfo('');
                setUserAccount('');
                setPublicKey('');
                setToken('');
              }}
              style={{ backgroundColor: '#CD845B' }}
              className="px-8 py-4 text-white rounded-md shadow-xl uppercase mb-20"
            >
              Logout
            </button>
            <p className="text-white mb-8">
              <b>USER</b>: {userAccount}
            </p>
            <p className="text-white break-all">
              <b>PUBLIC KEY</b>: {publicKey}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
