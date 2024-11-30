// DeleteData.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { ref, remove } from 'firebase/database';

function DeleteData() {
  const [recordId, setRecordId] = useState('');

  const handleIdChange = (e) => {
    setRecordId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recordId) {
      const recordRef = ref(db, 'letters/' + recordId);
      remove(recordRef)
        .then(() => {
          alert('Record deleted successfully!');
          setRecordId('');
        })
        .catch((error) => {
          alert('Error deleting record: ' + error.message);
        });
    } else {
      alert('Please enter a valid record ID');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <input 
        type="text" 
        name="recordId" 
        value={recordId} 
        onChange={handleIdChange} 
        placeholder="Record ID" 
        required 
        className="mb-4 p-2 border border-gray-300 rounded w-full" 
      />
      <button 
        type="submit" 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Delete Record
      </button>
    </form>
  );
}

export default DeleteData;
