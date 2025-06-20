<?php 
// Database connection (update credentials as needed)
$mysqli = new mysqli('localhost', 'root', 'BeachFront@48', 'projexai');
if ($mysqli->connect_errno) {
    die('Failed to connect to MySQL: ' . $mysqli->connect_error);
}

// Pagination and search logic
$per_page = 15;
$page = isset($_GET['page']) && is_numeric($_GET['page']) ? (int)$_GET['page'] : 1;
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$offset = ($page - 1) * $per_page;

// Build WHERE clause for search
$where = '';
$params = [];
if ($search !== '') {
    $search_like = '%' . $mysqli->real_escape_string($search) . '%';
    $where = "WHERE c.id LIKE '$search_like' OR c.client_name LIKE '$search_like' OR c.industry LIKE '$search_like' OR c.domain LIKE '$search_like' OR c.website_url LIKE '$search_like' OR c.contact_email LIKE '$search_like' OR stm.name LIKE '$search_like'";
}

// Get total count for pagination
$count_sql = "SELECT COUNT(*) as total FROM clients c LEFT JOIN sales_team_members stm ON c.sales_person_id = stm.id $where";
$count_result = $mysqli->query($count_sql);
$total = 0;
if ($count_result && $row = $count_result->fetch_assoc()) {
    $total = (int)$row['total'];
}
$total_pages = max(1, ceil($total / $per_page));

// Fetch paginated records
$sql = "SELECT c.id, c.client_name, c.industry, c.domain, c.website_url, c.contact_email, c.status, stm.name as sales_person_name FROM clients c LEFT JOIN sales_team_members stm ON c.sales_person_id = stm.id $where ORDER BY c.id DESC LIMIT $per_page OFFSET $offset";
$result = $mysqli->query($sql);
?>
<?php include 'common/header.php'; ?>
        <div class="px-40 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col max-w-[1040px] flex-1">
            <div class="flex flex-wrap justify-between gap-3 p-4">
              <p class="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72">Clients</p>
              <button
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-medium leading-normal"
              >
                <span class="truncate">New Client</span>
              </button>
            </div>
            <div class="px-4 py-3">
              <form method="get" class="flex flex-col min-w-40 h-12 w-full">
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
                    type="text"
                    name="search"
                    placeholder="Search clients"
                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-[#60768a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value="<?php echo htmlspecialchars($search); ?>"
                  />
                  <button type="submit" class="hidden"></button>
                </div>
              </form>
            </div>
            <div class="px-4 py-3 @container">
              <div class="flex overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
                <table class="flex-1">
                  <thead>
                    <tr class="bg-white">
                      <th class="px-4 py-3 text-left text-[#111518] text-sm font-medium leading-normal">ID</th>
                      <th class="px-4 py-3 text-left text-[#111518] text-sm font-medium leading-normal">Client Name</th>
                      <th class="px-4 py-3 text-left text-[#111518] text-sm font-medium leading-normal">Industry</th>
                      <th class="px-4 py-3 text-left text-[#111518] text-sm font-medium leading-normal">Domain</th>
                      <th class="px-4 py-3 text-left text-[#111518] text-sm font-medium leading-normal">Website URL</th>
                      <th class="px-4 py-3 text-left text-[#111518] text-sm font-medium leading-normal">Contact Email</th>
                      <th class="px-4 py-3 text-left text-[#111518] text-sm font-medium leading-normal">Sales Person</th>
                      <th class="px-4 py-3 text-left text-[#111518] text-sm font-medium leading-normal">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php if ($result && $result->num_rows > 0): ?>
                      <?php while($row = $result->fetch_assoc()): ?>
                    <tr class="border-t border-t-[#dbe1e6] cursor-pointer hover:bg-[#f0f4fa] transition" onclick="window.location.href='generate.php?client_id=<?php echo urlencode($row['id']); ?>&client_name=<?php echo urlencode($row['client_name']); ?>&sales_person_name=<?php echo urlencode($row['sales_person_name']); ?>'">
                          <td class="h-[72px] px-4 py-2 text-[#111518] text-sm font-normal leading-normal"><?php echo htmlspecialchars($row['id']); ?></td>
                          <td class="h-[72px] px-4 py-2 text-[#111518] text-sm font-normal leading-normal"><?php echo htmlspecialchars($row['client_name']); ?></td>
                          <td class="h-[72px] px-4 py-2 text-[#60768a] text-sm font-normal leading-normal"><?php echo htmlspecialchars($row['industry']); ?></td>
                          <td class="h-[72px] px-4 py-2 text-[#60768a] text-sm font-normal leading-normal"><?php echo htmlspecialchars($row['domain']); ?></td>
                          <td class="h-[72px] px-4 py-2 text-[#60768a] text-sm font-normal leading-normal"><a href="<?php echo htmlspecialchars($row['website_url']); ?>" target="_blank"><?php echo htmlspecialchars($row['website_url']); ?></a></td>
                          <td class="h-[72px] px-4 py-2 text-[#60768a] text-sm font-normal leading-normal"><?php echo htmlspecialchars($row['contact_email']); ?></td>
                          <td class="h-[72px] px-4 py-2 text-[#60768a] text-sm font-normal leading-normal"><?php echo htmlspecialchars($row['sales_person_name']); ?></td>
                          <td class="h-[72px] px-4 py-2 text-[#60768a] text-sm font-normal leading-normal"><?php echo htmlspecialchars($row['status']); ?></td>
                    </tr>
                      <?php endwhile; ?>
                    <?php else: ?>
                      <tr><td colspan="8" class="px-4 py-2 text-center text-[#60768a]">No clients found.</td></tr>
                    <?php endif; ?>
                  </tbody>
                </table>
              </div>
              <style>
                /* Responsive table columns can be added here if needed */
              </style>
            </div>
            <div class="flex items-center justify-center p-4 gap-2">
              <?php if ($total_pages > 1): ?>
                <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                  <a href="?page=<?php echo $i; ?><?php if ($search !== '') echo '&search=' . urlencode($search); ?>" class="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center <?php echo $i == $page ? 'text-white bg-[#2563eb]' : 'text-[#111518] bg-[#f0f2f5]'; ?> rounded-full mx-1">
                    <?php echo $i; ?>
                  </a>
                <?php endfor; ?>
              <?php endif; ?>
                </div>
<?php include 'common/footer.php'; ?>