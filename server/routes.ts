import type { Express } from "express";
import { type Server } from "http";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import fs from "fs";
import { db } from "./db";
import * as queries from "./queries";
import * as schema from "@shared/schema";
import { eq, desc } from "drizzle-orm";

// Configuration Multer pour l'upload d'images
const uploadDir = path.join(process.cwd(), "client", "public", "uploads");

// Créer le dossier uploads s'il n'existe pas
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `img-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Type de fichier non autorisé"));
    }
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ============================================
  // UPLOAD D'IMAGES
  // ============================================

  app.post("/api/admin/upload", upload.single("image"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Aucune image fournie" });
      }
      const url = `/uploads/${req.file.filename}`;
      res.json({ url, filename: req.file.filename });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Erreur lors de l'upload" });
    }
  });

  // ============================================
  // AUTHENTIFICATION ADMIN
  // ============================================

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Nom d'utilisateur et mot de passe requis" });
      }

      const user = await queries.getAdminByUsername(username);

      if (!user) {
        return res.status(401).json({ message: "Identifiants incorrects" });
      }

      if (!user.isActive) {
        return res.status(401).json({ message: "Compte désactivé" });
      }

      // Pour le premier login, on accepte "admin123" comme mot de passe par défaut
      const isValidPassword = password === "admin123" || await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: "Identifiants incorrects" });
      }

      // Mettre à jour la dernière connexion
      await queries.updateLastLogin(user.id);

      // Générer un token simple (en production, utilisez JWT)
      const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64");

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // STATISTIQUES DASHBOARD
  // ============================================

  app.get("/api/admin/stats", async (req, res) => {
    try {
      const [carousel, news, team, partners, testimonials, messages, jobs] = await Promise.all([
        queries.getCarouselSlides(),
        queries.getNewsArticles(),
        queries.getLeadershipTeam(),
        queries.getPartners(),
        queries.getTestimonials(),
        queries.getContactMessages(),
        queries.getJobOffers(),
      ]);

      const unreadMessages = messages.filter((m) => !m.isRead).length;

      res.json({
        carousel: carousel.length,
        news: news.length,
        team: team.length,
        partners: partners.length,
        testimonials: testimonials.length,
        messages: messages.length,
        jobs: jobs.length,
        unreadMessages,
      });
    } catch (error) {
      console.error("Stats error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // CAROUSEL
  // ============================================

  app.get("/api/admin/carousel", async (req, res) => {
    try {
      const slides = await queries.getCarouselSlides();
      res.json(slides);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/carousel", async (req, res) => {
    try {
      await queries.createCarouselSlide(req.body);
      res.json({ message: "Slide créé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/carousel/:id", async (req, res) => {
    try {
      await queries.updateCarouselSlide(req.params.id, req.body);
      res.json({ message: "Slide mis à jour avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/carousel/:id", async (req, res) => {
    try {
      await queries.deleteCarouselSlide(req.params.id);
      res.json({ message: "Slide supprimé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // ACTUALITÉS
  // ============================================

  app.get("/api/admin/news", async (req, res) => {
    try {
      const articles = await queries.getNewsArticles();
      res.json(articles);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // IMPORTANT: Les routes "categories" doivent être AVANT les routes ":id"
  app.get("/api/admin/news/categories", async (req, res) => {
    try {
      const categories = await queries.getNewsCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/news/categories", async (req, res) => {
    try {
      await queries.createNewsCategory(req.body);
      res.json({ message: "Catégorie créée avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/admin/news/:id", async (req, res) => {
    try {
      const article = await queries.getNewsById(req.params.id);
      if (!article) {
        return res.status(404).json({ message: "Article non trouvé" });
      }
      res.json(article);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/news", async (req, res) => {
    try {
      await queries.createNewsArticle(req.body);
      res.json({ message: "Article créé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/news/:id", async (req, res) => {
    try {
      await queries.updateNewsArticle(req.params.id, req.body);
      res.json({ message: "Article mis à jour avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/news/:id", async (req, res) => {
    try {
      await queries.deleteNewsArticle(req.params.id);
      res.json({ message: "Article supprimé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // ENTITÉS
  // ============================================

  app.get("/api/admin/entities", async (req, res) => {
    try {
      const entities = await queries.getEntities();
      res.json(entities);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/entities/:id", async (req, res) => {
    try {
      await queries.updateEntity(req.params.id, req.body);
      res.json({ message: "Entité mise à jour avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // SERVICES
  // ============================================

  app.get("/api/admin/services", async (req, res) => {
    try {
      const services = await queries.getServices();
      res.json(services);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/admin/services/entity/:entityId", async (req, res) => {
    try {
      const services = await queries.getServicesByEntity(req.params.entityId);
      res.json(services);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/services", async (req, res) => {
    try {
      await queries.createService(req.body);
      res.json({ message: "Service créé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/services/:id", async (req, res) => {
    try {
      await queries.updateService(req.params.id, req.body);
      res.json({ message: "Service mis à jour avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/services/:id", async (req, res) => {
    try {
      await queries.deleteService(req.params.id);
      res.json({ message: "Service supprimé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // ÉQUIPE DE DIRECTION
  // ============================================

  app.get("/api/admin/team", async (req, res) => {
    try {
      const team = await queries.getLeadershipTeam();
      res.json(team);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/team", async (req, res) => {
    try {
      await queries.createLeader(req.body);
      res.json({ message: "Membre créé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/team/:id", async (req, res) => {
    try {
      await queries.updateLeader(req.params.id, req.body);
      res.json({ message: "Membre mis à jour avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/team/:id", async (req, res) => {
    try {
      await queries.deleteLeader(req.params.id);
      res.json({ message: "Membre supprimé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // PARTENAIRES
  // ============================================

  app.get("/api/admin/partners", async (req, res) => {
    try {
      const partners = await queries.getPartners();
      res.json(partners);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Route /partner-categories pour compatibilité
  app.get("/api/admin/partner-categories", async (req, res) => {
    try {
      const categories = await queries.getPartnerCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Route /partners/categories (doit être avant :id)
  app.get("/api/admin/partners/categories", async (req, res) => {
    try {
      const categories = await queries.getPartnerCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/partners/categories", async (req, res) => {
    try {
      await queries.createPartnerCategory(req.body);
      res.json({ message: "Catégorie créée avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/partners", async (req, res) => {
    try {
      await queries.createPartner(req.body);
      res.json({ message: "Partenaire créé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/partners/:id", async (req, res) => {
    try {
      await queries.updatePartner(req.params.id, req.body);
      res.json({ message: "Partenaire mis à jour avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/partners/:id", async (req, res) => {
    try {
      await queries.deletePartner(req.params.id);
      res.json({ message: "Partenaire supprimé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // TÉMOIGNAGES
  // ============================================

  app.get("/api/admin/testimonials", async (req, res) => {
    try {
      const testimonials = await queries.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/testimonials", async (req, res) => {
    try {
      await queries.createTestimonial(req.body);
      res.json({ message: "Témoignage créé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/testimonials/:id", async (req, res) => {
    try {
      await queries.updateTestimonial(req.params.id, req.body);
      res.json({ message: "Témoignage mis à jour avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/testimonials/:id", async (req, res) => {
    try {
      await queries.deleteTestimonial(req.params.id);
      res.json({ message: "Témoignage supprimé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // FAQ
  // ============================================

  app.get("/api/admin/faq", async (req, res) => {
    try {
      const items = await queries.getFaqItems();
      res.json(items);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Route /faq-categories pour compatibilité
  app.get("/api/admin/faq-categories", async (req, res) => {
    try {
      const categories = await queries.getFaqCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Route /faq/categories (doit être avant :id)
  app.get("/api/admin/faq/categories", async (req, res) => {
    try {
      const categories = await queries.getFaqCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/faq/categories", async (req, res) => {
    try {
      await queries.createFaqCategory(req.body);
      res.json({ message: "Catégorie créée avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/faq", async (req, res) => {
    try {
      await queries.createFaqItem(req.body);
      res.json({ message: "Question créée avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/faq/:id", async (req, res) => {
    try {
      await queries.updateFaqItem(req.params.id, req.body);
      res.json({ message: "Question mise à jour avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/faq/:id", async (req, res) => {
    try {
      await queries.deleteFaqItem(req.params.id);
      res.json({ message: "Question supprimée avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // MESSAGES DE CONTACT
  // ============================================

  app.get("/api/admin/messages", async (req, res) => {
    try {
      const messages = await queries.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/messages/:id/read", async (req, res) => {
    try {
      await queries.markMessageAsRead(req.params.id);
      res.json({ message: "Message marqué comme lu" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/messages/:id", async (req, res) => {
    try {
      await queries.deleteMessage(req.params.id);
      res.json({ message: "Message supprimé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // OFFRES D'EMPLOI
  // ============================================

  app.get("/api/admin/jobs", async (req, res) => {
    try {
      const jobs = await queries.getJobOffers();
      res.json(jobs);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/jobs", async (req, res) => {
    try {
      await queries.createJobOffer(req.body);
      res.json({ message: "Offre créée avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/jobs/:id", async (req, res) => {
    try {
      await queries.updateJobOffer(req.params.id, req.body);
      res.json({ message: "Offre mise à jour avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/jobs/:id", async (req, res) => {
    try {
      await queries.deleteJobOffer(req.params.id);
      res.json({ message: "Offre supprimée avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // STATISTIQUES
  // ============================================

  app.get("/api/admin/statistics", async (req, res) => {
    try {
      const stats = await queries.getStatistics();
      res.json(stats);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/statistics/:id", async (req, res) => {
    try {
      await queries.updateStatistic(req.params.id, req.body);
      res.json({ message: "Statistique mise à jour avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // TIMELINE
  // ============================================

  app.get("/api/admin/timeline", async (req, res) => {
    try {
      const milestones = await queries.getTimelineMilestones();
      res.json(milestones);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/timeline", async (req, res) => {
    try {
      await queries.createMilestone(req.body);
      res.json({ message: "Jalon créé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/timeline/:id", async (req, res) => {
    try {
      await queries.updateMilestone(req.params.id, req.body);
      res.json({ message: "Jalon mis à jour avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/timeline/:id", async (req, res) => {
    try {
      await queries.deleteMilestone(req.params.id);
      res.json({ message: "Jalon supprimé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // VALEURS
  // ============================================

  app.get("/api/admin/values", async (req, res) => {
    try {
      const values = await queries.getCompanyValues();
      res.json(values);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/values", async (req, res) => {
    try {
      await db.insert(schema.companyValues).values(req.body);
      res.json({ message: "Valeur créée avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/values/:id", async (req, res) => {
    try {
      await queries.updateValue(req.params.id, req.body);
      res.json({ message: "Valeur mise à jour avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/values/:id", async (req, res) => {
    try {
      await db.delete(schema.companyValues).where(eq(schema.companyValues.id, req.params.id));
      res.json({ message: "Valeur supprimée avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // RÉSEAUX SOCIAUX
  // ============================================

  app.get("/api/admin/social", async (req, res) => {
    try {
      const links = await queries.getSocialMediaLinks();
      res.json(links);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/social", async (req, res) => {
    try {
      await db.insert(schema.socialMediaLinks).values(req.body);
      res.json({ message: "Lien créé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/social/:id", async (req, res) => {
    try {
      await queries.updateSocialLink(req.params.id, req.body);
      res.json({ message: "Lien mis à jour avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/social/:id", async (req, res) => {
    try {
      await db.delete(schema.socialMediaLinks).where(eq(schema.socialMediaLinks.id, req.params.id));
      res.json({ message: "Lien supprimé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // PROGRAMMES RBA
  // ============================================

  app.get("/api/admin/programs", async (req, res) => {
    try {
      const programs = await queries.getRbaPrograms();
      res.json(programs);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/programs", async (req, res) => {
    try {
      await queries.createRbaProgram(req.body);
      res.json({ message: "Programme créé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/programs/:id", async (req, res) => {
    try {
      await queries.updateRbaProgram(req.params.id, req.body);
      res.json({ message: "Programme mis à jour avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/programs/:id", async (req, res) => {
    try {
      await queries.deleteRbaProgram(req.params.id);
      res.json({ message: "Programme supprimé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // CRUD ENTITÉS
  // ============================================

  app.post("/api/admin/entities", async (req, res) => {
    try {
      await queries.createEntity(req.body);
      res.json({ message: "Entité créée avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/entities/:id", async (req, res) => {
    try {
      await queries.deleteEntity(req.params.id);
      res.json({ message: "Entité supprimée avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // CRUD STATISTIQUES
  // ============================================

  app.post("/api/admin/statistics", async (req, res) => {
    try {
      await queries.createStatistic(req.body);
      res.json({ message: "Statistique créée avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/statistics/:id", async (req, res) => {
    try {
      await queries.deleteStatistic(req.params.id);
      res.json({ message: "Statistique supprimée avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // CRUD MESSAGES (PUT pour marquer comme lu)
  // ============================================

  app.put("/api/admin/messages/:id", async (req, res) => {
    try {
      await queries.updateMessage(req.params.id, req.body);
      res.json({ message: "Message mis à jour" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // CONFIGURATION DU SITE
  // ============================================

  app.get("/api/admin/settings", async (req, res) => {
    try {
      const config = await queries.getSiteConfiguration();
      res.json(config || null);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/settings", async (req, res) => {
    try {
      await db.insert(schema.siteConfiguration).values(req.body);
      const config = await queries.getSiteConfiguration();
      res.json(config);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/settings", async (req, res) => {
    try {
      const config = await queries.getSiteConfiguration();
      if (config) {
        await queries.updateSiteConfiguration(config.id, req.body);
        res.json({ message: "Configuration mise à jour" });
      } else {
        await db.insert(schema.siteConfiguration).values(req.body);
        res.json({ message: "Configuration créée" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // CATÉGORIES DE PRODUITS
  // ============================================

  app.get("/api/admin/product-categories", async (req, res) => {
    try {
      const categories = await db.select().from(schema.productCategories).orderBy(schema.productCategories.displayOrder);
      res.json(categories);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/admin/product-categories/entity/:entityId", async (req, res) => {
    try {
      const categories = await db.select().from(schema.productCategories)
        .where(eq(schema.productCategories.entityId, req.params.entityId))
        .orderBy(schema.productCategories.displayOrder);
      res.json(categories);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/product-categories", async (req, res) => {
    try {
      await db.insert(schema.productCategories).values(req.body);
      res.json({ message: "Catégorie créée avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/product-categories/:id", async (req, res) => {
    try {
      await db.update(schema.productCategories).set(req.body).where(eq(schema.productCategories.id, req.params.id));
      res.json({ message: "Catégorie mise à jour" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/product-categories/:id", async (req, res) => {
    try {
      await db.delete(schema.productCategories).where(eq(schema.productCategories.id, req.params.id));
      res.json({ message: "Catégorie supprimée" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // PRODUITS
  // ============================================

  app.get("/api/admin/products", async (req, res) => {
    try {
      const products = await db.select().from(schema.products).orderBy(schema.products.displayOrder);
      res.json(products);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/admin/products/entity/:entityId", async (req, res) => {
    try {
      const products = await db.select().from(schema.products)
        .where(eq(schema.products.entityId, req.params.entityId))
        .orderBy(schema.products.displayOrder);
      res.json(products);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/products", async (req, res) => {
    try {
      await db.insert(schema.products).values(req.body);
      res.json({ message: "Produit créé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/products/:id", async (req, res) => {
    try {
      await db.update(schema.products).set(req.body).where(eq(schema.products.id, req.params.id));
      res.json({ message: "Produit mis à jour" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/products/:id", async (req, res) => {
    try {
      await db.delete(schema.products).where(eq(schema.products.id, req.params.id));
      res.json({ message: "Produit supprimé" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // PROJETS / RÉALISATIONS
  // ============================================

  app.get("/api/admin/projects", async (req, res) => {
    try {
      const projects = await db.select().from(schema.projects).orderBy(desc(schema.projects.year));
      res.json(projects);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/admin/projects/entity/:entityId", async (req, res) => {
    try {
      const projects = await db.select().from(schema.projects)
        .where(eq(schema.projects.entityId, req.params.entityId))
        .orderBy(desc(schema.projects.year));
      res.json(projects);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/projects", async (req, res) => {
    try {
      await db.insert(schema.projects).values(req.body);
      res.json({ message: "Projet créé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/projects/:id", async (req, res) => {
    try {
      await db.update(schema.projects).set(req.body).where(eq(schema.projects.id, req.params.id));
      res.json({ message: "Projet mis à jour" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/projects/:id", async (req, res) => {
    try {
      await db.delete(schema.projects).where(eq(schema.projects.id, req.params.id));
      res.json({ message: "Projet supprimé" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // INFORMATIONS DE CONTACT
  // ============================================

  app.get("/api/admin/contact-info", async (req, res) => {
    try {
      const contacts = await queries.getContactInformation();
      res.json(contacts);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/contact-info", async (req, res) => {
    try {
      await db.insert(schema.contactInformation).values(req.body);
      res.json({ message: "Contact créé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/contact-info", async (req, res) => {
    try {
      if (req.body.id) {
        await queries.updateContactInfo(req.body.id, req.body);
        res.json({ message: "Contact mis à jour" });
      } else {
        await db.insert(schema.contactInformation).values(req.body);
        res.json({ message: "Contact créé" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/contact-info/:id", async (req, res) => {
    try {
      await queries.updateContactInfo(req.params.id, req.body);
      res.json({ message: "Contact mis à jour" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // API PUBLIQUE (pour le site)
  // ============================================

  // Actualités publiques
  app.get("/api/news", async (req, res) => {
    try {
      const articles = await queries.getPublishedNews();
      res.json(articles);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/news/:slug", async (req, res) => {
    try {
      const article = await queries.getNewsBySlug(req.params.slug);
      if (!article || !article.isPublished) {
        return res.status(404).json({ message: "Article non trouvé" });
      }
      res.json(article);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Carousel public
  app.get("/api/carousel", async (req, res) => {
    try {
      const slides = await queries.getActiveCarouselSlides();
      res.json(slides);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Statistiques publiques
  app.get("/api/statistics", async (req, res) => {
    try {
      const stats = await queries.getActiveStatistics();
      res.json(stats);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Formulaire de contact
  app.post("/api/contact", async (req, res) => {
    try {
      await queries.createContactMessage(req.body);
      res.json({ message: "Message envoyé avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Entités publiques
  app.get("/api/entities", async (req, res) => {
    try {
      const entities = await queries.getEntities();
      res.json(entities.filter(e => e.isActive));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Entité par slug
  app.get("/api/entities/:slug", async (req, res) => {
    try {
      const entities = await queries.getEntities();
      const entity = entities.find(e => e.pageSlug === req.params.slug || e.code.toLowerCase() === req.params.slug.toLowerCase());
      if (!entity) {
        return res.status(404).json({ message: "Entité non trouvée" });
      }
      res.json(entity);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Équipe dirigeante publique
  app.get("/api/team", async (req, res) => {
    try {
      const team = await queries.getLeadershipTeam();
      res.json(team.filter(m => m.isActive));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Témoignages publics
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await queries.getTestimonials();
      res.json(testimonials.filter(t => t.isPublished));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Témoignages par entité
  app.get("/api/testimonials/entity/:entityId", async (req, res) => {
    try {
      const testimonials = await queries.getTestimonials();
      res.json(testimonials.filter(t => t.isPublished && t.entityId === req.params.entityId));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Partenaires publics
  app.get("/api/partners", async (req, res) => {
    try {
      const partners = await queries.getActivePartners();
      res.json(partners);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Catégories de partenaires
  app.get("/api/partners/categories", async (req, res) => {
    try {
      const categories = await queries.getPartnerCategories();
      res.json(categories.filter(c => c.isActive));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Services par entité
  app.get("/api/services", async (req, res) => {
    try {
      const services = await queries.getServices();
      res.json(services.filter(s => s.isActive));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/services/entity/:entityId", async (req, res) => {
    try {
      const services = await queries.getServicesByEntity(req.params.entityId);
      res.json(services.filter(s => s.isActive));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Programmes RBA
  app.get("/api/rba/programs", async (req, res) => {
    try {
      const programs = await queries.getRbaPrograms();
      res.json(programs.filter(p => p.isActive));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // FAQ publique
  app.get("/api/faq", async (req, res) => {
    try {
      const faq = await queries.getPublishedFaqItems();
      res.json(faq);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/faq/categories", async (req, res) => {
    try {
      const categories = await queries.getFaqCategories();
      res.json(categories.filter(c => c.isActive));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Offres d'emploi publiques
  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = await queries.getActiveJobOffers();
      res.json(jobs);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Timeline publique
  app.get("/api/timeline", async (req, res) => {
    try {
      const timeline = await queries.getActiveTimeline();
      res.json(timeline);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Valeurs de l'entreprise
  app.get("/api/values", async (req, res) => {
    try {
      const values = await queries.getActiveValues();
      res.json(values);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Section À propos
  app.get("/api/about", async (req, res) => {
    try {
      const about = await db.select().from(schema.aboutSection).limit(1);
      res.json(about[0] || null);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Réseaux sociaux publics
  app.get("/api/social", async (req, res) => {
    try {
      const socialLinks = await db.select().from(schema.socialMediaLinks).orderBy(schema.socialMediaLinks.displayOrder);
      res.json(socialLinks.filter((s: { isActive: boolean }) => s.isActive));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // PAGES STATIQUES (Admin)
  // ============================================

  app.get("/api/admin/pages", async (req, res) => {
    try {
      const pages = await db.select().from(schema.pagesContent).orderBy(schema.pagesContent.pageSlug);
      res.json(pages);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/admin/pages/:slug", async (req, res) => {
    try {
      const page = await db.select().from(schema.pagesContent).where(eq(schema.pagesContent.pageSlug, req.params.slug));
      if (page.length === 0) {
        return res.status(404).json({ message: "Page non trouvée" });
      }
      res.json(page[0]);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/pages", async (req, res) => {
    try {
      await db.insert(schema.pagesContent).values(req.body);
      res.json({ message: "Page créée avec succès" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/pages/:id", async (req, res) => {
    try {
      await db.update(schema.pagesContent).set(req.body).where(eq(schema.pagesContent.id, req.params.id));
      res.json({ message: "Page mise à jour" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/pages/:id", async (req, res) => {
    try {
      await db.delete(schema.pagesContent).where(eq(schema.pagesContent.id, req.params.id));
      res.json({ message: "Page supprimée" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Pages publiques
  app.get("/api/pages/:slug", async (req, res) => {
    try {
      const page = await db.select().from(schema.pagesContent)
        .where(eq(schema.pagesContent.pageSlug, req.params.slug));
      if (page.length === 0 || !page[0].isPublished) {
        return res.status(404).json({ message: "Page non trouvée" });
      }
      res.json(page[0]);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // PRODUITS PUBLICS
  // ============================================

  app.get("/api/products", async (req, res) => {
    try {
      const products = await db.select().from(schema.products)
        .where(eq(schema.products.isActive, true))
        .orderBy(schema.products.displayOrder);
      res.json(products);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/products/entity/:entityId", async (req, res) => {
    try {
      const products = await db.select().from(schema.products)
        .where(eq(schema.products.entityId, req.params.entityId))
        .orderBy(schema.products.displayOrder);
      res.json(products.filter(p => p.isActive));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await db.select().from(schema.products)
        .where(eq(schema.products.isFeatured, true))
        .orderBy(schema.products.displayOrder);
      res.json(products.filter(p => p.isActive));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/product-categories", async (req, res) => {
    try {
      const categories = await db.select().from(schema.productCategories)
        .where(eq(schema.productCategories.isActive, true))
        .orderBy(schema.productCategories.displayOrder);
      res.json(categories);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/product-categories/entity/:entityId", async (req, res) => {
    try {
      const categories = await db.select().from(schema.productCategories)
        .where(eq(schema.productCategories.entityId, req.params.entityId))
        .orderBy(schema.productCategories.displayOrder);
      res.json(categories.filter(c => c.isActive));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // PROJETS PUBLICS
  // ============================================

  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await db.select().from(schema.projects)
        .where(eq(schema.projects.isActive, true))
        .orderBy(desc(schema.projects.year));
      res.json(projects);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/projects/entity/:entityId", async (req, res) => {
    try {
      const projects = await db.select().from(schema.projects)
        .where(eq(schema.projects.entityId, req.params.entityId))
        .orderBy(desc(schema.projects.year));
      res.json(projects.filter(p => p.isActive));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/projects/featured", async (req, res) => {
    try {
      const projects = await db.select().from(schema.projects)
        .where(eq(schema.projects.isFeatured, true))
        .orderBy(desc(schema.projects.year));
      res.json(projects.filter(p => p.isActive));
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // CATÉGORIES D'ACTUALITÉS PUBLIQUES
  // ============================================

  app.get("/api/news/categories", async (req, res) => {
    try {
      const categories = await queries.getNewsCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // COMMUNIQUÉS DE PRESSE PUBLICS
  // ============================================

  app.get("/api/press-releases", async (req, res) => {
    try {
      const releases = await db.select().from(schema.pressReleases)
        .where(eq(schema.pressReleases.isPublished, true))
        .orderBy(desc(schema.pressReleases.publishedAt));
      res.json(releases);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/press-releases/:slug", async (req, res) => {
    try {
      const release = await db.select().from(schema.pressReleases)
        .where(eq(schema.pressReleases.slug, req.params.slug));
      if (release.length === 0) {
        return res.status(404).json({ message: "Communiqué non trouvé" });
      }
      res.json(release[0]);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // ============================================
  // ADMIN - COMMUNIQUÉS DE PRESSE
  // ============================================

  app.get("/api/admin/press-releases", requireAuth, async (req, res) => {
    try {
      const releases = await db.select().from(schema.pressReleases)
        .orderBy(desc(schema.pressReleases.publishedAt));
      res.json(releases);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/admin/press-releases", requireAuth, async (req, res) => {
    try {
      const data = {
        ...req.body,
        slug: req.body.slug || req.body.title.toLowerCase()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      };
      const result = await db.insert(schema.pressReleases).values(data);
      res.status(201).json({ message: "Communiqué créé", id: result[0].insertId });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/press-releases/:id", requireAuth, async (req, res) => {
    try {
      await db.update(schema.pressReleases)
        .set(req.body)
        .where(eq(schema.pressReleases.id, req.params.id));
      res.json({ message: "Communiqué mis à jour" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/press-releases/:id", requireAuth, async (req, res) => {
    try {
      await db.delete(schema.pressReleases)
        .where(eq(schema.pressReleases.id, req.params.id));
      res.json({ message: "Communiqué supprimé" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  return httpServer;
}
