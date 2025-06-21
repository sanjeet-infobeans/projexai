import React, { useState } from 'react';
import TwoColLayout from './common/TwoColLayout';
import { Lightbulb, MessageCircle, FileText, Users, UserPlus2, Layers, StickyNote } from 'lucide-react';
import SmartPitcher from './SmartPitcher';
import ConversationPanel from './ConversationPanel';
import ProposalManager from './ProposalManager';
import EstimateTeam from './EstimateTeam';
import AddStakeholders from './AddStakeholders';
import SuggestTechStack from './SuggestTechStack';
import SaveNotes from './SaveNotes';

const sidebarOptions = [
  { key: 'smartPitcher', label: 'SmartPitcher', icon: <Lightbulb className="w-5 h-5" /> },
  { key: 'conversation', label: 'Conversation', icon: <MessageCircle className="w-5 h-5" /> },
  { key: 'proposal', label: 'Proposal', icon: <FileText className="w-5 h-5" /> },
  { key: 'estimateTeam', label: 'Estimate Team', icon: <Users className="w-5 h-5" /> },
  { key: 'addStakeholders', label: 'Add Stakeholders', icon: <UserPlus2 className="w-5 h-5" /> },
  { key: 'suggestTechStack', label: 'Suggest Tech Stack', icon: <Layers className="w-5 h-5" /> },
  { key: 'saveNotes', label: 'Save Notes', icon: <StickyNote className="w-5 h-5" /> },
];

const SalesConversation = () => {
  const [active, setActive] = useState('smartPitcher');

  let rightContent;
  switch (active) {
    case 'smartPitcher':
      rightContent = <SmartPitcher />;
      break;
    case 'conversation':
      rightContent = <ConversationPanel />;
      break;
    case 'proposal':
      rightContent = <ProposalManager />;
      break;
    case 'estimateTeam':
      rightContent = <EstimateTeam />;
      break;
    case 'addStakeholders':
      rightContent = <AddStakeholders />;
      break;
    case 'suggestTechStack':
      rightContent = <SuggestTechStack />;
      break;
    case 'saveNotes':
      rightContent = <SaveNotes />;
      break;
    default:
      rightContent = null;
  }

  const leftContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {sidebarOptions.map(option => (
          <button
            key={option.key}
            className={`flex items-center gap-3 px-3 py-2 rounded-full transition-colors ${active === option.key ? 'bg-[#f0f2f5] font-semibold text-[#15267d]' : 'hover:bg-gray-100 text-[#111518]'}`}
            onClick={() => setActive(option.key)}
          >
            <span className="text-[#111518]">{option.icon}</span>
            <span className="text-sm leading-normal">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <TwoColLayout
      leftContent={
        <div className="layout-content-container flex flex-col w-80">
          <div className="flex h-full min-h-[700px] flex-col justify-between bg-white p-4">
            {leftContent}
          </div>
        </div>
      }
      rightContent={rightContent}
    />
  );
};

export default SalesConversation; 