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
    <div className="full-story-wrapper mx-auto px-4">
      <div
        className="text-2xl border p-8 md:p-12 rounded-xl bg-hover shadow-xl text-black"
        style={{ minHeight: '600px' }}
        dangerouslySetInnerHTML={{ __html: story }}
      ></div>
    </div>
  );
};

export default FullStory;
