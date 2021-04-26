import React from 'react';

const assets = [
  {
    url: 'http://worksofnick.com/2018/11/16/the-cost-of-magic/',
    assetIds: '1099523918174,1099521783773',
    name: 'The cost of magic',
    image:
      'https://ipfs.atomichub.io/ipfs/QmaFe19mLD911BfZWn2tvEN7Ea8xjdirnQQRisUGGBzBPb',
  },
  {
    url: 'http://worksofnick.com/2018/01/19/the-sentinel-of-castle-margoron/',
    assetIds: '1099523919644,1099523919938',
    name: 'The sentinel of castle Margoron',
    image:
      'https://ipfs.atomichub.io/ipfs/QmcAZwySjb3MNtM9wA6oYuYg95KBEJ1iKyGYr7VDXxb82K',
  },
  {
    url: 'http://worksofnick.com/2017/09/01/choose-wisely/',
    assetIds: '1099520827921,1099523920440',
    name: 'Choose Wisely',
    image:
      'https://ipfs.atomichub.io/ipfs/QmTizf995JGRaWijyPRXPQsmiwxRyjJsLqQuE3MoniB4hs',
  },
  {
    url: 'http://worksofnick.com/2018/01/19/the-sentinel-of-castle-margoron/',
    assetIds: '1099523919644,1099523919938',
    name: 'The sentinel of castle Margoron',
    image:
      'https://ipfs.atomichub.io/ipfs/QmbFWnvdVXsu99FBo67adF4Rd7obut67Ue4PaU7xCE88TH',
  },
  {
    url: 'http://worksofnick.com/2018/11/16/the-cost-of-magic/',
    assetIds: '1099523918174,1099521783773',
    name: 'The cost of magic',
    image:
      'https://ipfs.atomichub.io/ipfs/QmVkw9vBdRXd7Y3qCty7m8bdxRNM9HGM5QRZyZfJ9mP1Hv',
  },
  {
    url: 'http://worksofnick.com/2017/09/01/choose-wisely/',
    assetIds: '1099520827921,1099523920440',
    name: 'Choose Wisely',
    image:
      'http://worksofnick.com/wp-content/uploads/2018/01/castle_sea_1516308535.jpg',
  },
];

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
        {assets.map((asset, index) => {
          return (
            <div className="rounded-lg  w-3/12 mx-14 mb-12 flex-initial">
              <img
                src={asset.image}
                alt=""
                className="rounded-t-xl w-full h-96"
              />
              <div className="h-16 bg-secondary rounded-b-xl text-white uppercase flex justify-center items-center">
                <p
                  className="hover:text-gray-300 cursor-pointer"
                  // onClick={() => setShowModal(true)}
                ></p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAssets;
