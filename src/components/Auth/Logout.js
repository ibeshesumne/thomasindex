import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login'; // Redirect to login page
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
