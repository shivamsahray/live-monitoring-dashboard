import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Recordings = () => {
  const { deviceId } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [recordings, setRecordings] = useState([]);
  const [filters, setFilters] = useState({ line: '', in_out: '', minDuration: '' });

  const handleBack = () => {
    navigate('/');
  };

  const fetchRecordings = () => {
    fetch(`http://localhost:5000/api/recordings?device=${deviceId}&date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRecordings(data);
        } else {
          setRecordings([]);
        }
      })
      .catch((err) => console.error("Error fetching recordings", err));
  };

  const handleSync = () => {
    setRecordings([]);
    setDate(date);
  };

  const handleReload = () => {
    fetchRecordings();
  };

  const applyFilters = () => {
    fetchRecordings();
  };

  const filteredRecordings = recordings.filter((rec) => {
    return (
      (!filters.line || rec.line.toString() === filters.line) &&
      (!filters.in_out || rec.in_out === filters.in_out) &&
      (!filters.minDuration || parseInt(rec.duration) >= parseInt(filters.minDuration))
    );
  });

  useEffect(() => {
    if (deviceId && date) {
      fetchRecordings();
    }
  }, [deviceId, date]);

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mt-4 mb-4 flex-wrap">
        <button
          onClick={handleBack}
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

        <button
          onClick={handleSync}
          className="bg-blue-500  px-3 py-1 rounded"
        >
          SYNC
        </button>

        <button
          onClick={handleReload}
          className="bg-green-500 px-3 py-1 rounded"
        >
          RELOAD
        </button>

        <select
          value={filters.line}
          onChange={(e) => setFilters({ ...filters, line: e.target.value })}
          className="border px-2 py-1 rounded"
        >
          <option value="">All Lines</option>
          <option value="1">Line 1</option>
          <option value="2">Line 2</option>
          <option value="3">Line 3</option>
        </select>

        <select
          value={filters.in_out}
          onChange={(e) => setFilters({ ...filters, in_out: e.target.value })}
          className="border px-2 py-1 rounded"
        >
          <option value="">All</option>
          <option value="in">In</option>
          <option value="out">Out</option>
        </select>

        <input
          type="number"
          placeholder="Min Duration (sec)"
          value={filters.minDuration}
          onChange={(e) => setFilters({ ...filters, minDuration: e.target.value })}
          className="border px-2 py-1 rounded"
        />

        <button
          onClick={applyFilters}
          className="bg-purple-500 px-3 py-1 rounded"
        >
          FILTER
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">Recordings for Device {deviceId}</h2>

      {Array.isArray(filteredRecordings) && filteredRecordings.length === 0 ? (
        <p className="text-red-600">No Recordings for current date</p>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Line</th>
              <th className="border px-2 py-1">Channel</th>
              <th className="border px-2 py-1">In/Out</th>
              <th className="border px-2 py-1">Phone No</th>
              <th className="border px-2 py-1">Duration</th>
              <th className="border px-2 py-1">Date & Time</th>
              <th className="border px-2 py-1">Comment</th>
              <th className="border px-2 py-1">Play</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecordings.map((rec, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{rec.name}</td>
                <td className="border px-2 py-1">{rec.line}</td>
                <td className="border px-2 py-1">{rec.channel}</td>
                <td className="border px-2 py-1">{rec.in_out}</td>
                <td className="border px-2 py-1">{rec.phone}</td>
                <td className="border px-2 py-1">{rec.duration}</td>
                <td className="border px-2 py-1">{rec.date_time}</td>
                <td className="border px-2 py-1">{rec.comment}</td>
                <td className="border px-2 py-1">
                  <audio controls src={`http://localhost:5000/recordings/${rec.filename}`}></audio>
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
