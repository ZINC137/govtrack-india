CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(160) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  dob DATE,
  state VARCHAR(120),
  district VARCHAR(120),
  gender VARCHAR(40),
  category VARCHAR(40),
  qualification VARCHAR(120),
  degree_type VARCHAR(120),
  branch VARCHAR(120),
  experience_years INTEGER DEFAULT 0,
  disability BOOLEAN DEFAULT FALSE,
  nationality VARCHAR(80) DEFAULT 'Indian',
  interests JSONB DEFAULT '[]',
  notification_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(180) UNIQUE NOT NULL,
  department VARCHAR(180) NOT NULL,
  website VARCHAR(255) NOT NULL
);

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(260) UNIQUE NOT NULL,
  organization_id INTEGER REFERENCES organizations(id),
  category VARCHAR(80) NOT NULL,
  job_type VARCHAR(80) NOT NULL,
  state VARCHAR(120),
  vacancies INTEGER NOT NULL,
  salary_min INTEGER NOT NULL,
  salary_max INTEGER NOT NULL,
  description TEXT NOT NULL,
  selection_process JSONB DEFAULT '[]',
  required_documents JSONB DEFAULT '[]',
  official_notification_pdf VARCHAR(255),
  official_website VARCHAR(255) NOT NULL,
  application_link VARCHAR(255) NOT NULL,
  published_at DATE NOT NULL,
  apply_start_date DATE NOT NULL,
  last_date DATE NOT NULL,
  exam_date DATE,
  admit_card_date DATE,
  result_date DATE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE eligibility_rules (
  id SERIAL PRIMARY KEY,
  job_id INTEGER UNIQUE REFERENCES jobs(id),
  min_age INTEGER NOT NULL,
  max_age INTEGER NOT NULL,
  qualifications JSONB DEFAULT '[]',
  allowed_categories JSONB DEFAULT '[]',
  allowed_states JSONB DEFAULT '[]',
  min_experience_years INTEGER DEFAULT 0,
  nationality VARCHAR(80) DEFAULT 'Indian',
  disability_allowed BOOLEAN DEFAULT TRUE,
  notes TEXT
);

CREATE TABLE saved_jobs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  job_id INTEGER REFERENCES jobs(id),
  status VARCHAR(40) DEFAULT 'Interested',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  job_id INTEGER REFERENCES jobs(id),
  type VARCHAR(80) NOT NULL,
  title VARCHAR(180) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(160) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(80) DEFAULT 'editor',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE states (id SERIAL PRIMARY KEY, name VARCHAR(120) UNIQUE NOT NULL, code VARCHAR(8) UNIQUE NOT NULL);
CREATE TABLE categories (id SERIAL PRIMARY KEY, name VARCHAR(80) UNIQUE NOT NULL);
CREATE TABLE qualifications (id SERIAL PRIMARY KEY, name VARCHAR(120) UNIQUE NOT NULL, rank INTEGER DEFAULT 0);
CREATE TABLE activity_logs (
  id SERIAL PRIMARY KEY,
  actor_id INTEGER,
  action VARCHAR(120) NOT NULL,
  target_type VARCHAR(80) NOT NULL,
  target_id INTEGER,
  metadata_json JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
