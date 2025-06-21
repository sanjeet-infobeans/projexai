import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SolutionFormPanel - Left panel for solution generation
 * Props:
 *   selectedPromptType, handlePromptTypeChange, selectedTemplate, renderField,
 *   generatePrompt, isLoading, aiResponse, handleAiResponseChange, addToConversation
 */
const SolutionFormPanel = ({
  selectedPromptType,
  handlePromptTypeChange,
  selectedTemplate,
  renderField,
  generatePrompt,
  isLoading,
  aiResponse,
  handleAiResponseChange,
  addToConversation
}) => {
  const location = useLocation();
  const client = location.state?.client;

  return (
  <div className="w p-12 border-r border-gray-200">
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Client: {client.client_name}</h1>
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
)}

export default SolutionFormPanel; 