-- Developer Portfolio Lab — Database Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. profiles（个人资料）
-- ============================================
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) UNIQUE NOT NULL,
  name text NOT NULL,
  title text,
  bio text,
  avatar_url text,
  location text,
  email text,
  github_url text,
  linkedin_url text,
  twitter_url text,
  website_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can read (public profile)
CREATE POLICY "Profiles are public" ON profiles
  FOR SELECT USING (true);

-- Only the owner can update their profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- 2. projects（项目）
-- ============================================
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  summary text,
  description text,
  cover_url text,
  role text,
  duration text,
  tech_stack text[] DEFAULT '{}',
  problem text,
  solution text,
  architecture text,
  technical_decisions jsonb DEFAULT '[]',
  engineering_checklist jsonb DEFAULT '[]',
  performance_metrics jsonb DEFAULT '[]',
  demo_url text,
  github_url text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured boolean DEFAULT false,
  order_index int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public can read published projects
CREATE POLICY "Published projects are public" ON projects
  FOR SELECT USING (status = 'published');

-- Authenticated users can do everything (admin)
CREATE POLICY "Admin full access to projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 3. experiences（工作经历）
-- ============================================
CREATE TABLE experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  position text NOT NULL,
  period text NOT NULL,
  tech_stack text[] DEFAULT '{}',
  challenges text[] DEFAULT '{}',
  solutions text[] DEFAULT '{}',
  order_index int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Experiences are public" ON experiences FOR SELECT USING (true);
CREATE POLICY "Admin full access to experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 4. skills（技能）
-- ============================================
CREATE TABLE skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  level int DEFAULT 50,
  order_index int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Skills are public" ON skills FOR SELECT USING (true);
CREATE POLICY "Admin full access to skills" ON skills FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 5. articles（技术文章）
-- ============================================
CREATE TABLE articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  content text,
  cover_url text,
  tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published articles are public" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "Admin full access to articles" ON articles FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 6. site_settings（站点配置）
-- ============================================
CREATE TABLE site_settings (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_name text DEFAULT 'Developer Portfolio Lab',
  site_description text,
  og_image_url text,
  analytics_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Site settings are public" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin full access to site settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Insert default row
INSERT INTO site_settings (id) VALUES (1);

-- ============================================
-- 7. experiments（Lab 实验模块）
-- ============================================
CREATE TABLE experiments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  category text,
  icon text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'beta', 'deprecated')),
  order_index int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Experiments are public" ON experiments FOR SELECT USING (true);
CREATE POLICY "Admin full access to experiments" ON experiments FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 8. Auto-update updated_at trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
