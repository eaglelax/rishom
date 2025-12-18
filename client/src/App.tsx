import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import RBF from "@/pages/RBF";
import RIC from "@/pages/RIC";
import REVI from "@/pages/REVI";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/rbf" component={RBF} />
      <Route path="/ric" component={RIC} />
      <Route path="/revi" component={REVI} />
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
