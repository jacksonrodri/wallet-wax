import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Modal from '../components/ui-elements/Modal';

const Stories = () => {
  const { push } = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [stories, setStories] = useState([]);
  const [authorization, setAuthorization] = useState(false);
  const [selectedStory, setSelectedStory] = useState({});
  const [deniedAssets, setDeniedAssets] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('/stories').then((response) => {
      setStories(response.data);
    });
  }, []);

  const handleStorySelect = async (story) => {
    setSelectedStory(story);
    await axios
      .get('/story/' + story._id)
      .then(() => {
        setAuthorization(true);
        setShowModal(true);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          setDeniedAssets(err.response.data.deniedAssets);
          setAuthorization(false);
          setShowModal(true);
        } else if (err.response.status == 500) {
          alert('Atomic hub API service is down.');
        }
      });
  };

  const searchHandler = () => {
    axios.get(`/search/story?query=${searchQuery}`).then((response) => {
      setStories(response.data);
    });
  };

  return (
    <>
      <Modal show={showModal}>
        <h2 className="text-3xl text-primary uppercase text-center">
          {/* The Cost Of Magic */}
          {selectedStory.name || ''}
        </h2>
        <div className="flex mt-8">
          <img
            src={
              process.env.REACT_APP_API_URL + '/uploads/' + selectedStory.image
            }
            className="w-3/12 h-60 rounded-lg"
            alt=""
          />
          <div className="flex flex-col items-center flex-grow">
            <p className="flex-grow ml-8 tracking-wider leading-loose text-md text-justify">
              {selectedStory.description}
            </p>
            {authorization && (
              <>
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
                <button
                  className="bg-primary py-4 px-10 mt-6 rounded-lg uppercase text-white focus:outline-none"
                  onClick={() => push('/story/' + selectedStory._id)}
                >
                  Continue Reading Full Story
                </button>
              </>
            )}

            {!authorization && (
              <>
                <div className="flex items-center mt-8">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path
                      d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z"
                      fill="#FE2828"
                    />
                  </svg>

                  <p className="text-red-700 text-center">
                    {selectedStory && (
                      <>Oops! You do not have any of the required assets.</>
                    )}
                  </p>
                </div>

                <div className="flex justify-between flex-wrap h-80 overflow-y-auto">
                  {deniedAssets.map((assetId, idx) => {
                    return (
                      <button
                        className={`bg-primary py-4 px-10 mx-4 mt-6 rounded-lg uppercase text-white focus:outline-none ${
                          idx !== deniedAssets.length - 1 && idx !== 0 && 'mx-4'
                        }`}
                        onClick={() =>
                          window.open(
                            'https://wax.atomichub.io/explorer/asset/' + assetId
                          )
                        }
                      >
                        Buy NFT {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

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
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <button
              className="rounded-r-md bg-secondary text-white uppercase px-8 h-full shadow-lg focus:outline-none"
              onClick={() => searchHandler()}
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center">
          {stories.map((story, index) => {
            return (
              <div className="rounded-lg  w-3/12 mx-14 mb-12 flex-initial relative">
                <div className="absolute w-full h-full rounded-xl hover:bg-black hover:bg-opacity-80 hover:opacity-100 opacity-0 cursor-pointer flex justify-center items-center transition duration-500 ease-in-out">
                  <button
                    className="border-2 border-white rounded-xl uppercase text-white py-3 px-6 focus:outline-none bg-gray-800 transition duration-500 ease-in-out"
                    onClick={() => handleStorySelect(story)}
                    // onClick={() => push(`/story/${story._id}`)}
                  >
                    View Story
                  </button>
                </div>
                <img
                  src={
                    process.env.REACT_APP_API_URL + '/uploads/' + story.image
                  }
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
