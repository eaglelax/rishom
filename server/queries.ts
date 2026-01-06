import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";
import * as schema from "@shared/schema";

// ============================================
// ENTITÉS
// ============================================
export const getEntities = async () => {
  return db.select().from(schema.entities).orderBy(asc(schema.entities.displayOrder));
};

export const getEntityByCode = async (code: string) => {
  const result = await db.select().from(schema.entities).where(eq(schema.entities.code, code));
  return result[0];
};

export const getEntityById = async (id: string) => {
  const result = await db.select().from(schema.entities).where(eq(schema.entities.id, id));
  return result[0];
};

export const updateEntity = async (id: string, data: Partial<schema.Entity>) => {
  await db.update(schema.entities).set(data).where(eq(schema.entities.id, id));
};

export const createEntity = async (data: Partial<schema.Entity>) => {
  await db.insert(schema.entities).values(data as any);
};

export const deleteEntity = async (id: string) => {
  await db.delete(schema.entities).where(eq(schema.entities.id, id));
};

// ============================================
// CAROUSEL
// ============================================
export const getCarouselSlides = async () => {
  return db.select().from(schema.heroCarouselSlides).orderBy(asc(schema.heroCarouselSlides.displayOrder));
};

export const getActiveCarouselSlides = async () => {
  return db.select().from(schema.heroCarouselSlides)
    .where(eq(schema.heroCarouselSlides.isActive, true))
    .orderBy(asc(schema.heroCarouselSlides.displayOrder));
};

export const createCarouselSlide = async (data: schema.InsertCarouselSlide) => {
  await db.insert(schema.heroCarouselSlides).values(data);
};

export const updateCarouselSlide = async (id: string, data: Partial<schema.HeroCarouselSlide>) => {
  await db.update(schema.heroCarouselSlides).set(data).where(eq(schema.heroCarouselSlides.id, id));
};

export const deleteCarouselSlide = async (id: string) => {
  await db.delete(schema.heroCarouselSlides).where(eq(schema.heroCarouselSlides.id, id));
};

// ============================================
// ACTUALITÉS
// ============================================
export const getNewsArticles = async () => {
  return db.select().from(schema.newsArticles).orderBy(desc(schema.newsArticles.publishedAt));
};

export const getPublishedNews = async () => {
  return db.select().from(schema.newsArticles)
    .where(eq(schema.newsArticles.isPublished, true))
    .orderBy(desc(schema.newsArticles.publishedAt));
};

export const getNewsById = async (id: string) => {
  const result = await db.select().from(schema.newsArticles).where(eq(schema.newsArticles.id, id));
  return result[0];
};

export const getNewsBySlug = async (slug: string) => {
  const result = await db.select().from(schema.newsArticles).where(eq(schema.newsArticles.slug, slug));
  return result[0];
};

export const createNewsArticle = async (data: schema.InsertNewsArticle) => {
  await db.insert(schema.newsArticles).values(data);
};

export const updateNewsArticle = async (id: string, data: Partial<schema.NewsArticle>) => {
  await db.update(schema.newsArticles).set(data).where(eq(schema.newsArticles.id, id));
};

export const deleteNewsArticle = async (id: string) => {
  await db.delete(schema.newsArticles).where(eq(schema.newsArticles.id, id));
};

// ============================================
// CATÉGORIES NEWS
// ============================================
export const getNewsCategories = async () => {
  return db.select().from(schema.newsCategories).orderBy(asc(schema.newsCategories.displayOrder));
};

export const createNewsCategory = async (data: Partial<schema.NewsCategory>) => {
  await db.insert(schema.newsCategories).values(data as any);
};

// ============================================
// SERVICES
// ============================================
export const getServices = async () => {
  return db.select().from(schema.services).orderBy(asc(schema.services.displayOrder));
};

export const getServicesByEntity = async (entityId: string) => {
  return db.select().from(schema.services)
    .where(eq(schema.services.entityId, entityId))
    .orderBy(asc(schema.services.displayOrder));
};

export const createService = async (data: schema.InsertService) => {
  await db.insert(schema.services).values(data);
};

export const updateService = async (id: string, data: Partial<schema.Service>) => {
  await db.update(schema.services).set(data).where(eq(schema.services.id, id));
};

export const deleteService = async (id: string) => {
  await db.delete(schema.services).where(eq(schema.services.id, id));
};

// ============================================
// ÉQUIPE DE DIRECTION
// ============================================
export const getLeadershipTeam = async () => {
  return db.select().from(schema.leadershipTeam).orderBy(asc(schema.leadershipTeam.displayOrder));
};

export const getActiveLeaders = async () => {
  return db.select().from(schema.leadershipTeam)
    .where(eq(schema.leadershipTeam.isActive, true))
    .orderBy(asc(schema.leadershipTeam.displayOrder));
};

export const createLeader = async (data: Partial<schema.LeadershipMember>) => {
  await db.insert(schema.leadershipTeam).values(data as any);
};

export const updateLeader = async (id: string, data: Partial<schema.LeadershipMember>) => {
  await db.update(schema.leadershipTeam).set(data).where(eq(schema.leadershipTeam.id, id));
};

export const deleteLeader = async (id: string) => {
  await db.delete(schema.leadershipTeam).where(eq(schema.leadershipTeam.id, id));
};

// ============================================
// PARTENAIRES
// ============================================
export const getPartners = async () => {
  return db.select().from(schema.partners).orderBy(asc(schema.partners.displayOrder));
};

export const getActivePartners = async () => {
  return db.select().from(schema.partners)
    .where(eq(schema.partners.isActive, true))
    .orderBy(asc(schema.partners.displayOrder));
};

export const getPartnerCategories = async () => {
  return db.select().from(schema.partnerCategories).orderBy(asc(schema.partnerCategories.displayOrder));
};

export const createPartnerCategory = async (data: Partial<schema.PartnerCategory>) => {
  await db.insert(schema.partnerCategories).values(data as any);
};

export const createPartner = async (data: schema.InsertPartner) => {
  await db.insert(schema.partners).values(data);
};

export const updatePartner = async (id: string, data: Partial<schema.Partner>) => {
  await db.update(schema.partners).set(data).where(eq(schema.partners.id, id));
};

export const deletePartner = async (id: string) => {
  await db.delete(schema.partners).where(eq(schema.partners.id, id));
};

// ============================================
// TÉMOIGNAGES
// ============================================
export const getTestimonials = async () => {
  return db.select().from(schema.testimonials).orderBy(desc(schema.testimonials.createdAt));
};

export const getPublishedTestimonials = async () => {
  return db.select().from(schema.testimonials)
    .where(eq(schema.testimonials.isPublished, true))
    .orderBy(desc(schema.testimonials.createdAt));
};

export const createTestimonial = async (data: schema.InsertTestimonial) => {
  await db.insert(schema.testimonials).values(data);
};

export const updateTestimonial = async (id: string, data: Partial<schema.Testimonial>) => {
  await db.update(schema.testimonials).set(data).where(eq(schema.testimonials.id, id));
};

export const deleteTestimonial = async (id: string) => {
  await db.delete(schema.testimonials).where(eq(schema.testimonials.id, id));
};

// ============================================
// FAQ
// ============================================
export const getFaqCategories = async () => {
  return db.select().from(schema.faqCategories).orderBy(asc(schema.faqCategories.displayOrder));
};

export const createFaqCategory = async (data: Partial<schema.FaqCategory>) => {
  await db.insert(schema.faqCategories).values(data as any);
};

export const getFaqItems = async () => {
  return db.select().from(schema.faqItems).orderBy(asc(schema.faqItems.displayOrder));
};

export const getPublishedFaqItems = async () => {
  return db.select().from(schema.faqItems)
    .where(eq(schema.faqItems.isPublished, true))
    .orderBy(asc(schema.faqItems.displayOrder));
};

export const createFaqItem = async (data: Partial<schema.FaqItem>) => {
  await db.insert(schema.faqItems).values(data as any);
};

export const updateFaqItem = async (id: string, data: Partial<schema.FaqItem>) => {
  await db.update(schema.faqItems).set(data).where(eq(schema.faqItems.id, id));
};

export const deleteFaqItem = async (id: string) => {
  await db.delete(schema.faqItems).where(eq(schema.faqItems.id, id));
};

// ============================================
// STATISTIQUES
// ============================================
export const getStatistics = async () => {
  return db.select().from(schema.statistics).orderBy(asc(schema.statistics.displayOrder));
};

