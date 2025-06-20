<?php include 'common/header.php'; ?>
<div class="gap-1 px-6 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col max-w-[920px] flex-1">
            <div class="flex flex-wrap justify-between gap-3 p-4"><p class="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">Generate Solution</p></div>
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <select
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 bg-[image:--select-button-svg] placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"
                >
                  <option value="one"></option>
                  <option value="two">two</option>
                  <option value="three">three</option>
                </select>
              </label>
            </div>
            <h2 class="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Requirement Outline</h2>
            <p class="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4">
              Develop a comprehensive requirement outline for the selected challenge, detailing the necessary features, functionalities, and technical specifications to ensure a
              robust and effective solution.
            </p>
            <h2 class="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Time Estimate</h2>
            <p class="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4">
              Provide a detailed time estimate for the project, breaking down the timeline into phases such as planning, development, testing, and deployment, ensuring realistic
              expectations and efficient project management.
            </p>
            <h2 class="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">High-Level Solution</h2>
            <p class="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4">
              Outline a high-level solution architecture, describing the key components, technologies, and integrations required to address the challenge effectively, ensuring
              scalability and maintainability.
            </p>
            <h2 class="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Ethical Alignment</h2>
            <p class="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4">
              Assess the ethical implications of the proposed solution, ensuring alignment with industry standards and best practices, addressing potential biases, and promoting
              responsible use of technology.
            </p>
          </div>
          <div class="layout-content-container flex flex-col w-[360px]">
            <div class="flex px-4 py-3">
              <button
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span class="truncate">Generate</span>
              </button>
<?php include 'common/footer.php'; ?> 