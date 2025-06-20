<?php include 'common/header.php'; ?>
        <div class="px-40 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div class="flex flex-wrap justify-between gap-3 p-4">
              <p class="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72">Clients</p>
              <button
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal"
              >
                <span class="truncate">New Client</span>
              </button>
            </div>
            <div class="px-4 py-3">
              <label class="flex flex-col min-w-40 h-12 w-full">
                <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div
                    class="text-[#60768a] flex border-none bg-[#f0f2f5] items-center justify-center pl-4 rounded-l-xl border-r-0"
                    data-icon="MagnifyingGlass"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    placeholder="Search clients"
                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-[#60768a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value=""
                  />
                </div>
              </label>
            </div>
            <div class="px-4 py-3 @container">
              <div class="flex overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
                <table class="flex-1">
                  <thead>
                    <tr class="bg-white">
                      <th class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-120 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        Client Name
                      </th>
                      <th class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-240 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        Industry
                      </th>
                      <th class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-360 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        Location
                      </th>
                      <th class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-480 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        Contact Person
                      </th>
                      <th class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-600 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Email</th>
                      <th class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-720 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Phone</th>
                      <th class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-840 px-4 py-3 text-left text-[#111518] w-60 text-sm font-medium leading-normal">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-t border-t-[#dbe1e6]">
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal">
                        Tech Solutions Inc.
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-240 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Technology
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        San Francisco, CA
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-480 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Alex Johnson
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-600 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        alex.johnson@techsolutions.com
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-720 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        (415) 555-1234
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-840 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-full"
                        >
                          <span class="truncate">Active</span>
                        </button>
                      </td>
                    </tr>
                    <tr class="border-t border-t-[#dbe1e6]">
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal">
                        Global Retail Group
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-240 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">Retail</td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        New York, NY
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-480 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Sarah Lee
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-600 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        sarah.lee@globalretail.com
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-720 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        (212) 555-5678
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-840 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-full"
                        >
                          <span class="truncate">Active</span>
                        </button>
                      </td>
                    </tr>
                    <tr class="border-t border-t-[#dbe1e6]">
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal">
                        Healthcare Innovations LLC
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-240 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Healthcare
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Chicago, IL
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-480 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        David Chen
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-600 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        david.chen@healthcareinnovations.com
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-720 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        (312) 555-9012
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-840 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-full"
                        >
                          <span class="truncate">Active</span>
                        </button>
                      </td>
                    </tr>
                    <tr class="border-t border-t-[#dbe1e6]">
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal">
                        Financial Services Corp.
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-240 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">Finance</td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Boston, MA
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-480 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Emily White
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-600 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        emily.white@financialservices.com
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-720 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        (617) 555-3456
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-840 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-full"
                        >
                          <span class="truncate">Inactive</span>
                        </button>
                      </td>
                    </tr>
                    <tr class="border-t border-t-[#dbe1e6]">
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal">
                        EduTech Solutions
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-240 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Education
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Austin, TX
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-480 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Michael Brown
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-600 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        michael.brown@edutechsolutions.com
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-720 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        (512) 555-7890
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-840 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-full"
                        >
                          <span class="truncate">Active</span>
                        </button>
                      </td>
                    </tr>
                    <tr class="border-t border-t-[#dbe1e6]">
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal">
                        Green Energy Co.
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-240 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">Energy</td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Denver, CO
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-480 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Jessica Green
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-600 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        jessica.green@greenenergyco.com
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-720 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        (303) 555-2468
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-840 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-full"
                        >
                          <span class="truncate">Active</span>
                        </button>
                      </td>
                    </tr>
                    <tr class="border-t border-t-[#dbe1e6]">
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal">
                        Media &amp; Entertainment Group
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-240 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">Media</td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Los Angeles, CA
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-480 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Ryan Clark
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-600 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        ryan.clark@mediaentertainment.com
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-720 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        (213) 555-1357
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-840 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-full"
                        >
                          <span class="truncate">Active</span>
                        </button>
                      </td>
                    </tr>
                    <tr class="border-t border-t-[#dbe1e6]">
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal">
                        Manufacturing Industries Ltd.
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-240 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Manufacturing
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Detroit, MI
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-480 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Laura Adams
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-600 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        laura.adams@manufacturingindustries.com
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-720 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        (313) 555-8642
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-840 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-full"
                        >
                          <span class="truncate">Inactive</span>
                        </button>
                      </td>
                    </tr>
                    <tr class="border-t border-t-[#dbe1e6]">
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal">
                        Transportation Logistics Inc.
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-240 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Logistics
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Atlanta, GA
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-480 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Kevin Harris
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-600 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        kevin.harris@transportationlogistics.com
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-720 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        (404) 555-9753
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-840 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-full"
                        >
                          <span class="truncate">Active</span>
                        </button>
                      </td>
                    </tr>
                    <tr class="border-t border-t-[#dbe1e6]">
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal">
                        Food &amp; Beverage Corp.
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-240 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Food &amp; Beverage
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Miami, FL
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-480 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Amanda Rodriguez
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-600 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        amanda.rodriguez@foodbeverage.com
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-720 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        (305) 555-6321
                      </td>
                      <td class="table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-840 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-full"
                        >
                          <span class="truncate">Active</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <style>
                          @container(max-width:120px){.table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-120{display: none;}}
                @container(max-width:240px){.table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-240{display: none;}}
                @container(max-width:360px){.table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-360{display: none;}}
                @container(max-width:480px){.table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-480{display: none;}}
                @container(max-width:600px){.table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-600{display: none;}}
                @container(max-width:720px){.table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-720{display: none;}}
                @container(max-width:840px){.table-3c2c647d-84f3-4f4a-b481-477bd6d3e027-column-840{display: none;}}
              </style>
            </div>
            <div class="flex items-center justify-center p-4">
              <a href="#" class="flex size-10 items-center justify-center">
                <div class="text-[#111518]" data-icon="CaretLeft" data-size="18px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                  </svg>
                </div>
              </a>
              <a class="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-[#111518] rounded-full bg-[#f0f2f5]" href="#">1</a>
              <a class="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111518] rounded-full" href="#">2</a>
              <a class="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111518] rounded-full" href="#">3</a>
              <span class="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111518] rounded-full" href="#">...</span>
              <a class="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111518] rounded-full" href="#">10</a>
              <a href="#" class="flex size-10 items-center justify-center">
                <div class="text-[#111518]" data-icon="CaretRight" data-size="18px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </div>
              </a>
           
<?php include 'common/footer.php'; ?>