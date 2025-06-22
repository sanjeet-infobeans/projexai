import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, Building2, MapPin, Phone, Mail } from 'lucide-react';
import Layout from './common/Layout';
import axios from 'axios';

const ClientDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPromptType, setSelectedPromptType] = useState('');
  const [formData, setFormData] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [conversations, setConversations] = useState([]);
  const [clientFeedback, setClientFeedback] = useState('');


  // Prompt templates and their required fields
  const promptTemplates = {
    company_summary: {
      fields: [
        { name: 'companyName', label: 'Company Name', type: 'text', placeholder: 'Enter company name', required: true },
        { name: 'websiteURL', label: 'Website URL', type: 'url', placeholder: 'https://example.com', required: true }
      ],
      template: `Act as my sales research assistant. I'm meeting with **{companyName}**. Go through their website: **{websiteURL}**, and summarize what they do, who they serve, and what makes them unique. Give me 4–5 short bullets I can use to open the call with insight and context — not fluff.`
    },
    role_pain_points: {
      fields: [
        { name: 'jobTitle', label: 'Job Title/Role', type: 'text', placeholder: 'e.g., VP of Sales, Marketing Director', required: true },
        { name: 'industry', label: 'Industry', type: 'text', placeholder: 'e.g., SaaS, Manufacturing', required: true },
        { name: 'companyType', label: 'Company Type', type: 'text', placeholder: 'e.g., Medical, Technology', required: true }
      ],
      template: `I'm speaking with a {jobTitle} at a **{companyType}** in **{industry}**. Give me 5 specific business problems or friction points they're likely facing in 2024. Phrase each one in natural language I can use to build credibility and spark conversation in the call.`
    },
    call_opener: {
      fields: [
        { name: 'product', label: 'Product', type: 'text', placeholder: 'Enter product name', required: true }
      ],
      template: `Write a confident, non-cringey call opener I can use at the start of a discovery call. I sell **{product}**. Help me briefly position myself, explain the goal of the call, and make the prospect feel like it's a two-way conversation — all in under 60 seconds.`
    },
    discovery_questions: {
      fields: [
        { name: 'industry', label: 'Industry', type: 'text', placeholder: 'e.g., Healthcare, FinTech', required: true },
        { name: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'e.g., Sales Manager, Product Owner', required: true }
      ],
      template: `Give me 10 sharp discovery questions for a **{jobTitle}** in **{industry}** that help me uncover pain, urgency, budget, and fit — fast. These should feel natural and insightful, not like I'm reading from a script.`
    },
    objection_prep: {
      fields: [
        { name: 'jobTitle', label: 'Job Title', type: 'textarea', placeholder: 'e.g., Sales Manager, Product Owner', required: true },
        { name: 'companyType', label: 'Company Type', type: 'text', placeholder: 'e.g., Medical, Technology', required: true },
        { name: 'product', label: 'Product', type: 'text', placeholder: 'Enter product name', required: true }
      ],
      template: `Based on this buyer profile: **{jobTitle}** at **{companyType}**, and this product: **{product}**, what objections am I most likely to hear? For each one, write a short, confident response that reframes the objection and moves the conversation forward.`
    },
    competitor_comparison: {
      fields: [
        { name: 'competitorName', label: 'Competitor Name', type: 'text', placeholder: 'Main competitor name', required: true },
        { name: 'product', label: 'Product', type: 'text', placeholder: 'Enter product name', required: true },
        { name: 'competitorName', label: 'Competitor Name', type: 'text', placeholder: 'Main competitor name', required: true }
      ],
      template: `They currently use **{competitorName}**. I sell **{product}**. Give me 3 comparison points that highlight a key difference or shortcoming they might feel with **{competitorName}**, and how we solve it — no bashing, just smart contrast.`
    },
    trend_insight: {
      fields: [
        { name: 'industry', label: 'Industry', type: 'text', placeholder: 'e.g., Healthcare, Finance', required: true }
      ],
      template: `I want to sound like I understand their world. Give me 2 industry-specific trends or recent shifts happening in **{industry}**, and write one sentence per trend that I could use naturally during a call to show insight and relevance.`
    },
    status_quo: {
      fields: [
        { name: 'productCategory', label: 'Product Category', type: 'textarea', placeholder: 'e.g., CRM, Marketing Automation', required: true }
      ],
      template: `Create a short talk track I can use when a prospect says, We are fine right now. I want to reframe that mindset, and show how top companies using **{productCategory}** improve, even if things are not broken.`
    },
    closing_next_steps: {
    //   fields: [],
      template: `Give me 3 ways to end a call where there is interest — so I can confidently suggest next steps like a demo, pricing call, or looping in decision-makers, without sounding pushy.`
    },
    precall_email: {
    //   fields: [],
      template: `Write a short email I can send the day before a scheduled call. Confirm the time, preview the agenda in one line, and set a professional tone so they show up ready.`
    }
  };

  const handlePromptTypeChange = (e) => {
    const value = e.target.value;
    setSelectedPromptType(value);
    setFormData({});
    setAiResponse('');
    setGeneratedPrompt('');
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const generatePrompt = async () => {
    if (!selectedPromptType) return;
    
    setIsLoading(true);
    
    const template = promptTemplates[selectedPromptType];
    let prompt = template.template;
    
    // Replace placeholders with actual values
    Object.keys(formData).forEach(key => {
      const placeholder = `{${key}}`;
      prompt = prompt.replace(new RegExp(placeholder, 'g'), formData[key] || '');
    });
    
    setGeneratedPrompt(prompt);
    
    try {
      // Call Gemini API
      const apiKey = 'AIzaSyDqGpbtovZGjHE57AXekQxQEymmnLrnNCg';
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
      
      setAiResponse(aiText);
      
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setAiResponse(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addToConversation = () => {
    if (aiResponse.trim()) {
      const newMessage = {
        id: Date.now(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      };
      setConversations(prev => [...prev, newMessage]);
    }
  };

  const sendFeedback = () => {
    if (clientFeedback.trim()) {
      const newMessage = {
        id: Date.now(),
        type: 'client',
        content: clientFeedback,
        timestamp: new Date().toLocaleTimeString()
      };
      setConversations(prev => [...prev, newMessage]);
      setClientFeedback('');
    }
  };

  const handleAiResponseChange = (e) => {
    setAiResponse(e.target.value);
  };

  const renderField = (field) => {
    const commonClasses = "w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            key={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={`${commonClasses} min-h-[80px] resize-vertical`}
            required={field.required}
          />
        );
      case 'select':
        return (
          <select
            key={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={commonClasses}
            required={field.required}
          >
            <option value="">Select {field.label.toLowerCase()}...</option>
            {field.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      default:
        return (
          <input
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={commonClasses}
            required={field.required}
          />
        );
    }
  };

  const selectedTemplate = promptTemplates[selectedPromptType];


  useEffect(() => {
    // Check if client data was passed via navigation state
    if (location.state && location.state.client) {
      setClient(location.state.client);
      setLoading(false);
    } else {
      // Fallback: fetch from API if no state data
      const fetchAllClients = async () => {
        try {
          const response = await axios.get('https://capitalmitra.com/wp-json/projexai/v1/client-profiles');
          const foundClient = response.data.find(client => client.id.toString() === id);
          setClient(foundClient);
        } catch (err) {
          console.error('Error fetching client data:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchAllClients();
    }
  }, [id, location.state]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading client details...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!client) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
              onClick={() => navigate('/clients')}
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Clients</span>
            </button>
            
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Client Not Found</h1>
              <p className="text-gray-600">The client you're looking for doesn't exist.</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/clients')}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Clients</span>
          </button>
          <div className="min-h-screen bg-white flex">
            {/* Left Panel - Form */}
            <div className="w-1/2 p-6 border-r border-gray-200">
              <div className="max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Generate Solution</h1>
                
                <div className="space-y-4">
                  {/* Prompt Type Selection */}
                  <div>
                    <select 
                      value={selectedPromptType} 
                      onChange={handlePromptTypeChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select prompt type...</option>
                      <option value="company_summary">1. Company Summary for Context</option>
                      <option value="role_pain_points">2. Role-Specific Pain Points</option>
                      <option value="call_opener">3. 60-Second Call Opener</option>
                      <option value="discovery_questions">4. Discovery Questions to Qualify Fast</option>
                      <option value="objection_prep">5. Objection Prediction + Prep</option>
                      <option value="competitor_comparison">6. Competitor Comparison Points</option>
                      <option value="trend_insight">7. Trend-Based Insight Hook</option>
                      <option value="status_quo">8. Status Quo Reframe</option>
                      <option value="closing_next_steps">9. Closing with Next Steps</option>
                      <option value="precall_email">10. Pre-Call Reminder Email</option>
                    </select>
                  </div>

                  {/* Dynamic Fields */}
                  {selectedTemplate && (
                    <div className="space-y-4">
                      {selectedTemplate?.fields.map(field => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          {renderField(field)}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Generate Button */}
                  {selectedTemplate && (
                    <button 
                      onClick={generatePrompt}
                      disabled={isLoading}
                      className={`w-full py-2 px-4 rounded font-medium transition-colors ${
                        isLoading 
                          ? 'bg-gray-400 cursor-not-allowed text-white' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isLoading ? 'Generating...' : 'Generate'}
                    </button>
                  )}

                  {/* Response Textarea */}
                  {aiResponse && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Response will appear here...
                      </label>
                      <textarea
                        value={aiResponse}
                        onChange={handleAiResponseChange}
                        className="w-full h-40 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                        placeholder="Response will appear here..."
                      />
                      
                      <button 
                        onClick={addToConversation}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                      >
                        Add to Conversation →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel - Conversation */}
            <div className="w-1/2 flex flex-col bg-gray-50">
              {/* Conversation Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <h2 className="text-lg font-semibold text-gray-800">Conversation</h2>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversations.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <p>Hi, I'm interested in learning more about your solutions for digital transformation.</p>
                  </div>
                ) : (
                  conversations.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg max-w-xs ${
                        message.type === 'ai' 
                          ? 'bg-blue-100 text-blue-900 ml-auto' 
                          : 'bg-white border border-gray-200 text-gray-800'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
                    </div>
                  ))
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <textarea
                    value={clientFeedback}
                    onChange={(e) => setClientFeedback(e.target.value)}
                    placeholder="Client Latest Feedback..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="2"
                  />
                  <button
                    onClick={sendFeedback}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDetailPage;