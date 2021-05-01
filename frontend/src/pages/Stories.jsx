import React, { useState } from 'react';
import Modal from '../components/ui-elements/Modal';

const stories = [
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
      'https://ipfs.atomichub.io/ipfs/QmeUc3zvUR1vRP676Kuy1YZskWTX2Eusht3Z9NUo5k48ne/Common/Base%20Fronts/topps_series1_base_cin_brian_goodwin.jpg',
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

const Stories = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal show={showModal}>
        <h2 className="text-3xl text-primary uppercase text-center">
          The Cost Of Magic
        </h2>
        <div className="flex mt-8">
          <img
            src="https://ipfs.atomichub.io/ipfs/QmVkw9vBdRXd7Y3qCty7m8bdxRNM9HGM5QRZyZfJ9mP1Hv"
            className="w-3/12 h-60 rounded-lg"
            alt=""
          />
          <div className="flex flex-col items-center">
            <p className="flex-grow ml-8 tracking-wider leading-loose text-md text-justify">
              The wizard shook his head, thoughtful. He was not one of those
              wise, wizened, white-bearded wizards, but one of those younger,
              intense types, which were equal parts cunning, ambition, somber
              upbringing, and tragic mishap. He sat on the edge of the armchair,
              his voluminous robes....
            </p>
            <div className="flex items-center mt-8">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-6 w-6 mr-2 text-green-700"
              >
                <path
                  className="fill-current"
                  d="M437.019,74.98C388.667,26.629,324.38,0,256,0C187.619,0,123.332,26.629,74.98,74.98C26.629,123.332,0,187.62,0,256
			s26.629,132.667,74.98,181.019C123.332,485.371,187.62,512,256,512s132.667-26.629,181.019-74.98
			C485.371,388.667,512,324.38,512,256S485.371,123.333,437.019,74.98z M378.306,195.073L235.241,338.139
			c-2.929,2.929-6.768,4.393-10.606,4.393c-3.839,0-7.678-1.464-10.607-4.393l-80.334-80.333c-5.858-5.857-5.858-15.354,0-21.213
			c5.857-5.858,15.355-5.858,21.213,0l69.728,69.727l132.458-132.46c5.857-5.858,15.355-5.858,21.213,0
			C384.164,179.718,384.164,189.215,378.306,195.073z"
                />
              </svg>
              <p className="text-green-700 text-center">
                Wohoo, you are authorized to access this story.
              </p>
            </div>
            <button className="bg-primary py-4 px-10 mt-6 rounded-lg uppercase text-white focus:outline-none">
              Continue Reading Full Story
            </button>
            <p
              className="text-xs text-primary uppercase mt-4 cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </p>
          </div>
        </div>
      </Modal>
      <div className="mt-36">
        <div className="mx-36">
          <h2 className="text-5xl uppercase text-white text-center">
            Welcome to NFT Story Cards
          </h2>

          <div className="flex h-16 justify-end mt-28">
            <input
              type="text"
              placeholder="search for story"
              className="px-8 rounded-l-md shadow-lg w-96"
            />
            <button className="rounded-r-md bg-secondary text-white uppercase px-8 h-full shadow-lg focus:outline-none">
              Search
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center">
          {stories.map((story, index) => {
            return (
              <div className="rounded-lg  w-3/12 mx-14 mb-12 flex-initial relative">
                <div className="absolute w-full h-full rounded-xl hover:bg-black hover:bg-opacity-70 hover:opacity-100 opacity-0 cursor-pointer flex justify-center items-center">
                  <button
                    className="border-2 border-white rounded-xl uppercase text-white py-3 px-6 focus:outline-none"
                    onClick={() => setShowModal(true)}
                  >
                    View Story
                  </button>
                </div>
                <img
                  src={story.image}
                  alt=""
                  className="rounded-t-xl w-full h-96"
                />
                <div className="h-16 bg-secondary rounded-b-xl text-white uppercase flex justify-center items-center">
                  <p className="hover:text-gray-300">{story.name}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <button className="text-white uppercase text-center cursor-pointer bg-secondary rounded-lg px-6 py-3 focus:outline-none">
            View More
          </button>
        </div>
      </div>
    </>
  );
};

export default Stories;
