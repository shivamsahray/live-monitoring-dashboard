import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from 'socket.io-client'
import DeviceCard from "../components/DeviceComponent";

const socket = io('http://localhost:5000');

const Dashboard = () => {
    const [devices, setDevices] = useState([]);
    const [currentPage, setCurrentPage] = useState([]);

    const devicesPerPage = 8;
    const totalPages = Math.ceil(devices.length / devicesPerPage);


    useEffect(() => {
        axios.get('http://localhost:5000/api/devices').then((res) => {
            setDevices(res.data);
        })
        .catch((err) => {
            console.error("Failed to fetch devices: ", err);
        });

        //listen for live updates
        socket.on('device-update', (update) => {
            setDevices((prev) => prev.map((device) =>
                device.id === update.id ? { ...device, ...update} : device
            ));
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Device Dashboard</h1>
            <div className="grid grid-cols-2 gap-4">
                {devices.map((device, index) => {
                    const devicePage = Math.floor(index / devicesPerPage) + 1;

                    return(
                        <div key={device.id} className={devicePage == currentPage ? 'block' : 'hidden'}>
                            <DeviceCard device={device}></DeviceCard>
                        </div>
                    )
                })}
            </div>

            {/* Pagination Button */}
                <div className="mt-6 flex gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded border ${
                                currentPage === i+1 ? 'bg-blue-500 text-white' : 'bg-gray-100'
                            }`}>
                                {i+1}
                            </button>
                    ))}
                </div>
        </div>
    )
}

export default Dashboard;