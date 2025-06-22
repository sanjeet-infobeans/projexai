import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProposalList from './ProposalList';
import ProposalEditor from './ProposalEditor';

const ProposalManager = () => {
  const { id } = useParams();
  const [proposals, setProposals] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [isNewProposal, setIsNewProposal] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedProposal = proposals.find(p => p.id === selectedId);

  // Fetch proposals from API based on ID from URL
  const fetchProposals = () => {
    if (!id) return;
    setLoading(true);
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
      .catch(() => setProposals([]))
      .finally(() => setLoading(false));
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
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-2"></span>
          <span className="text-gray-700 text-base">Loading proposals...</span>
        </div>
      ) : (
        selectedId === null ? (
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
            onProposalSaved={fetchProposals}
          />
        )
      )}
    </div>
  );
};

export default ProposalManager;