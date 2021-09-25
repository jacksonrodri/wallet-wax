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
    <div class="full-story-wrapper mx-auto p-4">
      <div
        className="mt-4 md:mt-8 lg:mt-24 text-2xl border p-8 md:p-12 rounded-xl bg-hover shadow-xl text-black"
        style={{ minHeight: '600px' }}
        dangerouslySetInnerHTML={{ __html: story }}
      ></div>
    </div>
  );
};

export default FullStory;
