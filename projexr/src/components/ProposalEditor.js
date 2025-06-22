import React from 'react';
import CreateProposal from './CreateProposal';

const ProposalEditor = ({ proposal, viewMode, onBack, onSave, onEdit }) => {
  if (!proposal) return null;

  return (
    <div className="w-full h-full">
      {viewMode ? (
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#121217] tracking-light text-[32px] font-bold leading-tight">
                  {proposal.title}
                </p>
                <p className="text-[#656a86] text-sm font-normal leading-normal">
                  Last modified: {new Date(proposal.lastModified).toLocaleString()}
                </p>
              </div>
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-medium hover:bg-gray-300"
                onClick={onBack}
              >
                Back
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded p-6 min-h-[300px]">
              <div className="text-[#121217] text-base font-normal leading-normal" dangerouslySetInnerHTML={{ __html: proposal.content }} />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
                onClick={onEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between px-40 pt-5">
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-medium hover:bg-gray-300 mb-4"
              onClick={onBack}
            >
              Back
            </button>
          </div>
          <CreateProposal
            client={proposal}
            initialContent={proposal.content}
            onSave={onSave}
            isNewProposal={proposal && proposal.title && proposal.title.startsWith('Proposal for New Project')}
          />
        </div>
      )}
    </div>
  );
};

export default ProposalEditor;