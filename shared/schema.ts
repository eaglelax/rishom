import { mysqlTable, varchar, text, int, boolean, timestamp, json, decimal } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";

// ============================================
// 1. UTILISATEURS ADMIN
// ============================================
export const adminUsers = mysqlTable("admin_users", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role", { length: 50 }).notNull().default("editor"), // super_admin, admin, editor, viewer
  isActive: boolean("is_active").notNull().default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 2. CONFIGURATION DU SITE
// ============================================
export const siteConfiguration = mysqlTable("site_configuration", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  companyName: varchar("company_name", { length: 255 }).notNull().default("Groupe Rishom"),
  companyShortName: varchar("company_short_name", { length: 100 }).default("Rishom"),
  siteTitle: varchar("site_title", { length: 255 }).notNull(),
  siteDescription: text("site_description"),
  siteKeywords: text("site_keywords"),
  defaultLanguage: varchar("default_language", { length: 5 }).notNull().default("FR"),
  timezone: varchar("timezone", { length: 50 }).default("Africa/Ouagadougou"),
  currency: varchar("currency", { length: 10 }).default("XOF"),
  googleAnalyticsId: varchar("google_analytics_id", { length: 50 }),
  faviconUrl: varchar("favicon_url", { length: 500 }),
  ogImageUrl: varchar("og_image_url", { length: 500 }),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 3. ENTITÉS (RBF, RIC, REVI, RBA, GROUPE)
// ============================================
export const entities = mysqlTable("entities", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  code: varchar("code", { length: 10 }).notNull().unique(), // RBF, RIC, REVI, RBA, GROUPE
  fullName: varchar("full_name", { length: 255 }).notNull(),
  shortName: varchar("short_name", { length: 100 }).notNull(),
  description: text("description"),
  colorPrimary: varchar("color_primary", { length: 7 }).notNull(), // #C74634, #8B1538, #058B5E, #2E5A9C
  colorSecondary: varchar("color_secondary", { length: 7 }),
  logoUrl: varchar("logo_url", { length: 500 }),
  logoWhiteUrl: varchar("logo_white_url", { length: 500 }),
  logoDarkUrl: varchar("logo_dark_url", { length: 500 }),
  pageSlug: varchar("page_slug", { length: 100 }).unique(),
  aboutText: text("about_text"),
  isActive: boolean("is_active").notNull().default(true),
  displayOrder: int("display_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 4. CAROUSEL PAGE D'ACCUEIL
// ============================================
export const heroCarouselSlides = mysqlTable("hero_carousel_slides", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  entityId: varchar("entity_id", { length: 36 }),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 500 }),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  imageAltText: varchar("image_alt_text", { length: 255 }),
  imageDescription: text("image_description"),
  colorCode: varchar("color_code", { length: 7 }),
  linkUrl: varchar("link_url", { length: 500 }),
  ctaText: varchar("cta_text", { length: 100 }),
  isActive: boolean("is_active").notNull().default(true),
  displayOrder: int("display_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 5. CONTENU DES PAGES
// ============================================
export const pagesContent = mysqlTable("pages_content", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  pageSlug: varchar("page_slug", { length: 100 }).notNull().unique(),
  pageTitle: varchar("page_title", { length: 255 }).notNull(),
  pageDescription: text("page_description"),
  heroTitle: varchar("hero_title", { length: 255 }),
  heroSubtitle: varchar("hero_subtitle", { length: 500 }),
  heroImageUrl: varchar("hero_image_url", { length: 500 }),
  heroImageAlt: varchar("hero_image_alt", { length: 255 }),
  contentBlocks: json("content_blocks"),
  seoTitle: varchar("seo_title", { length: 60 }),
  seoDescription: varchar("seo_description", { length: 160 }),
  seoKeywords: varchar("seo_keywords", { length: 255 }),
  isPublished: boolean("is_published").notNull().default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 6. SECTION À PROPOS (ACCUEIL)
// ============================================
export const aboutSection = mysqlTable("about_section", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 500 }),
  body: text("body"),
  imageUrl: varchar("image_url", { length: 500 }),
  imageAltText: varchar("image_alt_text", { length: 255 }),
  ctaText: varchar("cta_text", { length: 100 }),
  ctaUrl: varchar("cta_url", { length: 500 }),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 7. STATISTIQUES
// ============================================
export const statistics = mysqlTable("statistics", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  icon: varchar("icon", { length: 100 }),
  label: varchar("label", { length: 100 }).notNull(),
  value: int("value").notNull(),
  suffix: varchar("suffix", { length: 20 }),
  displayOrder: int("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 8. CATÉGORIES D'ARTICLES
// ============================================
export const newsCategories = mysqlTable("news_categories", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  color: varchar("color", { length: 7 }),
  displayOrder: int("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ============================================
// 9. ARTICLES/ACTUALITÉS
// ============================================
export const newsArticles = mysqlTable("news_articles", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  featuredImageUrl: varchar("featured_image_url", { length: 500 }),
  featuredImageAlt: varchar("featured_image_alt", { length: 255 }),
  categoryId: varchar("category_id", { length: 36 }),
  entityId: varchar("entity_id", { length: 36 }),
  author: varchar("author", { length: 255 }),
  publishedAt: timestamp("published_at"),
  isFeatured: boolean("is_featured").notNull().default(false),
  readTimeMinutes: int("read_time_minutes"),
  seoTitle: varchar("seo_title", { length: 60 }),
  seoDescription: varchar("seo_description", { length: 160 }),
  seoKeywords: varchar("seo_keywords", { length: 255 }),
  metaImageUrl: varchar("meta_image_url", { length: 500 }),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 10. TIMELINE/HISTORIQUE
// ============================================
export const timelineMilestones = mysqlTable("timeline_milestones", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  year: int("year").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
  displayOrder: int("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 11. VALEURS DE L'ENTREPRISE
// ============================================
export const companyValues = mysqlTable("company_values", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  displayOrder: int("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 12. ÉQUIPE DE DIRECTION
// ============================================
export const leadershipTeam = mysqlTable("leadership_team", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  bio: text("bio"),
  imageUrl: varchar("image_url", { length: 500 }),
  imageAltText: varchar("image_alt_text", { length: 255 }),
  linkedinUrl: varchar("linkedin_url", { length: 500 }),
  email: varchar("email", { length: 255 }),
  displayOrder: int("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 13. SERVICES PAR ENTITÉ
// ============================================
export const services = mysqlTable("services", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  entityId: varchar("entity_id", { length: 36 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  imageUrl: varchar("image_url", { length: 500 }),
  pageUrl: varchar("page_url", { length: 500 }),
  displayOrder: int("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 14. PROGRAMMES RBA (DÉTAILLÉS)
// ============================================
export const rbaPrograms = mysqlTable("rba_programs", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  duration: varchar("duration", { length: 100 }),
  level: varchar("level", { length: 50 }), // basic, intermediate, advanced, professional
  certificationType: varchar("certification_type", { length: 100 }),
  targetAudience: text("target_audience"),
  displayOrder: int("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 15. INFORMATIONS DE CONTACT
// ============================================
export const contactInformation = mysqlTable("contact_information", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  entityId: varchar("entity_id", { length: 36 }),
  locationName: varchar("location_name", { length: 255 }).notNull(),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  postalCode: varchar("postal_code", { length: 20 }),
  country: varchar("country", { length: 100 }).default("Burkina Faso"),
  phone: varchar("phone", { length: 50 }),
  phoneMobile: varchar("phone_mobile", { length: 50 }),
  email: varchar("email", { length: 255 }),
  emailSecondary: varchar("email_secondary", { length: 255 }),
  openingHours: json("opening_hours"),
  isMainOffice: boolean("is_main_office").notNull().default(false),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  website: varchar("website", { length: 500 }),
  displayOrder: int("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 16. CATÉGORIES DE PARTENAIRES
// ============================================
export const partnerCategories = mysqlTable("partner_categories", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  name: varchar("name", { length: 100 }).notNull(),
  displayOrder: int("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ============================================
// 17. PARTENAIRES
// ============================================
export const partners = mysqlTable("partners", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  categoryId: varchar("category_id", { length: 36 }),
  partnerType: varchar("partner_type", { length: 100 }), // financial, technical, institutional, academic
  logoUrl: varchar("logo_url", { length: 500 }),
  logoAltText: varchar("logo_alt_text", { length: 255 }),
  description: text("description"),
  partnershipSinceYear: int("partnership_since_year"),
  websiteUrl: varchar("website_url", { length: 500 }),
  contactEmail: varchar("contact_email", { length: 255 }),
  displayOrder: int("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 18. TÉMOIGNAGES
// ============================================
export const testimonials = mysqlTable("testimonials", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  programOrService: varchar("program_or_service", { length: 255 }),
  testimonialText: text("testimonial_text").notNull(),
  imageUrl: varchar("image_url", { length: 500 }),
  imageAltText: varchar("image_alt_text", { length: 255 }),
  company: varchar("company", { length: 255 }),
  entityId: varchar("entity_id", { length: 36 }),
  rating: int("rating"), // 1-5
  isFeatured: boolean("is_featured").notNull().default(false),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 19. CATÉGORIES FAQ
// ============================================
export const faqCategories = mysqlTable("faq_categories", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  color: varchar("color", { length: 7 }),
  displayOrder: int("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ============================================
// 20. QUESTIONS FAQ
// ============================================
export const faqItems = mysqlTable("faq_items", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  categoryId: varchar("category_id", { length: 36 }),
  question: varchar("question", { length: 500 }).notNull(),
  answer: text("answer").notNull(),
  displayOrder: int("display_order").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 21. CONTENU FOOTER
// ============================================
export const footerContent = mysqlTable("footer_content", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  sectionName: varchar("section_name", { length: 100 }).notNull(),
  sectionType: varchar("section_type", { length: 50 }).notNull(), // about, links, entities, contact, social
  content: json("content"),
  displayOrder: int("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 22. RÉSEAUX SOCIAUX
// ============================================
export const socialMediaLinks = mysqlTable("social_media_links", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  platform: varchar("platform", { length: 50 }).notNull(), // facebook, linkedin, twitter, instagram, youtube
  url: varchar("url", { length: 500 }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
  displayOrder: int("display_order").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 23. MÉTADONNÉES SEO
// ============================================
export const seoMeta = mysqlTable("seo_meta", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  pageSlug: varchar("page_slug", { length: 100 }).notNull().unique(),
  metaTitle: varchar("meta_title", { length: 60 }),
  metaDescription: varchar("meta_description", { length: 160 }),
  metaKeywords: varchar("meta_keywords", { length: 255 }),
  ogTitle: varchar("og_title", { length: 100 }),
  ogDescription: varchar("og_description", { length: 255 }),
  ogImageUrl: varchar("og_image_url", { length: 500 }),
  canonicalUrl: varchar("canonical_url", { length: 500 }),
  robots: varchar("robots", { length: 100 }).default("index, follow"),
  isIndexed: boolean("is_indexed").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 24. MÉDIATHÈQUE
// ============================================
export const mediaLibrary = mysqlTable("media_library", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  filename: varchar("filename", { length: 255 }).notNull(),
  fileUrl: varchar("file_url", { length: 500 }).notNull(),
  fileType: varchar("file_type", { length: 50 }),
  fileSize: int("file_size"),
  altText: varchar("alt_text", { length: 255 }),
  description: text("description"),
  category: varchar("category", { length: 50 }), // hero, carousel, news, testimonial, team, partners, products
  entityId: varchar("entity_id", { length: 36 }),
  usageCount: int("usage_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 25. OFFRES D'EMPLOI
// ============================================
export const jobOffers = mysqlTable("job_offers", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  title: varchar("title", { length: 255 }).notNull(),
  entityId: varchar("entity_id", { length: 36 }),
  location: varchar("location", { length: 255 }),
  contractType: varchar("contract_type", { length: 50 }), // CDI, CDD, Stage, Alternance
  description: text("description"),
  requirements: text("requirements"),
  isActive: boolean("is_active").notNull().default(true),
  publishedAt: timestamp("published_at"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ============================================
// 26. MESSAGES DE CONTACT
// ============================================
export const contactMessages = mysqlTable("contact_messages", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  entityId: varchar("entity_id", { length: 36 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  isArchived: boolean("is_archived").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ============================================
// RELATIONS
// ============================================
export const entitiesRelations = relations(entities, ({ many }) => ({
  carouselSlides: many(heroCarouselSlides),
  services: many(services),
  newsArticles: many(newsArticles),
  testimonials: many(testimonials),
  contactInfo: many(contactInformation),
  jobOffers: many(jobOffers),
  contactMessages: many(contactMessages),
  mediaFiles: many(mediaLibrary),
}));

export const heroCarouselSlidesRelations = relations(heroCarouselSlides, ({ one }) => ({
  entity: one(entities, {
    fields: [heroCarouselSlides.entityId],
    references: [entities.id],
  }),
}));

export const newsArticlesRelations = relations(newsArticles, ({ one }) => ({
  category: one(newsCategories, {
    fields: [newsArticles.categoryId],
    references: [newsCategories.id],
  }),
  entity: one(entities, {
    fields: [newsArticles.entityId],
    references: [entities.id],
  }),
}));

export const servicesRelations = relations(services, ({ one }) => ({
  entity: one(entities, {
    fields: [services.entityId],
    references: [entities.id],
  }),
}));

export const partnersRelations = relations(partners, ({ one }) => ({
  category: one(partnerCategories, {
    fields: [partners.categoryId],
    references: [partnerCategories.id],
  }),
}));

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  entity: one(entities, {
    fields: [testimonials.entityId],
    references: [entities.id],
  }),
}));

export const faqItemsRelations = relations(faqItems, ({ one }) => ({
  category: one(faqCategories, {
    fields: [faqItems.categoryId],
    references: [faqCategories.id],
  }),
}));

export const contactInformationRelations = relations(contactInformation, ({ one }) => ({
  entity: one(entities, {
    fields: [contactInformation.entityId],
    references: [entities.id],
  }),
}));

export const jobOffersRelations = relations(jobOffers, ({ one }) => ({
  entity: one(entities, {
    fields: [jobOffers.entityId],
    references: [entities.id],
  }),
}));

export const contactMessagesRelations = relations(contactMessages, ({ one }) => ({
  entity: one(entities, {
    fields: [contactMessages.entityId],
    references: [entities.id],
  }),
}));

export const mediaLibraryRelations = relations(mediaLibrary, ({ one }) => ({
  entity: one(entities, {
    fields: [mediaLibrary.entityId],
    references: [entities.id],
  }),
}));

// ============================================
// SCHÉMAS ZOD POUR VALIDATION
// ============================================
export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastLogin: true,
});

export const insertEntitySchema = createInsertSchema(entities).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCarouselSlideSchema = createInsertSchema(heroCarouselSlides).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNewsArticleSchema = createInsertSchema(newsArticles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPartnerSchema = createInsertSchema(partners).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export const insertJobOfferSchema = createInsertSchema(jobOffers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// ============================================
// TYPES EXPORTÉS
// ============================================
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;

export type Entity = typeof entities.$inferSelect;
export type InsertEntity = z.infer<typeof insertEntitySchema>;

export type HeroCarouselSlide = typeof heroCarouselSlides.$inferSelect;
export type InsertCarouselSlide = z.infer<typeof insertCarouselSlideSchema>;

export type NewsArticle = typeof newsArticles.$inferSelect;
export type InsertNewsArticle = z.infer<typeof insertNewsArticleSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type JobOffer = typeof jobOffers.$inferSelect;
export type InsertJobOffer = z.infer<typeof insertJobOfferSchema>;

export type SiteConfiguration = typeof siteConfiguration.$inferSelect;
export type AboutSection = typeof aboutSection.$inferSelect;
export type Statistic = typeof statistics.$inferSelect;
export type NewsCategory = typeof newsCategories.$inferSelect;
export type TimelineMilestone = typeof timelineMilestones.$inferSelect;
export type CompanyValue = typeof companyValues.$inferSelect;
export type LeadershipMember = typeof leadershipTeam.$inferSelect;
export type RbaProgram = typeof rbaPrograms.$inferSelect;
export type ContactInfo = typeof contactInformation.$inferSelect;
export type PartnerCategory = typeof partnerCategories.$inferSelect;
export type FaqCategory = typeof faqCategories.$inferSelect;
export type FaqItem = typeof faqItems.$inferSelect;
export type FooterContent = typeof footerContent.$inferSelect;
export type SocialMediaLink = typeof socialMediaLinks.$inferSelect;
export type SeoMeta = typeof seoMeta.$inferSelect;
export type MediaFile = typeof mediaLibrary.$inferSelect;

// Legacy compatibility
export const users = adminUsers;
export const insertUserSchema = insertAdminUserSchema;
export type User = AdminUser;
export type InsertUser = InsertAdminUser;
