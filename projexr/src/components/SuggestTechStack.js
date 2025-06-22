import React from 'react';

const sampleSolutions = [
  {
    name: 'Solution 1',
    techStack: 'Python, Django, PostgreSQL',
    quality: '4.5/5',
    price: '$100,000 - $200,000',
    confidence: '9/10',
    time: '6-12 months',
  },
  {
    name: 'Solution 2',
    techStack: 'Java, Spring Boot, MySQL',
    quality: '4.2/5',
    price: '$150,000 - $250,000',
    confidence: '8/10',
    time: '9-15 months',
  },
  {
    name: 'Solution 3',
    techStack: 'Node.js, Express, MongoDB',
    quality: '4.0/5',
    price: '$80,000 - $150,000',
    confidence: '7/10',
    time: '4-8 months',
  },
];

const SuggestTechStack = () => {
  return (
    <div className="px-10 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#121217] tracking-light text-[32px] font-bold leading-tight min-w-72">Compare Solutions</p>
        </div>
        {sampleSolutions.map((solution, idx) => (
          <React.Fragment key={solution.name}>
            <h2 className="text-[#121217] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{solution.name}</h2>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
                <p className="text-[#656a86] text-sm font-normal leading-normal">Tech Stack</p>
                <p className="text-[#121217] text-sm font-normal leading-normal">{solution.techStack}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
                <p className="text-[#656a86] text-sm font-normal leading-normal">Quality</p>
                <p className="text-[#121217] text-sm font-normal leading-normal">{solution.quality}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
                <p className="text-[#656a86] text-sm font-normal leading-normal">Price</p>
                <p className="text-[#121217] text-sm font-normal leading-normal">{solution.price}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
                <p className="text-[#656a86] text-sm font-normal leading-normal">Confidence</p>
                <p className="text-[#121217] text-sm font-normal leading-normal">{solution.confidence}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dcdee5] py-5">
                <p className="text-[#656a86] text-sm font-normal leading-normal">Time</p>
                <p className="text-[#121217] text-sm font-normal leading-normal">{solution.time}</p>
              </div>
            </div>
            <div className="flex px-4 py-3 justify-start">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#15267e] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Select {solution.name}</span>
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SuggestTechStack; 