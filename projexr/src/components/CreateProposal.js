import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

const CreateProposal = ({ client: propClient, initialContent, onSave }) => {
  // Try to get client from prop or from location.state
  const location = useLocation();
  const client = propClient || location.state?.client || { name: 'Client' };

  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  // Proposal content state
  const defaultContent = `
    <b>${client.name ? client.name + ' Proposal Introduction:' : ''}</b> This proposal outlines the scope of work, deliverables, and pricing for ${client.name ? `the project with ${client.name}` : 'Project Alpha'}, a comprehensive IT solution designed to enhance operational efficiency and security for your organization.<br /><br />
    <b>Scope of Work:</b> Our team will conduct a thorough assessment of your current IT infrastructure, identify areas for improvement, and implement solutions tailored to your specific needs. This includes network optimization, cybersecurity enhancements, and cloud migration strategies.<br /><br />
    <b>Deliverables:</b>
    <ul><li>Detailed assessment report</li><li>Implementation plan</li><li>Configuration documents</li><li>Training materials</li></ul>
    <b>Pricing:</b> The total cost for this project is $50,000, payable in two installments: 50% upon contract signing and 50% upon project completion.<br /><br />
    <b>Timeline:</b> The project is expected to be completed within 12 weeks from the contract signing date.<br /><br />
    <b>Conclusion:</b> We are confident that this project will deliver significant improvements to your IT infrastructure, ensuring long-term stability and growth. We look forward to the opportunity to work with you.<br /><br />
    <span class="block mt-2">Sincerely,<br />The ProjexAI Team</span>
  `;
  const [content, setContent] = useState(initialContent || defaultContent);
  const contentRef = useRef(null);

  // If initialContent changes (e.g., when switching proposals), update content
  useEffect(() => {
    setContent(initialContent || defaultContent);
    // eslint-disable-next-line
  }, [initialContent]);

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
  const saveToDb = () => {
    const html = contentRef.current.innerHTML;
    if (onSave) {
      onSave(html);
    } else {
      // Here you would send 'html' to your backend API
      alert('HTML to save to DB:\n' + html);
    }
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#121217] tracking-light text-[32px] font-bold leading-tight">
              Proposal for {client.name ? `Project for ${client.name}` : 'Project Alpha'}
            </p>
            <p className="text-[#656a86] text-sm font-normal leading-normal">
              Generated on {formattedDate}
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-2 px-4 py-3">
          <div className="flex gap-2">
            <button className="p-2 text-[#121217]" type="button" onClick={() => format('bold')} title="Bold">
              <div className="text-[#121217]">
                {/* Bold Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M170.48,115.7A44,44,0,0,0,140,40H72a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8h80a48,48,0,0,0,18.48-92.3ZM80,56h60a28,28,0,0,1,0,56H80Zm72,136H80V128h72a32,32,0,0,1,0,64Z" />
                </svg>
              </div>
            </button>
            <button className="p-2 text-[#121217]" type="button" onClick={() => format('italic')} title="Italic">
              <div className="text-[#121217]">
                {/* Italic Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M200,56a8,8,0,0,1-8,8H157.77L115.1,192H144a8,8,0,0,1,0,16H64a8,8,0,0,1,0-16H98.23L140.9,64H112a8,8,0,0,1,0-16h80A8,8,0,0,1,200,56Z" />
                </svg>
              </div>
            </button>
            <button className="p-2 text-[#121217]" type="button" onClick={() => format('underline')} title="Underline">
              <div className="text-[#121217]">
                {/* Underline Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M200,224a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H192A8,8,0,0,1,200,224Zm-72-24a64.07,64.07,0,0,0,64-64V56a8,8,0,0,0-16,0v80a48,48,0,0,1-96,0V56a8,8,0,0,0-16,0v80A64.07,64.07,0,0,0,128,200Z" />
                </svg>
              </div>
            </button>
            <button className="p-2 text-[#121217]" type="button" onClick={() => format('insertUnorderedList')} title="List">
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
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#15267e] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4"
              type="button"
              onClick={saveAsWord}
            >
              <span className="truncate">Save as Word</span>
            </button>
            <button
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#0b80ee] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4"
              type="button"
              onClick={saveToDb}
            >
              <span className="truncate">Save</span>
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
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0f1f4] text-[#121217] text-sm font-bold leading-normal tracking-[0.015em]"
              type="button"
              onClick={() => setContent(defaultContent)}
            >
              <span className="truncate">Regenerate</span>
            </button>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#15267e] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              type="button"
              onClick={saveToDb}
            >
              <span className="truncate">Create Proposal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProposal; 