import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { CSVLink } from 'react-csv';
import { useAuth } from './Auth/AuthContext'; // Import AuthContext to get the authenticated user

function ReadData({ selectedRecord, setSelectedRecord }) {
  const [records, setRecords] = useState([]);
  const { currentUser } = useAuth(); // Get the current authenticated user

  useEffect(() => {
    // If no user is logged in, do not fetch records
    if (!currentUser) {
      alert('You must be logged in to view records.');
      setRecords([]);
      return;
    }

    // Fetch records specific to the logged-in user
    const recordsRef = ref(db, `users/${currentUser.uid}/letters`);
    const unsubscribe = onValue(recordsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const recordsList = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setRecords(recordsList);
      } else {
        setRecords([]);
      }
    });

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, [currentUser]);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Date Checker", key: "datechecker" },
    { label: "Date", key: "date" },
    { label: "Object Type", key: "object_type" },
    { label: "Sender", key: "sender" },
    { label: "Receiver", key: "receiver" },
    { label: "Location of Object", key: "location_object" },
    { label: "Location of Original", key: "location_original" },
    { label: "Object URL", key: "object_url" },
    { label: "Original URL", key: "original_url" },
    { label: "Notes", key: "notes" },
    { label: "Index Creation Date", key: "index_creation_date" },
    { label: "Index Modified Date", key: "index_modified_date" }
  ];

  const handleExportSingleRecord = (record) => {
    const singleRecordData = [record];
    const csvData = {
      data: singleRecordData,
      headers: headers,
      filename: `${record.id}_record.csv`,
    };

    const blob = new Blob([new CSVLink(csvData)], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = csvData.filename;
    link.click();
  };

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-2xl font-bold mb-4">Records List</h3>
      {records.length === 0 ? (
        <p className="text-gray-500">No records available</p>
      ) : (
        <>
          <CSVLink
            data={records}
            headers={headers}
            filename={"letters_records.csv"}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block"
          >
            Export All Records to CSV
          </CSVLink>
          <ul className="list-none p-0">
            {records.map((record) => (
              <li key={record.id} className="mb-4 p-4 border border-gray-300 rounded">
                <strong>ID:</strong> {record.id} | <strong>Type:</strong> {record.object_type} | <strong>Sender:</strong> {record.sender} | <strong>Receiver:</strong> {record.receiver}
                <button
                  onClick={() => handleExportSingleRecord(record)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                >
                  Export Record to CSV
                </button>
                <button
                  onClick={() => handleRecordClick(record)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-4"
                >
                  Review Record
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ReadData;
