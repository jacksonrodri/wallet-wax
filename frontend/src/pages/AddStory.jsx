import axios from 'axios';
import React, { useRef, useState } from 'react';
import Input from '../components/ui-elements/Input';

import JoditEditor from 'jodit-react';

const AddStory = () => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    assetIds: '',
    description: '',
    content: '',
    image: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    assetIds: '',
    description: '',
    content: '',
    image: '',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (handleValidations()) {
      let data = new FormData();
      data.append('name', formData.name);
      data.append('assetIds', formData.assetIds);
      data.append('description', formData.description);
      // data.append('content', formData.content);
      data.append('content', editorState);
      data.append('image', formData.image);

      axios.post('/admin/add-story', data).then(() => {
        alert('Story added succesfully.');
      });
    }
  };

  const handleValidations = () => {
    let resolve = true;

    const { name, assetIds, description, image } = formData;
    let messages = {};
    if (name.length < 1) {
      resolve = false;
      messages.name = 'Name is required!';
    }
    if (assetIds.length < 1) {
      resolve = false;
      messages.assetIds = 'Asset Ids are required!';
    }
    if (description.length < 1) {
      resolve = false;

      messages.description = 'Description is Required!';
    }

    if (!image) {
      resolve = false;
      messages.image = 'Image is required!';
    }

    setErrorMessages({ errorMessages, ...messages });

    return resolve;
  };

  return (
    <form
      className="flex flex-col w-6/12 mx-auto mt-24"
      onSubmit={handleCreate}
    >
      <h2 className="mb-20 text-white text-3xl uppercase">
        Create a new story
      </h2>
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Name of your story."
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData.name}
        />
        <div className="text-red-700 mt-2">{errorMessages.name}</div>
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

        <div className="text-red-700 mt-2">{errorMessages.assetIds}</div>
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
        <div className="text-red-700 mt-2">{errorMessages.description}</div>
      </div>
      <div className="mb-8">
        <JoditEditor
          ref={editorRef}
          value={editorState}
          config={{
            readonly: false,
            askBeforePasteFromWord: false,
            askBeforePasteHTML: false,
            defaultActionOnPaste: 'insert_as_html',
            insertImageAsBase64URI: true,
          }}
          tabIndex={1}
          onBlur={(newContent) => {
            setEditorState(newContent);
          }}
          onChange={(newContent) => {}}
        />
        <div className="text-red-700 mt-2">{errorMessages.editorState}</div>
      </div>
      <input
        type="file"
        className=""
        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        // value={formData.image}
      />
      <div className="text-red-700 mt-2">{errorMessages.image}</div>
      <button
        className="bg-secondary py-4 px-10 mt-6 rounded-lg uppercase text-white focus:outline-none"
        onClick={handleCreate}
      >
        Create New Story
      </button>
    </form>
  );
};

export default AddStory;
