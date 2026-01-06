-- ============================================
-- RISHOM ADMIN - CRÉATION DES TABLES
-- Base de données: rishom
-- ============================================

-- Supprimer les tables existantes si nécessaire (dans l'ordre inverse des dépendances)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS job_offers;
DROP TABLE IF EXISTS media_library;
DROP TABLE IF EXISTS seo_meta;
DROP TABLE IF EXISTS social_media_links;
DROP TABLE IF EXISTS footer_content;
DROP TABLE IF EXISTS faq_items;
DROP TABLE IF EXISTS faq_categories;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS partners;
DROP TABLE IF EXISTS partner_categories;
DROP TABLE IF EXISTS contact_information;
DROP TABLE IF EXISTS rba_programs;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS leadership_team;
DROP TABLE IF EXISTS company_values;
DROP TABLE IF EXISTS timeline_milestones;
DROP TABLE IF EXISTS news_articles;
DROP TABLE IF EXISTS news_categories;
DROP TABLE IF EXISTS statistics;
DROP TABLE IF EXISTS about_section;
DROP TABLE IF EXISTS pages_content;
DROP TABLE IF EXISTS hero_carousel_slides;
DROP TABLE IF EXISTS entities;
DROP TABLE IF EXISTS site_configuration;
DROP TABLE IF EXISTS admin_users;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- 1. UTILISATEURS ADMIN
-- ============================================
CREATE TABLE admin_users (
  id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'editor',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 2. CONFIGURATION DU SITE
-- ============================================
CREATE TABLE site_configuration (
  id VARCHAR(36) PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL DEFAULT 'Groupe Rishom',
  company_short_name VARCHAR(100) DEFAULT 'Rishom',
  site_title VARCHAR(255) NOT NULL,
  site_description TEXT,
  site_keywords TEXT,
  default_language VARCHAR(5) NOT NULL DEFAULT 'FR',
  timezone VARCHAR(50) DEFAULT 'Africa/Ouagadougou',
  currency VARCHAR(10) DEFAULT 'XOF',
  google_analytics_id VARCHAR(50),
  favicon_url VARCHAR(500),
  og_image_url VARCHAR(500),
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 3. ENTITÉS (RBF, RIC, REVI, RBA, GROUPE)
-- ============================================
CREATE TABLE entities (
  id VARCHAR(36) PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  short_name VARCHAR(100) NOT NULL,
  description TEXT,
  color_primary VARCHAR(7) NOT NULL,
  color_secondary VARCHAR(7),
  logo_url VARCHAR(500),
  logo_white_url VARCHAR(500),
  logo_dark_url VARCHAR(500),
  page_slug VARCHAR(100) UNIQUE,
  about_text TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 4. CAROUSEL PAGE D'ACCUEIL
-- ============================================
CREATE TABLE hero_carousel_slides (
  id VARCHAR(36) PRIMARY KEY,
  entity_id VARCHAR(36),
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(500),
  image_url VARCHAR(500) NOT NULL,
  image_alt_text VARCHAR(255),
  image_description TEXT,
  color_code VARCHAR(7),
  link_url VARCHAR(500),
  cta_text VARCHAR(100),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE SET NULL
);

-- ============================================
-- 5. CONTENU DES PAGES
-- ============================================
CREATE TABLE pages_content (
  id VARCHAR(36) PRIMARY KEY,
  page_slug VARCHAR(100) NOT NULL UNIQUE,
  page_title VARCHAR(255) NOT NULL,
  page_description TEXT,
  hero_title VARCHAR(255),
  hero_subtitle VARCHAR(500),
  hero_image_url VARCHAR(500),
  hero_image_alt VARCHAR(255),
  content_blocks JSON,
  seo_title VARCHAR(60),
  seo_description VARCHAR(160),
  seo_keywords VARCHAR(255),
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 6. SECTION À PROPOS (ACCUEIL)
-- ============================================
CREATE TABLE about_section (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(500),
  body TEXT,
  image_url VARCHAR(500),
  image_alt_text VARCHAR(255),
  cta_text VARCHAR(100),
  cta_url VARCHAR(500),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 7. STATISTIQUES
-- ============================================
CREATE TABLE statistics (
  id VARCHAR(36) PRIMARY KEY,
  icon VARCHAR(100),
  label VARCHAR(100) NOT NULL,
  value INT NOT NULL,
  suffix VARCHAR(20),
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 8. CATÉGORIES D'ARTICLES
-- ============================================
CREATE TABLE news_categories (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  color VARCHAR(7),
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 9. ARTICLES/ACTUALITÉS
-- ============================================
CREATE TABLE news_articles (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image_url VARCHAR(500),
  featured_image_alt VARCHAR(255),
  category_id VARCHAR(36),
  entity_id VARCHAR(36),
  author VARCHAR(255),
  published_at TIMESTAMP NULL,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  read_time_minutes INT,
  seo_title VARCHAR(60),
  seo_description VARCHAR(160),
  seo_keywords VARCHAR(255),
  meta_image_url VARCHAR(500),
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES news_categories(id) ON DELETE SET NULL,
  FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE SET NULL
);

-- ============================================
-- 10. TIMELINE/HISTORIQUE
-- ============================================
CREATE TABLE timeline_milestones (
  id VARCHAR(36) PRIMARY KEY,
  year INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 11. VALEURS DE L'ENTREPRISE
-- ============================================
CREATE TABLE company_values (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 12. ÉQUIPE DE DIRECTION
-- ============================================
CREATE TABLE leadership_team (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  bio TEXT,
  image_url VARCHAR(500),
  image_alt_text VARCHAR(255),
  linkedin_url VARCHAR(500),
  email VARCHAR(255),
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 13. SERVICES PAR ENTITÉ
-- ============================================
CREATE TABLE services (
  id VARCHAR(36) PRIMARY KEY,
  entity_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  image_url VARCHAR(500),
  page_url VARCHAR(500),
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE CASCADE
);

-- ============================================
-- 14. PROGRAMMES RBA (DÉTAILLÉS)
-- ============================================
CREATE TABLE rba_programs (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  duration VARCHAR(100),
  level VARCHAR(50),
  certification_type VARCHAR(100),
  target_audience TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 15. INFORMATIONS DE CONTACT
-- ============================================
CREATE TABLE contact_information (
  id VARCHAR(36) PRIMARY KEY,
  entity_id VARCHAR(36),
  location_name VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Burkina Faso',
  phone VARCHAR(50),
  phone_mobile VARCHAR(50),
  email VARCHAR(255),
  email_secondary VARCHAR(255),
  opening_hours JSON,
  is_main_office BOOLEAN NOT NULL DEFAULT FALSE,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  website VARCHAR(500),
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE SET NULL
);

-- ============================================
-- 16. CATÉGORIES DE PARTENAIRES
-- ============================================
CREATE TABLE partner_categories (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 17. PARTENAIRES
-- ============================================
CREATE TABLE partners (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id VARCHAR(36),
  partner_type VARCHAR(100),
  logo_url VARCHAR(500),
  logo_alt_text VARCHAR(255),
  description TEXT,
  partnership_since_year INT,
  website_url VARCHAR(500),
  contact_email VARCHAR(255),
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES partner_categories(id) ON DELETE SET NULL
);

-- ============================================
-- 18. TÉMOIGNAGES
-- ============================================
CREATE TABLE testimonials (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  program_or_service VARCHAR(255),
  testimonial_text TEXT NOT NULL,
  image_url VARCHAR(500),
  image_alt_text VARCHAR(255),
  company VARCHAR(255),
  entity_id VARCHAR(36),
  rating INT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE SET NULL
);

-- ============================================
-- 19. CATÉGORIES FAQ
-- ============================================
CREATE TABLE faq_categories (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  color VARCHAR(7),
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 20. QUESTIONS FAQ
-- ============================================
CREATE TABLE faq_items (
  id VARCHAR(36) PRIMARY KEY,
  category_id VARCHAR(36),
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES faq_categories(id) ON DELETE SET NULL
);

-- ============================================
-- 21. CONTENU FOOTER
-- ============================================
CREATE TABLE footer_content (
  id VARCHAR(36) PRIMARY KEY,
  section_name VARCHAR(100) NOT NULL,
  section_type VARCHAR(50) NOT NULL,
  content JSON,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 22. RÉSEAUX SOCIAUX
-- ============================================
CREATE TABLE social_media_links (
  id VARCHAR(36) PRIMARY KEY,
  platform VARCHAR(50) NOT NULL,
  url VARCHAR(500) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 23. MÉTADONNÉES SEO
-- ============================================
CREATE TABLE seo_meta (
  id VARCHAR(36) PRIMARY KEY,
  page_slug VARCHAR(100) NOT NULL UNIQUE,
  meta_title VARCHAR(60),
  meta_description VARCHAR(160),
  meta_keywords VARCHAR(255),
  og_title VARCHAR(100),
  og_description VARCHAR(255),
  og_image_url VARCHAR(500),
  canonical_url VARCHAR(500),
  robots VARCHAR(100) DEFAULT 'index, follow',
  is_indexed BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 24. MÉDIATHÈQUE
-- ============================================
CREATE TABLE media_library (
  id VARCHAR(36) PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_type VARCHAR(50),
  file_size INT,
  alt_text VARCHAR(255),
  description TEXT,
  category VARCHAR(50),
  entity_id VARCHAR(36),
  usage_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE SET NULL
);

-- ============================================
-- 25. OFFRES D'EMPLOI
-- ============================================
CREATE TABLE job_offers (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  entity_id VARCHAR(36),
  location VARCHAR(255),
  contract_type VARCHAR(50),
  description TEXT,
  requirements TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  published_at TIMESTAMP NULL,
  expires_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE SET NULL
);

-- ============================================
-- 26. MESSAGES DE CONTACT
-- ============================================
CREATE TABLE contact_messages (
  id VARCHAR(36) PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  entity_id VARCHAR(36),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  is_archived BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE SET NULL
);

-- ============================================
-- DONNÉES INITIALES
-- ============================================

-- Créer un utilisateur admin par défaut (mot de passe: admin123 - à changer!)
INSERT INTO admin_users (id, username, email, password, role, is_active) VALUES
(UUID(), 'admin', 'admin@rishom.com', '$2b$10$rQZ8K8Y8Y8Y8Y8Y8Y8Y8YuK8K8K8K8K8K8K8K8K8K8K8K8K8K8K8', 'super_admin', TRUE);

-- Créer les 5 entités
INSERT INTO entities (id, code, full_name, short_name, color_primary, color_secondary, page_slug, display_order) VALUES
(UUID(), 'GROUPE', 'Groupe Rishom', 'Rishom', '#8B1538', '#C74634', 'group', 0),
(UUID(), 'RBF', 'Rishom BTP & Fournitures', 'RBF', '#C74634', '#8B1538', 'rbf', 1),
(UUID(), 'RIC', 'Rishom Invest & Conseil', 'RIC', '#8B1538', '#C74634', 'ric', 2),
(UUID(), 'REVI', 'Rishom Elevage & Valorisation Intégrée', 'REVI', '#058B5E', '#034D33', 'revi', 3),
(UUID(), 'RBA', 'Rishom Business Academy', 'RBA', '#2E5A9C', '#1A3A6E', 'rba', 4);

-- Créer les statistiques
INSERT INTO statistics (id, icon, label, value, suffix, display_order, is_active) VALUES
(UUID(), 'Building2', 'Entités', 5, '', 1, TRUE),
(UUID(), 'Users', 'Collaborateurs', 500, '+', 2, TRUE),
(UUID(), 'Globe', 'Pays', 4, '', 3, TRUE),
(UUID(), 'Award', 'Années d\'expérience', 15, '', 4, TRUE);

-- Créer les catégories de news
INSERT INTO news_categories (id, name, slug, color, display_order) VALUES
(UUID(), 'Groupe', 'groupe', '#8B1538', 0),
(UUID(), 'RBF', 'rbf', '#C74634', 1),
(UUID(), 'RIC', 'ric', '#8B1538', 2),
(UUID(), 'REVI', 'revi', '#058B5E', 3),
(UUID(), 'RBA', 'rba', '#2E5A9C', 4);

-- Créer les catégories de partenaires
INSERT INTO partner_categories (id, name, display_order) VALUES
(UUID(), 'Partenaires Institutionnels', 1),
(UUID(), 'Partenaires Techniques', 2),
(UUID(), 'Partenaires Financiers', 3),
(UUID(), 'Partenaires Académiques', 4);

-- Créer les catégories FAQ
INSERT INTO faq_categories (id, name, color, display_order) VALUES
(UUID(), 'Questions générales', '#8B1538', 1),
(UUID(), 'Carrières & Recrutement', '#C74634', 2),
(UUID(), 'Projets & Partenariats', '#058B5E', 3),
(UUID(), 'Services par entité', '#2E5A9C', 4),
(UUID(), 'Responsabilité & Engagement', '#1A3A6E', 5);

-- Créer les réseaux sociaux
INSERT INTO social_media_links (id, platform, url, display_order) VALUES
(UUID(), 'linkedin', 'https://linkedin.com/company/groupe-rishom', 1),
(UUID(), 'facebook', 'https://facebook.com/grouperishom', 2);

-- Créer la configuration du site
INSERT INTO site_configuration (id, company_name, company_short_name, site_title, site_description, default_language) VALUES
(UUID(), 'Groupe Rishom', 'Rishom', 'Groupe Rishom - Acteur majeur du développement africain', 'Le Groupe Rishom est un acteur majeur du développement africain, intervenant dans les domaines du BTP, du conseil, de l\'agro-industrie et de la formation.', 'FR');

-- ============================================
-- FIN DE LA MIGRATION
-- ============================================
SELECT 'Migration terminée avec succès!' AS status;
SELECT COUNT(*) AS tables_created FROM information_schema.tables WHERE table_schema = 'rishom';
