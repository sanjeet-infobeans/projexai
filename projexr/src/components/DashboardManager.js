import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from 'recharts';
import Header from './common/Header';
import Footer from './common/Footer';

// Dummy data
const kpiData = {
  totalClients: 23,
  proposalsSent: 12,
  totalProjectCost: 185000
};
const salesData = [
  { date: '2024-06-01', Alice: 5, Bob: 3, Priya: 2 },
  { date: '2024-06-02', Alice: 4, Bob: 2, Priya: 5 },
  { date: '2024-06-03', Alice: 6, Bob: 4, Priya: 3 },
  { date: '2024-06-04', Alice: 3, Bob: 5, Priya: 4 },
];
const leadStatusData = [
  { name: 'new', value: 5 },
  { name: 'contacted', value: 3 },
  { name: 'qualified', value: 4 },
  { name: 'proposal_sent', value: 2 },
  { name: 'won', value: 3 },
  { name: 'lost', value: 1 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#d0ed57'];
const projectCostData = [
  { date: '2024-06-01', cost: 20000 },
  { date: '2024-06-02', cost: 35000 },
  { date: '2024-06-03', cost: 50000 },
  { date: '2024-06-04', cost: 80000 },
  { date: '2024-06-05', cost: 100000 },
  { date: '2024-06-06', cost: 120000 },
  { date: '2024-06-07', cost: 185000 },
];

const ManagerDashboardContent = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-2xl font-bold mb-6">Manager Dashboard</h1>
    {/* KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-gray-600 text-sm">Total Clients Onboarded</div>
        <div className="text-3xl font-bold text-blue-700">{kpiData.totalClients}</div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-gray-600 text-sm">Proposals Sent</div>
        <div className="text-3xl font-bold text-green-700">{kpiData.proposalsSent}</div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-gray-600 text-sm">Total Project Cost</div>
        <div className="text-3xl font-bold text-purple-700">₹{kpiData.totalProjectCost.toLocaleString()}</div>
      </div>
    </div>
    {/* Bar Chart: Daily Sales Conversations */}
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold mb-2">Daily Sales Conversations</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Alice" fill="#8884d8" />
          <Bar dataKey="Bob" fill="#82ca9d" />
          <Bar dataKey="Priya" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    {/* Pie Chart: Lead Status Distribution */}
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold mb-2">Lead Status Distribution</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={leadStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {leadStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
    {/* Line Chart: Onboarded Project Cost */}
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-2">Onboarded Project Cost Over Time</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={projectCostData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="cost" stroke="#8884d8" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const DashboardManager = () => (
  <>
    <Header />
    <ManagerDashboardContent />
    <Footer />
  </>
);

export default DashboardManager; 