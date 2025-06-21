import React, { useState } from 'react';
import ProposalList from './ProposalList';
import ProposalEditor from './ProposalEditor';

// Sample proposals JSON
const sampleProposals = [
  {
    id: 1,
    title: 'Proposal for Project Alpha',
    content: `<b>Project Alpha Proposal Introduction:</b> This proposal outlines the scope of work, deliverables, and pricing for Project Alpha, a comprehensive IT solution designed to enhance operational efficiency and security for your organization.<br /><br /><b>Scope of Work:</b> ...`,
    lastModified: '2024-07-20T10:30:00Z',
    client: { name: 'Acme Corp' },
  },
  {
    id: 2,
    title: 'Proposal for Project Beta',
    content: `<b>Project Beta Proposal Introduction:</b> This proposal outlines the scope of work, deliverables, and pricing for Project Beta, a cloud migration project for Beta Inc.<br /><br /><b>Scope of Work:</b> ...`,
    lastModified: '2024-07-18T15:45:00Z',
    client: { name: 'Beta Inc' },
  },
  {
    id: 3,
    title: 'Proposal for Project Gamma',
    content: `<b>Project Gamma Proposal Introduction:</b> This proposal outlines the scope of work, deliverables, and pricing for Project Gamma, a cybersecurity enhancement for Gamma LLC.<br /><br /><b>Scope of Work:</b> ...`,
    lastModified: '2024-07-10T09:00:00Z',
    client: { name: 'Gamma LLC' },
  },
];

const ProposalManager = () => {
  const [proposals, setProposals] = useState(sampleProposals);
  const [selectedId, setSelectedId] = useState(null);
  const [viewMode, setViewMode] = useState(false);

  const selectedProposal = proposals.find(p => p.id === selectedId);

  // Handler to update proposal content (simulate save)
  const handleSave = (newContent) => {
    setProposals(proposals.map(p =>
      p.id === selectedId
        ? { ...p, content: newContent, lastModified: new Date().toISOString() }
        : p
    ));
  };

  // Handler to add a new proposal
  const handleNewProposal = () => {
    const newId = proposals.length ? Math.max(...proposals.map(p => p.id)) + 1 : 1;
    const newProposal = {
      id: newId,
      title: `Proposal for New Project ${newId}`,
      content: '<b>New Proposal Introduction:</b> ...',
      lastModified: new Date().toISOString(),
      client: { name: `Client ${newId}` },
    };
    setProposals([newProposal, ...proposals]);
    setSelectedId(newId);
    setViewMode(false);
  };

  // Handler to view a proposal (read-only)
  const handleView = (id) => {
    setSelectedId(id);
    setViewMode(true);
  };

  // Handler to edit a proposal
  const handleEdit = () => {
    setViewMode(false);
  };

  // Handler to select a proposal for editing
  const handleSelect = (id) => {
    setSelectedId(id);
    setViewMode(false);
  };

  // Handler to go back to list
  const handleBack = () => {
    setSelectedId(null);
    setViewMode(false);
  };

  return (
    <div className="w-full h-full">
      {/* Show list or editor */}
      {selectedId === null ? (
        <ProposalList
          proposals={proposals}
          onSelect={handleSelect}
          onView={handleView}
          onNew={handleNewProposal}
          selectedId={selectedId}
        />
      ) : (
        <ProposalEditor
          proposal={selectedProposal}
          viewMode={viewMode}
          onBack={handleBack}
          onSave={handleSave}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default ProposalManager; 