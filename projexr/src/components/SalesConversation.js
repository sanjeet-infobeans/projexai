import React, { useState, useContext, useEffect } from 'react';
import { authFetch } from '../utils/authFetch';
import { AuthContext } from '../context/AuthContext';
import TwoColLayout from './common/TwoColLayout';
import { Lightbulb, MessageCircle, FileText, Users, UserPlus2, Layers, StickyNote } from 'lucide-react';
import { useParams, useLocation } from 'react-router-dom';
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
  { key: 'addStakeholders', label: 'Add Stakeholders', icon: <UserPlus2 className="w-5 h-5" /> },
  { key: 'suggestTechStack', label: 'Suggest Tech Stack', icon: <Layers className="w-5 h-5" /> },
  { key: 'proposal', label: 'Proposal', icon: <FileText className="w-5 h-5" /> },
  { key: 'estimateTeam', label: 'Estimate Team', icon: <Users className="w-5 h-5" /> },
  { key: 'saveNotes', label: 'Save Notes', icon: <StickyNote className="w-5 h-5" /> },
];

const SalesConversation = () => {
  const [active, setActive] = useState('smartPitcher');
  const { id } = useParams();
  const location = useLocation();
  const client = location.state?.client;
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [clientFeedback, setClientFeedback] = useState('');

  // Move fetchConversations outside useEffect for reuse
  const fetchConversations = async () => {
    try {
      const response = await authFetch(`https://capitalmitra.com/wp-json/client/v1/conversations?post_id=${id}`);
      if (!response.ok) throw new Error('Failed to fetch conversations');
      const data = await response.json();
      setConversations(data.conversations || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setConversations([]);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchConversations();
  }, [id]);

  const sendFeedback = async () => {
    if (!clientFeedback.trim()) return;
    try {
      const response = await authFetch(
        'https://capitalmitra.com/wp-json/client/v1/conversation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-conversation-secret': 'projexai-lead-conversation',
          },
          body: JSON.stringify({
            post: parseInt(id, 10),
            author_name: user?.username,
            author_email: user?.user_email,
            content: `Client: ${clientFeedback}`,
          }),
        }
      );
      if (!response.ok) throw new Error('Failed to post feedback');
      setClientFeedback('');
      fetchConversations(); // Refresh conversations after posting
    } catch (error) {
      console.error('Error posting feedback:', error);
    }
  };

  let rightContent;
  switch (active) {
    case 'smartPitcher':
      rightContent = <SmartPitcher client={client} clientId={id} userName={user?.username} userEmail={user?.user_email} />;
      break;
    case 'conversation':
      rightContent = <ConversationPanel conversations={conversations} clientFeedback={clientFeedback} setClientFeedback={setClientFeedback} sendFeedback={sendFeedback} />;
      break;
    case 'addStakeholders':
      rightContent = <AddStakeholders />;
      break;
    case 'suggestTechStack':
      rightContent = <SuggestTechStack />;
      break;
    case 'proposal':
      rightContent = <ProposalManager />;
      break;
    case 'estimateTeam':
      rightContent = <EstimateTeam />;
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
          <div className="flex h-full flex-col justify-between bg-white p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b gray-500 pb-2">{client.client_name}</h1>
            {leftContent}
          </div>
        </div>
      }
      rightContent={rightContent}
    />
  );
};

export default SalesConversation;