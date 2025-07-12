import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const mockRecordings = [
    {
        id: 1,
        name: 'Call_001',
        line: '1',
        Channel: 'A',
        direction: 'In',
        phone: '9876543210',
        duration: '00:00:42',
        datetime: '2025-07-09 10:00AM',
        comment: 'Test call',
        file: '/recordings/sample1.mp3'
    },
    {
    id: 2,
    name: 'Call_002',
    line: '2',
    channel: 'B',
    direction: 'Out',
    phone: '9123456780',
    duration: '00:00:58',
    datetime: '2025-07-09 11:00 AM',
    comment: 'Support call',
    file: '/recordings/sample2.mp3'
  }
];


const Recordings = () => {
    const { deviceID } = useParams();
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [recordings, setRecordings] = useState([]);

    useEffect(() => {
        console.log("Device ID from URL:", deviceID); // 👈 check here

  if (date) {
    fetch(`http://localhost:5000/api/recordings?device=${deviceID}&date=${date}`)

      .then((res) => res.json())
      .then((data) =>{
                console.log("API response:", data); // 👈 log backend response

         setRecordings(data)
      })
      .catch((err) => console.error("Error fetching recordings", err));
  }
}, [date, deviceID]);


   return (
    <div className="p-4">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          ⬅ Back
        </button>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <div className="flex gap-2">
          <button className="bg-green-500 text-white px-3 py-1 rounded">SYNC</button>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded">RELOAD</button>
          <button className="bg-purple-500 text-white px-3 py-1 rounded">FILTER</button>
        </div>
      </div>

      {/* Table or No data */}
      {recordings.length === 0 ? (
        <p className="text-red-600">No Recordings for current date</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Line</th>
              <th className="p-2 border">Channel</th>
              <th className="p-2 border">In/Out</th>
              <th className="p-2 border">Phone No</th>
              <th className="p-2 border">Duration</th>
              <th className="p-2 border">Date & Time</th>
              <th className="p-2 border">Comment</th>
              <th className="p-2 border">Play</th>
            </tr>
          </thead>
          <tbody>
            {recordings.map((rec) => (
              <tr key={rec.id}>
                <td className="p-2 border">{rec.name}</td>
                <td className="p-2 border">{rec.line}</td>
                <td className="p-2 border">{rec.channel}</td>
                <td className="p-2 border">{rec.direction}</td>
                <td className="p-2 border">{rec.phone}</td>
                <td className="p-2 border">{rec.duration}</td>
                <td className="p-2 border">{rec.datetime}</td>
                <td className="p-2 border">{rec.comment}</td>
                <td className="p-2 border">
                    <audio controls src={`/recordings/${rec.file_path}`} className="w-32" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Recordings;
