<?php include 'common/header.php'; ?>
<?php 
$client_id = isset($_GET['client_id']) ? $_GET['client_id'] : '';
$client_name = isset($_GET['client_name']) ? $_GET['client_name'] : '';
$sales_person_name = isset($_GET['sales_person_name']) ? $_GET['sales_person_name'] : '';
?>
<div class="gap-1 px-6 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col max-w-[920px] flex-1">
            <div class="flex flex-wrap justify-between gap-3 p-4"><p class="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">Generate Solution</p></div>
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 relative">
              <label class="flex flex-col min-w-40 flex-1">
                <div class="relative">
                  <select id="prompt-select"
                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 bg-[image:--select-button-svg] placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal pr-10"
                  >
                    <option value="">Select prompt type...</option>
                    <option value="company_summary">1. Company Summary for Context</option>
                    <option value="role_pain_points">2. Role-Specific Pain Points</option>
                    <option value="call_opener">3. 60-Second Call Opener</option>
                    <option value="discovery_questions">4. Discovery Questions to Qualify Fast</option>
                    <option value="objection_prep">5. Objection Prediction + Prep</option>
                    <option value="competitor_comparison">6. Competitor Comparison Points</option>
                    <option value="trend_insight">7. Trend-Based Insight Hook</option>
                    <option value="status_quo">8. Status Quo Reframe</option>
                    <option value="closing_next_steps">9. Closing with Next Steps</option>
                    <option value="precall_email">10. Pre-Call Reminder Email</option>
                  </select>
                  <span class="caret-icon pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-200">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 8L10 12L14 8" stroke="#60758a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                </div>
              </label>
            </div>
            <form id="dynamic-inputs" class="flex flex-col gap-4 px-4 py-3"></form>
            <div class="flex flex-col gap-4 px-4 py-3">
              <button id="generate-btn"
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 py-3 flex-1 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                type="button"
              >
                <span class="truncate">Generate</span>
              </button>
              <textarea id="response-area" class="form-input w-full min-h-40 rounded-lg border border-[#dbe0e6] p-3 text-base font-normal leading-normal" placeholder="Response will appear here..."></textarea>
              <button type="button" class="flex items-center gap-2 mt-2 bg-[#0c7ff2] text-white rounded-lg px-4 py-2 text-sm font-bold w-auto">
                Add to Conversation
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 5L12 10L7 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="layout-content-container flex flex-col w-[360px]">
            <div class="flex px-4 py-3">
              <div class="chat-wrapper w-full bg-[#f8fafc] rounded-lg p-4 h-[400px] overflow-y-auto flex flex-col gap-3 border border-[#e0e7ef]">
                <?php if ($client_id && $client_name && $sales_person_name): ?>
                  <div class="flex justify-center">
                    <div class="bg-[#e0e7ef] text-[#0c7ff2] rounded-xl px-4 py-2 max-w-full shadow text-sm flex flex-col items-center">
                      <div class="flex gap-2 mb-1">
                        <span class="bg-[#0c7ff2] text-white rounded-full px-3 py-1 text-xs font-bold"><?php echo htmlspecialchars($client_name); ?></span>
                        <span class="bg-[#60768a] text-white rounded-full px-3 py-1 text-xs font-bold"><?php echo htmlspecialchars($sales_person_name); ?></span>
                      </div>
                      <span class="text-xs text-[#60768a]">Selected client: <b><?php echo htmlspecialchars($client_name); ?></b> (ID: <?php echo htmlspecialchars($client_id); ?>), Sales Person: <b><?php echo htmlspecialchars($sales_person_name); ?></b></span>
                    </div>
                  </div>
                <?php endif; ?>
                <!-- Demo chat content -->
                <div class="flex justify-start items-end gap-2">
                  <div class="flex items-center justify-center bg-[#e0e7ef] text-[#0c7ff2] font-bold rounded-full w-8 h-8 text-xs">Client</div>
                  <div class="bg-white text-[#111418] rounded-xl px-4 py-2 max-w-[75%] shadow text-sm">
                    Hi, I'm interested in learning more about your solutions for digital transformation.
                  </div>
                </div>
                <div class="flex justify-end items-end gap-2">
                  <div class="bg-[#0c7ff2] text-white rounded-xl px-4 py-2 max-w-[75%] shadow text-sm order-2">
                    Absolutely! We help companies modernize their operations with tailored digital strategies. Can you share a bit about your current challenges?
                  </div>
                  <div class="flex items-center justify-center bg-[#e0e7ef] text-[#0c7ff2] font-bold rounded-full w-8 h-8 text-xs order-3">Alex</div>
                </div>
                <div class="flex justify-start items-end gap-2">
                  <div class="flex items-center justify-center bg-[#e0e7ef] text-[#0c7ff2] font-bold rounded-full w-8 h-8 text-xs">Client</div>
                  <div class="bg-white text-[#111418] rounded-xl px-4 py-2 max-w-[75%] shadow text-sm">
                    Our main challenge is integrating legacy systems with new cloud solutions.
                  </div>
                </div>
                <div class="flex justify-end items-end gap-2">
                  <div class="bg-[#0c7ff2] text-white rounded-xl px-4 py-2 max-w-[75%] shadow text-sm order-2">
                    That's a common pain point. We've helped several clients bridge that gap smoothly. Would you like a quick overview of our approach?
                  </div>
                  <div class="flex items-center justify-center bg-[#e0e7ef] text-[#0c7ff2] font-bold rounded-full w-8 h-8 text-xs order-3">Alex</div>
                </div>
              </div>
            </div>
            <!-- Feedback input below chat box -->
            <form class="flex gap-2 mt-2">
              <textarea rows="2" placeholder="Client Latest Feedback..." class="flex-1 rounded-lg border border-[#dbe0e6] px-3 py-2 text-sm focus:outline-none focus:border-[#0c7ff2] resize-y min-h-[40px] max-h-[120px]"></textarea>
              <button type="submit" class="bg-[#0c7ff2] text-white rounded-lg px-4 py-2 text-sm font-bold h-fit self-end">Send</button>
            </form>
          </div>
        </div>
