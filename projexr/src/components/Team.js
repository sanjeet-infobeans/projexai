import React from 'react';
import mayankImg from '../assets/mayank.png';
import snehilImg from '../assets/snehil.png';
import sanjeetImg from '../assets/sanjeet.png';
import mukeshImg from '../assets/mukesh.png';
import rahulImg from '../assets/rahul.png';

const teamMembers = [
  { name: 'Mayank Shakalya', role: 'Team Member', img: mayankImg },
  { name: 'Snehil Sharma', role: 'Team Member', img: snehilImg },
  { name: 'Rahul Nagar', role: 'Team Member', img: rahulImg },
  { name: 'Sanjeet Patel', role: 'Team Member', img: sanjeetImg },
  { name: 'Mukesh Patidar', role: 'Team Member', img: mukeshImg },
];

const Team = () => {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#131416] tracking-light text-[32px] font-bold leading-tight min-w-72">Meet the team</p>
        </div>
        <p className="text-[#131416] text-base font-normal leading-normal pb-3 pt-1 px-4">
          We're a team of experienced engineers, product managers, and designers passionate about building tools that empower IT service companies to deliver exceptional
          customer experiences. We believe in the power of AI to automate tasks, improve efficiency, and free up human agents to focus on complex issues and build stronger
          customer relationships.
        </p>
        
        <h2 className="text-[#131416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Our team</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col gap-3 text-center pb-3">
              <div className="px-4">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full"
                  style={{ backgroundImage: `url(${member.img})` }}
                ></div>
              </div>
              <div>
                <p className="text-[#131416] text-base font-medium leading-normal">{member.name}</p>
                <p className="text-[#6e717c] text-sm font-normal leading-normal">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
        
        <h2 className="text-[#131416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Our values</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          <div className="flex flex-1 gap-3 rounded-lg border border-[#dfdfe2] bg-white p-4 flex-col">
            <div className="text-[#131416]" data-icon="Users" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-[#131416] text-base font-bold leading-tight">Customer-centric</h2>
              <p className="text-[#6e717c] text-sm font-normal leading-normal">
                We put our customers at the heart of everything we do. We listen to their needs, understand their challenges, and strive to build solutions that exceed their
                expectations.
              </p>
            </div>
          </div>
          
          <div className="flex flex-1 gap-3 rounded-lg border border-[#dfdfe2] bg-white p-4 flex-col">
            <div className="text-[#131416]" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-[#131416] text-base font-bold leading-tight">Innovation</h2>
              <p className="text-[#6e717c] text-sm font-normal leading-normal">
                We are constantly exploring new technologies and pushing the boundaries of what's possible. We embrace experimentation and learning to deliver cutting-edge
                solutions.
              </p>
            </div>
          </div>
          
          <div className="flex flex-1 gap-3 rounded-lg border border-[#dfdfe2] bg-white p-4 flex-col">
            <div className="text-[#131416]" data-icon="ShieldCheck" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M208,40H48A16,16,0,0,0,32,56v58.78c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.18-13.53-4.51-80-30.69-80-109.18V56H208ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.68l50.34-50.34a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z"></path>
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-[#131416] text-base font-bold leading-tight">Integrity</h2>
              <p className="text-[#6e717c] text-sm font-normal leading-normal">
                We are committed to honesty, transparency, and ethical practices. We build trust with our customers and partners through our actions and words.
              </p>
            </div>
          </div>
        </div>
        
        <h2 className="text-[#131416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Join us</h2>
        <p className="text-[#131416] text-base font-normal leading-normal pb-3 pt-1 px-4">
          We're always looking for talented individuals to join our team. If you're passionate about AI, customer service, and building innovative solutions, we'd love to hear
          from you. Check out our open positions below.
        </p>
        <div className="flex px-4 py-3 justify-start">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#9fa6ca] text-[#131416] text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">View open positions</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Team; 