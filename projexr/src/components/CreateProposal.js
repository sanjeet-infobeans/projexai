import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { callGeminiAPI } from '../utils/gemini';

const CreateProposal = ({ client: propClient, initialContent, onSave, onProposalSaved, isNewProposal }) => {
  // Try to get client from prop or from location.state
  const location = useLocation();
  const { id } = useParams();
  const client = propClient || location.state?.client || { name: 'Client' };

  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  // Proposal content state
  const defaultContent = `
    <b>${client.title ? client.title + ' Proposal Introduction:' : ''}</b> This proposal outlines the scope of work, deliverables, and pricing for ${client.name ? `the project with ${client.name}` : 'Project Alpha'}, a comprehensive IT solution designed to enhance operational efficiency and security for your organization.<br /><br />
    <b>Scope of Work:</b> Our team will conduct a thorough assessment of your current IT infrastructure, identify areas for improvement, and implement solutions tailored to your specific needs. This includes network optimization, cybersecurity enhancements, and cloud migration strategies.<br /><br />
    <b>Deliverables:</b>
    <ul><li>Detailed assessment report</li><li>Implementation plan</li><li>Configuration documents</li><li>Training materials</li></ul>
    <b>Pricing:</b> The total cost for this project is $50,000, payable in two installments: 50% upon contract signing and 50% upon project completion.<br /><br />
    <b>Timeline:</b> The project is expected to be completed within 12 weeks from the contract signing date.<br /><br />
    <b>Conclusion:</b> We are confident that this project will deliver significant improvements to your IT infrastructure, ensuring long-term stability and growth. We look forward to the opportunity to work with you.<br /><br />
    <span class="block mt-2">Sincerely,<br />The ProjexAI Team</span>
  `;
  const [content, setContent] = useState(initialContent || defaultContent);
  const [conversationData, setConversationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const contentRef = useRef(null);

  // If initialContent changes (e.g., when switching proposals), update content
  useEffect(() => {
    setContent(initialContent || defaultContent);
    // eslint-disable-next-line
  }, [initialContent]);

  // Fetch content from API if id is available
  useEffect(() => {
    if (!id) return;
    fetch(`https://capitalmitra.com/wp-json/client/v1/conversations?post_id=${id}`)
      .then(res => res.json())
      .then(data => {
        setConversationData(data); // Save conversation API response in separate state
      })
      .catch(() => {});
  }, [id]);

  // Formatting actions
  const format = (command) => {
    document.execCommand(command, false, null);
  };

  // Helper: Convert HTML to docx Paragraphs (basic tags)
  function htmlToDocxParagraphs(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
    const root = doc.body.firstChild;
    const paragraphs = [];

    function parseNode(node, parentStyles = {}) {
      let runs = [];
      if (node.nodeType === 3) { // Text node
        if (node.textContent.trim() !== '' || node.textContent === ' ') {
          runs.push(new TextRun({
            text: node.textContent,
            bold: parentStyles.bold,
            italics: parentStyles.italics,
            underline: parentStyles.underline ? {} : undefined,
          }));
        }
      } else if (node.nodeType === 1) { // Element
        let styles = { ...parentStyles };
        if (node.tagName === 'B' || node.tagName === 'STRONG') styles.bold = true;
        if (node.tagName === 'I' || node.tagName === 'EM') styles.italics = true;
        if (node.tagName === 'U') styles.underline = true;
        if (node.tagName === 'BR') {
          runs.push(new TextRun({ text: '\n' }));
        } else if (node.tagName === 'UL') {
          // Handle unordered list
          Array.from(node.children).forEach(li => {
            if (li.tagName === 'LI') {
              paragraphs.push(new Paragraph({
                text: '• ' + li.textContent,
                bullet: { level: 0 },
              }));
            }
          });
          return;
        } else if (node.tagName === 'LI') {
          // Already handled in UL
          return;
        } else {
          node.childNodes.forEach(child => {
            runs = runs.concat(parseNode(child, styles));
          });
        }
      }
      return runs;
    }

    // Top-level: treat <div>, <p>, and text as paragraphs
    root.childNodes.forEach(child => {
      if (child.nodeType === 1 && (child.tagName === 'P' || child.tagName === 'DIV')) {
        const runs = [];
        child.childNodes.forEach(grandchild => {
          runs.push(...parseNode(grandchild));
        });
        paragraphs.push(new Paragraph({ children: runs }));
      } else if (child.nodeType === 1 && child.tagName === 'UL') {
        parseNode(child); // Will push bullet paragraphs
      } else if (child.nodeType === 3) {
        // Text node at root
        paragraphs.push(new Paragraph({ children: parseNode(child) }));
      } else if (child.nodeType === 1) {
        // Other tags (e.g., <b> at root)
        paragraphs.push(new Paragraph({ children: parseNode(child) }));
      }
    });
    return paragraphs;
  }

  // Save as Word using docx (with formatting)
  const saveAsWord = () => {
    const html = contentRef.current.innerHTML;
    const docxParagraphs = htmlToDocxParagraphs(html);
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: docxParagraphs,
        },
      ],
    });
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${client.name || 'proposal'}.docx`);
    });
  };

  // Save to DB (get HTML)
  const saveToDb = async () => {
    const html = contentRef.current.innerHTML;
    setSaving(true);
    try {
      const response = await fetch('https://capitalmitra.com/wp-json/client/v1/add-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: id,
          proposal_text: content // use Gemini response/content state
        })
      });
      const data = await response.json();
      if (data.success) {
        if (onProposalSaved) onProposalSaved(); // Notify parent to refresh proposals
      } else {
        alert('Failed to save proposal.');
      }
    } catch (err) {
      alert('Error saving proposal.');
    } finally {
      setSaving(false);
    }
  };

  const createProposal = async () => {
    if (!conversationData) return;
    setLoading(true);
    try {
      const prompt = `
You are an expert proposal generator. Based on the following client conversation data, generate a detailed Project Proposal & Costing document in the exact structure below, using markdown formatting for headings, tables, and lists. Fill in all fields using the information from the conversation. If any information is missing, leave the field blank or use a reasonable placeholder.

Client Conversation Data (JSON):
${JSON.stringify(conversationData)}

---
# Project Proposal & Costing

## 1. Project Overview

| Field            | Description                        |
|------------------|------------------------------------|
| Project Name     | [Your Project Title]               |
| Client Name      | [Client Company / Individual]      |
| Engagement Type  | Fixed Bid / Recurring (Monthly Resource Model) |
| Start Date       | [e.g., 1st July 2025]              |
| Expected Duration| [e.g., 3 months]                   |
| Project Manager  | [Name]                             |
| Tech Lead        | [Name]                             |

## 2. Scope of Work

- Brief list of deliverables
- Modules, features, APIs
- Technical responsibilities (e.g., backend, frontend, testing)

## 3. Pricing Model

### Option A: Fixed Bid Model

| Milestone   | Deliverable                | Due Date | Amount (₹) |
|-------------|----------------------------|----------|------------|
| Milestone 1 | Requirement Finalization   | [Date]   | ₹ XX,000   |
| Milestone 2 | UI/UX & Frontend Delivery | [Date]   | ₹ XX,000   |
| Milestone 3 | Backend & APIs Ready      | [Date]   | ₹ XX,000   |
| Milestone 4 | QA, UAT, & Deployment     | [Date]   | ₹ XX,000   |
| **Total Fixed Cost** |                    |          | ₹ XXX,000  |

### Option B: Recurring (Monthly Resource Model)

| Role               | Quantity | Rate (₹/Month) | Duration  | Total (₹)   |
|--------------------|----------|---------------|-----------|-------------|
| Frontend Developer | 1        | ₹ 1,20,000    | 3 months  | ₹ 3,60,000  |
| Backend Developer  | 1        | ₹ 1,30,000    | 3 months  | ₹ 3,90,000  |
| QA Engineer        | 1        | ₹ 80,000      | 2 months  | ₹ 1,60,000  |
| UI/UX Designer     | 0.5 FTE  | ₹ 70,000      | 1 month   | ₹ 35,000    |
| Project Manager    | 0.5 FTE  | ₹ 90,000      | 3 months  | ₹ 1,35,000  |
| **Total Recurring**|          |               |           | ₹ 10,80,000 |

## 4. Payment Terms

- Fixed Bid: 25% advance, rest linked to milestones
- Monthly: Billed at the beginning of each month

