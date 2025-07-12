import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from 'socket.io-client'
import DeviceCard from "../components/DeviceComponent";

const socket = io('http://localhost:5000');

const Dashboard = () => {
    const [devices, setDevices] = useState([]);

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
                {devices.map((device) => (
                    <DeviceCard key={device.id} device={device}></DeviceCard>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;