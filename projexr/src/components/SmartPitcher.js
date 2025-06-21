import React, { useState } from 'react';
import SolutionFormPanel from './SolutionFormPanel';

const SmartPitcher = () => {
  // Demo state for SolutionFormPanel
  const [selectedPromptType, setSelectedPromptType] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  // Example prompt templates
  const promptTemplates = {
    company_summary: {
      fields: [
        { name: 'company_name', label: 'Company Name', type: 'text', required: true },
        { name: 'industry', label: 'Industry', type: 'text', required: true },
        { name: 'size', label: 'Company Size', type: 'text', required: false }
      ]
    },
    // ... add more templates as needed
  };

  const handlePromptTypeChange = (e) => {
    const type = e.target.value;
    setSelectedPromptType(type);
    setSelectedTemplate(type ? promptTemplates[type] : null);
    setAiResponse('');
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            rows="3"
          />
        );
      default:
        return (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  const generatePrompt = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setAiResponse(`Generated response for ${selectedPromptType}`);
      setIsLoading(false);
    }, 1000);
  };

  const handleAiResponseChange = (e) => {
    setAiResponse(e.target.value);
  };

  const addToConversation = () => {
    // Demo: just clear the response
    setAiResponse('');
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