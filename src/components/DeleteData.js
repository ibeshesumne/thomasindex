import React, { useState } from 'react';
import { db } from '../firebase';
import { ref, remove } from 'firebase/database';
import { useAuth } from './Auth/AuthContext'; // Import AuthContext to get the authenticated user

function DeleteData() {
  const [recordId, setRecordId] = useState('');
  const { currentUser } = useAuth(); // Get the current authenticated user

  const handleIdChange = (e) => {
    setRecordId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user is authenticated
    if (!currentUser) {
      alert('You must be logged in to delete a record.');
      return;
    }

    if (recordId) {
      // Use the authenticated user's UID to locate the record
      const recordRef = ref(db, `users/${currentUser.uid}/letters/${recordId}`);
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
