import React, { useState } from 'react';

const sampleComments = [
  {
    name: 'Sophia Bennett',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwqtzv5KHu801dBU7T-jgzkp_DqYx6U_IqHO64ZxSJAR9_CaNGk0hXAyzu1CURoGGmiyFPYHdM5M5UBdSmUyzPNcERxzBbAzNmIj2YnGHkHjZnrtgcLNLEll6alJd9Xrg4ybXRBDS-nUgt6PL54GPdua-5GdJ8Rt2wlsOA9UcJP6Q8b_Xe7FOgbg6GsJ3RJBrGMl_6fKpfUHObYyB0IV0Z7DDd7nxBu2RXoACL1j-C4DHAqI_NmzwKgZv27WTXKgkZUemO4EmU3Rw',
    time: '2d',
    text: `This is a great idea! I'm excited to see how it develops. I'm also curious about the timeline for this project. Any updates?`,
  },
  {
    name: 'Ethan Carter',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuSpwQnXTX8DPZrkhfQBljqPHK3uNNSfJ2DTU932mJ7V0gOG4cCgIEvErhsiAAwD1JCr8WKoPBuV6vjZzQWOK6fjX1DWOWOyAFwY8GH1KilxRdRGIgO39gU_b99qD3PS7BqoazI1gy_R69IRjNObLbCR_pFP8_k8gdhDz_d7syNQCznrPDTCwpFsLLXdLA0RaIxVj2Kdbn8FRtfDpmOEjKqkXMDvdnN30uHPdTZg7cZLzfA9TbgBoslEZMOcdvG1cjEi0zMr1GQpg',
    time: '1d',
    text: `I agree, this has a lot of potential. Looking forward to the next steps. I'm happy to contribute in any way I can. Let me know if you need any help.`,
  },
  {
    name: 'Olivia Davis',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeBxnHGj7UT9owkmMl1PatleKZqa_EQ9NBY8-8HS0_gzjbkQZvuaNp34iNFEkBeapaWPz19N6aY1JygieoEjDw4elGsbT71PjXdbNk_C9o3sbXg9FPdpT6Okj4GxggB_0Wh-5Stxe6ekYwrJ3hGJeUgtV01bVu-brMJL8sEY3SWHll9TxycKWM62-GmnJjkSZUIx6IKvco3e3fTEBWkDKX54viubzictkD8LX2xhfsxCgRZynGAJ_58C1PedkU1vkHvhWeKtyU9sg',
    time: '1d',
    text: `I'm curious about the timeline for this project. Any updates? I'm happy to contribute in any way I can. Let me know if you need any help.`,
  },
  {
    name: 'Liam Foster',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxNuatfiCWB9T93KgGNToNI_nFt176ESdspF9VXSibEWsWs2W-w9N-9qfV0QmC4pzuCyWhwFnhnEEfoP4lCpmgkIZRM9mWEn0hIDV18S2m85sQ1NhBmcrzGdm1JhfG31n7OVXw-pMQC43rO7OISJYCD2ugpJpD37ceTRbnad81pIwZIwEnH9qHGWSFiLH-zSh7AMigStZYzHYK-FmTQdqcx5w1PWtoh2cit1ZRj2A9eT34Kj0xCAQLrmI56MlEI9IE7CAp2-nHie0',
    time: '1d',
    text: `I'm happy to contribute in any way I can. Let me know if you need any help. I'm also curious about the timeline for this project. Any updates?`,
  },
];

const SaveNotes = () => {
  const [comment, setComment] = useState('');

  return (
    <div className="px-10 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h2 className="text-[#121217] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">Discussion</h2>
        {sampleComments.map((c, idx) => (
          <div className="flex w-full flex-row items-start justify-start gap-3 p-4" key={idx}>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
              style={{ backgroundImage: `url('${c.avatar}')` }}
            ></div>
            <div className="flex h-full flex-1 flex-col items-start justify-start">
              <div className="flex w-full flex-row items-start justify-start gap-x-3">
                <p className="text-[#121217] text-sm font-bold leading-normal tracking-[0.015em]">{c.name}</p>
                <p className="text-[#656a86] text-sm font-normal leading-normal">{c.time}</p>
              </div>
              <p className="text-[#121217] text-sm font-normal leading-normal">
                {c.text}
              </p>
            </div>
          </div>
        ))}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <textarea
              placeholder="Add a comment"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121217] focus:outline-0 focus:ring-0 border border-[#dcdee5] bg-white focus:border-[#dcdee5] min-h-36 placeholder:text-[#656a86] p-[15px] text-base font-normal leading-normal"
              value={comment}
              onChange={e => setComment(e.target.value)}
            ></textarea>
          </label>
        </div>
        <div className="flex px-4 py-3">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#15267e] text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveNotes; 