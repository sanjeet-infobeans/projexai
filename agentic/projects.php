<?php include 'common/header.php'; ?>
        <div class="px-40 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div class="flex flex-wrap justify-between gap-3 p-4">
              <p class="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72">Projects</p>
              <button
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal"
              >
                <span class="truncate">New Project</span>
              </button>
            </div>
            <div class="px-4 py-3 @container">
              <div class="flex overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
                <table class="flex-1">
                  <thead>
                    <tr class="bg-white">
                      <th class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-120 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        Project Name
                      </th>
                      <th class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-240 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">Client</th>
                      <th class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-360 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        Tech Stack
                      </th>
                      <th class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-480 px-4 py-3 text-left text-[#111518] w-60 text-sm font-medium leading-normal">Status</th>
                      <th class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-600 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        Start Date
                      </th>
                      <th class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-720 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        End Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-t border-t-[#dbe1e6]">
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal">
                        Project Phoenix
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-240 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Acme Corp
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        React, Node.js, AWS
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-480 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-full"
                        >
                          <span class="truncate">In Progress</span>
                        </button>
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-600 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        2023-01-15
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-720 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        2023-06-30
                      </td>
                    </tr>
                    <tr class="border-t border-t-[#dbe1e6]">
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal">
                        Project Nova
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-240 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Global Innovations
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Angular, Spring Boot, Azure
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-480 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-full"
                        >
                          <span class="truncate">Completed</span>
                        </button>
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-600 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        2022-08-01
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-720 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        2022-12-15
                      </td>
                    </tr>
                    <tr class="border-t border-t-[#dbe1e6]">
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal">
                        Project Zenith
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-240 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Tech Solutions Inc.
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Vue.js, Django, GCP
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-480 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-full"
                        >
                          <span class="truncate">Planning</span>
                        </button>
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-600 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        2023-03-01
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-720 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        2023-09-30
                      </td>
                    </tr>
                    <tr class="border-t border-t-[#dbe1e6]">
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal">
                        Project Horizon
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-240 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Future Dynamics
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        React Native, Firebase
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-480 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-full"
                        >
                          <span class="truncate">In Progress</span>
                        </button>
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-600 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        2023-02-15
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-720 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        2023-07-31
                      </td>
                    </tr>
                    <tr class="border-t border-t-[#dbe1e6]">
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal">
                        Project Aurora
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-240 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Pinnacle Systems
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        Flutter, .NET, AWS
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-480 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal w-full"
                        >
                          <span class="truncate">Completed</span>
                        </button>
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-600 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        2022-10-01
                      </td>
                      <td class="table-d36cbb86-3bba-44a4-a653-4931801de26c-column-720 h-[72px] px-4 py-2 w-[400px] text-[#60768a] text-sm font-normal leading-normal">
                        2023-02-28
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <style>
                          @container(max-width:120px){.table-d36cbb86-3bba-44a4-a653-4931801de26c-column-120{display: none;}}
                @container(max-width:240px){.table-d36cbb86-3bba-44a4-a653-4931801de26c-column-240{display: none;}}
                @container(max-width:360px){.table-d36cbb86-3bba-44a4-a653-4931801de26c-column-360{display: none;}}
                @container(max-width:480px){.table-d36cbb86-3bba-44a4-a653-4931801de26c-column-480{display: none;}}
                @container(max-width:600px){.table-d36cbb86-3bba-44a4-a653-4931801de26c-column-600{display: none;}}
                @container(max-width:720px){.table-d36cbb86-3bba-44a4-a653-4931801de26c-column-720{display: none;}}
              </style>
      <?php include 'common/footer.php'; ?>
