import React from 'react';
import { Link } from 'react-router-dom';
import videoBg from '../assets/172170-846731303_small.mp4';

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Full-width video banner */}
      <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 h-[460px] mb-10 overflow-hidden flex items-center justify-center">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={videoBg}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-4">
          <h1 className="text-white text-4xl font-bold drop-shadow-lg mb-4" style={{textShadow: '0 2px 16px rgba(0,0,0,0.5)'}}>Elevate Prospect Onboarding</h1>
          <p className="text-white text-lg font-normal max-w-2xl drop-shadow-lg" style={{textShadow: '0 2px 16px rgba(0,0,0,0.5)'}}>
            ProjexAI is an AI agent tool designed for IT service companies, enabling sales and technical teams to rapidly improve prospect onboarding. Streamline your processes and enhance client satisfaction with our innovative solution.
          </p>
        </div>
        <div className="absolute inset-0 bg-black/40 z-5" />
      </div>
      {/* Main content container */}
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mx-auto px-10">
        <div className="flex flex-col gap-10 px-4 py-10 @container">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#0f111a] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
              Key Features
            </h1>
            <p className="text-[#0f111a] text-base font-normal leading-normal max-w-[720px]">
              ProjexAI offers a range of features designed to streamline and enhance your prospect onboarding process.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCswbOSNXE0pbzhvR515JCIUjLQmwNqA8uT-QhPfwh9vA7mh37JbMC4eb6tFnfvkyf7WnVImCCmowaEe43f5SBOupS1xtlB5Cy_Ex3APWDOAHEpG6aH0vsU7hRsdhrIx76avzHMKdOyzUtooXExAar7ywtgjGagL5mHcnbJEElCAwJWVEUEdGGLAw4P0g23ZLo4f-HUEbL4kf6ZEFOPUTVw4mzmCW8NjItGmphT-KehgyKWaOocK-u8CLQ-KWKLVUIu9MwDRMWKMfM")'
                }}
              ></div>
              <div>
                <p className="text-[#0f111a] text-base font-medium leading-normal">Automated Prospect Qualification</p>
                <p className="text-[#535d93] text-sm font-normal leading-normal">
                  Automatically qualify prospects based on predefined criteria, ensuring your team focuses on the most promising leads.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAEfcBOMReHHz8rASbO9HUxjGx121WMSDhi_GIuex-No-4GhDD__a1K7c0qIvaksi0HRSa2x6ytnFAmXwSshGhyzmhGhaTj0lwkfn-thst7vLbemCK7mp9wjKf6XHLkSKg1IYcwBcB0J5Fb_kOKL9RBYlHQ7XhB7Vc2d-ZjAOdsO1BK_dzhLvQaUZLd_HlkqGFLCJkAb59JYA8EuwGs5vtk61YgFIOpUS7gJj6dNqFO9l8oeg58_ljQOZH4SHGHV99BJrzoRI4XlH0")'
                }}
              ></div>
              <div>
                <p className="text-[#0f111a] text-base font-medium leading-normal">Intelligent Task Assignment</p>
                <p className="text-[#535d93] text-sm font-normal leading-normal">
                  Intelligently assign tasks to team members based on their expertise and availability, optimizing workflow efficiency.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAM48ygxwACbN9M4Iv-YiuM6fft-FoGcXF4KoGwbTSWah_nAXa1D-t2Zaovwf81I1-dd0vYV4d9POt7rv3zxvsp6LgVlyDXkH6YIk9aT9wPF7at4oj0OUp65WxmFB5cDQ2R_ZvJM9jevVCKKFrGyzLt8fQ18SiA3YZdtt1SA_inrm7xlwyvuu5KTmAwdxkQFuAl_IGoowUkOMfj2XPUHgEq-N19jx8Fubw0E3_sQKEs4iRqRbYFagAWtOFBYpMgf6MwUCfchrkPHWk")'
                }}
              ></div>
              <div>
                <p className="text-[#0f111a] text-base font-medium leading-normal">Real-time Progress Tracking</p>
                <p className="text-[#535d93] text-sm font-normal leading-normal">
                  Track the progress of each prospect in real-time, providing insights into bottlenecks and areas for improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-10 px-4 py-10 @container">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#0f111a] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
              How it Grows Sales
            </h1>
            <p className="text-[#0f111a] text-base font-normal leading-normal max-w-[720px]">ProjexAI directly impacts your sales growth by optimizing the onboarding process.</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBl7s6EI-J6Qcy1RC2dus0NHt3uG21300Yj3JXjFrQ_fFEZltCLyyDfswBwSWcXGFScD9TqNZHdT3wxU63oIyTvvtL3DOXYYgiOHutwzzqWJQoooXiLM5W1di4USbgbVa4Z0xI4X-qbN-gkPIiyZiTBGNLBnHvpTKupNDiMEfGC2KuC4Dlmtt0GQOlXOCdTzdbgC4hWJUysbW__a_AKfrSi0mAHuc2bOeUti5KeQ9j5FmF0AKWRrw7kEJcnC_5lTwwgD1V-dfiDOtw")'
                }}
              ></div>
              <div>
                <p className="text-[#0f111a] text-base font-medium leading-normal">Faster Conversion Rates</p>
                <p className="text-[#535d93] text-sm font-normal leading-normal">
                  Accelerate the conversion of prospects into clients with a streamlined and efficient onboarding process.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmavrlYcOP81PZiXbmQCznIF4WGJAxD3NxXNReffiEdJ0BcX1y7UHlmFhhO24uFLdgSLPXLG34W7KAQ9TUmKaybNxTlFFuFhlvS4xQJiH_AkHJYonYRLbSgz6qrnn7dRliyEtJhSlTcDsFqBoXWQ3oxGbFh7MiClPqxAIVN168TtTfguWXjea3e4vdf3euO2_WO4u8yIMucKlXVuUt9-A5zgLxEenp8XEmnokYS7CZL17nGqe2msIhwv3NttIjehz71DbpWc22zHQ")'
                }}
              ></div>
              <div>
                <p className="text-[#0f111a] text-base font-medium leading-normal">Increased Sales Efficiency</p>
                <p className="text-[#535d93] text-sm font-normal leading-normal">
                  Enable your sales team to handle more prospects effectively, leading to increased overall sales.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-10 px-4 py-10 @container">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#0f111a] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
              Industry Impact
            </h1>
            <p className="text-[#0f111a] text-base font-normal leading-normal max-w-[720px]">ProjexAI is setting new standards in the IT service industry.</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwaaRa0vMOGFXBax6wohcpRH5X5qNIWQYlm4FaibWV3yeqshsCG8zsAzYJotQ1eYl1f_9JcW-CzQduNCtTfQUxKvn6trzjcxjjygfOQn7Gwmi0xSEVjWIpzF9W5rR2CpZWGPItF1h_gIymE85zvoFA072d3JyDvTtiZF47hTglHirixrMFKzvsjFs1xZPlj3Eti4Vk8VjDNoSg_pKv6gaxeyYzGX4qcKVjlsV1JLhJZuUc_GLzRVFERyrHsJbnsy4fxWSfra3Gqro")'
                }}
              ></div>
              <div>
                <p className="text-[#0f111a] text-base font-medium leading-normal">Enhanced Client Satisfaction</p>
                <p className="text-[#535d93] text-sm font-normal leading-normal">Deliver a superior onboarding experience, leading to higher client satisfaction and retention.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBd1pYZuIJlIXRrmlxrknM1dkVCLBk69D0atmI-IXsbxbghtgz88keVVGENT_Ypiq6iPaAYgCVPf3AB-iyRagrdGlKPaQs7UIRxabgUqchK5SZNkhrjHgPhf6bqTdL5SegYC3HYcNBiwFGdk0skyd4BhSJtnb_d7d0-SKSCYnMcxwYtEDW5WKk086brX7Q024HNYSg6g9ei8ZwqAA-zJIpiwJtnjoyiBlX5kdR1hnwNo-oKWOulFMXQbXKE2sPwRNcahLC1ILaKovk")'
                }}
              ></div>
              <div>
                <p className="text-[#0f111a] text-base font-medium leading-normal">Improved Team Collaboration</p>
                <p className="text-[#535d93] text-sm font-normal leading-normal">
                  Foster better collaboration between sales and technical teams, ensuring a seamless onboarding process.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="@container">
          <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-[#0f111a] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]" style={{margin: '0px auto'}}>
                Ready to Transform Your Prospect Onboarding?
              </h1>
              <p className="text-[#0f111a] text-base font-normal leading-normal max-w-[720px]" style={{margin: '10px auto'}}>
                Experience the power of ProjexAI and revolutionize your IT service company's prospect onboarding process. Get started today and see the difference.
              </p>
            </div>
            <div className="flex flex-1 justify-center">
              <div className="flex justify-center">
                <Link to="/login" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#15267d] text-[#f8f9fb] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] grow">
                  <span className="truncate">Get Started</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 