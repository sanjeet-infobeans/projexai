import React from 'react';

/**
 * ConversationPanel - Right panel for conversation display and input
 * Props:
 *   conversations: array of message objects
 *   clientFeedback: string
 *   setClientFeedback: function
 *   sendFeedback: function
 */
const ConversationPanel = ({
  conversations = [],
  clientFeedback = '',
  setClientFeedback,
  sendFeedback
}) => (
  <div className="w-1/2 flex flex-col bg-gray-50">
    {/* Conversation Header */}
    <div className="p-4 border-b border-gray-200 bg-white">
      <h2 className="text-lg font-semibold text-gray-800">Conversation</h2>
    </div>

    {/* Messages Area */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {Array.isArray(conversations) && conversations.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p>Hi, I'm interested in learning more about your solutions for digital transformation.</p>
        </div>
      ) : Array.isArray(conversations) ? (
        conversations.map((message, idx) => (
          <div
            key={message.id || idx}
            className={`p-3 rounded-lg max-w-xs ${
              message?.content?.startsWith('<b>Client:</b>')
                ? 'bg-white border border-gray-200 text-gray-800'
                : 'bg-blue-100 text-blue-900 ml-auto'
            }`}
          >
            <div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: message.content || message.message || JSON.stringify(message) }} />
            <div className="text-xs text-gray-500 mt-1">{message.timestamp || message.date || ''}</div>
          </div>
        ))
      ) : (
        <div className="text-center text-red-500 mt-8">
          <p>Conversation data is not an array.</p>
        </div>
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
);

export default ConversationPanel;