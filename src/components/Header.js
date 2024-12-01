import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="App-header">
      <h1>Letter Collection Index</h1>
      <nav>
        <ul style={navStyle}>
          <li style={listItemStyle}>
            <Link to="/login">Login</Link>
          </li>
          <li style={listItemStyle}>
            <Link to="/register">Register</Link>
          </li>
          <li style={listItemStyle}>
            <Link to="/create">Create Record</Link>
          </li>
          <li style={listItemStyle}>
            <Link to="/read">View Records</Link>
          </li>
          <li style={listItemStyle}>
            <Link to="/update">Update Record</Link>
          </li>
          <li style={listItemStyle}>
            <Link to="/delete">Delete Record</Link>
          </li>
          <li style={listItemStyle}>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

// Inline styles for navigation
const navStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px',
  listStyle: 'none',
  backgroundColor: '#282c34',
};

const listItemStyle = {
  margin: '0 10px',
  color: '#61dafb',
  textDecoration: 'none',
};

export default Header;
