// CreateData.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

function CreateData({ onRecordCreated }) {
  const [formData, setFormData] = useState({
    datechecker: 0,
    date: '',
    object_type: '',
    sender: '',
    receiver: '',
    location_object: '',
    location_original: '',
    object_url: '',
    original_url: '',
    notes: '',
    index_creation_date: '',
    index_modified_date: ''
  });

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, id: uuidv4(), index_creation_date: new Date().toISOString() }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recordRef = ref(db, 'letters/' + formData.id);
    set(recordRef, formData)
      .then(() => {
        alert('Record created successfully!');
        onRecordCreated(formData);
        setFormData({
          datechecker: 0,
          date: '',
          object_type: '',
          sender: '',
          receiver: '',
          location_object: '',
          location_original: '',
          object_url: '',
          original_url: '',
          notes: '',
          index_creation_date: new Date().toISOString(),
          index_modified_date: ''
        });
      })
      .catch((error) => {
        alert('Error creating record: ' + error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <input
        type="checkbox"
        name="datechecker"
        checked={formData.datechecker === 1}
        onChange={(e) => handleChange({ target: { name: 'datechecker', value: e.target.checked ? 1 : 0 } })}
        className="form-checkbox h-5 w-5 mb-4"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <select
        name="object_type"
        value={formData.object_type}
        onChange={handleChange}
        required
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      >
        <option value="">Select Object Type</option>
        <option value="original_letter_with_envelope">Original Letter with Envelope</option>
        <option value="original_letter_without_envelope">Original Letter without Envelope</option>
        <option value="original_letter_photocopy">Original Letter Photocopy</option>
        <option value="original_letter_scanned_image">Original Letter Scanned Image</option>
        <option value="original_letter_typed_transcript">Original Letter Typed Transcript</option>
        <option value="original_letter_typed_transcript_photocopy">Original Letter Typed Transcript Photocopy</option>
        <option value="original_post_card">Original Post Card</option>
        <option value="original_post_card_photocopy">Original Post Card Photocopy</option>
        <option value="original_post_card_typed_transcript">Original Post Card Typed Transcript</option>
        <option value="other_material">Other Material</option>
      </select>
      <input
        type="text"
        name="sender"
        value={formData.sender}
        onChange={handleChange}
        placeholder="Sender"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="text"
        name="receiver"
        value={formData.receiver}
        onChange={handleChange}
        placeholder="Receiver"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="text"
        name="location_object"
        value={formData.location_object}
        onChange={handleChange}
        placeholder="Location of Object"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="text"
        name="location_original"
        value={formData.location_original}
        onChange={handleChange}
        placeholder="Location of Original (if applicable)"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="url"
        name="object_url"
        value={formData.object_url}
        onChange={handleChange}
        placeholder="URL to Object"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="url"
        name="original_url"
        value={formData.original_url}
        onChange={handleChange}
        placeholder="URL to Original (if applicable)"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Notes"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Create Record
      </button>
    </form>
  );
}

export default CreateData;