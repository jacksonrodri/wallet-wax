import React, { useState, useEffect } from 'react';
import * as waxjs from '@waxio/waxjs/dist';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom';

const stories = [
  {
    url: 'http://worksofnick.com/2018/11/16/the-cost-of-magic/',
    assetIds: '1099523918174,1099521783773',
    name: 'The cost of magic',
  },
  {
    url: 'http://worksofnick.com/2018/01/19/the-sentinel-of-castle-margoron/',
    assetIds: '1099523919644,1099523919938',
    name: 'The sentinel of castle Margoron',
  },
  {
    url: 'http://worksofnick.com/2017/09/01/choose-wisely/',
    assetIds: '1099520827921,1099523920440',
    name: 'Choose Wisely',
  },
];

function Home() {
  const [userAccount, setUserAccount] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [error, setError] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [authorizationStatus, setAuthorizationStatus] = useState('');
  const [assetId, setAssetId] = useState('');
  const [ownerInfo, setOwnerInfo] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [nftsList, setNftsList] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    autoLogin();
  });

  const autoLogin = async () => {
    const wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false);
    const isAutoLoginAvailable = await wax.isAutoLoginAvailable();
    if (isAutoLoginAvailable) {
      let uAccount = wax.userAccount;
      let pubKeys = wax.pubKeys;
      setError('');

      console.log(error, authorized, assetId, ownerInfo);
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
    setOwnerName(username);
    setAuthorized(true);
    setAssetId('123');
    setToken('123');
    findAssets();
  };

  const findAssets = async (e) => {
    // const data = JSON.parse(e.target.value);

    let s = [];
    console.log('starting promise');
    // const a = await Promise.all(
    //   assets.map(async (asset) => {
    //     console.log('Getting data');
    //     const assetAuthorized = await handleAssetAuthorization(asset.assetIds);
    //     console.log('End Getting data');
    //     if (assetAuthorized) {
    //       s.push(asset.story);
    //     }
    //   })
    // );

    console.log('ending promise');
    if (s.length === 0) {
      setAuthorizationStatus('not_authorized');
    }
    // setStories(stories);
  };

  const handleAssetAuthorization = async (assetIds) => {
    await axios
      .get(
        `https://wax.api.atomicassets.io/atomicassets/v1/assets?authorized_account=${ownerName}&ids=${assetIds}&page=1&limit=100&order=desc&sort=asset_id`
      )
      .then((response) => {
        const data = response.data.data;

        if (data.length > 0) {
          // setStory(data.story);

          return true;
        } else {
          // setAuthorizationStatus('not_authorized');
          return false;
        }
      });
  };

  const authorizeStory = async (assetIds, url) => {
    await axios
      .get(
        `https://wax.api.atomicassets.io/atomicassets/v1/assets?authorized_account=${ownerName}&ids=${assetIds}&page=1&limit=100&order=desc&sort=asset_id`
      )
      .then((response) => {
        const data = response.data.data;

        if (data.length > 0) {
          // setStory(data.story);
          window.open(url, '_blank');
        } else {
          // setAuthorizationStatus('not_authorized');
          // return false;
          alert('You are not authorized to view that story.');
        }
      });
  };

  return (
    <div className="w-full min-h-screen bg-primary flex">
      <div className="w-9/12 py-8 px-12 flex flex-col">
        <div className="mb-24 flex justify-between">
          <h1 className="text-white uppercase text-xl">NFT Story Cards</h1>
          <form onSubmit={findAssets}>
            {/* <input
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
            </button> */}

            {/* <select onChange={(e) => findAssets(e)}>
              {assets.map((asset) => {
                return (
                  <option
                    value={JSON.stringify({
                      ids: asset.assetIds,
                      story: asset.story,
                    })}
                  >
                    {asset.assetIds}
                  </option>
                );
              })}
            </select> */}
          </form>
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
              <p className="text-white mt-6">
                Please select a story to continue.
              </p>
            )}
            {/* {token && (
              <div className="flex justify-center mt-12 flex-wrap">
                {nftsList.map((item) => (
                  <div
                    className="mx-3 mt-12 rounded-xl"
                    style={{
                      backgroundColor: '#965937',
                      border: '2px solid #965937',
                    }}
                  >
                    <img
                      src={item.image}
                      className="w-60 h-60 rounded-xl"
                      alt=""
                    />
                    <div className="p-5">
                      <div className="flex justify-between">
                        <h5 className="uppercase text-gray-200 text-xs">
                          owner
                        </h5>
                        <p className="text-xs uppercase text-secondary font-bold">
                          Authorized
                        </p>
                      </div>
                      <p className="text-lg text-white mt-2">{item.ownedBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            )} */}

            {/* {authorizationStatus === 'not_authorized' && (
              <p className="text-white mt-12">
                Sorry, you're not authorized to view any stories.
              </p>
            )} */}
            {token &&
              stories.map((story) => {
                return (
                  <p
                    className="mt-24 cursor-pointer text-2xl uppercase"
                    style={{ color: '#CD845B' }}
                    onClick={() => authorizeStory(story.assetIds, story.url)}
                  >
                    {story.name}
                  </p>
                );
              })}
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
