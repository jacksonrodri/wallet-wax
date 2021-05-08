import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const FullStory = () => {
  const { id } = useParams();
  const [story, setStory] = useState();
  useEffect(() => {
    axios.get(`/story/${id}`).then((response) => {
      setStory(response.data.Story);
    });
  }, [id]);

  return (
    <div
      className="mt-24 w-6/12 mx-auto text-white text-2xl"
      dangerouslySetInnerHTML={{ __html: story }}
    ></div>
  );
};

export default FullStory;
