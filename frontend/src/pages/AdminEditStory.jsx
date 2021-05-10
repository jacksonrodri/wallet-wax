import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Input from '../components/ui-elements/Input';
import { useParams } from 'react-router';

import JoditEditor from 'jodit-react';

const EditStory = () => {
  const { id } = useParams();

  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    assetIds: '',
    description: '',
    content: '',
  });

  useEffect(() => {
    axios.get(`/admin/story/${id}`).then((response) => {
      const { name, assetIds, description, content } = response.data;
      setFormData({ ...formData, name, assetIds, description });
      setEditorState(content);
    });
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('name', formData.name);
    data.append('assetIds', formData.assetIds);
    data.append('description', formData.description);
    data.append('content', editorState);

    axios
      .put('/edit-story/' + id, { ...formData, content: editorState })
      .then(() => {
        alert('Story edited successfully.');
      });
  };

  return (
    <form className="flex flex-col w-6/12 mx-auto mt-24" onSubmit={handleEdit}>
      <h2 className="mb-20 text-white text-3xl uppercase">
        Create a new story
      </h2>
      <div className="">
        <Input
          type="text"
          name="name"
          placeholder="Name of your story."
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData.name}
        />
      </div>

      <div className="mt-8">
        <Input
          type="text"
          name="assetIds"
          placeholder="Asset id's separate by comma(,)"
          onChange={(e) =>
            setFormData({ ...formData, assetIds: e.target.value })
          }
          value={formData.assetIds}
        />
      </div>
      <div className="my-8">
        <Input
          type="text"
          name="description"
          placeholder="Short description"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          value={formData.description}
        />
      </div>
      <div className="border mb-8 bg-white">
        <JoditEditor
          ref={editorRef}
          value={editorState}
          config={{ readonly: false }}
          tabIndex={1}
          onBlur={(newContent) => {
            setEditorState(newContent);
          }}
          onChange={(newContent) => {}}
        />
      </div>
      {/* <input
        type="file"
        className=""
        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        // value={formData.image}
      /> */}
      <button
        className="bg-secondary py-4 px-10 mt-6 rounded-lg uppercase text-white focus:outline-none"
        onClick={handleEdit}
      >
        Edit Story
      </button>
    </form>
  );
};

export default EditStory;