<script>
const prompts = {
  company_summary: {
    title: 'Company Summary for Context',
    inputs: [
      { name: 'company_name', label: 'Company Name', type: 'text' },
      { name: 'website_url', label: 'Website URL', type: 'url' }
    ],
    prompt: `Act as my sales research assistant. I'm meeting with {company_name}. Go through their website: {website_url}, and summarize what they do, who they serve, and what makes them unique. Give me 4–5 short bullets I can use to open the call with insight and context — not fluff.`
  },
  role_pain_points: {
    title: 'Role-Specific Pain Points',
    inputs: [
      { name: 'job_title', label: 'Job Title', type: 'text' },
      { name: 'company_type', label: 'Company Type', type: 'text' },
      { name: 'industry', label: 'Industry', type: 'text' }
    ],
    prompt: `I'm speaking with a {job_title} at a {company_type} in {industry}. Give me 5 specific business problems or friction points they're likely facing in 2024. Phrase each one in natural language I can use to build credibility and spark conversation in the call.`
  },
  call_opener: {
    title: '60-Second Call Opener',
    inputs: [
      { name: 'product', label: 'Product', type: 'text' }
    ],
    prompt: `Write a confident, non-cringey call opener I can use at the start of a discovery call. I sell {product}. Help me briefly position myself, explain the goal of the call, and make the prospect feel like it's a two-way conversation — all in under 60 seconds.`
  },
  discovery_questions: {
    title: 'Discovery Questions to Qualify Fast',
    inputs: [
      { name: 'job_title', label: 'Job Title', type: 'text' },
      { name: 'industry', label: 'Industry', type: 'text' }
    ],
    prompt: `Give me 10 sharp discovery questions for a {job_title} in {industry} that help me uncover pain, urgency, budget, and fit — fast. These should feel natural and insightful, not like I'm reading from a script.`
  },
  objection_prep: {
    title: 'Objection Prediction + Prep',
    inputs: [
      { name: 'job_title', label: 'Job Title', type: 'text' },
      { name: 'company_type', label: 'Company Type', type: 'text' },
      { name: 'product', label: 'Product', type: 'text' }
    ],
    prompt: `Based on this buyer profile: {job_title} at {company_type}, and this product: {product}, what objections am I most likely to hear? For each one, write a short, confident response that reframes the objection and moves the conversation forward.`
  },
  competitor_comparison: {
    title: 'Competitor Comparison Points',
    inputs: [
      { name: 'competitor', label: 'Competitor', type: 'text' },
      { name: 'product', label: 'Product', type: 'text' }
    ],
    prompt: `They currently use {competitor}. I sell {product}. Give me 3 comparison points that highlight a key difference or shortcoming they might feel with {competitor}, and how we solve it — no bashing, just smart contrast.`
  },
  trend_insight: {
    title: 'Trend-Based Insight Hook',
    inputs: [
      { name: 'industry', label: 'Industry', type: 'text' }
    ],
    prompt: `I want to sound like I understand their world. Give me 2 industry-specific trends or recent shifts happening in {industry}, and write one sentence per trend that I could use naturally during a call to show insight and relevance.`
  },
  status_quo: {
    title: 'Status Quo Reframe',
    inputs: [
      { name: 'product_category', label: 'Product Category', type: 'text' }
    ],
    prompt: `Create a short talk track I can use when a prospect says, 'We're fine right now.' I want to reframe that mindset, and show how top companies using {product_category} improve, even if things aren't broken.`
  },
  closing_next_steps: {
    title: 'Closing with Next Steps',
    inputs: [
      { name: 'product', label: 'Product (optional)', type: 'text' }
    ],
    prompt: `Give me 3 ways to end a call where there's interest — so I can confidently suggest next steps like a demo, pricing call, or looping in decision-makers, without sounding pushy.`
  },
  precall_email: {
    title: 'Pre-Call Reminder Email',
    inputs: [
      { name: 'agenda', label: 'Agenda Items (optional)', type: 'text' }
    ],
    prompt: `Write a short email I can send the day before a scheduled call. Confirm the time, preview the agenda in one line, and set a professional tone so they show up ready.`
  }
};

