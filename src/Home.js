import React from 'react';
import 'tailwindcss/tailwind.css';

function Home() {
  return (
    <div className="w-full min-h-screen bg-primary flex">
      <div className="w-9/12 py-8 px-12 flex flex-col items-center">
        {/* <h1 className="text-white uppercase text-xl">NFT Story Cards</h1> */}
        <div className="w-8/12 flex flex-col items-center">
          <h2 className="text-4xl text-white uppercase text-center">
            Welcome to Nft Story Cards
          </h2>
          <div className="flex mt-12 flex-wrap">
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
                  <h5 className="uppercase text-gray-200 text-xs">owner</h5>
                  <p className="text-lg text-white mt-2">{item.ownedBy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-3/12 bg-secondary min-h-full p-8 flex items-center flex-col fixed right-0">
        <button
          className="px-8 py-4 text-white rounded-md shadow-xl uppercase"
          style={{ backgroundColor: '#CD845B' }}
        >
          Login with wax
        </button>

        <p className="text-white mt-8">You are not logged in!</p>
      </div>
    </div>
  );
}

const nftsList = [
  {
    image: 'https://picsum.photos/200/300',
    ownedBy: 'harsimarriar96',
  },
  {
    image: 'https://picsum.photos/201/300',
    ownedBy: 'mrpuri',
  },
  {
    image: 'https://picsum.photos/202/300',
    ownedBy: 'nitingupta',
  },
  {
    image: 'https://picsum.photos/203/300',
    ownedBy: 'harpreetkaur2877',
  },
];

export default Home;
