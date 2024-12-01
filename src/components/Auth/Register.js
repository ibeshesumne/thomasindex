import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from '../../firebase'; // Import Firebase authentication and database
import { useNavigate } from 'react-router-dom'; // Import navigation hook

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigation hook

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Save user details in the Firebase Realtime Database with default userType 'regular'
      await set(ref(db, `users/${userId}`), {
        email,
        userType: 'regular', // Default user type
      });

      // Send email verification
      await sendEmailVerification(auth.currentUser);
      alert(
        'Registration successful! A verification email has been sent. Please verify your email before logging in.'
      );

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}

export default Register;
