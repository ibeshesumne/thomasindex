import React from 'react';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to the Thomas Index.</h1>
      <p>
        Please login or register to access the features. Use the navigation bar
        above to proceed.
      </p>
      <div style={{ margin: '20px 0' }}>
        <a href="/login" style={{ margin: '0 10px' }}>
          Login
        </a>
        <a href="/register" style={{ margin: '0 10px' }}>
          Register
        </a>
      </div>
    </div>
  );
};

export default Home;
