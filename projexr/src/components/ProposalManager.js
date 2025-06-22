import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProposalList from './ProposalList';
import ProposalEditor from './ProposalEditor';

// Sample proposals JSON
// const sampleProposals = [
//   {
//     id: 1,
//     title: 'Proposal for Project Alpha',
//     content: `<b>Project Alpha Proposal Introduction:</b> This proposal outlines the scope of work, deliverables, and pricing for Project Alpha, a comprehensive IT solution designed to enhance operational efficiency and security for your organization.<br /><br /><b>Scope of Work:</b> ...`,
//     lastModified: '2024-07-20T10:30:00Z',
//     client: { name: 'Acme Corp' },
//   },
//   {
//     id: 2,
//     title: 'Proposal for Project Beta',
//     content: `<b>Project Beta Proposal Introduction:</b> This proposal outlines the scope of work, deliverables, and pricing for Project Beta, a cloud migration project for Beta Inc.<br /><br /><b>Scope of Work:</b> ...`,
//     lastModified: '2024-07-18T15:45:00Z',
//     client: { name: 'Beta Inc' },
//   },
//   {
//     id: 3,
//     title: 'Proposal for Project Gamma',
//     content: `<b>Project Gamma Proposal Introduction:</b> This proposal outlines the scope of work, deliverables, and pricing for Project Gamma, a cybersecurity enhancement for Gamma LLC.<br /><br /><b>Scope of Work:</b> ...`,
//     lastModified: '2024-07-10T09:00:00Z',
//     client: { name: 'Gamma LLC' },
//   },
// ];

const ProposalManager = () => {
  const { id } = useParams();
  const [proposals, setProposals] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [isNewProposal, setIsNewProposal] = useState(false);

  const selectedProposal = proposals.find(p => p.id === selectedId);

  // Fetch proposals from API based on ID from URL
  const fetchProposals = () => {
    if (!id) return;
    fetch(`https://capitalmitra.com/wp-json/client/v1/proposals?post_id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.proposals) {
          const proposalsArr = Object.keys(data.proposals)
            .filter(key => key.startsWith('proposal_') && !key.endsWith('_modified_on'))
            .map((key, idx) => {
              const content = data.proposals[key];
              const modifiedKey = `${key}_modified_on`;
              const lastModified = data.proposals[modifiedKey]
                ? new Date(parseInt(data.proposals[modifiedKey], 10) * 1000).toISOString()
                : '';
              return {
                id: idx + 1,
                title: `Proposal ${idx + 1}`,
                content,
                lastModified,
              };
            });
          setProposals(proposalsArr);
        } else {
          setProposals([]);
        }
      })
      .catch(() => setProposals([]));
  };

  useEffect(() => {
    fetchProposals();
  }, [id]);

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
    if (proposals.length >= 3) {
      alert('You can only create up to 3 proposals.');
      return;
    }
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
    setIsNewProposal(true);
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
    if (isNewProposal) {
      setProposals(prev => prev.slice(1)); // Remove the latest (first) entry
      setIsNewProposal(false);
    }
    setSelectedId(null);
    setViewMode(false);
    fetchProposals(); // Refresh proposals from API
  };

  return (
    <div className="w-full h-full">
      {/* Show list or editor */}
      {selectedId === null ? (
        <ProposalList
          proposals={proposals}
          onSelect={handleSelect}
          onView={handleView}
          onNew={proposals.length >= 3 ? undefined : handleNewProposal}
          selectedId={selectedId}
        />
      ) : (
        <ProposalEditor
          proposal={selectedProposal}
          viewMode={viewMode}
          onBack={handleBack}
          onSave={handleSave}
          onEdit={handleEdit}
          onProposalSaved={fetchProposals}
        />
      )}
    </div>
  );
};

export default ProposalManager;