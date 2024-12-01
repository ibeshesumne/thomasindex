import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Import Header Component
import CreateData from './components/CreateData';
import ReadData from './components/ReadData';
import UpdateData from './components/UpdateData';
import DeleteData from './components/DeleteData';
import Login from './components/Auth/Login'; // Import Login Component
import Register from './components/Auth/Register'; // Import Register Component
import Logout from './components/Auth/Logout'; // Import Logout Component
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import { AuthProvider } from './components/Auth/AuthContext';

function App() {
  const [selectedRecord, setSelectedRecord] = useState(null);

  return (
    <AuthProvider> {/* Wrap the app with AuthProvider */}
      <BrowserRouter>
        <div className="App">
          {/* Replace static header with the Header component */}
          <Header />
          <main>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes */}
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreateData onRecordCreated={setSelectedRecord} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/read"
                element={
                  <ProtectedRoute>
                    <ReadData
                      selectedRecord={selectedRecord}
                      setSelectedRecord={setSelectedRecord}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update"
                element={
                  <ProtectedRoute>
                    <UpdateData selectedRecord={selectedRecord} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/delete"
                element={
                  <ProtectedRoute>
                    <DeleteData />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/logout"
                element={
                  <ProtectedRoute>
                    <Logout />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
