import React, { useState } from 'react';
import './App.css';
import CreateData from './components/CreateData';
import ReadData from './components/ReadData';
import UpdateData from './components/UpdateData';
import DeleteData from './components/DeleteData';

function App() {
  const [selectedRecord, setSelectedRecord] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Letter Collection Index</h1>
      </header>
      <main>
        <section>
          <h2>Create Record</h2>
          <CreateData onRecordCreated={setSelectedRecord} />
        </section>
        <section>
          <h2>View Records</h2>
          <ReadData selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} />
        </section>
        <section>
          <h2>Update Record</h2>
          <UpdateData selectedRecord={selectedRecord} />
        </section>
        <section>
          <h2>Delete Record</h2>
          <DeleteData />
        </section>
      </main>
    </div>
  );
}

export default App;
