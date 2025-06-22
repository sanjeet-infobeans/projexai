import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { authFetch } from '../utils/authFetch';

const EditClient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.client) {
      setForm(location.state.client);
      setLoading(false);
    } else {
      // Fetch client by id
      const fetchClient = async () => {
        try {
          const response = await authFetch(`https://capitalmitra.com/wp-json/projexai/v1/client-profiles/${id}`);
          if (!response.ok) throw new Error('Failed to fetch client');
          const data = await response.json();
          setForm(data);
        } catch (err) {
          setError('Failed to fetch client');
        } finally {
          setLoading(false);
        }
      };
      fetchClient();
    }
  }, [id, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the updated client to the backend if needed
    // For now, just navigate back
    navigate('/clients', { state: { updatedClient: form } });
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!form) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button className="mb-6 text-indigo-600 hover:underline" onClick={() => navigate('/clients')}>&larr; Back to Clients</button>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-bold mb-4">Edit Client</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input name="title" value={form.title || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
            <input name="client_name" value={form.client_name || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input name="industry" value={form.industry || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input name="location" value={form.location || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
            <input name="contact_person" value={form.contact_person || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input name="email" value={form.email || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input name="phone" value={form.phone || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select name="status" value={form.status || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded">
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lead Status</label>
            <select name="lead_status" value={form.lead_status || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded">
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="in_discussion">In Discussion</option>
              <option value="proposal_sent">Proposal Sent</option>
              <option value="follow_up">Follow Up</option>
              <option value="demo_scheduled">Demo Scheduled</option>
              <option value="negotiation">Negotiation</option>
              <option value="won">Won</option>
              <option value="onboarded">Onboarded</option>
              <option value="lost">Lost</option>
              <option value="paused">Paused</option>
              <option value="cold">Cold</option>
              <option value="reengaged">Reengaged</option>
            </select>
          </div>
          <div className="flex gap-4 mt-6">
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Save</button>
            <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400" onClick={() => navigate('/clients')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClient; 