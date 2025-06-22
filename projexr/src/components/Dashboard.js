import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6">
        <p>
          You are logged in, but your role does not have a dedicated dashboard.<br />
          Please use the navigation links below to access main sections of the app.
        </p>
      </div>
      <ul className="list-disc pl-6 space-y-2">
        <li><Link to="/clients" className="text-blue-600 hover:underline">Clients</Link></li>
        <li><Link to="/team" className="text-blue-600 hover:underline">Team</Link></li>
        <li><Link to="/profile" className="text-blue-600 hover:underline">Profile</Link></li>
        <li><Link to="/resource" className="text-blue-600 hover:underline">Resources</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard; 