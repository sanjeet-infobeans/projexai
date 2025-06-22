import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Layout from './components/common/Layout';
import LoginPage from './components/LoginPage';
import ListPage from './components/ListPage';
import ClientDetailPage from './components/ClientDetailPage';
import SalesConversation from './components/SalesConversation';
import Home from './components/Home';
import About from './components/About';
import Team from './components/Team';
import Resource from './components/Resource';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import EditClient from './components/EditClient';
import DashboardManager from './components/DashboardManager';
import DashboardTechnical from './components/DashboardTechnical';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route component (redirects to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

// RoleProtectedRoute: checks both authentication and user role
const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  let role = user?.user_role || user?.role || '';
  if (Array.isArray(role)) {
    role = role[0] || '';
  }
  if (typeof role !== 'string') {
    role = '';
  }
  role = role.toLowerCase();
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

// Placeholder components
const Proposals = () => <div className="p-8">Proposals Section (Coming Soon)</div>;
const Reports = () => <div className="p-8">Reports Section (Coming Soon)</div>;
const Projects = () => <div className="p-8">Projects Section (Coming Soon)</div>;
const TechStack = () => <div className="p-8">Tech Stack Section (Coming Soon)</div>;
const Analysis = () => <div className="p-8">Analysis Section (Coming Soon)</div>;

// ProjectList and ProjectDetail for technical users
const sampleProjects = [
  {
    id: 1,
    title: 'AI Chatbot Platform',
    technology: 'React, Node.js, Python',
    client: 'Acme Corp',
    status: 'Running',
    gitUrl: 'https://github.com/example/ai-chatbot',
    jiraUrl: 'https://acme.atlassian.net/browse/AI-1',
    trelloUrl: 'https://trello.com/b/abc123/ai-chatbot',
    team: ['Alice', 'Bob', 'Priya'],
    boilerplate: 'https://github.com/example/ai-chatbot-boilerplate'
  },
  {
    id: 2,
    title: 'E-commerce Analytics',
    technology: 'Vue, Go',
    client: 'ShopSmart',
    status: 'Completed',
    gitUrl: 'https://github.com/example/ecommerce-analytics',
    jiraUrl: 'https://shopsmart.atlassian.net/browse/EC-1',
    trelloUrl: 'https://trello.com/b/def456/ecommerce-analytics',
    team: ['Neha', 'Rahul'],
    boilerplate: 'https://github.com/example/ecommerce-analytics-boilerplate'
  }
];

const ProjectDetail = ({ project, onBack }) => (
  <>
    <Header />
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#131416] tracking-light text-[32px] font-bold leading-tight">Project Details</p>
            <p className="text-[#6e717c] text-sm font-normal leading-normal">View and manage project information</p>
          </div>
        </div>
        <h3 className="text-[#131416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Project Information</h3>
        <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dfdfe2] py-5">
            <p className="text-[#6e717c] text-sm font-normal leading-normal">Project ID</p>
            <p className="text-[#131416] text-sm font-normal leading-normal">#{project.id}</p>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dfdfe2] py-5">
            <p className="text-[#6e717c] text-sm font-normal leading-normal">Technology Stack</p>
            <p className="text-[#131416] text-sm font-normal leading-normal">{project.technology}</p>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dfdfe2] py-5">
            <p className="text-[#6e717c] text-sm font-normal leading-normal">Client</p>
            <p className="text-[#131416] text-sm font-normal leading-normal">{project.client}</p>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dfdfe2] py-5">
            <p className="text-[#6e717c] text-sm font-normal leading-normal">Status</p>
            <p className="text-[#131416] text-sm font-normal leading-normal">{project.status}</p>
          </div>
        </div>
        <h3 className="text-[#131416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Team Members</h3>
        <div className="flex items-center px-4 py-3 justify-start">
          {/* Sample avatars for team members */}
          {project.teamAvatars?.map((avatar, idx) => (
            <div key={idx} className="overflow-visible w-[34px]">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover border-white bg-[#f1f2f3] text-[#6e717c] rounded-full flex items-center justify-center size-11 border-4"
                style={{ backgroundImage: `url('${avatar}')` }}
              ></div>
            </div>
          ))}
        </div>
        <h3 className="text-[#131416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Links</h3>
        <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[#131416] flex items-center justify-center rounded-lg bg-[#f1f2f3] shrink-0 size-10">
              {/* GitHub SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
              </svg>
            </div>
            <p className="text-[#131416] text-base font-normal leading-normal flex-1 truncate">GitHub</p>
          </div>
          <div className="shrink-0">
            <a href={project.gitUrl} target="_blank" rel="noopener noreferrer" className="text-[#131416] flex size-7 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[#131416] flex items-center justify-center rounded-lg bg-[#f1f2f3] shrink-0 size-10">
              {/* Jira SVG (StackOverflowLogo as placeholder) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M216,152.09V216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V152.09a8,8,0,0,1,16,0V208H200V152.09a8,8,0,0,1,16,0Zm-128,32h80a8,8,0,1,0,0-16H88a8,8,0,1,0,0,16Zm4.88-53,77.27,20.68a7.89,7.89,0,0,0,2.08.28,8,8,0,0,0,2.07-15.71L97,115.61A8,8,0,1,0,92.88,131Zm18.45-49.93,69.28,40a8,8,0,0,0,10.93-2.93,8,8,0,0,0-2.93-10.91L119.33,67.27a8,8,0,1,0-8,13.84Zm87.33,13A8,8,0,1,0,210,82.84l-56.57-56.5a8,8,0,0,0-11.32,11.3Z"></path>
              </svg>
            </div>
            <p className="text-[#131416] text-base font-normal leading-normal flex-1 truncate">Jira</p>
          </div>
          <div className="shrink-0">
            <a href={project.jiraUrl} target="_blank" rel="noopener noreferrer" className="text-[#131416] flex size-7 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[#131416] flex items-center justify-center rounded-lg bg-[#f1f2f3] shrink-0 size-10">
              {/* Trello SVG (SlackLogo as placeholder) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.13,128A32,32,0,0,0,184,76.31V56a32,32,0,0,0-56-21.13A32,32,0,0,0,76.31,72H56a32,32,0,0,0-21.13,56A32,32,0,0,0,72,179.69V200a32,32,0,0,0,56,21.13A32,32,0,0,0,179.69,184H200a32,32,0,0,0,21.13-56ZM72,152a16,16,0,1,1-16-16H72Zm48,48a16,16,0,0,1-32,0V152a16,16,0,0,1,16-16h16Zm0-80H56a16,16,0,0,1,0-32h48a16,16,0,0,1,16,16Zm0-48H104a16,16,0,1,1,16-16Zm16-16a16,16,0,0,1,32,0v48a16,16,0,0,1-16,16H136Zm16,160a16,16,0,0,1-16-16V184h16a16,16,0,0,1,0,32Zm48-48H152a16,16,0,0,1-16-16V136h64a16,16,0,0,1,0,32Zm0-48H184V104a16,16,0,1,1,16,16Z"></path>
              </svg>
            </div>
            <p className="text-[#131416] text-base font-normal leading-normal flex-1 truncate">Trello</p>
          </div>
          <div className="shrink-0">
            <a href={project.trelloUrl} target="_blank" rel="noopener noreferrer" className="text-[#131416] flex size-7 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="flex px-4 py-3 justify-end">
          <a
            href={project.boilerplate}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#9fa6ca] text-[#131416] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Generate Boilerplate</span>
          </a>
        </div>
        <div className="px-4 py-2">
          <button onClick={onBack} className="text-blue-600 hover:underline">&larr; Back to Projects</button>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

const ProjectList = () => {
  const { user } = require('./hooks/useAuth').useAuth();
  let role = user?.user_role || user?.role || '';
  if (Array.isArray(role)) role = role[0] || '';
  if (typeof role !== 'string') role = '';
  role = role.toLowerCase();
  const [selected, setSelected] = React.useState(null);
  if (role !== 'technical_lead' && role !== 'technical') {
    return <div className="p-8 text-center text-red-600 text-lg font-semibold">Access Denied: Only technical users can view projects.</div>;
  }
  if (selected) {
    return <ProjectDetail project={selected} onBack={() => setSelected(null)} />;
  }
  return (
    <>
      <Header />
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#121217] tracking-light text-[32px] font-bold leading-tight min-w-72">Projects</p>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f1f4] text-[#121217] text-sm font-medium leading-normal"
            >
              <span className="truncate">New Project</span>
            </button>
          </div>
          <div className="px-4 py-3 @container">
            <div className="flex overflow-hidden rounded-xl border border-[#dcdee5] bg-white">
              <table className="flex-1">
                <thead>
                  <tr className="bg-white">
                    <th className="table-f0787847-4d63-4320-8811-4f40d6a15fde-column-120 px-4 py-3 text-left text-[#121217] w-[400px] text-sm font-medium leading-normal">Project ID</th>
                    <th className="table-f0787847-4d63-4320-8811-4f40d6a15fde-column-240 px-4 py-3 text-left text-[#121217] w-[400px] text-sm font-medium leading-normal">Title</th>
                    <th className="table-f0787847-4d63-4320-8811-4f40d6a15fde-column-360 px-4 py-3 text-left text-[#121217] w-[400px] text-sm font-medium leading-normal">Technology</th>
                    <th className="table-f0787847-4d63-4320-8811-4f40d6a15fde-column-480 px-4 py-3 text-left text-[#121217] w-[400px] text-sm font-medium leading-normal">Client</th>
                    <th className="table-f0787847-4d63-4320-8811-4f40d6a15fde-column-600 px-4 py-3 text-left text-[#121217] w-60 text-sm font-medium leading-normal">Status</th>
                    <th className="table-f0787847-4d63-4320-8811-4f40d6a15fde-column-720 px-4 py-3 text-left text-[#121217] w-60 text-[#656a86] text-sm font-medium leading-normal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleProjects.map(project => (
                    <tr key={project.id} className="border-t border-t-[#dcdee5]">
                      <td className="table-f0787847-4d63-4320-8811-4f40d6a15fde-column-120 h-[72px] px-4 py-2 w-[400px] text-[#656a86] text-sm font-normal leading-normal">#{project.id}</td>
                      <td className="table-f0787847-4d63-4320-8811-4f40d6a15fde-column-240 h-[72px] px-4 py-2 w-[400px] text-[#121217] text-sm font-normal leading-normal">{project.title}</td>
                      <td className="table-f0787847-4d63-4320-8811-4f40d6a15fde-column-360 h-[72px] px-4 py-2 w-[400px] text-[#656a86] text-sm font-normal leading-normal">{project.technology}</td>
                      <td className="table-f0787847-4d63-4320-8811-4f40d6a15fde-column-480 h-[72px] px-4 py-2 w-[400px] text-[#656a86] text-sm font-normal leading-normal">{project.client}</td>
                      <td className="table-f0787847-4d63-4320-8811-4f40d6a15fde-column-600 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f1f4] text-[#121217] text-sm font-medium leading-normal w-full">
                          <span className="truncate">{project.status}</span>
                        </button>
                      </td>
                      <td className="table-f0787847-4d63-4320-8811-4f40d6a15fde-column-720 h-[72px] px-4 py-2 w-60 text-[#656a86] text-sm font-bold leading-normal tracking-[0.015em]">
                        <button className="text-[#656a86] font-bold leading-normal tracking-[0.015em]" onClick={() => setSelected(project)}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <style>{`
              @container(max-width:120px){.table-f0787847-4d63-4320-8811-4f40d6a15fde-column-120{display: none;}}
              @container(max-width:240px){.table-f0787847-4d63-4320-8811-4f40d6a15fde-column-240{display: none;}}
              @container(max-width:360px){.table-f0787847-4d63-4320-8811-4f40d6a15fde-column-360{display: none;}}
              @container(max-width:480px){.table-f0787847-4d63-4320-8811-4f40d6a15fde-column-480{display: none;}}
              @container(max-width:600px){.table-f0787847-4d63-4320-8811-4f40d6a15fde-column-600{display: none;}}
              @container(max-width:720px){.table-f0787847-4d63-4320-8811-4f40d6a15fde-column-720{display: none;}}
            `}</style>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const AppContent = () => {
  return (
    <div className="App">
      <Routes>
        {/* Public static pages with guest layout */}
        <Route 
          path="/" 
          element={
            <Layout>
              <Home />
            </Layout>
          } 
        />
        
        <Route 
          path="/about" 
          element={
            <Layout>
              <About />
            </Layout>
          } 
        />
        
        <Route 
          path="/team" 
          element={
            <Layout>
              <Team />
            </Layout>
          } 
        />
        
        <Route 
          path="/resource" 
          element={
            <Layout>
              <Resource />
            </Layout>
          } 
        />
        
        {/* Login page */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/clients" 
          element={
            <ProtectedRoute>
              <ListPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/client/:id" 
          element={
            <ProtectedRoute>
              <ClientDetailPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/sales-conversation/:id" 
          element={
            <ProtectedRoute>
              <SalesConversation />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/edit-client/:id" 
          element={
            <ProtectedRoute>
              <EditClient />
            </ProtectedRoute>
          } 
        />
        
        {/* Manager Dashboard */}
        <Route 
          path="/dashboard/manager" 
          element={
            <RoleProtectedRoute allowedRoles={["manager"]}>
              <DashboardManager />
            </RoleProtectedRoute>
          } 
        />
        
        {/* Technical Lead Dashboard */}
        <Route 
          path="/dashboard/technical" 
          element={
            <RoleProtectedRoute allowedRoles={["technical_lead","technical"]}>
              <DashboardTechnical />
            </RoleProtectedRoute>
          } 
        />
        
        {/* Proposals */}
        <Route 
          path="/proposals" 
          element={
            <ProtectedRoute>
              <Proposals />
            </ProtectedRoute>
          } 
        />
        
        {/* Reports */}
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } 
        />
        
        {/* Projects */}
        <Route 
          path="/projects" 
          element={
            <ProtectedRoute>
              <ProjectList />
            </ProtectedRoute>
          } 
        />
        
        {/* Tech Stack */}
        <Route 
          path="/tech-stack" 
          element={
            <ProtectedRoute>
              <TechStack />
            </ProtectedRoute>
          } 
        />
        
        {/* Analysis */}
        <Route 
          path="/analysis" 
          element={
            <ProtectedRoute>
              <Analysis />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;