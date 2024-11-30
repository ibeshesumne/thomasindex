// exportRecordsToCSV.js
import { ref, get } from 'firebase/database';
import { db } from '../firebase';
import './exportRecordsToCSV.css';

function exportRecordsToCSV() {
  const recordsRef = ref(db, 'letters/');
  get(recordsRef).then((snapshot) => {
    if (snapshot.exists()) {
      const records = snapshot.val();
      const recordsArray = Object.keys(records).map((key) => ({ id: key, ...records[key] }));
      const csvContent = convertToCSV(recordsArray);
      downloadCSV(csvContent, 'letter_records.csv');
    } else {
      alert('No records available to export');
    }
  }).catch((error) => {
    alert('Error fetching records: ' + error.message);
  });
}

function convertToCSV(data) {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map((record) => Object.values(record).join(','));
  return [headers, ...rows].join('\n');
}

function downloadCSV(csvContent, fileName) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default exportRecordsToCSV;

/* exportRecordsToCSV.css */
.download-button {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  margin: 1rem;
}

.export-container {
  @apply p-4;
}
