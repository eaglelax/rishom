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
import RIC from "@/pages/RIC";
import REVI from "@/pages/REVI";
import RBA from "@/pages/RBA";

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
      <Route path="/ric" component={RIC} />
      <Route path="/revi" component={REVI} />
      <Route path="/rba" component={RBA} />

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
