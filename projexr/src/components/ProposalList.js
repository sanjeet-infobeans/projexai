import React from 'react';

const ProposalList = ({ proposals, onSelect, onView, onNew, selectedId }) => (
  <div className="w-full h-full border-gray-200 bg-white p-4 overflow-y-auto">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold">Proposals</h2>
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700"
        onClick={onNew}
      >
        New Proposal
      </button>
    </div>
    <ul className="space-y-2">
      {proposals.map((proposal) => (
        <li key={proposal.id} className="flex items-center justify-between">
          <button
            className={`flex-1 text-left px-3 py-2 rounded-lg transition-colors ${selectedId === proposal.id ? 'bg-blue-100 text-blue-800 font-semibold' : 'hover:bg-gray-100 text-gray-800'}`}
            onClick={() => onSelect(proposal.id)}
          >
            <div className="text-base">{proposal.title}</div>
            <div className="text-xs text-gray-500">Last modified: {new Date(proposal.lastModified).toLocaleString()}</div>
          </button>
          <button
            className="ml-2 px-2 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => onView(proposal.id)}
          >
            View
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default ProposalList; 