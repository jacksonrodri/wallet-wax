import React from 'react';

const MyAssets = () => {
  return (
    <div className="mt-36">
      <div className="mx-36">
        <h2 className="text-5xl uppercase text-white text-center">
          Your assets
        </h2>

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
      </div>

      <div className="mt-12 flex flex-wrap justify-center">
        {assets.map((story, index) => {
          return (
            <div className="rounded-lg  w-3/12 mx-14 mb-12 flex-initial">
              <img
                src="http://placehold.it/500/300"
                alt=""
                className="rounded-t-xl w-full"
              />
              <div className="h-16 bg-secondary rounded-b-xl text-white uppercase flex justify-center items-center">
                <p className="hover:text-gray-300 cursor-pointer">View Story</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const assets = [1, 1, 1, 1, 1];

export default MyAssets;
