import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollProgress from "@/components/ScrollProgress";

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm">Chargement...</p>
    </div>
  </div>
);

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Projects = lazy(() => import("@/pages/Projects"));
const News = lazy(() => import("@/pages/News"));
const NewsDetail = lazy(() => import("@/pages/NewsDetail"));
const Contact = lazy(() => import("@/pages/Contact"));
const Careers = lazy(() => import("@/pages/Careers"));
const Governance = lazy(() => import("@/pages/Governance"));
const CSR = lazy(() => import("@/pages/CSR"));
const Certifications = lazy(() => import("@/pages/Certifications"));
const Partners = lazy(() => import("@/pages/Partners"));
const Press = lazy(() => import("@/pages/Press"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const LegalNotice = lazy(() => import("@/pages/LegalNotice"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Cookies = lazy(() => import("@/pages/Cookies"));

const RBF = lazy(() => import("@/pages/RBF"));
const RBFEquipment = lazy(() => import("@/pages/RBFEquipment"));
const RBFRental = lazy(() => import("@/pages/RBFRental"));
const RBFMaterials = lazy(() => import("@/pages/RBFMaterials"));
const RBFMaintenance = lazy(() => import("@/pages/RBFMaintenance"));
const RBFLogistics = lazy(() => import("@/pages/RBFLogistics"));
const RBFTestimonials = lazy(() => import("@/pages/RBFTestimonials"));

const RIC = lazy(() => import("@/pages/RIC"));
const RICAudit = lazy(() => import("@/pages/RICAudit"));
const RICStrategy = lazy(() => import("@/pages/RICStrategy"));
const RICProjectManagement = lazy(() => import("@/pages/RICProjectManagement"));
const RICProjects = lazy(() => import("@/pages/RICProjects"));
const RICMarketResearch = lazy(() => import("@/pages/RICMarketResearch"));
const RICTraining = lazy(() => import("@/pages/RICTraining"));
const RICTestimonials = lazy(() => import("@/pages/RICTestimonials"));

const REVI = lazy(() => import("@/pages/REVI"));
const REVIAgriculture = lazy(() => import("@/pages/REVIAgriculture"));
const REVILivestock = lazy(() => import("@/pages/REVILivestock"));
const REVIProcessing = lazy(() => import("@/pages/REVIProcessing"));
const REVIDistribution = lazy(() => import("@/pages/REVIDistribution"));
const REVIProjects = lazy(() => import("@/pages/REVIProjects"));
const REVITraining = lazy(() => import("@/pages/REVITraining"));
const REVITestimonials = lazy(() => import("@/pages/REVITestimonials"));

const RBA = lazy(() => import("@/pages/RBA"));
const RBAPrograms = lazy(() => import("@/pages/RBAPrograms"));
const RBAProfessionalTraining = lazy(() => import("@/pages/RBAProfessionalTraining"));
const RBADegreePrograms = lazy(() => import("@/pages/RBADegreePrograms"));
const RBATestimonials = lazy(() => import("@/pages/RBATestimonials"));
const RBAAdmission = lazy(() => import("@/pages/RBAAdmission"));
const RBACorporate = lazy(() => import("@/pages/RBACorporate"));

const History = lazy(() => import("@/pages/History"));
const Innovation = lazy(() => import("@/pages/Innovation"));
const Investors = lazy(() => import("@/pages/Investors"));
const Sustainability = lazy(() => import("@/pages/Sustainability"));
const Leadership = lazy(() => import("@/pages/Leadership"));
const OffresEmploi = lazy(() => import("@/pages/Carrieres"));
const Quote = lazy(() => import("@/pages/Quote"));
const Group = lazy(() => import("@/pages/Group"));

const NotFound = lazy(() => import("@/pages/not-found"));

// Admin pages
const AdminLogin = lazy(() => import("@/pages/admin/Login"));
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminCarousel = lazy(() => import("@/pages/admin/Carousel"));
const AdminNews = lazy(() => import("@/pages/admin/News"));
const AdminTeam = lazy(() => import("@/pages/admin/Team"));
const AdminPartners = lazy(() => import("@/pages/admin/Partners"));
const AdminTestimonials = lazy(() => import("@/pages/admin/Testimonials"));
const AdminFaq = lazy(() => import("@/pages/admin/Faq"));
const AdminJobs = lazy(() => import("@/pages/admin/Jobs"));
const AdminMessages = lazy(() => import("@/pages/admin/Messages"));
const AdminStatistics = lazy(() => import("@/pages/admin/Statistics"));
const AdminEntities = lazy(() => import("@/pages/admin/Entities"));
const AdminServices = lazy(() => import("@/pages/admin/Services"));
const AdminSettings = lazy(() => import("@/pages/admin/Settings"));
const AdminTimeline = lazy(() => import("@/pages/admin/Timeline"));
const AdminValues = lazy(() => import("@/pages/admin/Values"));
const AdminSocial = lazy(() => import("@/pages/admin/Social"));
const AdminPrograms = lazy(() => import("@/pages/admin/Programs"));
const AdminProducts = lazy(() => import("@/pages/admin/Products"));
const AdminProjects = lazy(() => import("@/pages/admin/Projects"));
const AdminPages = lazy(() => import("@/pages/admin/Pages"));
const AdminPressReleases = lazy(() => import("@/pages/admin/PressReleases"));

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />

        <Route path="/a-propos" component={About} />
        <Route path="/projets" component={Projects} />
        <Route path="/actualites" component={News} />
        <Route path="/actualites/:id" component={NewsDetail} />
        <Route path="/contact" component={Contact} />
        <Route path="/carrieres" component={Careers} />
        <Route path="/gouvernance" component={Governance} />
        <Route path="/rse" component={CSR} />
        <Route path="/certifications" component={Certifications} />
        <Route path="/partenaires" component={Partners} />
        <Route path="/presse" component={Press} />
        <Route path="/faq" component={FAQ} />
        <Route path="/mentions-legales" component={LegalNotice} />
        <Route path="/politique-confidentialite" component={Privacy} />
        <Route path="/cookies" component={Cookies} />

        <Route path="/rbf" component={RBF} />
        <Route path="/rbf/equipements" component={RBFEquipment} />
        <Route path="/rbf/location" component={RBFRental} />
        <Route path="/rbf/materiaux" component={RBFMaterials} />
        <Route path="/rbf/maintenance" component={RBFMaintenance} />
        <Route path="/rbf/logistique" component={RBFLogistics} />
        <Route path="/rbf/temoignages" component={RBFTestimonials} />

        <Route path="/ric" component={RIC} />
        <Route path="/ric/audit" component={RICAudit} />
        <Route path="/ric/strategie" component={RICStrategy} />
        <Route path="/ric/projets" component={RICProjectManagement} />
        <Route path="/ric/projets-investissement" component={RICProjects} />
        <Route path="/ric/etudes" component={RICMarketResearch} />
        <Route path="/ric/formation" component={RICTraining} />
        <Route path="/ric/temoignages" component={RICTestimonials} />

        <Route path="/revi" component={REVI} />
        <Route path="/revi/agriculture" component={REVIAgriculture} />
        <Route path="/revi/elevage" component={REVILivestock} />
        <Route path="/revi/transformation" component={REVIProcessing} />
        <Route path="/revi/distribution" component={REVIDistribution} />
        <Route path="/revi/projets" component={REVIProjects} />
        <Route path="/revi/formation" component={REVITraining} />
        <Route path="/revi/temoignages" component={REVITestimonials} />

        <Route path="/rba" component={RBA} />
        <Route path="/rba/programmes" component={RBAPrograms} />
        <Route path="/rba/formations-professionnelles" component={RBAProfessionalTraining} />
        <Route path="/rba/formations-diplomantes" component={RBADegreePrograms} />
        <Route path="/rba/temoignages" component={RBATestimonials} />
        <Route path="/rba/admission" component={RBAAdmission} />
        <Route path="/rba/entreprises" component={RBACorporate} />
        
        <Route path="/histoire" component={History} />
        <Route path="/innovation" component={Innovation} />
        <Route path="/investisseurs" component={Investors} />
        <Route path="/developpement-durable" component={Sustainability} />
        <Route path="/equipe-direction" component={Leadership} />
        <Route path="/offres-emploi" component={OffresEmploi} />
        <Route path="/devis" component={Quote} />
        <Route path="/groupe" component={Group} />

        {/* Admin Routes */}
        <Route path="/admin">
          {() => {
            window.location.href = "/admin/login";
            return null;
          }}
        </Route>
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/carousel" component={AdminCarousel} />
        <Route path="/admin/news" component={AdminNews} />
        <Route path="/admin/team" component={AdminTeam} />
        <Route path="/admin/partners" component={AdminPartners} />
        <Route path="/admin/testimonials" component={AdminTestimonials} />
        <Route path="/admin/faq" component={AdminFaq} />
        <Route path="/admin/jobs" component={AdminJobs} />
        <Route path="/admin/messages" component={AdminMessages} />
        <Route path="/admin/statistics" component={AdminStatistics} />
        <Route path="/admin/entities" component={AdminEntities} />
        <Route path="/admin/services/:entity?" component={AdminServices} />
        <Route path="/admin/settings" component={AdminSettings} />
        <Route path="/admin/timeline" component={AdminTimeline} />
        <Route path="/admin/values" component={AdminValues} />
        <Route path="/admin/social" component={AdminSocial} />
        <Route path="/admin/programs/:entity?" component={AdminPrograms} />
        <Route path="/admin/products/:entity?" component={AdminProducts} />
        <Route path="/admin/projects/:entity?" component={AdminProjects} />
        <Route path="/admin/pages" component={AdminPages} />
        <Route path="/admin/press-releases" component={AdminPressReleases} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollProgress />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