## 5. Assumptions & Exclusions

- Client to provide third-party credentials and assets
- Deployment support limited to [X] rounds
- No scope creep beyond defined features

## 6. Approval Section

| Approved By            | Signature | Date |
|------------------------|-----------|------|
| Client Representative  |           |      |
| Project Manager        |           |      |

---
Return only the completed proposal document in the above format, with all fields filled as per the conversation data. Do not include any explanations, greetings, or extra text.`;
      const result = await callGeminiAPI(prompt);
      setContent(result); // Save Gemini response in content state
      // No alert on success
    } catch (err) {
      alert('Error calling Gemini API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#121217] tracking-light text-[32px] font-bold leading-tight">
             {client.title}
            </p>
            <p className="text-[#656a86] text-sm font-normal leading-normal">
              Generated on {formattedDate}
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-2 px-4 py-3">
          <div className="flex gap-2">
            <button className="p-2 text-[#121217]" type="button" onClick={() => format('bold')} title="Bold" disabled={loading || saving}>
              <div className="text-[#121217]">
                {/* Bold Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M170.48,115.7A44,44,0,0,0,140,40H72a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8h80a48,48,0,0,0,18.48-92.3ZM80,56h60a28,28,0,0,1,0,56H80Zm72,136H80V128h72a32,32,0,0,1,0,64Z" />
                </svg>
              </div>
            </button>
            <button className="p-2 text-[#121217]" type="button" onClick={() => format('italic')} title="Italic" disabled={loading || saving}>
              <div className="text-[#121217]">
                {/* Italic Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M200,56a8,8,0,0,1-8,8H157.77L115.1,192H144a8,8,0,0,1,0,16H64a8,8,0,0,1,0-16H98.23L140.9,64H112a8,8,0,0,1,0-16h80A8,8,0,0,1,200,56Z" />
                </svg>
              </div>
            </button>
            <button className="p-2 text-[#121217]" type="button" onClick={() => format('underline')} title="Underline" disabled={loading || saving}>
              <div className="text-[#121217]">
                {/* Underline Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M200,224a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H192A8,8,0,0,1,200,224Zm-72-24a64.07,64.07,0,0,0,64-64V56a8,8,0,0,0-16,0v80a48,48,0,0,1-96,0V56a8,8,0,0,0-16,0v80A64.07,64.07,0,0,0,128,200Z" />
                </svg>
              </div>
            </button>
            <button className="p-2 text-[#121217]" type="button" onClick={() => format('insertUnorderedList')} title="List" disabled={loading || saving}>
              <div className="text-[#121217]">
                {/* List Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0-16H216a8,8,0,0,0,0-16Z" />
                </svg>
              </div>
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className="flex max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 bg-[#15267e] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4"
              type="button"
              onClick={saveAsWord}
              disabled={loading || saving}
            >
              <span className="truncate">Save as Word</span>
            </button>
            <button
              className={`flex max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 bg-[#0b80ee] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
              type="button"
              onClick={saveToDb}
              disabled={saving || loading}
            >
              <span className="truncate">{saving ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        </div>
        <div
          ref={contentRef}
          className="text-[#121217] text-base font-normal leading-normal pb-3 pt-1 px-4 bg-white border border-gray-200 rounded min-h-[300px] focus:outline-none"
          contentEditable
          suppressContentEditableWarning
          onInput={e => setContent(e.currentTarget.innerHTML)}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {/* Initial content is set only once, after that content is managed by state */}
          {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
        </div>
        <div className="flex justify-stretch">
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
            {/* Show Regenerate if NOT coming from New Proposal button */}
            {!isNewProposal ? (
              <button
                className={`flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f1f4] text-[#121217] text-sm font-bold leading-normal tracking-[0.015em] ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              type="button"
              onClick={createProposal}
              disabled={loading || saving}
            >
              <span className="truncate">{loading ? 'Regenerating...' : 'Regenerate'}</span>
            </button>
            ) : (
              <button
                className={`flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#15267e] text-white text-sm font-bold leading-normal tracking-[0.015em] ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              type="button"
              onClick={createProposal}
              disabled={loading || saving}
            >
              <span className="truncate">{loading ? 'Creating...' : 'Create Proposal'}</span>
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProposal;