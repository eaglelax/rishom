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

// Pages entités
import RBF from "@/pages/RBF";
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

      {/* Pages entités */}
      <Route path="/rbf" component={RBF} />
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
