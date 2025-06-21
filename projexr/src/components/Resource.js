import React from 'react';

const Resource = () => {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#131416] tracking-light text-[32px] font-bold leading-tight min-w-72">Resources and Implementation</p>
        </div>
        
        <h2 className="text-[#131416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Resources Used</h2>
        <p className="text-[#131416] text-base font-normal leading-normal pb-3 pt-1 px-4">
          ProjexAI leverages cutting-edge AI models to deliver its powerful capabilities. The core AI models used include:
        </p>
        
        <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
          <div className="text-[#131416] flex items-center justify-center rounded-lg bg-[#f1f2f3] shrink-0 size-12" data-icon="Robot" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-28,16v24H120V152ZM80,164a12,12,0,0,1,12-12h12v24H92A12,12,0,0,1,80,164Zm84,12H152V152h12a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#131416] text-base font-medium leading-normal line-clamp-1">Gemini 2.5</p>
            <p className="text-[#6e717c] text-sm font-normal leading-normal line-clamp-2">
              Used for natural language understanding, task automation, and generating insights from IT service data.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
          <div className="text-[#131416] flex items-center justify-center rounded-lg bg-[#f1f2f3] shrink-0 size-12" data-icon="Robot" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-28,16v24H120V152ZM80,164a12,12,0,0,1,12-12h12v24H92A12,12,0,0,1,80,164Zm84,12H152V152h12a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#131416] text-base font-medium leading-normal line-clamp-1">Grok</p>
            <p className="text-[#6e717c] text-sm font-normal leading-normal line-clamp-2">
              Employed for advanced reasoning, complex problem-solving, and providing detailed explanations for AI-driven decisions.
            </p>
          </div>
        </div>
        
        <h2 className="text-[#131416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Implementation Details</h2>
        <p className="text-[#131416] text-base font-normal leading-normal pb-3 pt-1 px-4">
          ProjexAI is built on a robust and scalable architecture to ensure reliability and performance. Key implementation details include:
        </p>
        
        <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
          <div className="text-[#131416] flex items-center justify-center rounded-lg bg-[#f1f2f3] shrink-0 size-12" data-icon="Code" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#131416] text-base font-medium leading-normal line-clamp-1">API-First Design</p>
            <p className="text-[#6e717c] text-sm font-normal leading-normal line-clamp-2">
              Ensures seamless integration with existing IT service management systems and data sources.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
          <div className="text-[#131416] flex items-center justify-center rounded-lg bg-[#f1f2f3] shrink-0 size-12" data-icon="ShieldCheck" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M208,40H48A16,16,0,0,0,32,56v58.78c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.18-13.53-4.51-80-30.69-80-109.18V56H208ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.68l50.34-50.34a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#131416] text-base font-medium leading-normal line-clamp-1">Secure Infrastructure</p>
            <p className="text-[#6e717c] text-sm font-normal leading-normal line-clamp-2">Provides a secure and compliant environment for handling sensitive IT service data.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
          <div className="text-[#131416] flex items-center justify-center rounded-lg bg-[#f1f2f3] shrink-0 size-12" data-icon="PuzzlePiece" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M220.27,158.54a8,8,0,0,0-7.7-.46,20,20,0,1,1,0-36.16A8,8,0,0,0,224,114.69V72a16,16,0,0,0-16-16H171.78a35.36,35.36,0,0,0,.22-4,36.11,36.11,0,0,0-11.36-26.24,36,36,0,0,0-60.55,23.62,36.56,36.56,0,0,0,.14,6.62H64A16,16,0,0,0,48,72v32.22a35.36,35.36,0,0,0-4-.22,36.12,36.12,0,0,0-26.24,11.36,35.7,35.7,0,0,0-9.69,27,36.08,36.08,0,0,0,33.31,33.6,35.68,35.68,0,0,0,6.62-.14V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V165.31A8,8,0,0,0,220.27,158.54ZM208,208H64V165.31a8,8,0,0,0-11.43-7.23,20,20,0,1,1,0-36.16A8,8,0,0,0,64,114.69V72h46.69a8,8,0,0,0,7.23-11.43,20,20,0,1,1,36.16,0A8,8,0,0,0,161.31,72H208v32.23a35.68,35.68,0,0,0-6.62-.14A36,36,0,0,0,204,176a35.36,35.36,0,0,0,4-.22Z"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#131416] text-base font-medium leading-normal line-clamp-1">Extensible Architecture</p>
            <p className="text-[#6e717c] text-sm font-normal leading-normal line-clamp-2">
              Allows for customization and extension of ProjexAI's capabilities to meet specific business needs.
            </p>
          </div>
        </div>
        
        <h2 className="text-[#131416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Solution Workflow</h2>
        <p className="text-[#131416] text-base font-normal leading-normal pb-3 pt-1 px-4">ProjexAI streamlines the entire workflow from prospect creation to project onboarding:</p>
        
        <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
          <div className="flex flex-col items-center gap-1 pt-3">
            <div className="text-[#131416]" data-icon="UserPlus" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M256,136a8,8,0,0,1-8,8H232v16a8,8,0,0,1-16,0V144H200a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,256,136Zm-57.87,58.85a8,8,0,0,1-12.26,10.3C165.75,181.19,138.09,168,108,168s-57.75,13.19-77.87,37.15a8,8,0,0,1-12.25-10.3c14.94-17.78,33.52-30.41,54.17-37.17a68,68,0,1,1,71.9,0C164.6,164.44,183.18,177.07,198.13,194.85ZM108,152a52,52,0,1,0-52-52A52.06,52.06,0,0,0,108,152Z"></path>
              </svg>
            </div>
            <div className="w-[1.5px] bg-[#dfdfe2] h-2 grow"></div>
          </div>
          <div className="flex flex-1 flex-col py-3">
            <p className="text-[#131416] text-base font-medium leading-normal">Prospect Creation</p>
            <p className="text-[#6e717c] text-base font-normal leading-normal">Automatically create prospect profiles from initial interactions.</p>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-[1.5px] bg-[#dfdfe2] h-2"></div>
            <div className="text-[#131416]" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <div className="w-[1.5px] bg-[#dfdfe2] h-2 grow"></div>
          </div>
          <div className="flex flex-1 flex-col py-3">
            <p className="text-[#131416] text-base font-medium leading-normal">Needs Assessment</p>
            <p className="text-[#6e717c] text-base font-normal leading-normal">Use AI to analyze prospect needs and identify pain points.</p>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-[1.5px] bg-[#dfdfe2] h-2"></div>
            <div className="text-[#131416]" data-icon="PencilLine" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM136,75.31,152.69,92,68,176.69,51.31,160ZM48,208V179.31L76.69,208Zm48-3.31L79.32,188,164,103.31,180.69,120Zm96-96L147.32,64l24-24L216,84.69Z"></path>
              </svg>
            </div>
            <div className="w-[1.5px] bg-[#dfdfe2] h-2 grow"></div>
          </div>
          <div className="flex flex-1 flex-col py-3">
            <p className="text-[#131416] text-base font-medium leading-normal">Solution Design</p>
            <p className="text-[#6e717c] text-base font-normal leading-normal">Generate tailored solution proposals and project plans.</p>
          </div>
          
          <div className="flex flex-col items-center gap-1 pb-3">
            <div className="w-[1.5px] bg-[#dfdfe2] h-2"></div>
            <div className="text-[#131416]" data-icon="CheckSquare" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM208,208V48H48V208H208Z"></path>
              </svg>
            </div>
          </div>
          <div className="flex flex-1 flex-col py-3">
            <p className="text-[#131416] text-base font-medium leading-normal">Project Onboarding</p>
            <p className="text-[#6e717c] text-base font-normal leading-normal">Seamlessly transition prospects into active projects with all necessary information.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resource; 