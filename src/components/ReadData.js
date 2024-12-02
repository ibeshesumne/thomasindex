import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { CSVLink } from 'react-csv';
import UpdateData from './UpdateData';

function ReadData() {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); // Track the record being reviewed
  const [isUpdating, setIsUpdating] = useState(false); // Track if we are in update mode

  useEffect(() => {
    const recordsRef = ref(db, 'letters');

    const unsubscribe = onValue(recordsRef, (snapshot) => {
      if (!snapshot.exists()) {
        console.log('No records found.');
        setRecords([]);
        return;
      }

      const allRecords = Object.entries(snapshot.val()).map(([id, data]) => ({
        id,
        ...data,
      }));

      setRecords(allRecords);
    });

    return () => unsubscribe();
  }, []);

  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Created By', key: 'createdByEmail' },
    { label: 'Date Checker', key: 'datechecker' },
    { label: 'Date', key: 'date' },
    { label: 'Object Type', key: 'object_type' },
    { label: 'Sender', key: 'sender' },
    { label: 'Receiver', key: 'receiver' },
    { label: 'Location of Object', key: 'location_object' },
    { label: 'Location of Original', key: 'location_original' },
    { label: 'Object URL', key: 'object_url' },
    { label: 'Original URL', key: 'original_url' },
    { label: 'Notes', key: 'notes' },
    { label: 'Index Creation Date', key: 'index_creation_date' },
    { label: 'Index Modified Date', key: 'index_modified_date' },
  ];

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
  };

  const handleBackToRecords = () => {
    setSelectedRecord(null);
    setIsUpdating(false);
  };

  const handleUpdateRecord = () => {
    setIsUpdating(true);
  };

  if (isUpdating && selectedRecord) {
    // Render the Update form
    return (
      <UpdateData
        selectedRecord={selectedRecord}
        onRecordUpdated={handleBackToRecords} // Return to records list after update
      />
    );
  }

  if (selectedRecord) {
    // Render the detailed card for the selected record
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Record Details</h2>
          <div className="space-y-4">
            <div>
              <strong>ID:</strong> {selectedRecord.id}
            </div>
            <div>
              <strong>Created By:</strong> {selectedRecord.createdByEmail}
            </div>
            <div>
              <strong>Date:</strong> {selectedRecord.date}
            </div>
            <div>
              <strong>Object Type:</strong> {selectedRecord.object_type}
            </div>
            <div>
              <strong>Sender:</strong> {selectedRecord.sender}
            </div>
            <div>
              <strong>Receiver:</strong> {selectedRecord.receiver}
            </div>
            <div>
              <strong>Location of Object:</strong> {selectedRecord.location_object}
            </div>
            <div>
              <strong>Location of Original:</strong> {selectedRecord.location_original}
            </div>
            <div>
              <strong>Object URL:</strong> {selectedRecord.object_url}
            </div>
            <div>
              <strong>Original URL:</strong> {selectedRecord.original_url}
            </div>
            <div>
              <strong>Notes:</strong> {selectedRecord.notes}
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={handleBackToRecords}
              className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2"
            >
              Back to Records
            </button>
            <button
              onClick={handleUpdateRecord}
              className="w-1/2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Update Record
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render the list of records
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Your Records</h3>
        <CSVLink
          data={records}
          headers={headers}
          filename="letters_records.csv"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block"
        >
          Export All Records to CSV
        </CSVLink>
        {records.length === 0 ? (
          <p className="text-gray-500">No records available</p>
        ) : (
          <ul className="list-none p-0 space-y-4">
            {records.map((record) => (
              <li
                key={record.id}
                className="p-4 border border-gray-300 rounded flex justify-between items-center"
              >
                <div>
                  <strong>ID:</strong> {record.id} | <strong>Type:</strong> {record.object_type} |{' '}
                  <strong>Sender:</strong> {record.sender} |{' '}
                  <strong>Receiver:</strong> {record.receiver}
                </div>
                <button
                  onClick={() => handleRecordClick(record)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  Review Record
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ReadData;
