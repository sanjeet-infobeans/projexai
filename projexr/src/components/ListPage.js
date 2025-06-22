import React, { useState, useEffect, useContext } from 'react';
import { Users, Plus, Trash2, Edit, Phone, Mail, MapPin, Building2, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './common/Layout';
// import Navigation from './Navigation';
import { authFetch } from '../utils/authFetch';
import { AuthContext } from '../context/AuthContext';

const ListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClient, setNewClient] = useState({
    title: '',
    client_name: '',
    industry: '',
    location: '',
    contact_person: '',
    email: '',
    phone: '',
    status: '1'
  });

  // Fetch clients from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await authFetch(`https://capitalmitra.com/wp-json/projexai/v1/client-profiles?author=${user?.username}`);
        if (!response.ok) throw new Error('Failed to fetch clients');
        const data = await response.json();
        setClients(data);
      } catch (err) {
        console.error('Error fetching client data:', err);
        setError('Failed to fetch clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Handle client name click navigation
  const handleClientClick = (client) => {
    // Navigate to Sales Conversation page with client data
    navigate(`/sales-conversation/${client.id}`, { state: { client } });
  };

  const addClient = (e) => {
    e.preventDefault();
    if (newClient.title.trim() && newClient.client_name.trim()) {
      const client = {
        id: Date.now(),
        ...newClient
      };
      setClients([...clients, client]);
      setNewClient({
        title: '',
        client_name: '',
        industry: '',
        location: '',
        contact_person: '',
        email: '',
        phone: '',
        status: '1'
      });
      setShowAddForm(false);
    }
  };
// console.log('Clients:', clients);
  const toggleStatus = (id) => {
    setClients(clients.map(client =>
      client.id === id ? { ...client, status: client.status === "1" ? "0" : "1" } : client
    ));
  };

  const deleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id));
  };

  const activeCount = clients.filter(client => client.status === "1").length;
  const inactiveCount = clients.filter(client => client.status === "0").length;
  const totalCount = clients.length;

  const getStatusBadge = (status) => {
    if (status === "1") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Inactive
        </span>
      );
    }
  };

  // Filtering logic
  let filteredClients = clients;
  const filter = location.state?.filter;
  if (filter === 'active') {
    filteredClients = clients.filter(client => client.status === '1');
  } else if (filter === 'inactive') {
    filteredClients = clients.filter(client => client.status === '0');
  } else if (filter === 'industries') {
    // Show only one client per industry as a sample (or you can show all, grouped by industry)
    const seen = new Set();
    filteredClients = clients.filter(client => {
      if (seen.has(client.industry)) return false;
      seen.add(client.industry);
      return true;
    });
  }

  // Role check for access
  let role = user?.user_role || user?.role || '';
  if (Array.isArray(role)) {
    role = role[0] || '';
  }
  if (typeof role !== 'string') {
    role = '';
  }
  role = role.toLowerCase();
  const isManagerOrTechnical = role === 'manager' || role === 'technical_lead' || role === 'technical';

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Add New Client Button (only for non-manager/technical) */}
          {!isManagerOrTechnical && (
            <div className="mb-8">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Client</span>
              </button>
            </div>
          )}

          {/* Add Client Form (only for non-manager/technical) */}
          {!isManagerOrTechnical && showAddForm && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Client</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newClient.title}
                    onChange={(e) => setNewClient({...newClient, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Client title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={newClient.client_name}
                    onChange={(e) => setNewClient({...newClient, client_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Client company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                  <input
                    type="text"
                    value={newClient.industry}
                    onChange={(e) => setNewClient({...newClient, industry: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Industry type"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newClient.location}
                    onChange={(e) => setNewClient({...newClient, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="City, Country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={newClient.contact_person}
                    onChange={(e) => setNewClient({...newClient, contact_person: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Contact person name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newClient.status}
                    onChange={(e) => setNewClient({...newClient, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={addClient}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all"
                >
                  Add Client
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Client List */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Client List</h2>
            </div>
            
            {filteredClients.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No clients yet. Add your first client above!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <div key={client.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 
                            className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer transition-colors"
                            onClick={() => handleClientClick(client)}
                          >
                            {client.title}
                          </h3>
                          {getStatusBadge(client.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Company:</span>
                            <span className="font-medium">{client.client_name}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                            <span className="text-gray-600">Industry:</span>
                            <span className="font-medium">{client.industry}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium">{client.location}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Contact:</span>
                            <span className="font-medium">{client.contact_person}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <a 
                              href={`mailto:${client.email}`}
                              className="text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                              {client.email}
                            </a>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <a 
                              href={`tel:${client.phone}`}
                              className="text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                              {client.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end ml-4 gap-2">
                        <button
                          onClick={() => navigate(`/edit-client/${client.id}`, { state: { client } })}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-all"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListPage;