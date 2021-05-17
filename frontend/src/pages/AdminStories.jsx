import React, { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { useHistory } from 'react-router';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import axios from 'axios';

const AdminStories = () => {
  const { push } = useHistory();

  const [stories, setStories] = useState([]);
  useEffect(() => {
    getStories();
  }, []);

  const getStories = () => {
    axios.get('/stories').then((response) => {
      setStories(response.data);
    });
  };

  const deleteStory = (storyId) => {
    console.log('here');
    axios.delete(`/admin/delete-story/${storyId}`).then(() => {
      alert('Story deleted successfully');
      getStories();
    });
  };
  return (
    <div className="mt-24 w-6/12 mx-auto text-white text-2xl pb-10">
      {stories.map((story, key) => {
        return (
          <div className="h-20 bg-secondary mb-8 rounded-xl flex items-center px-8 shadow-xl">
            <div className="flex items-center flex-grow">
              <img
                src={process.env.REACT_APP_API_URL + '/uploads/' + story.image}
                alt=""
                className="rounded-xl h-10 w-20 mr-8"
              />
              {story.name}
            </div>
            <div className="flex items-center">
              <HiPencil
                className="mr-4 cursor-pointer hover:text-gray-300"
                onClick={() => push('/edit-story/' + story._id)}
              />
              <RiDeleteBin7Fill
                className="cursor-pointer hover:text-red-400"
                onClick={() => deleteStory(story._id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStories;
