import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true); // Start loading state
    try {
      // Perform sign-out operation
      await signOut(auth);

      // Navigate to the login page after successful logout
      navigate('/login');

      console.log('User successfully logged out.');
    } catch (error) {
      // Handle potential logout errors
      console.error('Error during logout:', error.message);
      alert('Failed to log out. Please try again.');
    } finally {
      // Always reset loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Logging Out...' : 'Logout'}
      </button>
    </div>
  );
};

export default Logout;
