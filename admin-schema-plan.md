# Plan de Structure - Espace Administration Rishom

## Statistiques du Site
- **54 pages** analysées
- **200+ éléments** de contenu modifiables
- **25 tables** de base de données nécessaires
- **60+ images** à gérer

---

## TABLES DE BASE DE DONNÉES

### 1. Configuration Globale du Site
```sql
site_configuration
- id
- company_name (Groupe Rishom)
- site_title
- site_description
- default_language (FR/EN)
- google_analytics_id
- favicon_url
- og_image_url
- updated_at
```

### 2. Entités (RBF, RIC, REVI, RBA, GROUPE)
```sql
entities
- id
- code (RBF, RIC, REVI, RBA, GROUPE)
- full_name
- short_name
- description
- color_primary (#C74634, #8B1538, #058B5E, #2E5A9C)
- color_secondary
- logo_url
- logo_white_url
- page_slug
- is_active
- display_order
```

### 3. Slides Carousel Page d'Accueil (20 slides)
```sql
hero_carousel_slides
- id
- entity_id (FK)
- title
- subtitle
- image_url
- image_alt_text
- color_code
- link_url
- cta_text
- is_active
- display_order
- created_at
- updated_at
```

### 4. Contenu des Pages
```sql
pages_content
- id
- page_slug (home, about, contact, etc.)
- page_title
- hero_title
- hero_subtitle
- hero_image_url
- content_blocks (JSON)
- seo_title
- seo_description
- is_published
- updated_at
```

### 5. Section À Propos (Accueil)
```sql
about_section
- id
- title
- subtitle
- body
- image_url
- cta_text
- cta_url
- is_active
```

### 6. Statistiques (Accueil)
```sql
statistics
- id
- icon
- label (Entités, Collaborateurs, Pays, Années)
- value (5, 500, 4, 15)
- suffix (+, ans, etc.)
- display_order
- is_active
```
**Données actuelles:**
- 5 Entités
- 500+ Collaborateurs
- 4 Pays
- 15 Ans d'expérience

### 7. Articles/Actualités
```sql
news_articles
- id
- title
- slug
- excerpt
- content (rich text)
- featured_image_url
- category_id (FK)
- entity_id (FK)
- author
- published_at
- is_featured
- read_time_minutes
- is_published
- created_at
- updated_at
```
**Articles actuels:**
- Lancement nouvelle usine transformation agricole
- Partenariat stratégique investisseurs européens
- Formation 200 jeunes métiers BTP
- Livraison projet infrastructure Ouagadougou
- Expansion activités élevage
- Groupe Rishom primé RSE
- Nouvelle gamme équipements BTP

### 8. Catégories d'Articles
```sql
news_categories
- id
- name (RBF, RIC, REVI, RBA, Groupe)
- slug
- color
- display_order
```

### 9. Timeline/Historique
```sql
timeline_milestones
- id
- year
- title
- description
- image_url
- display_order
- is_active
```
**Jalons actuels:**
- 2008: Création du groupe
- 2012: Expansion régionale
- 2015: Diversification
- 2018: Innovation
- 2021: Formation
- 2025: Leadership

### 10. Valeurs de l'Entreprise
```sql
company_values
- id
- title (Excellence, Engagement, Innovation, Intégrité)
- description
- icon
- display_order
- is_active
```

### 11. Équipe de Direction
```sql
leadership_team
- id
- name
- position
- bio
- image_url
- linkedin_url
- email
- display_order
- is_active
```
**Membres actuels:**
- Amadou TRAORE - Président Directeur Général
- Fatima OUEDRAOGO - Directrice Générale Adjointe
- Ibrahim KONE - Directeur des Opérations
- Aissata SANKARA - Directrice des Ressources Humaines

### 12. Services par Entité
```sql
services
- id
- entity_id (FK)
- title
- description
- icon
- image_url
- page_url
- display_order
- is_active
```

**Services RBF:**
- Équipements de construction
- Location d'engins
- Matériaux de construction
- Maintenance & SAV
- Logistique BTP
- Conseil technique

**Services RIC:**
- Stratégie de croissance
- Levée de fonds
- Études de faisabilité
- Innovation & transformation
- Optimisation opérationnelle
- Analyse financière

**Secteurs REVI:**
- Élevage bovin
- Aviculture
- Production laitière
- Céréales & légumineuses
- Fruits & légumes
- Pisciculture

**Programmes RBA:**
- Métiers du BTP
- Comptabilité & Gestion
- Management
- Informatique
- Agro-business
- Entrepreneuriat

### 13. Programmes RBA (Détaillés)
```sql
rba_programs
- id
- title
- description
- icon
- duration
- level (débutant, intermédiaire, avancé)
- certification_type
- target_audience
- display_order
- is_active
```

