import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages principales
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Contact from "@/pages/Contact";
import Careers from "@/pages/Careers";
import Governance from "@/pages/Governance";
import CSR from "@/pages/CSR";
import Certifications from "@/pages/Certifications";
import Partners from "@/pages/Partners";
import Press from "@/pages/Press";
import FAQ from "@/pages/FAQ";
import LegalNotice from "@/pages/LegalNotice";
import Privacy from "@/pages/Privacy";
import Cookies from "@/pages/Cookies";

// Pages entités
import RBF from "@/pages/RBF";
import RBFEquipment from "@/pages/RBFEquipment";
import RBFRental from "@/pages/RBFRental";
import RBFMaterials from "@/pages/RBFMaterials";
import RBFMaintenance from "@/pages/RBFMaintenance";
import RBFLogistics from "@/pages/RBFLogistics";
import RBFTestimonials from "@/pages/RBFTestimonials";
import RIC from "@/pages/RIC";
import RICAudit from "@/pages/RICAudit";
import RICStrategy from "@/pages/RICStrategy";
import RICProjectManagement from "@/pages/RICProjectManagement";
import RICMarketResearch from "@/pages/RICMarketResearch";
import RICTraining from "@/pages/RICTraining";
import RICTestimonials from "@/pages/RICTestimonials";
import REVI from "@/pages/REVI";
import REVIAgriculture from "@/pages/REVIAgriculture";
import REVILivestock from "@/pages/REVILivestock";
import REVIProcessing from "@/pages/REVIProcessing";
import REVIDistribution from "@/pages/REVIDistribution";
import REVIProjects from "@/pages/REVIProjects";
import REVITraining from "@/pages/REVITraining";
import REVITestimonials from "@/pages/REVITestimonials";
import RBA from "@/pages/RBA";
import RBAPrograms from "@/pages/RBAPrograms";
import RBAProfessionalTraining from "@/pages/RBAProfessionalTraining";
import RBADegreePrograms from "@/pages/RBADegreePrograms";

// 404 Page
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Page d'accueil */}
      <Route path="/" component={Home} />

      {/* Pages secondaires */}
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

      {/* Pages entités */}
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

      {/* 404 - Doit être en dernier */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
