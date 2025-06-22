import React, { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { callGeminiAPI } from "../utils/gemini";

const SuggestTechStack = () => {
  const location = useLocation();
  const { id } = useParams();
  const [conversations, setConversations] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [geminiResponse, setGeminiResponse] = useState("");
  const [loadingGemini, setLoadingGemini] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(null);

  useEffect(() => {
    let didCancel = false;
    const fetchConversations = async () => {
      if (!id) return;
      try {
        const response = await authFetch(
          `https://capitalmitra.com/wp-json/client/v1/conversations?post_id=${id}`
        );
        const data = await response.json();
        if (!didCancel) {
          setConversations([{ clientId: id, data }]);
          // console.log('Conversations:', data);
        }
      } catch (err) {
        if (!didCancel) {
          console.error("Error fetching conversations:", err);
        }
      }
    };
    const fetchTechnologies = async () => {
      try {
        const response = await authFetch(
          "https://capitalmitra.com/wp-json/wp/v2/technology"
        );
        const data = await response.json();
        if (!didCancel) {
          setTechnologies(data);
          // console.log('Technologies:', data);
        }
      } catch (err) {
        if (!didCancel) {
          console.error("Error fetching technologies:", err);
        }
      }
    };
    if (id) {
      fetchConversations();
    }
    fetchTechnologies();
    return () => {
      didCancel = true;
    };
  }, [id]);

  // Helper to extract bullet points from conversations and technologies as plain text
  const conversationContents = conversations
    .flatMap((conv) => conv.data?.conversations || [])
    .map((item) => item.content)
    .filter(Boolean);

  const technologyNames = technologies.map((tech) => tech.name).filter(Boolean);

  // Handler for Suggest TechStack button
  const handleSuggestTechStack = async () => {
    if (!conversationContents.length && !technologyNames.length) return;
    setLoadingGemini(true);
  
    const prompt = `You are an experienced enterprise IT consultant working within InfoBeans' services. Your output must be only the 3 best suitable service-based solutions under InfoBeans' offerings. Use the exact format below with no additional text, introductions, or conclusions.
  
  Use only these solution categories:
  - ServiceNow
  - Salesforce
  - Custom Development
  - Mobile Applications
  - eCommerce
  
  For each solution, populate with realistic, context-appropriate technologies, skills, and cost/time estimates based on enterprise project delivery.
  
  Output must be strictly in the following format for 3 solutions:
  
  <div class="">
    <h2 class="text-[#121217] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
      Solution 1
    </h2>
    <div class="p-4 grid grid-cols-[20%_1fr] gap-x-6">
      <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
        <p class="text-[#656a86] text-sm font-normal leading-normal">
          Service
        </p>
        <p class="text-[#121217] text-sm font-normal leading-normal">
          Salesforce
        </p>
      </div>
      <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
        <p class="text-[#656a86] text-sm font-normal leading-normal">Tech Stack</p>
        <p class="text-[#121217] text-sm font-normal leading-normal">
          Salesforce Lightning, Apex, Visualforce, Salesforce CRM APIs
        </p>
      </div>
      <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
        <p class="text-[#656a86] text-sm font-normal leading-normal">Quality</p>
        <p class="text-[#121217] text-sm font-normal leading-normal">4.7/5</p>
      </div>
      <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
        <p class="text-[#656a86] text-sm font-normal leading-normal">Price</p>
        <p class="text-[#121217] text-sm font-normal leading-normal">
          $120,000 - $180,000
        </p>
      </div>
      <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
        <p class="text-[#656a86] text-sm font-normal leading-normal">
          Team Size
        </p>
        <p class="text-[#121217] text-sm font-normal leading-normal">4 Members</p>
      </div>
      <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
        <p class="text-[#656a86] text-sm font-normal leading-normal">Time</p>
        <p class="text-[#121217] text-sm font-normal leading-normal">
          4–6 months
        </p>
      </div>
    </div>
    <div class="flex px-4 py-3 justify-start">
      <button id="select-solution-1" class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#15267e] text-white text-sm font-bold leading-normal tracking-[0.015em]">
        <span class="truncate">Select Solution 1</span>
      </button>
    </div>
  </div>
  
  Conversation/Requirements:
  ${conversationContents.map((c) => `- ${c}`).join("\n")}
  
  Available Technologies/Constraints:
  ${technologyNames.map((t) => `- ${t}`).join("\n")}
  
  Only show 3 solutions. Do not include markdown syntax (e.g., '''html). Generate only the raw HTML.`;
  
    const response = await callGeminiAPI(prompt);
    setGeminiResponse(response);
    setLoadingGemini(false);
  };
  

  // Helper to clean Gemini response of markdown code block wrappers
  function cleanGeminiResponse(response) {
    if (!response) return "";
    // Remove ```html ... ``` or ``` ... ``` wrappers
    return response.replace(/^```html[\r\n]+|^```[\r\n]+|```$/gim, "").trim();
  }

  // Handler for solution select button click
  const handleSelectSolution = (solutionNumber) => {
    setSelectedSolution(solutionNumber);
    // Update button classes and texts in the DOM
    for (let i = 1; i <= 3; i++) {
      const btn = document.getElementById(`select-solution-${i}`);
      if (btn) {
        if (i === solutionNumber) {
          btn.classList.add('selected');
        } else {
          btn.classList.remove('selected');
        }
        const span = btn.querySelector('span');
        if (span) {
          span.textContent = i === solutionNumber ? 'Selected' : `Select Solution ${i}`;
        }
      }
    }
  };

  // Effect to update button class and text in the rendered Gemini HTML
  useEffect(() => {
    if (!geminiResponse) return;
    for (let i = 1; i <= 3; i++) {
      const btn = document.getElementById(`select-solution-${i}`);
      if (btn) {
        if (selectedSolution === i) {
          btn.classList.add('selected');
        } else {
          btn.classList.remove('selected');
        }
        const span = btn.querySelector('span');
        if (span) {
          span.textContent = selectedSolution === i ? 'Selected' : `Select Solution ${i}`;
        }
      }
    }
  }, [selectedSolution, geminiResponse]);

  return (
    <div className="px-10 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#121217] tracking-light text-[32px] font-bold leading-tight min-w-72">
            Compare Solutions
          </p>
          <button
            className={`flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#15267e] text-white text-sm font-bold leading-normal tracking-[0.015em] ${
                loadingGemini 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            onClick={handleSuggestTechStack}
            disabled={loadingGemini}
          >
            <span className="truncate">
              {loadingGemini ? "Generating..." : "Suggest TechStack"}
            </span>
          </button>
        </div>

        {geminiResponse && (
          <div className="geminiresponse-container">
            <div
              dangerouslySetInnerHTML={{
                __html: cleanGeminiResponse(geminiResponse),
              }}
              onClick={(e) => {
                // Delegate click for solution select buttons
                const btn = e.target.closest('button[id^="select-solution-"]');
                if (btn && btn.id) {
                  const match = btn.id.match(/select-solution-(\d+)/);
                  if (match) {
                    handleSelectSolution(Number(match[1]));
                  }
                }
              }}
            />
            {/* Style override for selected button */}
            <style>{`
              .geminiresponse-container button.selected {
                background: #22c55e !important;
                color: #fff !important;
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestTechStack;
