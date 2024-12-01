import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, update } from 'firebase/database';
import { useAuth } from './Auth/AuthContext'; // Import AuthContext to get the authenticated user

function UpdateData({ selectedRecord, onRecordUpdated }) {
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
    index_modified_date: '',
  });

  const { currentUser } = useAuth(); // Get the current authenticated user

  useEffect(() => {
    if (selectedRecord) {
      setFormData({ ...selectedRecord });
    } else {
      clearForm();
    }
  }, [selectedRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user is authenticated
    if (!currentUser) {
      alert('You must be logged in to update a record.');
      return;
    }

    if (!formData.id) {
      alert('No record selected for update.');
      return;
    }

    // Update record under the authenticated user's node
    const recordRef = ref(db, `users/${currentUser.uid}/letters/${formData.id}`);
    const updatedRecord = { ...formData, index_modified_date: new Date().toISOString() };

    update(recordRef, updatedRecord)
      .then(() => {
        alert('Record updated successfully!');
        onRecordUpdated && onRecordUpdated(updatedRecord);
        clearForm();
      })
      .catch((error) => {
        alert('Error updating record: ' + error.message);
      });
  };

  const clearForm = () => {
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
      index_creation_date: '',
      index_modified_date: '',
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
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Update Record
      </button>
    </form>
  );
}

export default UpdateData;
