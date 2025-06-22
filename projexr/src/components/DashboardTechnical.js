import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from 'recharts';
import Header from './common/Header';
import Footer from './common/Footer';

// Dummy data
const kpiData = {
  projectsRunning: 3,
  projectsCompleted: 4,
  clientsOnboarded: 3
};
const projectStatusData = [
  { name: 'Running', value: 3 },
  { name: 'Completed', value: 4 },
  { name: 'Paused', value: 1 },
];
const techStackData = [
  { name: 'React', value: 5 },
  { name: 'Node.js', value: 3 },
  { name: 'Python', value: 2 },
  { name: 'PHP', value: 1 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const teamPerformanceData = [
  { date: '2024-06-01', performance: 80 },
  { date: '2024-06-02', performance: 85 },
  { date: '2024-06-03', performance: 78 },
  { date: '2024-06-04', performance: 90 },
  { date: '2024-06-05', performance: 95 },
  { date: '2024-06-06', performance: 88 },
  { date: '2024-06-07', performance: 92 },
];

const TechnicalDashboardContent = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-2xl font-bold mb-6">Technical Lead Dashboard</h1>
    {/* KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-gray-600 text-sm">Projects Running</div>
        <div className="text-3xl font-bold text-blue-700">{kpiData.projectsRunning}</div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-gray-600 text-sm">Projects Completed</div>
        <div className="text-3xl font-bold text-green-700">{kpiData.projectsCompleted}</div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-gray-600 text-sm">Clients Onboarded</div>
        <div className="text-3xl font-bold text-purple-700">{kpiData.clientsOnboarded}</div>
      </div>
    </div>
    {/* Bar Chart: Project Status */}
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold mb-2">Project Status</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={projectStatusData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    {/* Pie Chart: Tech Stack Usage */}
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold mb-2">Tech Stack Usage</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={techStackData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {techStackData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
    {/* Line Chart: Team Performance */}
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-2">Team Performance Over Time</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={teamPerformanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="performance" stroke="#00C49F" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const DashboardTechnical = () => (
  <>
    <Header />
    <TechnicalDashboardContent />
    <Footer />
  </>
);

export default DashboardTechnical; 