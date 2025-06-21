import React from 'react';

const sampleTeams = [
  {
    name: 'Team Alpha',
    members: [
      {
        name: 'Ethan Harper',
        experience: '5 years',
        confidence: 80,
        availability: '75%',
        engagements: 2,
      },
      {
        name: 'Olivia Bennett',
        experience: '3 years',
        confidence: 90,
        availability: '50%',
        engagements: 4,
      },
      {
        name: 'Noah Carter',
        experience: '7 years',
        confidence: 75,
        availability: '100%',
        engagements: 3,
      },
    ],
  },
  {
    name: 'Team Beta',
    members: [
      {
        name: 'Sophia Davis',
        experience: '4 years',
        confidence: 85,
        availability: '90%',
        engagements: 1,
      },
      {
        name: 'Liam Evans',
        experience: '6 years',
        confidence: 95,
        availability: '60%',
        engagements: 3,
      },
      {
        name: 'Ava Foster',
        experience: '2 years',
        confidence: 70,
        availability: '80%',
        engagements: 2,
      },
    ],
  },
  {
    name: 'Team Gamma',
    members: [
      {
        name: 'Jackson Green',
        experience: '8 years',
        confidence: 90,
        availability: '70%',
        engagements: 2,
      },
      {
        name: 'Isabella Hayes',
        experience: '1 year',
        confidence: 65,
        availability: '50%',
        engagements: 4,
      },
      {
        name: 'Lucas Ingram',
        experience: '5 years',
        confidence: 80,
        availability: '100%',
        engagements: 1,
      },
    ],
  },
];

const EstimateTeam = () => {
  return (
    <div className="px-10 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#131416] tracking-light text-[32px] font-bold leading-tight min-w-72">Our Expert Teams</p>
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f1f2f3] text-[#131416] text-sm font-medium leading-normal"
          >
            <span className="truncate">Generate Team</span>
          </button>
        </div>
        {sampleTeams.map((team, idx) => (
          <React.Fragment key={team.name}>
            <h2 className="text-[#131416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{team.name}</h2>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#dfdfe2] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className={`table-${idx}-col-120 px-4 py-3 text-left text-[#131416] w-[400px] text-sm font-medium leading-normal`}>Name</th>
                      <th className={`table-${idx}-col-240 px-4 py-3 text-left text-[#131416] w-[400px] text-sm font-medium leading-normal`}>Experience</th>
                      <th className={`table-${idx}-col-360 px-4 py-3 text-left text-[#131416] w-[400px] text-sm font-medium leading-normal`}>Technology Confidence</th>
                      <th className={`table-${idx}-col-480 px-4 py-3 text-left text-[#131416] w-[400px] text-sm font-medium leading-normal`}>Availability</th>
                      <th className={`table-${idx}-col-600 px-4 py-3 text-left text-[#131416] w-[400px] text-sm font-medium leading-normal`}>Engagements</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.members.map((member, mIdx) => (
                      <tr className="border-t border-t-[#dfdfe2]" key={member.name}>
                        <td className={`table-${idx}-col-120 h-[72px] px-4 py-2 w-[400px] text-[#131416] text-sm font-normal leading-normal`}>{member.name}</td>
                        <td className={`table-${idx}-col-240 h-[72px] px-4 py-2 w-[400px] text-[#6e717c] text-sm font-normal leading-normal`}>{member.experience}</td>
                        <td className={`table-${idx}-col-360 h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal`}>
                          <div className="flex items-center gap-3">
                            <div className="w-[88px] overflow-hidden rounded-sm bg-[#dfdfe2]">
                              <div className="h-1 rounded-full bg-[#131416]" style={{ width: `${Math.min(member.confidence, 100)}%` }}></div>
                            </div>
                            <p className="text-[#131416] text-sm font-medium leading-normal">{member.confidence}</p>
                          </div>
                        </td>
                        <td className={`table-${idx}-col-480 h-[72px] px-4 py-2 w-[400px] text-[#6e717c] text-sm font-normal leading-normal`}>{member.availability}</td>
                        <td className={`table-${idx}-col-600 h-[72px] px-4 py-2 w-[400px] text-[#6e717c] text-sm font-normal leading-normal`}>{member.engagements}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Responsive styles for columns (optional, can be improved with Tailwind plugins) */}
            </div>
            <div className="flex px-4 py-3 justify-start">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#9fa6ca] text-[#131416] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Select {team.name}</span>
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default EstimateTeam; 