export const getActiveStatistics = async () => {
  return db.select().from(schema.statistics)
    .where(eq(schema.statistics.isActive, true))
    .orderBy(asc(schema.statistics.displayOrder));
};

export const updateStatistic = async (id: string, data: Partial<schema.Statistic>) => {
  await db.update(schema.statistics).set(data).where(eq(schema.statistics.id, id));
};

export const createStatistic = async (data: Partial<schema.Statistic>) => {
  await db.insert(schema.statistics).values(data as any);
};

export const deleteStatistic = async (id: string) => {
  await db.delete(schema.statistics).where(eq(schema.statistics.id, id));
};

// ============================================
// TIMELINE
// ============================================
export const getTimelineMilestones = async () => {
  return db.select().from(schema.timelineMilestones).orderBy(asc(schema.timelineMilestones.year));
};

export const getActiveTimeline = async () => {
  return db.select().from(schema.timelineMilestones)
    .where(eq(schema.timelineMilestones.isActive, true))
    .orderBy(asc(schema.timelineMilestones.year));
};

export const createMilestone = async (data: Partial<schema.TimelineMilestone>) => {
  await db.insert(schema.timelineMilestones).values(data as any);
};

export const updateMilestone = async (id: string, data: Partial<schema.TimelineMilestone>) => {
  await db.update(schema.timelineMilestones).set(data).where(eq(schema.timelineMilestones.id, id));
};

export const deleteMilestone = async (id: string) => {
  await db.delete(schema.timelineMilestones).where(eq(schema.timelineMilestones.id, id));
};

// ============================================
// VALEURS
// ============================================
export const getCompanyValues = async () => {
  return db.select().from(schema.companyValues).orderBy(asc(schema.companyValues.displayOrder));
};

export const getActiveValues = async () => {
  return db.select().from(schema.companyValues)
    .where(eq(schema.companyValues.isActive, true))
    .orderBy(asc(schema.companyValues.displayOrder));
};

export const updateValue = async (id: string, data: Partial<schema.CompanyValue>) => {
  await db.update(schema.companyValues).set(data).where(eq(schema.companyValues.id, id));
};

// ============================================
// CONTACT INFO
// ============================================
export const getContactInformation = async () => {
  return db.select().from(schema.contactInformation).orderBy(asc(schema.contactInformation.displayOrder));
};

export const getActiveContacts = async () => {
  return db.select().from(schema.contactInformation)
    .where(eq(schema.contactInformation.isActive, true))
    .orderBy(asc(schema.contactInformation.displayOrder));
};

export const updateContactInfo = async (id: string, data: Partial<schema.ContactInfo>) => {
  await db.update(schema.contactInformation).set(data).where(eq(schema.contactInformation.id, id));
};

// ============================================
// MESSAGES CONTACT
// ============================================
export const getContactMessages = async () => {
  return db.select().from(schema.contactMessages).orderBy(desc(schema.contactMessages.createdAt));
};

export const getUnreadMessages = async () => {
  return db.select().from(schema.contactMessages)
    .where(eq(schema.contactMessages.isRead, false))
    .orderBy(desc(schema.contactMessages.createdAt));
};

export const createContactMessage = async (data: schema.InsertContactMessage) => {
  await db.insert(schema.contactMessages).values(data);
};

export const markMessageAsRead = async (id: string) => {
  await db.update(schema.contactMessages).set({ isRead: true }).where(eq(schema.contactMessages.id, id));
};

export const deleteMessage = async (id: string) => {
  await db.delete(schema.contactMessages).where(eq(schema.contactMessages.id, id));
};

export const updateMessage = async (id: string, data: Partial<schema.ContactMessage>) => {
  await db.update(schema.contactMessages).set(data).where(eq(schema.contactMessages.id, id));
};

// ============================================
// OFFRES D'EMPLOI
// ============================================
export const getJobOffers = async () => {
  return db.select().from(schema.jobOffers).orderBy(desc(schema.jobOffers.publishedAt));
};

export const getActiveJobOffers = async () => {
  return db.select().from(schema.jobOffers)
    .where(eq(schema.jobOffers.isActive, true))
    .orderBy(desc(schema.jobOffers.publishedAt));
};

export const createJobOffer = async (data: schema.InsertJobOffer) => {
  await db.insert(schema.jobOffers).values(data);
};

