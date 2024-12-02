import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./Auth/AuthContext";
import "react-datepicker/dist/react-datepicker.css";

function CreateData({ onRecordCreated }) {
  const [formData, setFormData] = useState({
    id: "",
    createdBy: "",
    createdByEmail: "",
    datechecker: 0, // Automatically set based on the 'date' field
    date: "",
    object_type: "",
    sender: "",
    receiver: "",
    location_object: "",
    location_original: "",
    object_url: "",
    original_url: "",
    notes: "",
    index_creation_date: "",
    index_modified_date: "",
  });

  const { currentUser, emailVerified } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: uuidv4(),
        createdBy: currentUser.uid,
        createdByEmail: currentUser.email,
        index_creation_date: new Date().toISOString(),
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedData = { ...prevFormData, [name]: value };
      // Automatically set `datechecker` based on whether the 'date' field is filled
      if (name === "date") {
        updatedData.datechecker = value ? 1 : 0;
      }
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("You must be logged in to create a record.");
      return;
    }

    if (!emailVerified) {
      alert("You must verify your email before creating records.");
      return;
    }

    try {
      const recordRef = ref(db, `letters/${formData.id}`);
      await set(recordRef, formData);
      alert("Record created successfully!");
      if (onRecordCreated) onRecordCreated(formData);

      setFormData({
        id: uuidv4(),
        createdBy: currentUser.uid,
        createdByEmail: currentUser.email,
        datechecker: 0,
        date: "",
        object_type: "",
        sender: "",
        receiver: "",
        location_object: "",
        location_original: "",
        object_url: "",
        original_url: "",
        notes: "",
        index_creation_date: new Date().toISOString(),
        index_modified_date: "",
      });
    } catch (error) {
      console.error("Error creating record:", error.message);
      alert("Failed to create record. Please check your permissions or try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create Record</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Object Type</label>
            <select
              name="object_type"
              value={formData.object_type}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border rounded-md"
            >
              <option value="">Select Object Type</option>
              <option value="Original Letter with Envelope">Original Letter with Envelope</option>
              <option value="Original Letter without Envelope">Original Letter without Envelope</option>
              <option value="Original Letter Photocopy">Original Letter Photocopy</option>
              <option value="Original Letter Scanned Image">Original Letter Scanned Image</option>
              <option value="Original Letter Typed Transcript">Original Letter Typed Transcript</option>
              <option value="Original Letter Typed Transcript Photocopy">
                Original Letter Typed Transcript Photocopy
              </option>
              <option value="Original Post Card">Original Post Card</option>
              <option value="Original Post Card Photocopy">Original Post Card Photocopy</option>
              <option value="Original Post Card Typed Transcript">Original Post Card Typed Transcript</option>
              <option value="Other Material">Other Material</option>
            </select>
          </div>
          {["sender", "receiver", "location_object", "location_original", "object_url", "original_url"].map(
            (field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.replace("_", " ").toUpperCase()}
                </label>
                <input
                  type={field.includes("url") ? "url" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.replace("_", " ")}`}
                  className="block w-full mt-1 p-2 border rounded-md"
                />
              </div>
            )
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter notes"
              className="block w-full mt-1 p-2 border rounded-md"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Create Record
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateData;
