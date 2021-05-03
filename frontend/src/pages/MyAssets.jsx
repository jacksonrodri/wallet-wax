import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MyAssets = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    axios.get('/assets').then((response) => {
      setAssets(response.data);
    });
  }, []);
  return (
    <div className="mt-36">
      <div className="mx-36">
        <h2 className="text-5xl uppercase text-white text-center">
          Your assets
        </h2>
        {assets.length > 0 && (
          <div className="flex h-16 justify-end mt-28">
            <input
              type="text"
              placeholder="search for asset"
              className="px-8 rounded-l-md shadow-lg w-96"
            />
            <button className="rounded-r-md bg-secondary text-white uppercase px-8 h-full shadow-lg focus:outline-none">
              Search
            </button>
          </div>
        )}
      </div>

      <div className="mt-12 flex flex-wrap justify-center">
        {assets.map((asset, index) => {
          return (
            <div className="rounded-lg  w-3/12 mx-14 mb-12 flex-initial">
              <img
                src={'https://ipfs.atomichub.io/ipfs/' + asset.AssetImage}
                alt=""
                className="rounded-t-xl w-full h-96"
              />
              <div className="h-16 bg-secondary rounded-b-xl text-white uppercase flex justify-center items-center">
                <p
                  className="hover:text-gray-300 cursor-pointer"
                  // onClick={() => setShowModal(true)}
                >
                  {asset.AssetName}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        {assets.length < 1 && (
          <p className="text-2xl text-white">
            Sorry, you do not have any assets.
          </p>
        )}
        {assets.length > 0 && (
          <button className="text-white uppercase text-center cursor-pointer bg-secondary rounded-lg px-6 py-3 focus:outline-none">
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default MyAssets;
