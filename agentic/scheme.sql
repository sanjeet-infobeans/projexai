-- 1. Sales Team Members
CREATE TABLE sales_team_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  phone VARCHAR(20),
  designation VARCHAR(100)
);

-- 2. Clients
CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(150),
  industry VARCHAR(100),
  domain VARCHAR(100),
  website_url VARCHAR(255),
  contact_email VARCHAR(150),
  sales_person_id INT,
  FOREIGN KEY (sales_person_id) REFERENCES sales_team_members(id)
);
CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(150),
  industry VARCHAR(100),
  domain VARCHAR(100),
  website_url VARCHAR(255),
  contact_email VARCHAR(150),
  status ENUM(
    'new',
    'contacted',
    'qualified',
    'in_discussion',
    'proposal_sent',
    'follow_up',
    'demo_scheduled',
    'negotiation',
    'won',
    'onboarded',
    'lost',
    'paused',
    'cold',
    'reengaged'
  ) DEFAULT 'new',
  sales_person_id INT,
  FOREIGN KEY (sales_person_id) REFERENCES sales_team_members(id)
);

-- 3. Client Requirements
CREATE TABLE client_requirements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT,
  title VARCHAR(200),
  description TEXT,
  business_challenges TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- 4. Projects
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_name VARCHAR(150),
  category ENUM('LowCode', 'MobileApp', 'CustomDev', 'DevOps'),
  estimated_duration_weeks INT,
  required_experience_years DECIMAL(4,2),
  client_id INT,
  client_requirement_id INT,
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (client_requirement_id) REFERENCES client_requirements(id)
);

-- 5. Skills
CREATE TABLE skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  skill_name VARCHAR(100) UNIQUE
);

-- 6. Employees
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  designation VARCHAR(100),
  department VARCHAR(100),
  availability_status ENUM('Available', 'Engaged', 'On Leave') DEFAULT 'Available'
);

-- 7. Employee Skills
CREATE TABLE employee_skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT,
  skill_id INT,
  experience_years DECIMAL(4,2),
  confidence_rating DECIMAL(2,1), -- scale of 1.0 to 5.0
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (skill_id) REFERENCES skills(id)
);

-- 8. Project Tech Stack
CREATE TABLE project_techstack (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  skill_id INT,
  min_experience_required DECIMAL(4,2),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (skill_id) REFERENCES skills(id)
);

-- 🔁 Indexes for optimization
CREATE INDEX idx_employee_skill ON employee_skills (employee_id, skill_id);
CREATE INDEX idx_project_skill ON project_techstack (project_id, skill_id);
CREATE INDEX idx_project_client ON projects (client_id, client_requirement_id);
CREATE INDEX idx_client_sales ON clients (sales_person_id);
