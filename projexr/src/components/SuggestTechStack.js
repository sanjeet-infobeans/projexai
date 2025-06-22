import React, { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { callGeminiAPI } from "../utils/gemini";

const sampleSolutions = [
  {
    name: "Solution 1",
    techStack: "Python, Django, PostgreSQL",
    quality: "4.5/5",
    price: "$100,000 - $200,000",
    confidence: "9/10",
    time: "6-12 months",
  },
  {
    name: "Solution 2",
    techStack: "Java, Spring Boot, MySQL",
    quality: "4.2/5",
    price: "$150,000 - $250,000",
    confidence: "8/10",
    time: "9-15 months",
  },
  {
    name: "Solution 3",
    techStack: "Node.js, Express, MongoDB",
    quality: "4.0/5",
    price: "$80,000 - $150,000",
    confidence: "7/10",
    time: "4-8 months",
  },
];

const SuggestTechStack = () => {
  const location = useLocation();
  const { id } = useParams();
  const [conversations, setConversations] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [geminiResponse, setGeminiResponse] = useState("");
  const [loadingGemini, setLoadingGemini] = useState(false);

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
    const prompt = `You are an experienced technical consultant. Your output must be only the 3 best suitable technical solutions, formatted exactly as specified below, with no additional text, introductions, or conclusions.
Propose the top 3 most suitable technical solutions for a client project. For each solution, provide output in below format:
<div class="">
  <h2 class="text-[#121217] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
    Solution 1
  </h2>
  <div class="p-4 grid grid-cols-[20%_1fr] gap-x-6">
    <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
      <p class="text-[#656a86] text-sm font-normal leading-normal">
        Tech Stack
      </p>
      <p class="text-[#121217] text-sm font-normal leading-normal">
        Python, Django, PostgreSQL
      </p>
    </div>
    <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
      <p class="text-[#656a86] text-sm font-normal leading-normal">Quality</p>
      <p class="text-[#121217] text-sm font-normal leading-normal">4.5/5</p>
    </div>
    <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
      <p class="text-[#656a86] text-sm font-normal leading-normal">Price</p>
      <p class="text-[#121217] text-sm font-normal leading-normal">
        $100,000 - $200,000
      </p>
    </div>
    <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
      <p class="text-[#656a86] text-sm font-normal leading-normal">
        Team Size
      </p>
      <p class="text-[#121217] text-sm font-normal leading-normal">5 Members</p>
    </div>
    <div class="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
      <p class="text-[#656a86] text-sm font-normal leading-normal">Time</p>
      <p class="text-[#121217] text-sm font-normal leading-normal">
        6-12 months
      </p>
    </div>
  </div>
  <div class="flex px-4 py-3 justify-start">
    <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#15267e] text-white text-sm font-bold leading-normal tracking-[0.015em]">
      <span class="truncate">Select Solution 1</span>
    </button>
  </div>
</div>
Conversation/Requirements:\n${conversationContents
      .map((c) => `- ${c}`)
      .join("\n")}\n\nAvailable Technologies/Constraints:\n${technologyNames
      .map((t) => `- ${t}`)
      .join(
        "\n"
      )}\n\nStrictly provide only the 3 solutions. Generate only the raw HTML content. Do not include markdown code block syntax (e.g., '''html).`;
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

  return (
    <div className="px-10 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#121217] tracking-light text-[32px] font-bold leading-tight min-w-72">
            Compare Solutions
          </p>
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#15267e] text-white text-sm font-bold leading-normal tracking-[0.015em]"
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
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestTechStack;