### 14. Informations de Contact
```sql
contact_information
- id
- entity_id (FK)
- location_name
- address
- city
- postal_code
- country
- phone
- phone_mobile
- email
- opening_hours (JSON)
- is_main_office
- latitude
- longitude
- display_order
```
**Localisations:**
- Groupe Ouagadougou (Siège)
- RBF - Zone Industrielle Gounghin
- RIC - Avenue Kwame N'Krumah
- REVI - Zone Agricole Koudougou
- RBA - Secteur 30 Ouagadougou

### 15. Partenaires
```sql
partners
- id
- name
- category_id (FK)
- partner_type
- logo_url
- description
- website_url
- partnership_since_year
- display_order
- is_active
```

### 16. Catégories de Partenaires
```sql
partner_categories
- id
- name
- display_order
```
**Catégories:**
- Partenaires Institutionnels
- Partenaires Techniques
- Partenaires Financiers
- Partenaires Académiques

### 17. Témoignages
```sql
testimonials
- id
- name
- program_or_service
- testimonial_text
- image_url
- company
- entity_id (FK)
- rating (1-5)
- is_featured
- is_published
- created_at
```

### 18. FAQ
```sql
faq_categories
- id
- name
- color
- display_order

faq_items
- id
- category_id (FK)
- question
- answer
- display_order
- is_published
```
**Catégories FAQ:**
- Questions générales
- Carrières & Recrutement
- Projets & Partenariats
- Services par entité
- Responsabilité & Engagement

### 19. Contenu du Footer
```sql
footer_content
- id
- section_name
- section_type (about, links, entities, contact, social)
- content (JSON)
- display_order
- is_active
```

### 20. Réseaux Sociaux
```sql
social_media_links
- id
- platform (facebook, linkedin, twitter, instagram, youtube)
- url
- is_active
- display_order
```

### 21. Métadonnées SEO
```sql
seo_meta
- id
- page_slug
- meta_title
- meta_description
- meta_keywords
- og_title
- og_description
- og_image_url
- canonical_url
- is_indexed
```

### 22. Médiathèque
```sql
media_library
- id
- filename
- file_url
- file_type
- file_size
- alt_text
- description
- category (hero, carousel, news, team, partners)
- entity_id (FK optional)
- created_at
```

### 23. Utilisateurs Admin
```sql
admin_users
- id
- username
- email
- password_hash
- role (super_admin, admin, editor, viewer)
- is_active
- last_login
- created_at
```

### 24. Offres d'Emploi
```sql
job_offers
- id
- title
- entity_id (FK)
- location
- contract_type
- description
- requirements
- is_active
- published_at
- expires_at
```

### 25. Messages Contact
```sql
contact_messages
- id
- name
- email
- phone
- company
- entity_id
- subject
- message
- is_read
- created_at
```

---

## PRIORITÉS D'IMPLÉMENTATION

### Priorité 1 - Haute (Impact immédiat)
1. **hero_carousel_slides** - 20 slides du carousel
2. **news_articles** - Actualités publiées régulièrement
3. **contact_information** - Doit être à jour
4. **leadership_team** - Équipe de direction

### Priorité 2 - Moyenne
5. **services** - Contenu par entité
6. **faq_items** - Support client
7. **testimonials** - Témoignages clients
8. **partners** - Relations business

### Priorité 3 - Maintenance
9. **pages_content** - Contenu statique
10. **timeline_milestones** - Historique
11. **company_values** - Valeurs
12. **statistics** - Statistiques

---

## FONCTIONNALITÉS ADMIN REQUISES

### Core
- Authentification et rôles (Admin, Éditeur, Lecteur)
- Éditeur WYSIWYG pour textes riches
- Upload et gestion des médias
- Import/Export CSV
- Historique des modifications
- Planification de publication
- Mode prévisualisation
- Support multi-langue (FR/EN)

### Par Entité
- Switch entre RBF, RIC, REVI, RBA
- Gestion des couleurs par entité
- Gestion des logos par entité

### SEO
- Éditeur meta title/description
- Prévisualisation SEO
- Gestion URLs canoniques

---

## PAGES ADMIN À CRÉER

1. `/admin` - Dashboard
2. `/admin/login` - Connexion
3. `/admin/carousel` - Gestion carousel
4. `/admin/news` - Gestion actualités
5. `/admin/pages` - Contenu des pages
6. `/admin/services` - Services par entité
7. `/admin/team` - Équipe de direction
8. `/admin/partners` - Partenaires
9. `/admin/testimonials` - Témoignages
10. `/admin/faq` - FAQ
11. `/admin/contact` - Infos contact
12. `/admin/media` - Médiathèque
13. `/admin/jobs` - Offres d'emploi
14. `/admin/messages` - Messages reçus
15. `/admin/settings` - Configuration
16. `/admin/users` - Gestion utilisateurs

---

## VALIDATION REQUISE

Avant de commencer l'implémentation, confirmez:

1. ✅ Structure des 25 tables OK ?
2. ✅ Priorités d'implémentation OK ?
3. ✅ Fonctionnalités admin OK ?
4. ✅ Pages admin à créer OK ?

Répondez "OK" pour commencer l'implémentation ou indiquez les modifications souhaitées.
