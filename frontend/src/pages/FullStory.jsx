import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const FullStory = () => {
  const { id } = useParams();
  const [story, setStory] = useState();
  useEffect(() => {
    axios.get(`/story/${id}`).then((response) => {
      setStory(response.data);
    });
  }, []);
  return (
    <div>
      <iframe
        src="http://worksofnick.com/2018/11/16/the-cost-of-magic/"
        className="w-full min-h-screen mt-24"
        title="Story"
        loading="lazy"
        style={{
          background:
            'url("data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100% 100%"><text fill="%23FF0000" x="50%" y="50%" font-family="\'Lucida Grande\', sans-serif" font-size="24" text-anchor="middle">PLACEHOLDER</text></svg>") 0px 0px no-repeat;',
        }}
      ></iframe>
    </div>
  );
};

export default FullStory;
