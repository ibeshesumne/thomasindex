import React, { useState } from 'react';
import { db } from '../firebase';
import { ref, remove } from 'firebase/database';
import { useAuth } from './Auth/AuthContext'; // Use the AuthContext to check authentication and email verification

function DeleteData() {
  const [recordId, setRecordId] = useState('');
  const { currentUser, emailVerified } = useAuth(); // Get the current authenticated user and email verification status

  const handleIdChange = (e) => {
    setRecordId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the user is authenticated
    if (!currentUser) {
      alert('You must be logged in to delete a record.');
      return;
    }

    // Ensure the user has verified their email
    if (!emailVerified) {
      alert('You must verify your email before deleting records.');
      return;
    }

    if (!recordId) {
      alert('Please enter a valid record ID.');
      return;
    }

    // Centralized reference in the "letters" node
    const recordRef = ref(db, `letters/${recordId}`);

    try {
      await remove(recordRef);
      alert('Record deleted successfully!');
      setRecordId(''); // Reset input field after deletion
    } catch (error) {
      console.error('Error deleting record:', error.message);
      alert('Error deleting record. Please try again.');
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
