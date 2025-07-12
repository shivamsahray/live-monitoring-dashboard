import React from "react";
import { useNavigate } from "react-router-dom"


const DeviceCard = ({device}) => {
    const navigate = useNavigate();

    return (
        <>
        <div className="border p-4 bg-red-100 rounded" >
            <h2 className="font-bold mb-1">{device.name}</h2>
            <div className="bg-white p-2 mb-1">Line 1: UNKNOWN | Voltage: N/A</div>
            <div className="bg-white p-2 mb-1">Line 2: UNKNOWN | Voltage: N/A</div>
            <div className="bg-white p-2 mb-1">Line 3: UNKNOWN | Voltage: N/A</div>
            <div className="bg-white p-2 mb-1">Line 4: UNKNOWN | Channel: N/A</div>

            <button onClick={() => navigate(`/recordings/${device.id}`)} className="bg-blue-100  px-3 py-1 rounded">Recordings</button>
        </div>
        </>
    )
}

export default DeviceCard;