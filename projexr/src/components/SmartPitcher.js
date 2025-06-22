import React, { useState, useEffect } from 'react';
import SolutionFormPanel from './SolutionFormPanel';
import { authFetch } from '../utils/authFetch';

const SmartPitcher = ({ client, clientId, userName, userEmail }) => {
  // Demo state for SolutionFormPanel
  const [selectedPromptType, setSelectedPromptType] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    websiteURL: '',
  });
  
  // Set formData when client changes, but only if the field is empty (so user input is not overwritten)
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      companyName: prev.companyName || client?.client_name || '',
      websiteURL: prev.websiteURL || client?.website || '',
    }));
  }, [client]);

  const [generatedPrompt, setGeneratedPrompt] = useState('');
// console.log('SmartPitcher component initialized with client:', client);
  // Prompt templates and their required fields
  const promptTemplates = {
    company_summary: {
      fields: [
        {
          name: 'companyName',
          label: 'Company Name',
          type: 'text',
          placeholder: 'Enter company nameeee',
          required: true
        },
        {
          name: 'websiteURL',
          label: 'Website URL',
          type: 'url',
          placeholder: 'https://example.com',
          required: true
        }
      ],
      template: `Act as my sales research assistant. I’m meeting with **{companyName}**. Go through their website: **{websiteURL}**, and summarize what they do, who they serve, and what makes them unique. Give me 4–5 short bullets I can use to open the call with insight and context — not fluff.`
    },
    role_pain_points: {
      fields: [
        { name: 'jobTitle', label: 'Job Title/Role', type: 'text', placeholder: 'e.g., VP of Sales, Marketing Director', required: true },
        { name: 'industry', label: 'Industry', type: 'text', placeholder: 'e.g., SaaS, Manufacturing', required: true },
        { name: 'companyType', label: 'Company Type', type: 'text', placeholder: 'e.g., Medical, Technology', required: true }
      ],
      template: `I’m speaking with a {jobTitle} at a **{companyType}** in **{industry}**. Give me 5 specific business problems or friction points they’re likely facing in 2024. Phrase each one in natural language I can use to build credibility and spark conversation in the call.`
    },
    call_opener: {
      fields: [
        { name: 'product', label: 'Product', type: 'text', placeholder: 'Enter product name', required: true }
      ],
      template: `Write a confident, non-cringey call opener I can use at the start of a discovery call. I sell **{product}**. Help me briefly position myself, explain the goal of the call, and make the prospect feel like it’s a two-way conversation — all in under 60 seconds.`
    },
    discovery_questions: {
      fields: [
        { name: 'industry', label: 'Industry', type: 'text', placeholder: 'e.g., Healthcare, FinTech', required: true },
        { name: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'e.g., Sales Manager, Product Owner', required: true }
      ],
      template: `Give me 10 sharp discovery questions for a **{jobTitle}** in **{industry}** that help me uncover pain, urgency, budget, and fit — fast. These should feel natural and insightful, not like I’m reading from a script.`
    },
    objection_prep: {
      fields: [
        { name: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'e.g., Sales Manager, Product Owner', required: true },
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
        { name: 'productCategory', label: 'Product Category', type: 'text', placeholder: 'e.g., CRM, Marketing Automation', required: true }
      ],
      template: `Create a short talk track I can use when a prospect says, We are fine right now. I want to reframe that mindset, and show how top companies using **{productCategory}** improve, even if things are not broken.`
    },
    closing_next_steps: {
      fields: [],
      template: `Give me 3 ways to end a call where there is interest — so I can confidently suggest next steps like a demo, pricing call, or looping in decision-makers, without sounding pushy.`
    },
    precall_email: {
      fields: [],
      template: `Write a short email I can send the day before a scheduled call. Confirm the time, preview the agenda in one line, and set a professional tone so they show up ready.`
    }
  };

  // When prompt type changes, prefill formData with client info for relevant fields
  const handlePromptTypeChange = (e) => {
    const type = e.target.value;
    setSelectedPromptType(type);
    setSelectedTemplate(type ? promptTemplates[type] : null);
    // Prefill formData for company_summary
      setFormData({
        companyName: client?.client_name || '',
        websiteURL: client?.website_url || '',
        industry: client?.industry || '',
      });
    setAiResponse('');
    setGeneratedPrompt('');
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
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

  const handleAiResponseChange = (e) => {
    setAiResponse(e.target.value);
  };

  const addToConversation = async () => {
    try {
      await authFetch(
        'https://capitalmitra.com/wp-json/client/v1/conversation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-conversation-secret': 'projexai-lead-conversation',
          },
          body: JSON.stringify({
            post: parseInt(clientId, 10), // Ensure clientId is always an integer
            author_name: userName,
            author_email: userEmail,
            content: `${userName}: ${aiResponse}`
          }),
        }
      );
      setAiResponse(''); // Optionally clear response
      // Optionally show success message
    } catch (error) {
      console.error('Error posting conversation:', error);
      // Optionally show error message
    }
  };

  return (
    <SolutionFormPanel
      selectedPromptType={selectedPromptType}
      handlePromptTypeChange={handlePromptTypeChange}
      selectedTemplate={selectedTemplate}
      renderField={renderField}
      generatePrompt={generatePrompt}
      isLoading={isLoading}
      aiResponse={aiResponse}
      handleAiResponseChange={handleAiResponseChange}
      addToConversation={addToConversation}
    />
  );
};

export default SmartPitcher;