const select = document.getElementById('prompt-select');
const form = document.getElementById('dynamic-inputs');
const generateBtn = document.getElementById('generate-btn');
const responseArea = document.getElementById('response-area');
const caret = document.querySelector('.caret-icon');

select.addEventListener('change', function() {
  form.innerHTML = '';
  responseArea.value = '';
  const val = select.value;
  if (!val || !prompts[val]) return;
  prompts[val].inputs.forEach(input => {
    const label = document.createElement('label');
    label.className = 'flex flex-col gap-1';
    label.innerHTML = `<span class='text-[#111418] text-base font-medium leading-normal pb-2'>${input.label}</span>` +
      `<input name='${input.name}' type='${input.type}' class='form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-12 placeholder:text-[#60758a] p-[12px] text-base font-normal leading-normal' required>`;
    form.appendChild(label);
  });
  setTimeout(() => caret.classList.remove('rotate-180'), 200);
});

generateBtn.addEventListener('click', async function() {
  const val = select.value;
  if (!val || !prompts[val]) return;
  const inputs = form.querySelectorAll('input');
  let filled = true;
  let params = {};
  inputs.forEach(input => {
    if (input.hasAttribute('required') && !input.value) filled = false;
    params[input.name] = input.value;
  });
  if (!filled) {
    alert('Please fill all required fields.');
    return;
  }
  let prompt = prompts[val].prompt;
  Object.keys(params).forEach(key => {
    prompt = prompt.replace(new RegExp('{' + key + '}', 'g'), params[key]);
  });
  responseArea.value = 'Generating...';
  try {
    const res = await fetch('gemini_generate.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    if (data.result) {
      responseArea.value = data.result;
    } else if (data.error) {
      responseArea.value = 'Error: ' + data.error;
    } else {
      responseArea.value = 'No response from Gemini.';
    }
  } catch (e) {
    responseArea.value = 'Request failed.';
  }
});

// Handle caret rotation on open/close
select.addEventListener('focus', function() {
  caret.classList.add('rotate-180');
});
select.addEventListener('blur', function() {
  caret.classList.remove('rotate-180');
});
</script>
<style>
.caret-icon {
  transition: transform 0.2s;
}
.caret-icon.rotate-180 {
  transform: translateY(-50%) rotate(180deg);
}
</style>
<?php include 'common/footer.php'; ?> 