export const updateJobOffer = async (id: string, data: Partial<schema.JobOffer>) => {
  await db.update(schema.jobOffers).set(data).where(eq(schema.jobOffers.id, id));
};

export const deleteJobOffer = async (id: string) => {
  await db.delete(schema.jobOffers).where(eq(schema.jobOffers.id, id));
};

// ============================================
// PROGRAMMES RBA
// ============================================
export const getRbaPrograms = async () => {
  return db.select().from(schema.rbaPrograms).orderBy(asc(schema.rbaPrograms.displayOrder));
};

export const getActiveRbaPrograms = async () => {
  return db.select().from(schema.rbaPrograms)
    .where(eq(schema.rbaPrograms.isActive, true))
    .orderBy(asc(schema.rbaPrograms.displayOrder));
};

export const createRbaProgram = async (data: Partial<schema.RbaProgram>) => {
  await db.insert(schema.rbaPrograms).values(data as any);
};

export const updateRbaProgram = async (id: string, data: Partial<schema.RbaProgram>) => {
  await db.update(schema.rbaPrograms).set(data).where(eq(schema.rbaPrograms.id, id));
};

export const deleteRbaProgram = async (id: string) => {
  await db.delete(schema.rbaPrograms).where(eq(schema.rbaPrograms.id, id));
};

// ============================================
// CONFIGURATION SITE
// ============================================
export const getSiteConfiguration = async () => {
  const result = await db.select().from(schema.siteConfiguration).limit(1);
  return result[0];
};

export const updateSiteConfiguration = async (id: string, data: Partial<schema.SiteConfiguration>) => {
  await db.update(schema.siteConfiguration).set(data).where(eq(schema.siteConfiguration.id, id));
};

// ============================================
// RÉSEAUX SOCIAUX
// ============================================
export const getSocialMediaLinks = async () => {
  return db.select().from(schema.socialMediaLinks).orderBy(asc(schema.socialMediaLinks.displayOrder));
};

export const getActiveSocialLinks = async () => {
  return db.select().from(schema.socialMediaLinks)
    .where(eq(schema.socialMediaLinks.isActive, true))
    .orderBy(asc(schema.socialMediaLinks.displayOrder));
};

export const updateSocialLink = async (id: string, data: Partial<schema.SocialMediaLink>) => {
  await db.update(schema.socialMediaLinks).set(data).where(eq(schema.socialMediaLinks.id, id));
};

// ============================================
// SECTION À PROPOS
// ============================================
export const getAboutSection = async () => {
  const result = await db.select().from(schema.aboutSection).limit(1);
  return result[0];
};

export const updateAboutSection = async (id: string, data: Partial<schema.AboutSection>) => {
  await db.update(schema.aboutSection).set(data).where(eq(schema.aboutSection.id, id));
};

// ============================================
// MÉDIATHÈQUE
// ============================================
export const getMediaFiles = async () => {
  return db.select().from(schema.mediaLibrary).orderBy(desc(schema.mediaLibrary.createdAt));
};

export const createMediaFile = async (data: Partial<schema.MediaFile>) => {
  await db.insert(schema.mediaLibrary).values(data as any);
};

export const deleteMediaFile = async (id: string) => {
  await db.delete(schema.mediaLibrary).where(eq(schema.mediaLibrary.id, id));
};

// ============================================
// ADMIN USERS
// ============================================
export const getAdminUsers = async () => {
  return db.select().from(schema.adminUsers);
};

export const getAdminByUsername = async (username: string) => {
  const result = await db.select().from(schema.adminUsers).where(eq(schema.adminUsers.username, username));
  return result[0];
};

export const getAdminByEmail = async (email: string) => {
  const result = await db.select().from(schema.adminUsers).where(eq(schema.adminUsers.email, email));
  return result[0];
};

export const createAdminUser = async (data: schema.InsertAdminUser) => {
  await db.insert(schema.adminUsers).values(data);
};

export const updateAdminUser = async (id: string, data: Partial<schema.AdminUser>) => {
  await db.update(schema.adminUsers).set(data).where(eq(schema.adminUsers.id, id));
};

export const updateLastLogin = async (id: string) => {
  await db.update(schema.adminUsers).set({ lastLogin: new Date() }).where(eq(schema.adminUsers.id, id));
};
